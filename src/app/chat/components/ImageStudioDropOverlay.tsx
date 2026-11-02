import { AlertTriangle, ImagePlus } from "lucide-react";

interface ImageStudioDropOverlayProps {
  isVisible: boolean;
  maxInputImages: number;
  currentCount: number;
  modelLabel: string;
}

export default function ImageStudioDropOverlay({
  isVisible,
  maxInputImages,
  currentCount,
  modelLabel,
}: ImageStudioDropOverlayProps) {
  if (!isVisible) return null;

  const isSupported = maxInputImages > 0;
  const isFull = currentCount >= maxInputImages;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-[#131314]/90 p-4 backdrop-blur-md animate-fade-in-soft"
    >
      <div
        className={`flex w-full max-w-md flex-col items-center gap-3.5 rounded-3xl border-2 border-dashed p-8 text-center shadow-2xl transition-all ${
          !isSupported
            ? "border-amber-500/60 bg-[#1e1916]/95"
            : isFull
              ? "border-rose-500/60 bg-[#201618]/95"
              : "border-cyan-400/80 bg-[#161c22]/95 shadow-cyan-950/40"
        }`}
      >
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl border shadow-lg ${
            !isSupported
              ? "border-amber-500/30 bg-amber-500/15 text-amber-400"
              : isFull
                ? "border-rose-500/30 bg-rose-500/15 text-rose-400"
                : "border-cyan-500/30 bg-cyan-500/15 text-cyan-400 shadow-cyan-950/40"
          }`}
        >
          {!isSupported ? (
            <AlertTriangle className="h-7 w-7" aria-hidden="true" />
          ) : (
            <ImagePlus className="h-7 w-7" aria-hidden="true" />
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-white">
            {!isSupported
              ? "Model Tidak Mendukung Gambar Referensi"
              : isFull
                ? "Batas Maksimal Gambar Referensi Tercapai"
                : "Lepaskan Gambar Referensi di Sini"}
          </p>
          <p className="text-xs text-slate-300">
            {!isSupported
              ? `Model ${modelLabel} hanya mendukung pembuatan gambar dari teks (Text-only).`
              : isFull
                ? `Model ini dibatasi maksimal ${maxInputImages} gambar referensi.`
                : `Model ${modelLabel} mendukung hingga ${maxInputImages} gambar referensi.`}
          </p>
        </div>

        {isSupported && (
          <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 font-mono text-[11px] font-semibold text-cyan-300">
            {currentCount} / {maxInputImages} Gambar Terpasang
          </span>
        )}
      </div>
    </div>
  );
}
