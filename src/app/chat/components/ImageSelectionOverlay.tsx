"use client";
import { useCallback, useRef, useState, type PointerEvent } from "react";
import { Crop, Loader2, RotateCcw, Wand2, X } from "lucide-react";

export interface SelectionRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageSelectionOverlayProps {
  containerWidth: number;
  containerHeight: number;
  selection: SelectionRect | null;
  onSelectionChange: (rect: SelectionRect | null) => void;
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing: boolean;
}

export default function ImageSelectionOverlay({
  containerWidth,
  containerHeight,
  selection,
  onSelectionChange,
  onConfirm,
  onCancel,
  isProcessing,
}: ImageSelectionOverlayProps) {
  const [isDrawing, setIsDrawing] = useState(false);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (isProcessing) return;
    const rect = overlayRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = clamp(e.clientX - rect.left, 0, containerWidth);
    const y = clamp(e.clientY - rect.top, 0, containerHeight);
    startPosRef.current = { x, y };
    setIsDrawing(true);
    onSelectionChange({ x, y, width: 0, height: 0 });
    overlayRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDrawing || !startPosRef.current) return;
    const rect = overlayRef.current?.getBoundingClientRect();
    if (!rect) return;
    const currentX = clamp(e.clientX - rect.left, 0, containerWidth);
    const currentY = clamp(e.clientY - rect.top, 0, containerHeight);

    const x = Math.min(startPosRef.current.x, currentX);
    const y = Math.min(startPosRef.current.y, currentY);
    const width = Math.abs(currentX - startPosRef.current.x);
    const height = Math.abs(currentY - startPosRef.current.y);

    onSelectionChange({ x, y, width, height });
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
    startPosRef.current = null;
    if (selection && (selection.width < 15 || selection.height < 15)) {
      onSelectionChange(null);
    }
  };

  const hasValidSelection = Boolean(selection && selection.width >= 15 && selection.height >= 15);

  return (
    <div
      ref={overlayRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="absolute inset-0 z-30 cursor-crosshair select-none touch-none"
    >
      <div className="pointer-events-none absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      {hasValidSelection && selection && (
        <>
          <div
            className="pointer-events-none absolute border-2 border-cyan-400 bg-cyan-400/15 shadow-[0_0_24px_rgba(6,182,212,0.45)] transition-[box-shadow]"
            style={{
              left: `${selection.x}px`,
              top: `${selection.y}px`,
              width: `${selection.width}px`,
              height: `${selection.height}px`,
            }}
          >
            <span className="absolute -top-1 -left-1 h-2.5 w-2.5 border-t-2 border-l-2 border-cyan-300" />
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 border-t-2 border-r-2 border-cyan-300" />
            <span className="absolute -bottom-1 -left-1 h-2.5 w-2.5 border-b-2 border-l-2 border-cyan-300" />
            <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 border-b-2 border-r-2 border-cyan-300" />

            <div className="absolute -top-7 left-0 flex items-center gap-1 rounded-md bg-black/80 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-cyan-300 shadow backdrop-blur-md">
              <Crop className="h-3 w-3" />
              <span>
                {Math.round(selection.width)}×{Math.round(selection.height)}
              </span>
            </div>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            className="absolute z-40 flex items-center gap-1.5 rounded-2xl border border-white/15 bg-black/85 p-1.5 shadow-2xl backdrop-blur-xl animate-fade-in-soft"
            style={{
              left: `${clamp(selection.x + selection.width / 2 - 130, 8, containerWidth - 270)}px`,
              top: `${selection.y + selection.height + 12 < containerHeight - 50 ? selection.y + selection.height + 12 : Math.max(8, selection.y - 48)}px`,
            }}
          >
            <button
              type="button"
              onClick={() => onSelectionChange(null)}
              disabled={isProcessing}
              title="Reset area pilihan"
              className="flex h-7 items-center gap-1 rounded-xl px-2 text-[11px] font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-40"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={onCancel}
              disabled={isProcessing}
              title="Batalkan mode pilih area"
              className="flex h-7 items-center gap-1 rounded-xl px-2 text-[11px] font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-40"
            >
              <X className="h-3 w-3" />
              <span>Batal</span>
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isProcessing}
              title="Kirim area yang dipilih ke Studio"
              className="flex h-7 items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-3 text-[11px] font-semibold text-white shadow-md hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
            >
              {isProcessing ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Wand2 className="h-3.5 w-3.5" />
              )}
              <span>{isProcessing ? "Mengambil..." : "Edit Area di Studio"}</span>
            </button>
          </div>
        </>
      )}

      {!hasValidSelection && (
        <div className="pointer-events-none absolute top-3 inset-x-0 flex justify-center px-4">
          <span className="rounded-full border border-cyan-500/30 bg-black/75 px-3 py-1 text-xs font-medium text-cyan-200 shadow-lg backdrop-blur-md animate-fade-in-soft">
            Tarik kursor pada gambar untuk menandai area yang ingin diedit
          </span>
        </div>
      )}
    </div>
  );
}
