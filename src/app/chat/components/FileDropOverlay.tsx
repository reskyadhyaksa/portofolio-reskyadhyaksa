import { ImagePlus } from "lucide-react";
import { MAX_ATTACHMENTS_PER_MESSAGE } from "@/lib/chat-config";

interface FileDropOverlayProps {
  isVisible: boolean;
}

const SUPPORTED_FORMATS = "Images · PDF · DOCX · TXT · MD · CSV · JSON · Source code";

export default function FileDropOverlay({ isVisible }: FileDropOverlayProps) {
  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-[#131314]/90 p-4"
    >
      <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-[#8ab4f8]/60 bg-[#1e1f20] px-6 py-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8ab4f8]/15 text-[#8ab4f8]">
          <ImagePlus aria-hidden="true" className="h-6 w-6" />
        </span>
        <p className="text-sm font-medium text-[#e3e3e3]">Drop files to attach</p>
        <p className="text-xs text-[#9aa0a6]">
          Up to {MAX_ATTACHMENTS_PER_MESSAGE} files. Processed in your browser before upload.
        </p>
        <p className="text-[11px] text-[#9aa0a6]/80">{SUPPORTED_FORMATS}</p>
      </div>
    </div>
  );
}
