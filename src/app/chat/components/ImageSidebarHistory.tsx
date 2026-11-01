"use client";
import { useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import type { GeneratedImage } from "@/lib/chat-types";
import ImagePreviewModal from "./ImagePreviewModal";

interface ImageSidebarHistoryProps {
  images: GeneratedImage[];
  onDeleteImage: (imageId: string) => void;
}

export default function ImageSidebarHistory({ images, onDeleteImage }: ImageSidebarHistoryProps) {
  const [activePreviewImage, setActivePreviewImage] = useState<GeneratedImage | null>(null);

  return (
    <>
      <ul className="flex flex-col gap-1">
        {images.map((image) => (
          <li
            key={image.id}
            className="group relative flex items-center gap-2 rounded-lg border border-transparent p-1.5 transition-all hover:border-white/[0.08] hover:bg-white/[0.04]"
          >
            <button
              type="button"
              onClick={() => setActivePreviewImage(image)}
              title="Click to preview image"
              className="relative h-11 w-11 shrink-0 cursor-pointer overflow-hidden rounded-md border border-white/[0.08] bg-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <Image
                src={image.url}
                alt={image.prompt}
                width={44}
                height={44}
                unoptimized
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
            </button>

            <button
              type="button"
              onClick={() => setActivePreviewImage(image)}
              title={image.prompt}
              className="flex min-w-0 flex-1 cursor-pointer flex-col text-left focus-visible:outline-none"
            >
              <p className="line-clamp-2 text-[11px] font-medium leading-tight text-slate-300 group-hover:text-white transition-colors">
                {image.prompt}
              </p>
              <span className="mt-0.5 font-mono text-[9px] text-slate-500">
                {new Date(image.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onDeleteImage(image.id)}
              aria-label={`Delete image: ${image.prompt}`}
              title="Delete image"
              className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-md text-slate-400 opacity-100 transition-colors hover:bg-white/[0.1] hover:text-rose-400 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </li>
        ))}
      </ul>

      {activePreviewImage && (
        <ImagePreviewModal
          image={activePreviewImage}
          onClose={() => setActivePreviewImage(null)}
        />
      )}
    </>
  );
}
