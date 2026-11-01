"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  Download,
  Image as ImageIcon,
  Sparkles,
  Loader2,
  Copy,
  Check,
  Eye,
  Wand2,
  X,
  Upload,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { IMAGE_MODELS, type ImageModelId } from "@/lib/chat-config";
import type { GeneratedImage } from "@/lib/chat-types";
import type { ImageOptions, ImageSizeId } from "@/lib/image-options";
import { getImageModelConfig } from "@/lib/media-model-catalog";
import { uploadAttachment } from "../services/chat-api";
import { CHAT_COLUMN_CLASS, CHAT_GUTTER_CLASS } from "./chat-layout-tokens";
import ImagePreviewModal from "./ImagePreviewModal";
import ModelSelector from "./ModelSelector";
import ParameterPreviewModal from "./ParameterPreviewModal";

interface ImageStudioFlowProps {
  sessionId: string | null;
  images: GeneratedImage[];
  isGenerating: boolean;
  onGenerate: (
    prompt: string,
    model: ImageModelId,
    options: ImageOptions,
    referenceImageUrl?: string
  ) => Promise<void>;
}

const SIZE_MAP: Record<string, ImageSizeId> = {
  "1:1": "1024x1024",
  "16:9": "3840x2160",
  "9:16": "1024x1536",
  "4:3": "1536x1024",
  "3:4": "1024x1536",
  "3:2": "1536x1024",
  "2:3": "1024x1536",
  "21:9": "3840x2160",
  "9:21": "1024x1536",
  "2:1": "3840x2160",
  "1:2": "1024x1536",
  "4:5": "1024x1536",
  "5:4": "1536x1024",
  "1:4": "1024x1536",
  "4:1": "3840x2160",
  "1:8": "1024x1536",
  "8:1": "3840x2160",
  "auto": "1024x1024",
  "9:19.5": "1024x1536",
  "19.5:9": "3840x2160",
  "9:20": "1024x1536",
  "20:9": "3840x2160",
  "7:5": "1536x1024",
  "5:7": "1024x1536",
};

export default function ImageStudioFlow({
  sessionId,
  images,
  isGenerating,
  onGenerate,
}: ImageStudioFlowProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState<ImageModelId>(IMAGE_MODELS[0].id);
  const currentModelConfig = getImageModelConfig(selectedModel);

  const [aspectRatio, setAspectRatio] = useState(currentModelConfig.defaultAspectRatio);
  const [resolution, setResolution] = useState(currentModelConfig.defaultResolution ?? "");
  const [isEditMode, setIsEditMode] = useState(false);
  const [referenceImageUrl, setReferenceImageUrl] = useState<string | null>(null);
  const [isUploadingRef, setIsUploadingRef] = useState(false);
  const [activePreviewImage, setActivePreviewImage] = useState<GeneratedImage | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isParamsModalOpen, setIsParamsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isCanvasEmpty = images.length === 0 && !isGenerating;

  const effectiveAspectRatio = currentModelConfig.aspectRatios.includes(aspectRatio)
    ? aspectRatio
    : currentModelConfig.defaultAspectRatio;

  const effectiveResolution = currentModelConfig.resolutions && currentModelConfig.resolutions.length > 0
    ? (currentModelConfig.resolutions.includes(resolution)
        ? resolution
        : (currentModelConfig.defaultResolution ?? currentModelConfig.resolutions[0]))
    : "";

  const effectiveIsEditMode = !currentModelConfig.canEdit
    ? false
    : !currentModelConfig.canGenerate
      ? true
      : isEditMode;

  const effectiveReferenceImageUrl = effectiveIsEditMode ? referenceImageUrl : null;

  const handleCopyPrompt = async (e: React.MouseEvent, img: GeneratedImage) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(img.prompt);
    setCopiedId(img.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUseAsReference = (url: string) => {
    if (!currentModelConfig.canEdit) return;
    setReferenceImageUrl(url);
    setIsEditMode(true);
    if (!prompt) setPrompt("Enhance this image with high detail and cinematic lighting");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !sessionId) return;
    setIsUploadingRef(true);
    try {
      const uploaded = await uploadAttachment(sessionId, file);
      setReferenceImageUrl(uploaded.url);
    } catch {
    } finally {
      setIsUploadingRef(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    const options: ImageOptions = {
      aspectRatio: effectiveAspectRatio,
      size: SIZE_MAP[effectiveAspectRatio] ?? "1024x1024",
      quality: "high",
      outputFormat: "png",
      ...(effectiveResolution ? { resolution: effectiveResolution } : {}),
    };
    await onGenerate(prompt.trim(), selectedModel, options, effectiveReferenceImageUrl ?? undefined);
    setPrompt("");
  };

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[#131314]">
      <div
        className={`custom-scrollbar flex-1 overflow-y-auto py-4 ${
          isCanvasEmpty ? `${CHAT_COLUMN_CLASS} ${CHAT_GUTTER_CLASS}` : "px-4 sm:px-6 md:px-8"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <ImageIcon className="h-4 w-4" />
            </span>
            <h2 className="text-sm font-semibold tracking-wide text-white">Image Studio Flow</h2>
            <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-mono text-slate-400">
              {images.length} {images.length === 1 ? "image" : "images"}
            </span>
          </div>
        </div>

        {isCanvasEmpty ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/[0.08] bg-[#1e1f20]/30 p-8 text-center animate-fade-in-up">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 shadow-lg">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">Google Flow Image Canvas</h3>
            <p className="mt-1 max-w-md text-xs text-slate-400 leading-relaxed">
              Generate images from text or upload a reference image to edit and transform with state-of-the-art vision models.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {[
                "Cyberpunk neon street in rainy Tokyo 8k",
                "Minimalist 3D glass isometric logo design",
                "Cinematic portrait with soft studio lighting",
              ].map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => setPrompt(sample)}
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300 hover:border-cyan-500/40 hover:text-white transition-all active:scale-95"
                >
                  &ldquo;{sample}&rdquo;
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-48">
            {isGenerating && (
              <div className="relative aspect-square flex flex-col items-center justify-center rounded-2xl border border-cyan-500/40 bg-[#1e1f20] p-4 shadow-xl shadow-cyan-950/20 animate-pulse">
                <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
                <p className="mt-3 text-xs font-semibold text-cyan-200">Generating image...</p>
                <p className="mt-1 text-[11px] text-slate-400 text-center line-clamp-2">{prompt}</p>
              </div>
            )}
            {images.map((img) => (
              <div
                key={img.id}
                onClick={() => setActivePreviewImage(img)}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1e1f20] shadow-md hover:border-cyan-500/50 hover:shadow-cyan-950/30 transition-all cursor-pointer"
              >
                <Image
                  src={img.url}
                  alt={img.prompt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                  <div className="flex justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => handleCopyPrompt(e, img)}
                      title="Copy prompt"
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 text-slate-200 hover:text-white backdrop-blur-md transition-colors"
                    >
                      {copiedId === img.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePreviewImage(img);
                      }}
                      title="View full size"
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 text-slate-200 hover:text-white backdrop-blur-md transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <a
                      href={img.url}
                      download={`image-${img.id}.png`}
                      onClick={(e) => e.stopPropagation()}
                      title="Download image"
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 text-slate-200 hover:text-white backdrop-blur-md transition-colors"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-white font-medium line-clamp-2 leading-snug">{img.prompt}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400">
                        {new Date(img.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      {currentModelConfig.canEdit && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUseAsReference(img.url);
                          }}
                          className="inline-flex items-center gap-1 rounded-md bg-cyan-600/80 hover:bg-cyan-500 px-2 py-0.5 text-[10px] font-semibold text-white transition-colors"
                        >
                          <Wand2 className="h-2.5 w-2.5" />
                          <span>Edit</span>
                        </button>
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
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1 rounded-xl border border-white/[0.08] bg-white/[0.04] p-0.5 backdrop-blur-md">
              {currentModelConfig.canGenerate && (
                <button
                  type="button"
                  onClick={() => { setIsEditMode(false); setReferenceImageUrl(null); }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    !effectiveIsEditMode
                      ? "bg-white/[0.14] text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Sparkles className="h-3 w-3 text-cyan-400" />
                  <span>Text to Image</span>
                </button>
              )}
              {currentModelConfig.canEdit && (
                <button
                  type="button"
                  onClick={() => setIsEditMode(true)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    effectiveIsEditMode
                      ? "bg-white/[0.14] text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Wand2 className="h-3 w-3 text-cyan-400" />
                  <span>Edit Image</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <ModelSelector
                mode="image"
                models={IMAGE_MODELS}
                selectedModel={selectedModel}
                onSelect={(id) => setSelectedModel(id as ImageModelId)}
                disabled={isGenerating}
                className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-slate-200 hover:bg-white/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8] disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-md cursor-pointer shrink-0"
              />

              <button
                type="button"
                onClick={() => setIsParamsModalOpen(true)}
                title="Configure aspect ratio and resolution options"
                className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-slate-200 hover:bg-white/[0.08] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 backdrop-blur-md cursor-pointer shrink-0"
              >
                <SlidersHorizontal className="h-3 w-3 text-cyan-400" />
                <span className="font-mono text-[11px] text-cyan-300">{effectiveAspectRatio}</span>
                {effectiveResolution && (
                  <>
                    <span className="text-slate-500">·</span>
                    <span className="font-mono text-[11px] text-slate-300">{effectiveResolution}</span>
                  </>
                )}
                <span className="text-slate-400 text-[11px] font-normal">Options</span>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </button>
            </div>
          </div>

          {effectiveIsEditMode && currentModelConfig.canEdit && (
            <div className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/20 px-3 py-1.5">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {effectiveReferenceImageUrl ? (
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-cyan-500/50">
                  <Image src={effectiveReferenceImageUrl} alt="Reference" fill className="object-cover" unoptimized />
                  <button
                    type="button"
                    onClick={() => setReferenceImageUrl(null)}
                    className="absolute top-0 right-0 rounded-bl bg-black/80 p-0.5 text-white hover:text-rose-400"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingRef}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-cyan-500/50 bg-cyan-900/30 px-2.5 py-1 text-xs font-semibold text-cyan-200 hover:bg-cyan-900/50 transition-colors"
                >
                  {isUploadingRef ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                  <span>Upload Reference</span>
                </button>
              )}
              <span className="text-[11px] text-slate-300 truncate">
                {effectiveReferenceImageUrl
                  ? `Reference loaded (Max ${currentModelConfig.maxInputImages} image). Type edit instructions below.`
                  : `Upload reference image (Max ${currentModelConfig.maxInputImages} image).`}
              </span>
            </div>
          )}

          <div className="relative flex items-center rounded-xl sm:rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-inner transition-all focus-within:border-white/[0.2] focus-within:bg-white/[0.06]">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={effectiveIsEditMode ? "Describe how to edit the image (e.g. change background to sunset beach)..." : "Describe the image you want to generate in detail..."}
              disabled={isGenerating}
              className="w-full bg-transparent px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-[#9aa0a6] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!prompt.trim() || isGenerating}
              className="mr-1.5 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md hover:brightness-110 disabled:opacity-40 transition-all active:scale-95 shrink-0"
            >
              {isGenerating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
              <span>{effectiveIsEditMode ? "Edit" : "Generate"}</span>
            </button>
          </div>
        </form>
      </div>

      {activePreviewImage && (
        <ImagePreviewModal
          image={activePreviewImage}
          onClose={() => setActivePreviewImage(null)}
          onUseAsReference={handleUseAsReference}
        />
      )}

      {isParamsModalOpen && (
        <ParameterPreviewModal
          isOpen={isParamsModalOpen}
          onClose={() => setIsParamsModalOpen(false)}
          mode="image"
          modelName={currentModelConfig.label}
          availableAspectRatios={currentModelConfig.aspectRatios}
          selectedAspectRatio={effectiveAspectRatio}
          onSelectAspectRatio={setAspectRatio}
          availableResolutions={currentModelConfig.resolutions}
          selectedResolution={effectiveResolution}
          onSelectResolution={setResolution}
          maxInputImages={currentModelConfig.maxInputImages}
        />
      )}
    </div>
  );
}
