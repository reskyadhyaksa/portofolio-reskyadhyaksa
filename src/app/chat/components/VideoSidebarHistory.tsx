"use client";
import { useState } from "react";
import { AlertCircle, Film, Loader2, Play, Trash2 } from "lucide-react";
import type { GeneratedVideo } from "@/lib/chat-types";
import VideoPreviewModal from "./VideoPreviewModal";

interface VideoSidebarHistoryProps {
  videos: GeneratedVideo[];
  onDeleteVideo: (videoId: string) => void;
}

export default function VideoSidebarHistory({ videos, onDeleteVideo }: VideoSidebarHistoryProps) {
  const [activePreviewVideo, setActivePreviewVideo] = useState<GeneratedVideo | null>(null);

  return (
    <>
      <ul className="flex flex-col gap-1">
        {videos.map((vid) => (
          <li
            key={vid.id}
            className="group relative flex items-center gap-2 rounded-lg border border-transparent p-1.5 transition-all hover:border-white/[0.08] hover:bg-white/[0.04]"
          >
            <button
              type="button"
              onClick={() => setActivePreviewVideo(vid)}
              title="Click to preview video"
              className="relative flex h-11 w-14 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-white/[0.08] bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              {vid.status === "completed" && vid.url ? (
                <>
                  <video src={vid.url} muted playsInline className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <Play className="h-3 w-3 text-white fill-white" />
                  </div>
                </>
              ) : vid.status === "failed" ? (
                <AlertCircle className="h-4 w-4 text-rose-400" />
              ) : (
                <Loader2 className="h-4 w-4 text-purple-400 animate-spin" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActivePreviewVideo(vid)}
              title={vid.prompt}
              className="flex min-w-0 flex-1 cursor-pointer flex-col text-left focus-visible:outline-none"
            >
              <p className="line-clamp-2 text-[11px] font-medium leading-tight text-slate-300 group-hover:text-white transition-colors">
                {vid.prompt}
              </p>
              <div className="mt-0.5 flex items-center gap-1.5 font-mono text-[9px] text-slate-500">
                <span className="text-purple-300">{vid.duration}s</span>
                <span>·</span>
                <span>{vid.resolution}</span>
                <span>·</span>
                <span>{new Date(vid.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onDeleteVideo(vid.id)}
              aria-label={`Delete video: ${vid.prompt}`}
              title="Delete video"
              className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-md text-slate-400 opacity-100 transition-colors hover:bg-white/[0.1] hover:text-rose-400 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </li>
        ))}
      </ul>

      {activePreviewVideo && (
        <VideoPreviewModal
          video={activePreviewVideo}
          onClose={() => setActivePreviewVideo(null)}
        />
      )}
    </>
  );
}
