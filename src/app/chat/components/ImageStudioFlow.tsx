"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import {
  Download,
  Eye,
  Sparkles,
  Wand2,
  Image as ImageIcon,
  Upload,
  X,
  Loader2,
  Copy,
  Check,
} from "lucide-react";
import { IMAGE_MODELS, type ImageModelId } from "@/lib/chat-config";
import type { GeneratedImage } from "@/lib/chat-types";
import type { ImageOptions } from "@/lib/image-options";
import { uploadAttachment } from "../services/chat-api";

interface ImageStudioFlowProps {
  sessionId: string | null;
  images: GeneratedImage[];
  isGenerating: boolean;
  onGenerate: (prompt: string, model: ImageModelId, options: ImageOptions, referenceImageUrl?: string) => Promise<void>;
}

export default function ImageStudioFlow({
  sessionId,
  images,
  isGenerating,
  onGenerate,
}: ImageStudioFlowProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState<ImageModelId>(IMAGE_MODELS[0].id);
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [resolution, setResolution] = useState("1K");
  const [isEditMode, setIsEditMode] = useState(false);
  const [referenceImageUrl, setReferenceImageUrl] = useState<string | null>(null);
  const [isUploadingRef, setIsUploadingRef] = useState(false);
  const [activePreviewImage, setActivePreviewImage] = useState<GeneratedImage | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopyPrompt = async (img: GeneratedImage) => {
    await navigator.clipboard.writeText(img.prompt);
    setCopiedId(img.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUseAsReference = (url: string) => {
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
    const sizeMap: Record<string, "1024x1024" | "1536x1024" | "1024x1536" | "3840x2160"> = {
      "1:1": "1024x1024",
      "16:9": "3840x2160",
      "9:16": "1024x1536",
      "4:3": "1536x1024",
    };
    const options: ImageOptions = {
      aspectRatio,
      resolution,
      size: sizeMap[aspectRatio] ?? "1024x1024",
      quality: "high",
      outputFormat: "png",
    };
    await onGenerate(prompt.trim(), selectedModel, options, referenceImageUrl ?? undefined);
    setPrompt("");
  };

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[#030712]">
      <div className="custom-scrollbar flex-1 overflow-y-auto px-4 py-4 sm:px-6 md:px-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/20">
              <ImageIcon className="h-4 w-4" />
            </span>
            <h2 className="text-sm font-semibold tracking-wide text-white">Image Studio Flow</h2>
            <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-mono text-slate-400">
              {images.length} {images.length === 1 ? "image" : "images"}
            </span>
          </div>
        </div>

        {images.length === 0 && !isGenerating ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/[0.08] bg-white/[0.01] p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 shadow-lg">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">Google Flow Image Canvas</h3>
            <p className="mt-1 max-w-md text-xs text-slate-400">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-44">
            {isGenerating && (
              <div className="relative aspect-square flex flex-col items-center justify-center rounded-2xl border border-cyan-500/40 bg-[#071326] p-4 shadow-xl shadow-cyan-950/40 animate-pulse">
                <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
                <p className="mt-3 text-xs font-semibold text-cyan-200">Generating image...</p>
                <p className="mt-1 text-[11px] text-slate-400 text-center line-clamp-2">{prompt}</p>
              </div>
            )}
            {images.map((img) => (
              <div
                key={img.id}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-white/[0.08] bg-[#050c18] shadow-md hover:border-cyan-500/50 hover:shadow-cyan-950/30 transition-all"
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
                      onClick={() => handleCopyPrompt(img)}
                      title="Copy prompt"
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 text-slate-200 hover:text-white backdrop-blur-md transition-colors"
                    >
                      {copiedId === img.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePreviewImage(img)}
                      title="View full size"
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 text-slate-200 hover:text-white backdrop-blur-md transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <a
                      href={img.url}
                      download={`image-${img.id}.png`}
                      title="Download image"
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 text-slate-200 hover:text-white backdrop-blur-md transition-colors"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-white font-medium line-clamp-2 leading-snug">{img.prompt}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400">{new Date(img.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <button
                        type="button"
                        onClick={() => handleUseAsReference(img.url)}
                        className="inline-flex items-center gap-1 rounded-md bg-cyan-600/80 hover:bg-cyan-500 px-2 py-0.5 text-[10px] font-semibold text-white transition-colors"
                      >
                        <Wand2 className="h-2.5 w-2.5" />
                        <span>Edit</span>
                      </button>
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
            <div className="flex items-center gap-1.5 bg-white/[0.03] p-0.5 rounded-xl border border-white/[0.06]">
              <button
                type="button"
                onClick={() => { setIsEditMode(false); setReferenceImageUrl(null); }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
                  !isEditMode
                    ? "bg-cyan-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Sparkles className="h-3 w-3" />
                <span>Text to Image</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditMode(true)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
                  isEditMode
                    ? "bg-cyan-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Wand2 className="h-3 w-3" />
                <span>Edit Image</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value as ImageModelId)}
                className="rounded-xl border border-white/[0.08] bg-[#081224] px-2.5 py-1 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {IMAGE_MODELS.map((m) => (
                  <option key={m.id} value={m.id} className="bg-[#081224] text-white">
                    {m.label}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-1 bg-white/[0.03] p-0.5 rounded-xl border border-white/[0.06]">
                {["1:1", "16:9", "9:16", "4:3"].map((ratio) => (
                  <button
                    key={ratio}
                    type="button"
                    onClick={() => setAspectRatio(ratio)}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-mono font-medium transition-all ${
                      aspectRatio === ratio
                        ? "bg-white/[0.12] text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 bg-white/[0.03] p-0.5 rounded-xl border border-white/[0.06]">
                {["512", "1K", "2K"].map((res) => (
                  <button
                    key={res}
                    type="button"
                    onClick={() => setResolution(res)}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-mono font-medium transition-all ${
                      resolution === res
                        ? "bg-white/[0.12] text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {res}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {isEditMode && (
            <div className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/20 px-3 py-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {referenceImageUrl ? (
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-cyan-500/50">
                  <Image src={referenceImageUrl} alt="Reference" fill className="object-cover" unoptimized />
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
                  className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-cyan-500/50 bg-cyan-900/30 px-3 py-1.5 text-xs font-semibold text-cyan-200 hover:bg-cyan-900/50 transition-colors"
                >
                  {isUploadingRef ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                  <span>Upload Reference Image</span>
                </button>
              )}
              <span className="text-[11px] text-slate-300">
                {referenceImageUrl ? "Image loaded for editing. Type your modification instructions below." : "Pick or upload an image to edit."}
              </span>
            </div>
          )}

          <div className="relative flex items-center rounded-2xl border border-white/[0.12] bg-[#060e1d] shadow-2xl focus-within:border-cyan-500">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={isEditMode ? "Describe how to edit the image (e.g. change background to sunset beach)..." : "Describe the image you want to generate in detail..."}
              disabled={isGenerating}
              className="w-full bg-transparent px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!prompt.trim() || isGenerating}
              className="mr-2 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 text-xs font-bold text-white hover:brightness-110 disabled:opacity-40 transition-all active:scale-95 shrink-0"
            >
              {isGenerating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
              <span>{isEditMode ? "Edit" : "Generate"}</span>
            </button>
          </div>
        </form>
      </div>

      {activePreviewImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setActivePreviewImage(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-3xl border border-white/[0.1] bg-[#050c18] p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActivePreviewImage(null)}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="relative aspect-square max-h-[70vh] w-full min-w-[300px]">
              <Image
                src={activePreviewImage.url}
                alt={activePreviewImage.prompt}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="p-3">
              <p className="text-xs text-white">{activePreviewImage.prompt}</p>
              <div className="mt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleUseAsReference(activePreviewImage.url);
                    setActivePreviewImage(null);
                  }}
                  className="inline-flex items-center gap-1 rounded-xl bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-cyan-500"
                >
                  <Wand2 className="h-3 w-3" />
                  <span>Edit this Image</span>
                </button>
                <a
                  href={activePreviewImage.url}
                  download={`image-${activePreviewImage.id}.png`}
                  className="inline-flex items-center gap-1 rounded-xl bg-white/[0.1] px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/[0.2]"
                >
                  <Download className="h-3 w-3" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
