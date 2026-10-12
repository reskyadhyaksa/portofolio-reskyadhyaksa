"use client";
import { useState, type KeyboardEvent } from "react";
import { MAX_MESSAGE_LENGTH } from "@/lib/chat-config";
import { useAutoResizeTextarea } from "../hooks/useAutoResizeTextarea";

const EDITOR_MAX_HEIGHT = 240;

interface UserMessageEditorProps {
  initialContent: string;
  onSubmit: (content: string) => void;
  onCancel: () => void;
}

export default function UserMessageEditor({ initialContent, onSubmit, onCancel }: UserMessageEditorProps) {
  const [value, setValue] = useState(initialContent);
  const textareaRef = useAutoResizeTextarea(value, EDITOR_MAX_HEIGHT);

  const trimmedValue = value.trim();
  const canSubmit = trimmedValue.length > 0 && trimmedValue !== initialContent.trim();

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onCancel();
      return;
    }
    if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;
    event.preventDefault();
    if (canSubmit) onSubmit(trimmedValue);
  };

  return (
    <div className="w-full max-w-[85%] rounded-2xl border border-white/[0.14] bg-[#1e1f20] p-2 sm:max-w-[75%]">
      <label htmlFor="edit-message" className="sr-only">
        Edit your message
      </label>
      <textarea
        id="edit-message"
        ref={textareaRef}
        autoFocus
        rows={1}
        value={value}
        maxLength={MAX_MESSAGE_LENGTH}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        className="custom-scrollbar block w-full resize-none bg-transparent px-2 py-1 text-[12.5px] leading-[1.6] text-[#e3e3e3] focus:outline-none"
      />
      <p className="px-2 pt-1 text-[10.5px] text-[#9aa0a6]">Messages after this one will be removed.</p>
      <div className="flex justify-end gap-1.5 pt-1.5">
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer rounded-full px-3 py-1 text-[12px] font-medium text-[#c4c7c5] transition-colors duration-200 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8]"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={!canSubmit}
          onClick={() => onSubmit(trimmedValue)}
          className="cursor-pointer rounded-full bg-[#e3e3e3] px-3 py-1 text-[12px] font-medium text-[#131314] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8] disabled:cursor-not-allowed disabled:bg-white/[0.06] disabled:text-[#5f6368]"
        >
          Save &amp; send
        </button>
      </div>
    </div>
  );
}
