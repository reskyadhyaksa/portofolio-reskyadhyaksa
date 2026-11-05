"use client";
import { useRef, useState } from "react";
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
  SlidersHorizontal,
  ChevronDown,
  ImagePlus,
} from "lucide-react";
import { VIDEO_MODELS, isSupportedVideoModel, type VideoModelId } from "@/lib/chat-config";
import type { GeneratedVideo } from "@/lib/chat-types";
import { isImageFile } from "@/lib/file-validation";
import { getVideoModelConfig } from "@/lib/media-model-catalog";
import { uploadAttachment, type RequestVideoParams } from "../services/chat-api";
import { useAutoResizeTextarea } from "../hooks/useAutoResizeTextarea";
import { useFileDropZone } from "../hooks/useFileDropZone";
import { CHAT_COLUMN_CLASS, CHAT_GUTTER_CLASS } from "./chat-layout-tokens";
import ChatErrorBanner from "./ChatErrorBanner";
import ImagePreviewModal from "./ImagePreviewModal";
import ImageReferenceTray from "./ImageReferenceTray";
import ImageStudioDropOverlay from "./ImageStudioDropOverlay";
import ModelSelector from "./ModelSelector";
import ParameterPreviewModal from "./ParameterPreviewModal";

interface VideoStudioFlowProps {
  sessionId: string | null;
  videos: GeneratedVideo[];
  isGenerating: boolean;
  onGenerate: (params: RequestVideoParams) => Promise<void>;
  selectedModel?: string | null;
  onSelectModel?: (modelId: string) => void;
}

export default function VideoStudioFlow({
  sessionId,
  videos,
  isGenerating,
  onGenerate,
  selectedModel: externalModel,
  onSelectModel,
}: VideoStudioFlowProps) {
  const [prompt, setPrompt] = useState("");
  const [internalModel, setInternalModel] = useState<VideoModelId>(() => {
    if (externalModel && isSupportedVideoModel(externalModel)) {
      return externalModel;
    }
    return VIDEO_MODELS[0].id;
  });

  const selectedModel = (externalModel && isSupportedVideoModel(externalModel) ? externalModel : internalModel) as VideoModelId;
  const currentModelConfig = getVideoModelConfig(selectedModel);
  const maxInputImages = currentModelConfig.maxInputImages ?? 0;

  const [duration, setDuration] = useState(currentModelConfig.defaultDuration);
  const [resolution, setResolution] = useState(currentModelConfig.defaultResolution);
  const [aspectRatio, setAspectRatio] = useState(currentModelConfig.defaultAspectRatio);
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [isUploadingRef, setIsUploadingRef] = useState(false);
  const [activePreviewUrl, setActivePreviewUrl] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isParamsModalOpen, setIsParamsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useAutoResizeTextarea(prompt, 140);

  const isCanvasEmpty = videos.length === 0 && !isGenerating;

  const handleSelectModel = (id: string) => {
    const nextConfig = getVideoModelConfig(id);
    const limit = nextConfig.maxInputImages ?? 0;
    if (limit === 0) {
      setReferenceImages([]);
    } else if (referenceImages.length > limit) {
      setReferenceImages((prev) => prev.slice(0, limit));
    }
    setInternalModel(id as VideoModelId);
    onSelectModel?.(id);
  };

  const effectiveDuration = currentModelConfig.durations.includes(duration)
    ? duration
    : currentModelConfig.defaultDuration;

  const effectiveResolution = currentModelConfig.resolutions.includes(resolution)
    ? resolution
    : currentModelConfig.defaultResolution;

  const effectiveAspectRatio = currentModelConfig.aspectRatios.includes(aspectRatio)
    ? aspectRatio
    : currentModelConfig.defaultAspectRatio;

  const handleCopyPrompt = async (vid: GeneratedVideo) => {
    await navigator.clipboard.writeText(vid.prompt);
    setCopiedId(vid.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUseAsReference = (url: string) => {
    if (maxInputImages <= 0) return;
    if (!referenceImages.includes(url)) {
      if (referenceImages.length >= maxInputImages) {
        setReferenceImages((prev) => [...prev.slice(1), url]);
      } else {
        setReferenceImages((prev) => [...prev, url]);
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0 || !sessionId || maxInputImages <= 0) return;
    const imageFiles = files.filter(isImageFile);
    if (imageFiles.length === 0) {
      setError("Hanya file gambar yang didukung sebagai referensi (PNG, JPG, WEBP, dll).");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    const remainingSlots = Math.max(0, maxInputImages - referenceImages.length);
    if (remainingSlots <= 0) {
      setError(`Model ${currentModelConfig.label} hanya mendukung maksimal ${maxInputImages} gambar referensi.`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    const filesToUpload = imageFiles.slice(0, remainingSlots);

    setIsUploadingRef(true);
    setError(null);
    try {
      const uploadPromises = filesToUpload.map((file) => uploadAttachment(sessionId, file));
      const uploadedAttachments = await Promise.all(uploadPromises);
      const newUrls = uploadedAttachments.map((a) => a.url);
      setReferenceImages((prev) => [...prev, ...newUrls].slice(0, maxInputImages));
    } catch (uploadErr) {
      setError(uploadErr instanceof Error ? uploadErr.message : "Gagal mengunggah gambar referensi.");
    } finally {
      setIsUploadingRef(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDropFiles = async (files: File[]) => {
    if (!sessionId || maxInputImages <= 0) return;
    const imageFiles = files.filter(isImageFile);
    if (imageFiles.length === 0) {
      setError("Hanya file gambar yang didukung sebagai referensi (PNG, JPG, WEBP, dll).");
      return;
    }
    const remainingSlots = Math.max(0, maxInputImages - referenceImages.length);
    if (remainingSlots <= 0) {
      setError(`Model ${currentModelConfig.label} hanya mendukung maksimal ${maxInputImages} gambar referensi.`);
      return;
    }
    const filesToUpload = imageFiles.slice(0, remainingSlots);

    setIsUploadingRef(true);
    setError(null);
    try {
      const uploadPromises = filesToUpload.map((file) => uploadAttachment(sessionId, file));
      const uploadedAttachments = await Promise.all(uploadPromises);
      const newUrls = uploadedAttachments.map((a) => a.url);
      setReferenceImages((prev) => [...prev, ...newUrls].slice(0, maxInputImages));
    } catch (uploadErr) {
      setError(uploadErr instanceof Error ? uploadErr.message : "Gagal mengunggah gambar referensi.");
    } finally {
      setIsUploadingRef(false);
    }
  };

  const handleDropUrl = (url: string) => {
    if (maxInputImages <= 0) return;
    handleUseAsReference(url);
  };

  const { isDragging, dropHandlers } = useFileDropZone({
    isEnabled: Boolean(sessionId) && maxInputImages > 0,
    onDropFiles: handleDropFiles,
    onDropUrl: handleDropUrl,
  });

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    setError(null);
    const promptToSend = prompt.trim();
    const refsToSend = [...referenceImages];
    setPrompt("");
    setReferenceImages([]);
    try {
      await onGenerate({
        prompt: promptToSend,
        model: selectedModel,
        duration: effectiveDuration,
        resolution: effectiveResolution,
        aspectRatio: effectiveAspectRatio,
        referenceImageUrls: refsToSend.length > 0 ? refsToSend : undefined,
      });
    } catch (genErr) {
      setPrompt(promptToSend);
      setReferenceImages(refsToSend);
      setError(genErr instanceof Error ? genErr.message : "Gagal membuat video.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.shiftKey || e.nativeEvent.isComposing) return;
      e.preventDefault();
      if (prompt.trim() && !isGenerating) {
        handleSubmit();
      }
    }
  };

  return (
    <div
      {...dropHandlers}
      className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[#131314]"
    >
      <ImageStudioDropOverlay
        isVisible={isDragging}
        maxInputImages={maxInputImages}
        currentCount={referenceImages.length}
        modelLabel={currentModelConfig.label}
      />

      <div
        className={`custom-scrollbar flex-1 overflow-y-auto py-4 ${
          isCanvasEmpty ? `${CHAT_COLUMN_CLASS} ${CHAT_GUTTER_CLASS}` : "px-4 sm:px-6 md:px-8"
        }`}
      >
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

        {isCanvasEmpty ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/[0.08] bg-[#1e1f20]/30 p-8 text-center animate-fade-in-up">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-950/40 text-purple-400 shadow-lg">
              <VideoIcon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">Google Flow Video Canvas</h3>
            <p className="mt-1 max-w-md text-xs text-slate-400 leading-relaxed">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-48">
            {isGenerating && (
              <div className="relative aspect-video flex flex-col items-center justify-center rounded-2xl border border-purple-500/40 bg-[#1e1f20] p-4 shadow-xl shadow-purple-950/20 animate-pulse">
                <Loader2 className="h-8 w-8 text-purple-400 animate-spin" />
                <p className="mt-3 text-xs font-semibold text-purple-200">Starting video generation job...</p>
                <p className="mt-1 text-[11px] text-slate-400 text-center line-clamp-2">{prompt}</p>
              </div>
            )}
            {videos.map((vid) => (
              <div
                key={vid.id}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1e1f20] shadow-md hover:border-purple-500/50 hover:shadow-purple-950/30 transition-all flex flex-col"
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
                      {new Date(vid.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleCopyPrompt(vid)}
                        title="Copy prompt"
                        className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 hover:text-white hover:bg-white/[0.08]"
                      >
                        {copiedId === vid.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      </button>
                      {vid.status === "completed" && vid.url && (
                        <a
                          href={vid.url}
                          download={`video-${vid.id}.mp4`}
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

      <div className="pointer-events-none absolute bottom-3 sm:bottom-4 md:bottom-5 inset-x-0 z-20 flex justify-center px-3 sm:px-4">
        <form
          onSubmit={handleSubmit}
          className="pointer-events-auto w-full max-w-4xl space-y-2 rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-[#1e1f20]/80 p-2 sm:p-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.65),0_1px_0_rgba(255,255,255,0.1)_inset] backdrop-blur-2xl transition-all"
        >
          {error && <ChatErrorBanner message={error} onDismiss={() => setError(null)} />}

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-semibold text-purple-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Text to Video</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <ModelSelector
                mode="video"
                models={VIDEO_MODELS}
                selectedModel={selectedModel}
                onSelect={handleSelectModel}
                disabled={isGenerating}
                className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-slate-200 hover:bg-white/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-md cursor-pointer shrink-0"
              />

              <button
                type="button"
                onClick={() => setIsParamsModalOpen(true)}
                title="Configure duration, resolution, and aspect ratio options"
                className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-slate-200 hover:bg-white/[0.08] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 backdrop-blur-md cursor-pointer shrink-0"
              >
                <SlidersHorizontal className="h-3 w-3 text-purple-400" />
                <span className="font-mono text-[11px] text-purple-300">{effectiveAspectRatio}</span>
                <span className="text-slate-500">·</span>
                <span className="font-mono text-[11px] text-slate-300">{effectiveResolution}</span>
                <span className="text-slate-500">·</span>
                <span className="font-mono text-[11px] text-slate-300">{effectiveDuration}s</span>
                <span className="text-slate-400 text-[11px] font-normal">Options</span>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </button>

              {maxInputImages > 0 && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple={maxInputImages > 1}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingRef || referenceImages.length >= maxInputImages}
                    title={`Tambahkan gambar referensi (${referenceImages.length}/${maxInputImages})`}
                    className="flex items-center gap-1.5 rounded-xl border border-purple-500/25 bg-purple-500/10 px-2.5 py-1 text-xs font-semibold text-purple-300 hover:bg-purple-500/20 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 disabled:opacity-40 disabled:cursor-not-allowed backdrop-blur-md cursor-pointer shrink-0"
                  >
                    {isUploadingRef ? (
                      <Loader2 className="h-3 w-3 animate-spin text-purple-400" />
                    ) : (
                      <ImagePlus className="h-3 w-3 text-purple-400" />
                    )}
                    <span>Reference</span>
                    <span className="font-mono text-[10px] text-purple-400">
                      ({referenceImages.length}/{maxInputImages})
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>

          <ImageReferenceTray
            referenceImages={referenceImages}
            maxInputImages={maxInputImages}
            isUploading={isUploadingRef}
            onRemoveImage={(idx) => setReferenceImages((prev) => prev.filter((_, i) => i !== idx))}
            onClearAll={() => setReferenceImages([])}
            onAddClick={() => fileInputRef.current?.click()}
            onPreviewImage={(url) => setActivePreviewUrl(url)}
            disabled={isGenerating}
          />

          <div className="relative flex items-end rounded-xl sm:rounded-2xl border border-white/[0.08] bg-white/[0.03] p-1 shadow-inner transition-all focus-within:border-white/[0.2] focus-within:bg-white/[0.06]">
            <textarea
              ref={textareaRef}
              rows={1}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe the video you want to generate (e.g. drone camera orbiting a mountain castle)..."
              className="custom-scrollbar block w-full resize-none bg-transparent px-3 py-2 text-base sm:text-sm text-white placeholder-[#9aa0a6] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!prompt.trim() || isGenerating}
              className="mb-1 mr-1 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md hover:brightness-110 disabled:opacity-40 transition-all active:scale-95 shrink-0"
            >
              {isGenerating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
              <span>Generate Video</span>
            </button>
          </div>
        </form>
      </div>

      {isParamsModalOpen && (
        <ParameterPreviewModal
          isOpen={isParamsModalOpen}
          onClose={() => setIsParamsModalOpen(false)}
          mode="video"
          modelName={currentModelConfig.label}
          availableAspectRatios={currentModelConfig.aspectRatios}
          selectedAspectRatio={effectiveAspectRatio}
          onSelectAspectRatio={setAspectRatio}
          availableResolutions={currentModelConfig.resolutions}
          selectedResolution={effectiveResolution}
          onSelectResolution={setResolution}
          availableDurations={currentModelConfig.durations}
          selectedDuration={effectiveDuration}
          onSelectDuration={setDuration}
        />
      )}

      {activePreviewUrl && (
        <ImagePreviewModal
          image={{ url: activePreviewUrl, prompt: "Reference Image" }}
          onClose={() => setActivePreviewUrl(null)}
          onUseAsReference={handleUseAsReference}
          sessionId={sessionId}
        />
      )}
    </div>
  );
}
