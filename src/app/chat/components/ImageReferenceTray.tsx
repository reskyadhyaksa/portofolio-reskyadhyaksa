"use client";
import Image from "next/image";
import { Loader2, Plus, Trash2, X } from "lucide-react";

interface ImageReferenceTrayProps {
  referenceImages: string[];
  maxInputImages: number;
  isUploading: boolean;
  onRemoveImage: (index: number) => void;
  onClearAll: () => void;
  onAddClick: () => void;
  onPreviewImage: (url: string) => void;
  disabled?: boolean;
}

export default function ImageReferenceTray({
  referenceImages,
  maxInputImages,
  isUploading,
  onRemoveImage,
  onClearAll,
  onAddClick,
  onPreviewImage,
  disabled = false,
}: ImageReferenceTrayProps) {
  if (referenceImages.length === 0 && !isUploading) return null;

  const canAddMore = referenceImages.length < maxInputImages && !disabled && !isUploading;

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-cyan-500/30 bg-cyan-950/25 px-3 py-2 shadow-inner backdrop-blur-md animate-fade-in-soft">
      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto custom-scrollbar py-0.5">
        {referenceImages.map((url, index) => (
          <div
            key={url}
            className="group relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-cyan-500/40 bg-black/50 shadow-sm"
          >
            <button
              type="button"
              onClick={() => onPreviewImage(url)}
              title="Klik untuk melihat ukuran penuh"
              className="h-full w-full cursor-pointer focus:outline-none"
            >
              <Image
                src={url}
                alt={`Reference ${index + 1}`}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                unoptimized
              />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveImage(index);
              }}
              aria-label={`Hapus gambar referensi ${index + 1}`}
              title="Hapus gambar"
              className="absolute right-0.5 top-0.5 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-black/80 text-white shadow transition-all hover:bg-rose-600 hover:text-white"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          </div>
        ))}

        {isUploading && (
          <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border border-dashed border-cyan-500/50 bg-cyan-900/30 text-cyan-300">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="mt-0.5 text-[8.5px] font-mono">Upload</span>
          </div>
        )}

        {canAddMore && (
          <button
            type="button"
            onClick={onAddClick}
            title={`Tambah gambar referensi (${referenceImages.length}/${maxInputImages})`}
            className="flex h-12 w-12 shrink-0 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-cyan-500/40 bg-cyan-900/20 text-cyan-300 transition-all hover:border-cyan-400 hover:bg-cyan-900/40 hover:text-white active:scale-95"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span className="text-[9px] font-semibold">Tambah</span>
          </button>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span className="rounded-full border border-cyan-500/30 bg-cyan-950/60 px-2.5 py-0.5 font-mono text-[10.5px] font-semibold text-cyan-300">
          {referenceImages.length} / {maxInputImages} Ref
        </span>

        {referenceImages.length > 0 && !disabled && (
          <button
            type="button"
            onClick={onClearAll}
            title="Hapus semua gambar referensi"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/[0.08] hover:text-rose-400"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
