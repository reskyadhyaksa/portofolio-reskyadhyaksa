"use client";
import { useRef, type ChangeEvent, type ClipboardEvent, type FormEvent, type KeyboardEvent } from "react";
import { ImageIcon, Paperclip, Sparkles } from "lucide-react";
import { ACCEPTED_FILE_INPUT, MAX_IMAGE_PROMPT_LENGTH, MAX_MESSAGE_LENGTH, type ModelOption } from "@/lib/chat-config";
import { IMAGE_SIZE_OPTIONS, type ImageOptions } from "@/lib/image-options";
import type { PendingAttachment } from "../hooks/useAttachmentQueue";
import { useAutoResizeTextarea } from "../hooks/useAutoResizeTextarea";
import { extractClipboardImages } from "../services/clipboard-images";
import AttachmentChip from "./AttachmentChip";
import ComposerSubmitButton from "./ComposerSubmitButton";
import ModelSelector from "./ModelSelector";

const TEXTAREA_MAX_HEIGHT = 160;

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onStop: () => void;
  attachments: PendingAttachment[];
  onAddFiles: (files: File[]) => void;
  onRemoveAttachment: (localId: string) => void;
  canAttach: boolean;
  canSubmit: boolean;
  isSending: boolean;
  isDisabled: boolean;
  isImageMode: boolean;
  onToggleImageMode: () => void;
  imageOptions: ImageOptions;
  onImageOptionChange: <Key extends keyof ImageOptions>(key: Key, value: ImageOptions[Key]) => void;
  models?: readonly ModelOption[];
  selectedModel?: string;
  onSelectModel?: (modelId: string) => void;
}

export default function ChatInput({
  value,
  onChange,
  onSubmit,
  onStop,
  attachments,
  onAddFiles,
  onRemoveAttachment,
  canAttach,
  canSubmit,
  isSending,
  isDisabled,
  isImageMode,
  onToggleImageMode,
  imageOptions,
  onImageOptionChange,
  models,
  selectedModel,
  onSelectModel,
}: ChatInputProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useAutoResizeTextarea(value, TEXTAREA_MAX_HEIGHT);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;
    event.preventDefault();
    if (canSubmit) onSubmit();
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (canSubmit) onSubmit();
  };

  const handlePaste = (event: ClipboardEvent<HTMLTextAreaElement>) => {
    if (!canAttach || isImageMode) return;
    const images = extractClipboardImages(event.clipboardData);
    if (images.length === 0) return;
    event.preventDefault();
    onAddFiles(images);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    onAddFiles(Array.from(event.target.files ?? []));
    event.target.value = "";
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-[#1e1f20]/80 p-2 sm:p-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.65),0_1px_0_rgba(255,255,255,0.1)_inset] backdrop-blur-2xl transition-all duration-200 focus-within:border-white/[0.22] focus-within:bg-[#1e1f20]/90"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-2 px-1 text-xs">
        <div className="flex items-center gap-1 rounded-xl border border-white/[0.08] bg-white/[0.04] p-0.5 backdrop-blur-md">
          <button
            type="button"
            onClick={() => isImageMode && onToggleImageMode()}
            disabled={isSending || isDisabled}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              !isImageMode
                ? "bg-white/[0.14] text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="h-3 w-3 text-[#8ab4f8]" />
            <span>Chat</span>
          </button>
          <button
            type="button"
            onClick={() => !isImageMode && onToggleImageMode()}
            disabled={isSending || isDisabled}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              isImageMode
                ? "bg-white/[0.14] text-cyan-300 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ImageIcon className="h-3 w-3 text-cyan-400" />
            <span>Image</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {models && selectedModel && onSelectModel && (
            <ModelSelector
              models={models}
              selectedModel={selectedModel}
              onSelect={onSelectModel}
              isImageMode={isImageMode}
              disabled={isSending || isDisabled}
              className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-slate-200 hover:bg-white/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8] disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-md cursor-pointer"
            />
          )}

          {isImageMode && (
            <div className="flex items-center gap-1 rounded-xl border border-white/[0.08] bg-white/[0.04] p-0.5 backdrop-blur-md">
              {IMAGE_SIZE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isSending || isDisabled}
                  onClick={() => onImageOptionChange("size", opt.id)}
                  title={`${opt.orientationLabel} (${opt.ratioLabel})`}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold transition-all ${
                    imageOptions.size === opt.id
                      ? "bg-cyan-500/80 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {opt.ratioLabel}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {attachments.length > 0 && (
        <ul aria-label="Selected attachments" className="flex flex-wrap gap-2 px-2 pb-1 pt-2">
          {attachments.map((item) => (
            <AttachmentChip key={item.localId} item={item} onRemove={onRemoveAttachment} />
          ))}
        </ul>
      )}

      <label htmlFor="chat-prompt" className="sr-only">
        Message the assistant
      </label>
      <textarea
        id="chat-prompt"
        ref={textareaRef}
        rows={1}
        value={value}
        maxLength={isImageMode ? MAX_IMAGE_PROMPT_LENGTH : MAX_MESSAGE_LENGTH}
        disabled={isDisabled}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder={isImageMode ? "Describe the image to generate…" : "Ask anything…"}
        className="custom-scrollbar block w-full resize-none bg-transparent px-3 pb-0.5 pt-2 text-base leading-5 text-[#e3e3e3] sm:text-[13px] placeholder:text-[#9aa0a6] focus:outline-none disabled:cursor-not-allowed"
      />

      <div className="flex items-center justify-between gap-2 px-1 pt-1">
        <input ref={fileInputRef} type="file" multiple accept={ACCEPTED_FILE_INPUT} onChange={handleFileChange} className="hidden" tabIndex={-1} />
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={!canAttach || isDisabled || isImageMode}
            aria-label="Attach image or document"
            title="Attach image or document"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#c4c7c5] transition-colors duration-200 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Paperclip aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <ComposerSubmitButton canSubmit={canSubmit} isSending={isSending} onStop={onStop} />
      </div>
    </form>
  );
}
