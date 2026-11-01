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
  "flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8]";

export default function ConversationItem({
  conversation,
  isActive,
  isDeleting,
  onSelect,
  onDelete,
}: ConversationItemProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  return (
    <li
      className={`group relative flex items-center justify-between rounded-lg border px-2 py-1 transition-all ${
        isActive
          ? "border-[#8ab4f8]/35 bg-[#8ab4f8]/[0.12] text-white shadow-sm shadow-[#8ab4f8]/10"
          : "border-transparent text-slate-300 hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-white"
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(conversation.id)}
        aria-current={isActive ? "page" : undefined}
        title={conversation.title}
        className="flex min-w-0 flex-1 cursor-pointer items-center gap-1.5 text-left text-[11px] leading-tight rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8]"
      >
        <MessageSquare
          aria-hidden="true"
          className={`h-3 w-3 shrink-0 ${isActive ? "text-[#8ab4f8]" : "text-slate-500 group-hover:text-slate-400"}`}
        />
        <span className="min-w-0 flex-1 truncate font-medium">
          {isConfirming ? "Delete permanently?" : conversation.title}
        </span>
      </button>

      <div className="flex shrink-0 items-center gap-1 pl-1">
        {isDeleting ? (
          <Loader2 aria-label="Deleting chat" className="h-3 w-3 animate-spin text-slate-400" />
        ) : isConfirming ? (
          <>
            <button
              type="button"
              onClick={() => onDelete(conversation.id)}
              aria-label={`Confirm delete ${conversation.title}`}
              title="Confirm delete"
              className={`${ICON_BUTTON_CLASS} text-rose-400 hover:bg-rose-500/20`}
            >
              <Check aria-hidden="true" className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => setIsConfirming(false)}
              aria-label="Cancel delete"
              title="Cancel"
              className={`${ICON_BUTTON_CLASS} text-slate-400 hover:bg-white/[0.1] hover:text-white`}
            >
              <X aria-hidden="true" className="h-3 w-3" />
            </button>
          </>
        ) : (
          <>
            {conversation.messageCount > 0 && (
              <span className="font-mono text-[9px] text-slate-500 group-hover:hidden">
                {conversation.messageCount}
              </span>
            )}
            <button
              type="button"
              onClick={() => setIsConfirming(true)}
              aria-label={`Delete ${conversation.title} permanently`}
              title="Delete permanently"
              className={`${ICON_BUTTON_CLASS} text-slate-400 opacity-100 hover:bg-white/[0.1] hover:text-rose-400 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100`}
            >
              <Trash2 aria-hidden="true" className="h-3 w-3" />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
