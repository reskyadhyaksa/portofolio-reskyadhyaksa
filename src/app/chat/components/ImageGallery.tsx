"use client";
import { useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import type { GeneratedImage } from "@/lib/chat-types";
import ImagePreviewModal from "./ImagePreviewModal";

interface ImageGalleryProps {
  images: GeneratedImage[];
  onDelete: (imageId: string) => void;
}

export default function ImageGallery({ images, onDelete }: ImageGalleryProps) {
  const [activePreviewImage, setActivePreviewImage] = useState<GeneratedImage | null>(null);

  return (
    <>
      <div className="flex flex-col gap-2">
        {images.length === 0 ? (
          <p className="px-2.5 text-[11px] text-[#9aa0a6]">No generated images yet. Toggle Image mode in chat.</p>
        ) : (
          <ul className="grid grid-cols-3 gap-1.5">
            {images.map((image) => (
              <li key={image.id} className="group relative">
                <button
                  type="button"
                  onClick={() => setActivePreviewImage(image)}
                  title={image.prompt}
                  className="block w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8] rounded-lg"
                >
                  <Image
                    src={image.url}
                    alt={image.prompt}
                    width={80}
                    height={80}
                    unoptimized
                    className="aspect-square w-full rounded-lg border border-white/[0.08] object-cover hover:border-cyan-500/40 transition-colors"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(image.id)}
                  aria-label={`Delete image: ${image.prompt}`}
                  className="absolute right-1 top-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-black/70 text-white opacity-100 transition-opacity duration-150 hover:text-[#f28b82] sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
                >
                  <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {activePreviewImage && (
        <ImagePreviewModal
          image={activePreviewImage}
          onClose={() => setActivePreviewImage(null)}
        />
      )}
    </>
  );
}
