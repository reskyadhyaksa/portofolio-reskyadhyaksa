"use client";
import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import { Check, Copy, Crop, Download, RotateCcw, Wand2, X } from "lucide-react";
import { uploadAttachment } from "../services/chat-api";
import ImageSelectionOverlay, { type SelectionRect } from "./ImageSelectionOverlay";

interface PreviewImageItem {
  url: string;
  prompt?: string;
  id?: string;
}

interface ImagePreviewModalProps {
  image: PreviewImageItem;
  onClose: () => void;
  onUseAsReference?: (url: string, suggestedPrompt?: string) => void;
  sessionId?: string | null;
}

interface DetectedDimensions {
  width: number;
  height: number;
  ratio: string;
}

function resolveAspectRatioLabel(width: number, height: number): string {
  if (width <= 0 || height <= 0) return "1:1";
  const ratio = width / height;
  if (Math.abs(ratio - 16 / 9) < 0.08) return "16:9";
  if (Math.abs(ratio - 9 / 16) < 0.08) return "9:16";
  if (Math.abs(ratio - 4 / 3) < 0.08) return "4:3";
  if (Math.abs(ratio - 3 / 4) < 0.08) return "3:4";
  if (Math.abs(ratio - 21 / 9) < 0.1) return "21:9";
  if (Math.abs(ratio - 1) < 0.05) return "1:1";
  return `${width}×${height}`;
}

export default function ImagePreviewModal({
  image,
  onClose,
  onUseAsReference,
  sessionId,
}: ImagePreviewModalProps) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dimensions, setDimensions] = useState<DetectedDimensions | null>(null);

  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selection, setSelection] = useState<SelectionRect | null>(null);
  const [isProcessingCrop, setIsProcessingCrop] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const panStartRef = useRef<{ x: number; y: number; startX: number; startY: number } | null>(null);

  useEffect(() => {
    setMounted(true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isSelectionMode) {
          setIsSelectionMode(false);
          setSelection(null);
        } else if (scale > 1.01) {
          setScale(1);
          setTranslate({ x: 0, y: 0 });
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSelectionMode, onClose, scale]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      if (isSelectionMode) return;
      e.preventDefault();
      e.stopPropagation();

      const delta = -e.deltaY;
      const zoomFactor = delta > 0 ? 1.15 : 0.87;

      setScale((prevScale) => {
        const nextScale = Math.min(Math.max(1, prevScale * zoomFactor), 5);
        if (nextScale <= 1.005) {
          setTranslate({ x: 0, y: 0 });
          return 1;
        }

        const rect = container.getBoundingClientRect();
        const cursorX = e.clientX - rect.left - rect.width / 2;
        const cursorY = e.clientY - rect.top - rect.height / 2;
        const ratio = nextScale / prevScale;

        setTranslate((prevTranslate) => {
          const newX = cursorX - (cursorX - prevTranslate.x) * ratio;
          const newY = cursorY - (cursorY - prevTranslate.y) * ratio;
          const maxTranslateX = ((nextScale - 1) * rect.width) / 2;
          const maxTranslateY = ((nextScale - 1) * rect.height) / 2;
          return {
            x: Math.min(Math.max(newX, -maxTranslateX), maxTranslateX),
            y: Math.min(Math.max(newY, -maxTranslateY), maxTranslateY),
          };
        });

        return nextScale;
      });
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, [isSelectionMode]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isSelectionMode || scale <= 1.01) return;
    panStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startX: translate.x,
      startY: translate.y,
    };
    setIsPanning(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPanning || !panStartRef.current || scale <= 1.01) return;
    const container = containerRef.current;
    if (!container) return;

    const dx = e.clientX - panStartRef.current.x;
    const dy = e.clientY - panStartRef.current.y;
    const newX = panStartRef.current.startX + dx;
    const newY = panStartRef.current.startY + dy;

    const rect = container.getBoundingClientRect();
    const maxTranslateX = ((scale - 1) * rect.width) / 2;
    const maxTranslateY = ((scale - 1) * rect.height) / 2;

    setTranslate({
      x: Math.min(Math.max(newX, -maxTranslateX), maxTranslateX),
      y: Math.min(Math.max(newY, -maxTranslateY), maxTranslateY),
    });
  };

  const handlePointerUp = () => {
    setIsPanning(false);
  };

  const handleDoubleClick = () => {
    if (isSelectionMode) return;
    if (scale > 1.01) {
      handleResetZoom();
    } else {
      setScale(2);
    }
  };

  const handleResetZoom = () => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  };

  const handleCopyPrompt = async () => {
    if (!image.prompt) return;
    await navigator.clipboard.writeText(image.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    setDimensions({
      width,
      height,
      ratio: resolveAspectRatioLabel(width, height),
    });
  };

  const handleConfirmCrop = async () => {
    if (!selection || !imgRef.current) return;
    setIsProcessingCrop(true);
    try {
      const img = imgRef.current;
      const naturalWidth = img.naturalWidth || dimensions?.width || img.clientWidth;
      const naturalHeight = img.naturalHeight || dimensions?.height || img.clientHeight;

      const scaleX = naturalWidth / img.clientWidth;
      const scaleY = naturalHeight / img.clientHeight;

      const sx = Math.max(0, Math.floor(selection.x * scaleX));
      const sy = Math.max(0, Math.floor(selection.y * scaleY));
      const sw = Math.min(naturalWidth - sx, Math.floor(selection.width * scaleX));
      const sh = Math.min(naturalHeight - sy, Math.floor(selection.height * scaleY));

      if (sw < 10 || sh < 10) return;

      const canvas = document.createElement("canvas");
      canvas.width = sw;
      canvas.height = sh;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const imageElement = document.createElement("img");
      imageElement.crossOrigin = "anonymous";

      await new Promise<void>((resolve, reject) => {
        imageElement.onload = () => resolve();
        imageElement.onerror = () => reject(new Error("Gagal memuat gambar"));
        imageElement.src = image.url;
      });

      ctx.drawImage(imageElement, sx, sy, sw, sh, 0, 0, sw, sh);

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("Gagal mengekspor area");

      let finalUrl: string;
      if (sessionId) {
        const file = new File([blob], `crop-${Date.now()}.png`, { type: "image/png" });
        const uploaded = await uploadAttachment(sessionId, file);
        finalUrl = uploaded.url;
      } else {
        finalUrl = canvas.toDataURL("image/png");
      }

      onUseAsReference?.(finalUrl, "Edit bagian yang dipilih: ");
      onClose();
    } catch {
      setIsProcessingCrop(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6 animate-fade-in-soft"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto my-auto flex max-h-[92vh] max-w-[94vw] flex-col items-center justify-center focus:outline-none"
      >
        <div className="mb-2 flex w-full items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2">
            {dimensions ? (
              <span className="flex items-center gap-1 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[11px] font-semibold text-slate-200 backdrop-blur-md">
                <span>Aspect Ratio: {dimensions.ratio}</span>
                <span className="text-slate-400">({dimensions.width}×{dimensions.height}px)</span>
              </span>
            ) : (
              <div />
            )}

            {scale > 1.01 && (
              <button
                type="button"
                onClick={handleResetZoom}
                title="Reset zoom ke 100%"
                className="flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-950/60 px-2.5 py-1 text-[11px] font-mono text-cyan-300 backdrop-blur-md hover:bg-cyan-900/60 transition-colors cursor-pointer"
              >
                <span>{Math.round(scale * 100)}%</span>
                <RotateCcw className="h-3 w-3" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onUseAsReference && (
              <button
                type="button"
                onClick={() => {
                  if (isSelectionMode) {
                    setIsSelectionMode(false);
                    setSelection(null);
                  } else {
                    handleResetZoom();
                    setIsSelectionMode(true);
                  }
                }}
                title={isSelectionMode ? "Batalkan seleksi area" : "Pilih area gambar untuk diedit"}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md transition-all cursor-pointer ${
                  isSelectionMode
                    ? "border-cyan-400 bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 active:scale-95"
                    : "border-white/10 bg-black/60 text-slate-200 hover:bg-white/20 hover:text-white active:scale-95"
                }`}
              >
                <Crop className="h-3.5 w-3.5" />
                <span>{isSelectionMode ? "Batal Pilih" : "Pilih Area Edit"}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onDoubleClick={handleDoubleClick}
          className={`relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#161718]/80 shadow-[0_24px_70px_rgba(0,0,0,0.7)] backdrop-blur-md select-none touch-none ${
            isSelectionMode
              ? "cursor-crosshair"
              : scale > 1.01
                ? isPanning
                  ? "cursor-grabbing"
                  : "cursor-grab"
                : "cursor-default"
          }`}
        >
          <div
            style={{
              transform: `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale})`,
              transformOrigin: "center center",
              transition: isPanning ? "none" : "transform 0.12s ease-out",
            }}
            className="flex items-center justify-center will-change-transform"
          >
            <img
              ref={imgRef}
              src={image.url}
              alt={image.prompt ?? "Generated AI Image"}
              onLoad={handleImageLoad}
              draggable={false}
              className={`w-auto h-auto object-contain block select-none rounded-2xl ${
                scale > 1.01 ? "max-h-[82vh] max-w-[92vw]" : "max-h-[68vh] max-w-[88vw]"
              } transition-[max-height,max-width] duration-300`}
            />
          </div>

          {isSelectionMode && containerSize.width > 0 && containerSize.height > 0 && (
            <ImageSelectionOverlay
              containerWidth={containerSize.width}
              containerHeight={containerSize.height}
              selection={selection}
              onSelectionChange={setSelection}
              onConfirm={handleConfirmCrop}
              onCancel={() => {
                setIsSelectionMode(false);
                setSelection(null);
              }}
              isProcessing={isProcessingCrop}
            />
          )}
        </div>

        <div
          className={`transition-all duration-300 ease-out ${
            scale > 1.01 || isSelectionMode
              ? "pointer-events-none max-h-0 translate-y-6 opacity-0 overflow-hidden"
              : "max-h-96 translate-y-0 opacity-100 mt-3"
          } w-full max-w-2xl flex-col gap-2 rounded-2xl border border-white/[0.08] bg-[#1e1f20]/90 p-3 text-xs text-white shadow-2xl backdrop-blur-md flex`}
        >
          {image.prompt && (
            <div className="flex items-start justify-between gap-3">
              <p className="line-clamp-2 leading-relaxed text-[#e3e3e3] text-xs">
                {image.prompt}
              </p>
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="flex shrink-0 items-center gap-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] px-2.5 py-1 text-[11px] font-medium text-slate-300 transition-colors"
                title="Copy prompt"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 border-t border-white/[0.06] pt-2 text-[11px]">
            {onUseAsReference && (
              <button
                type="button"
                onClick={() => {
                  onUseAsReference(image.url);
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 px-3 py-1.5 font-semibold text-white hover:bg-cyan-500 transition-colors"
              >
                <Wand2 className="h-3 w-3" />
                <span>Edit in Studio</span>
              </button>
            )}
            <a
              href={image.url}
              download={`image-${image.id ?? "preview"}.png`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-white/[0.08] px-3 py-1.5 font-semibold text-white hover:bg-white/[0.16] transition-colors"
            >
              <Download className="h-3 w-3" />
              <span>Download</span>
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
