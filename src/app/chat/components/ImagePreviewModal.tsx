"use client";
import { useEffect, useState, type SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Check, Copy, Download, Wand2, X } from "lucide-react";

interface PreviewImageItem {
  url: string;
  prompt?: string;
  id?: string;
}

interface ImagePreviewModalProps {
  image: PreviewImageItem;
  onClose: () => void;
  onUseAsReference?: (url: string) => void;
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
}: ImagePreviewModalProps) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dimensions, setDimensions] = useState<DetectedDimensions | null>(null);

  useEffect(() => {
    setMounted(true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

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
        className="relative flex max-h-[92vh] max-w-[94vw] flex-col items-center justify-center focus:outline-none"
      >
        <div className="mb-2 flex w-full items-center justify-between gap-2 px-1">
          {dimensions ? (
            <span className="flex items-center gap-1 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[11px] font-semibold text-slate-200 backdrop-blur-md">
              <span>Aspect Ratio: {dimensions.ratio}</span>
              <span className="text-slate-400">({dimensions.width}×{dimensions.height}px)</span>
            </span>
          ) : (
            <div />
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

        <div className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#161718]/80 shadow-[0_24px_70px_rgba(0,0,0,0.7)] backdrop-blur-md">
          <Image
            src={image.url}
            alt={image.prompt ?? "Generated AI Image"}
            width={1200}
            height={1200}
            unoptimized
            onLoad={handleImageLoad}
            className="max-h-[68vh] max-w-[88vw] w-auto h-auto object-contain block select-none rounded-2xl"
          />
        </div>

        {image.prompt && (
          <div className="mt-3 flex w-full max-w-2xl flex-col gap-2 rounded-2xl border border-white/[0.08] bg-[#1e1f20]/90 p-3 text-xs text-white shadow-2xl backdrop-blur-md">
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
        )}
      </div>
    </div>,
    document.body
  );
}
