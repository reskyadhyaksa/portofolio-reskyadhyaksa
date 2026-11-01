"use client";
import { useEffect, useState } from "react";
import { Check, Copy, Download, Film, X } from "lucide-react";
import type { GeneratedVideo } from "@/lib/chat-types";

interface VideoPreviewModalProps {
  video: GeneratedVideo;
  onClose: () => void;
}

export default function VideoPreviewModal({ video, onClose }: VideoPreviewModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(video.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-6 animate-fade-in-soft"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] max-w-[94vw] flex-col items-center justify-center focus:outline-none"
      >
        <div className="mb-2 flex w-full items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[11px] font-semibold text-slate-200 backdrop-blur-md">
            <Film className="h-3.5 w-3.5 text-purple-400" />
            <span>{video.aspectRatio}</span>
            <span className="text-slate-400">· {video.duration}s · {video.resolution}</span>
          </div>

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
          {video.url ? (
            <video
              src={video.url}
              controls
              autoPlay
              loop
              playsInline
              className="max-h-[68vh] max-w-[88vw] w-auto h-auto object-contain block select-none rounded-2xl"
            />
          ) : (
            <div className="flex h-64 w-96 flex-col items-center justify-center p-6 text-center text-slate-400">
              <Film className="h-10 w-10 text-purple-400 animate-pulse" />
              <p className="mt-2 text-xs font-semibold">Video is rendering ({video.status})...</p>
            </div>
          )}
        </div>

        <div className="mt-3 flex w-full max-w-2xl flex-col gap-2 rounded-2xl border border-white/[0.08] bg-[#1e1f20]/90 p-3 text-xs text-white shadow-2xl backdrop-blur-md">
          <div className="flex items-start justify-between gap-3">
            <p className="line-clamp-2 leading-relaxed text-[#e3e3e3] text-xs">
              {video.prompt}
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

          {video.url && (
            <div className="flex items-center justify-end gap-2 border-t border-white/[0.06] pt-2 text-[11px]">
              <a
                href={video.url}
                download={`video-${video.id}.mp4`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-white/[0.08] px-3 py-1.5 font-semibold text-white hover:bg-white/[0.16] transition-colors"
              >
                <Download className="h-3 w-3" />
                <span>Download Video</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
