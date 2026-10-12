import Image from "next/image";
import { AlertCircle, FileText, Loader2, X } from "lucide-react";
import type { PendingAttachment } from "../hooks/useAttachmentQueue";

interface AttachmentChipProps {
  item: PendingAttachment;
  onRemove: (localId: string) => void;
}

function ChipThumbnail({ item }: { item: PendingAttachment }) {
  if (item.status === "uploading") {
    return <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin text-[#8ab4f8] motion-reduce:animate-none" />;
  }
  if (item.status === "error") return <AlertCircle aria-hidden="true" className="h-4 w-4 text-[#f28b82]" />;
  if (item.previewUrl) {
    return <Image src={item.previewUrl} alt="" width={40} height={40} unoptimized className="h-full w-full rounded-lg object-cover" />;
  }
  return <FileText aria-hidden="true" className="h-4 w-4 text-[#8ab4f8]" />;
}

export default function AttachmentChip({ item, onRemove }: AttachmentChipProps) {
  const isError = item.status === "error";

  return (
    <li
      className={`group relative flex max-w-56 items-center gap-2.5 rounded-2xl border py-1.5 pl-1.5 pr-9 animate-fade-in-soft ${
        isError ? "border-[#f28b82]/40 bg-[#f28b82]/[0.06]" : "border-white/[0.08] bg-[#28292a]"
      }`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/[0.04]">
        <ChipThumbnail item={item} />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-xs font-medium text-[#e3e3e3]">{item.name}</span>
        <span className={`truncate text-[11px] ${isError ? "text-[#f28b82]" : "text-[#9aa0a6]"}`}>
          {item.status === "uploading" ? "Uploading…" : isError ? item.error : "Ready"}
        </span>
      </span>
      <button
        type="button"
        onClick={() => onRemove(item.localId)}
        aria-label={`Remove ${item.name}`}
        className="absolute right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-[#9aa0a6] transition-colors duration-150 hover:bg-white/[0.1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8]"
      >
        <X aria-hidden="true" className="h-3.5 w-3.5" />
      </button>
    </li>
  );
}
