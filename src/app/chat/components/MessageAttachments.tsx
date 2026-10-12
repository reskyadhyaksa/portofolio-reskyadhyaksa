import Image from "next/image";
import { FileText } from "lucide-react";
import type { Attachment } from "@/lib/chat-types";

type AttachmentDisplaySize = "thumbnail" | "preview";

interface MessageAttachmentsProps {
  attachments: Attachment[];
  alignEnd: boolean;
  size?: AttachmentDisplaySize;
}

const IMAGE_DIMENSIONS: Record<AttachmentDisplaySize, { width: number; className: string }> = {
  thumbnail: { width: 128, className: "h-32 w-32 object-cover" },
  preview: { width: 384, className: "h-auto w-full max-w-sm object-contain" },
};

export default function MessageAttachments({ attachments, alignEnd, size = "thumbnail" }: MessageAttachmentsProps) {
  if (attachments.length === 0) return null;
  const imageDimensions = IMAGE_DIMENSIONS[size];

  return (
    <ul className={`mb-2 flex flex-wrap gap-2 ${alignEnd ? "justify-end" : "justify-start"}`}>
      {attachments.map((attachment) => (
        <li key={attachment.url} className={size === "preview" ? "w-full max-w-sm" : undefined}>
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${attachment.name}`}
            title="Open full size in new tab"
            className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8]"
          >
            {attachment.type === "image" ? (
              <Image
                src={attachment.url}
                alt={attachment.name}
                width={imageDimensions.width}
                height={imageDimensions.width}
                unoptimized
                className={`${imageDimensions.className} rounded-xl border border-white/[0.08] bg-[#1e1f20] transition-opacity duration-200 hover:opacity-90`}
              />
            ) : (
              <span className="flex max-w-56 items-center gap-2 rounded-xl border border-white/[0.08] bg-[#1e1f20] px-2.5 py-1.5 transition-colors duration-200 hover:bg-[#28292a]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#8ab4f8]/15">
                  <FileText aria-hidden="true" className="h-3.5 w-3.5 text-[#8ab4f8]" />
                </span>
                <span className="truncate text-[12px] text-[#e3e3e3]">{attachment.name}</span>
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
