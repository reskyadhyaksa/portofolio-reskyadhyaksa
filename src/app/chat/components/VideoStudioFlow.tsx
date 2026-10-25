"use client";
import { useState } from "react";
import {
  Download,
  Video as VideoIcon,
  Play,
  Film,
  Sparkles,
  Loader2,
  Copy,
  Check,
  AlertCircle,
} from "lucide-react";
import { VIDEO_MODELS, type VideoModelId } from "@/lib/chat-config";
import type { GeneratedVideo } from "@/lib/chat-types";
import type { RequestVideoParams } from "../services/chat-api";

interface VideoStudioFlowProps {
  sessionId: string | null;
  videos: GeneratedVideo[];
  isGenerating: boolean;
  onGenerate: (params: RequestVideoParams) => Promise<void>;
}

export default function VideoStudioFlow({
  videos,
  isGenerating,
  onGenerate,
}: VideoStudioFlowProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState<VideoModelId>(VIDEO_MODELS[0].id);
  const [duration, setDuration] = useState(5);
  const [resolution, setResolution] = useState("720p");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyPrompt = async (vid: GeneratedVideo) => {
    await navigator.clipboard.writeText(vid.prompt);
    setCopiedId(vid.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    await onGenerate({
      prompt: prompt.trim(),
      model: selectedModel,
      duration,
      resolution,
      aspectRatio,
    });
    setPrompt("");
  };

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[#030712]">
      <div className="custom-scrollbar flex-1 overflow-y-auto px-4 py-4 sm:px-6 md:px-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Film className="h-4 w-4" />
            </span>
            <h2 className="text-sm font-semibold tracking-wide text-white">Video Studio Flow</h2>
            <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-mono text-slate-400">
              {videos.length} {videos.length === 1 ? "video" : "videos"}
            </span>
          </div>
        </div>

        {videos.length === 0 && !isGenerating ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/[0.08] bg-white/[0.01] p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-950/40 text-purple-400 shadow-lg">
              <VideoIcon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">Google Flow Video Canvas</h3>
            <p className="mt-1 max-w-md text-xs text-slate-400">
              Create cinematic videos with Google Veo 3.1, Seedance, Wan, and Kling. Set camera motion, duration, and aspect ratio.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {[
                "Cinematic drone shot over misty Norwegian fjords at sunrise",
                "Slow motion macro water droplet hitting a neon leaf",
                "Futuristic cybernetic city with flying transit in 4k",
              ].map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => setPrompt(sample)}
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300 hover:border-purple-500/40 hover:text-white transition-all active:scale-95"
                >
                  &ldquo;{sample}&rdquo;
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-44">
            {isGenerating && (
              <div className="relative aspect-video flex flex-col items-center justify-center rounded-2xl border border-purple-500/40 bg-[#0c091d] p-4 shadow-xl shadow-purple-950/40 animate-pulse">
                <Loader2 className="h-8 w-8 text-purple-400 animate-spin" />
                <p className="mt-3 text-xs font-semibold text-purple-200">Starting video generation job...</p>
                <p className="mt-1 text-[11px] text-slate-400 text-center line-clamp-2">{prompt}</p>
              </div>
            )}
            {videos.map((vid) => (
              <div
                key={vid.id}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070b16] shadow-md hover:border-purple-500/50 hover:shadow-purple-950/30 transition-all flex flex-col"
              >
                <div className="relative aspect-video w-full bg-black/60 overflow-hidden flex items-center justify-center">
                  {vid.status === "completed" && vid.url ? (
                    <video
                      src={vid.url}
                      controls
                      loop
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  ) : vid.status === "failed" ? (
                    <div className="flex flex-col items-center gap-1.5 p-4 text-center">
                      <AlertCircle className="h-8 w-8 text-rose-400" />
                      <p className="text-xs font-semibold text-rose-300">Generation Failed</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 p-4 text-center">
                      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 animate-pulse">
                        <Play className="h-4 w-4" />
                      </div>
                      <p className="text-xs font-semibold text-purple-200">Rendering Video...</p>
                      <span className="rounded-full bg-purple-950/80 px-2 py-0.5 text-[10px] font-mono text-purple-300 border border-purple-500/30">
                        Status: {vid.status}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-3.5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between gap-1 pb-1.5">
                      <span className="rounded-md bg-purple-950/60 px-2 py-0.5 text-[10px] font-mono font-bold text-purple-300 border border-purple-500/30">
                        {vid.model.split("/")[1] ?? vid.model}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                        <span>{vid.duration}s</span>
                        <span>·</span>
                        <span>{vid.resolution}</span>
                        <span>·</span>
                        <span>{vid.aspectRatio}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-200 leading-snug line-clamp-2 mt-1">{vid.prompt}</p>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2">
                    <span className="text-[10px] font-mono text-slate-500">
                      {new Date(vid.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleCopyPrompt(vid)}
                        title="Copy prompt"
                        className="flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.04] text-slate-300 hover:text-white"
                      >
                        {copiedId === vid.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      </button>
                      {vid.status === "completed" && vid.url && (
                        <a
                          href={vid.url}
                          download={`video-${vid.id}.mp4`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Download video"
                          className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-600/80 text-white hover:bg-purple-500"
                        >
                          <Download className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 inset-x-0 p-3 sm:p-5 bg-gradient-to-t from-[#02050b] via-[#02050b]/95 to-transparent backdrop-blur-xl border-t border-white/[0.08]">
        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-400">Model:</span>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value as VideoModelId)}
                className="rounded-xl border border-white/[0.08] bg-[#081224] px-2.5 py-1 text-xs font-semibold text-slate-200 focus:outline-none focus:border-purple-500"
              >
                {VIDEO_MODELS.map((m) => (
                  <option key={m.id} value={m.id} className="bg-[#081224] text-white">
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 bg-white/[0.03] p-0.5 rounded-xl border border-white/[0.06]">
                {[4, 5, 8].map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setDuration(sec)}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-mono font-medium transition-all ${
                      duration === sec
                        ? "bg-purple-600 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {sec}s
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 bg-white/[0.03] p-0.5 rounded-xl border border-white/[0.06]">
                {["720p", "1080p"].map((res) => (
                  <button
                    key={res}
                    type="button"
                    onClick={() => setResolution(res)}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-mono font-medium transition-all ${
                      resolution === res
                        ? "bg-purple-600 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {res}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 bg-white/[0.03] p-0.5 rounded-xl border border-white/[0.06]">
                {["16:9", "9:16", "1:1"].map((ratio) => (
                  <button
                    key={ratio}
                    type="button"
                    onClick={() => setAspectRatio(ratio)}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-mono font-medium transition-all ${
                      aspectRatio === ratio
                        ? "bg-purple-600 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex items-center rounded-2xl border border-white/[0.12] bg-[#060e1d] shadow-2xl focus-within:border-purple-500">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your video scene, camera motion, and action (e.g. drone shot over waves)..."
              disabled={isGenerating}
              className="w-full bg-transparent px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!prompt.trim() || isGenerating}
              className="mr-2 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white hover:brightness-110 disabled:opacity-40 transition-all active:scale-95 shrink-0"
            >
              {isGenerating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
              <span>Generate Video</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
