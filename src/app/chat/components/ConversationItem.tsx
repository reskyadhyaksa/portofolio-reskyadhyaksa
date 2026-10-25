"use client";
import { useState } from "react";
import { Check, Loader2, MessageSquare, Trash2, X } from "lucide-react";
import type { ConversationSummary } from "@/lib/chat-types";

interface ConversationItemProps {
  conversation: ConversationSummary;
  isActive: boolean;
  isDeleting: boolean;
  onSelect: (sessionId: string) => void;
  onDelete: (sessionId: string) => void;
}

const ICON_BUTTON_CLASS =
  "flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8]";

export default function ConversationItem({ conversation, isActive, isDeleting, onSelect, onDelete }: ConversationItemProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  return (
    <li
      className={`group flex items-center gap-1 rounded-full pr-1 transition-colors duration-150 ${
        isActive ? "bg-[#8ab4f8]/15 text-white" : "text-[#c4c7c5] hover:bg-white/[0.06]"
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(conversation.id)}
        aria-current={isActive ? "page" : undefined}
        title={conversation.title}
        className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-full py-1.5 pl-3 text-left text-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8]"
      >
        <MessageSquare aria-hidden="true" className="h-3 w-3 shrink-0 opacity-70" />
        <span className="truncate">{isConfirming ? "Delete permanently?" : conversation.title}</span>
      </button>

      {isDeleting ? (
        <Loader2 aria-label="Deleting chat" className="mx-1.5 h-3.5 w-3.5 animate-spin motion-reduce:animate-none" />
      ) : isConfirming ? (
        <>
          <button
            type="button"
            onClick={() => onDelete(conversation.id)}
            aria-label={`Confirm delete ${conversation.title}`}
            className={`${ICON_BUTTON_CLASS} text-[#f28b82] hover:bg-[#f28b82]/15`}
          >
            <Check aria-hidden="true" className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setIsConfirming(false)}
            aria-label="Cancel delete"
            className={`${ICON_BUTTON_CLASS} hover:bg-white/[0.1]`}
          >
            <X aria-hidden="true" className="h-3.5 w-3.5" />
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => setIsConfirming(true)}
          aria-label={`Delete ${conversation.title} permanently`}
          title="Delete permanently"
          className={`${ICON_BUTTON_CLASS} text-[#9aa0a6] opacity-100 hover:bg-white/[0.1] hover:text-[#f28b82] sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100`}
        >
          <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
        </button>
      )}
    </li>
  );
}
