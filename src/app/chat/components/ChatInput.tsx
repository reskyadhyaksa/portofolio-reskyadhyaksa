"use client";
import { useRef, type ChangeEvent, type ClipboardEvent, type FormEvent, type KeyboardEvent } from "react";
import { ArrowUp, Loader2, Paperclip } from "lucide-react";
import { ACCEPTED_FILE_INPUT, MAX_IMAGE_PROMPT_LENGTH, MAX_MESSAGE_LENGTH } from "@/lib/chat-config";
import type { PendingAttachment } from "../hooks/useAttachmentQueue";
import { useAutoResizeTextarea } from "../hooks/useAutoResizeTextarea";
import { extractClipboardImages } from "../services/clipboard-images";
import AttachmentChip from "./AttachmentChip";
import ImageModeToggle from "./ImageModeToggle";

const TEXTAREA_MAX_HEIGHT = 160;

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  attachments: PendingAttachment[];
  onAddFiles: (files: File[]) => void;
  onRemoveAttachment: (localId: string) => void;
  canAttach: boolean;
  canSubmit: boolean;
  isSending: boolean;
  isDisabled: boolean;
  isImageMode: boolean;
  onToggleImageMode: () => void;
}

export default function ChatInput({
  value,
  onChange,
  onSubmit,
  attachments,
  onAddFiles,
  onRemoveAttachment,
  canAttach,
  canSubmit,
  isSending,
  isDisabled,
  isImageMode,
  onToggleImageMode,
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
      className="rounded-[22px] border border-white/[0.06] bg-[#1e1f20]/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl transition-colors duration-200 focus-within:border-white/[0.14] focus-within:bg-[#1e1f20]"
    >
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
        className="custom-scrollbar block w-full resize-none bg-transparent px-3 pb-0.5 pt-2 text-[13px] leading-5 text-[#e3e3e3] placeholder:text-[#9aa0a6] focus:outline-none disabled:cursor-not-allowed"
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
          <ImageModeToggle isActive={isImageMode} onToggle={onToggleImageMode} disabled={isSending || isDisabled} />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          aria-label={isSending ? "Sending message" : "Send message"}
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1f20] ${
            canSubmit
              ? "cursor-pointer bg-[#e3e3e3] text-[#131314] hover:bg-white active:scale-95"
              : "cursor-not-allowed bg-white/[0.06] text-[#5f6368]"
          }`}
        >
          {isSending ? (
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin motion-reduce:animate-none" />
          ) : (
            <ArrowUp aria-hidden="true" className="h-4 w-4" />
          )}
        </button>
      </div>
    </form>
  );
}
