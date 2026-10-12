"use client";
import type { ReactNode } from "react";
import { SquarePen, X } from "lucide-react";
import { MESSAGE_TTL_HOURS } from "@/lib/chat-config";
import type { ConversationSummary, GeneratedImage } from "@/lib/chat-types";
import ConversationItem from "./ConversationItem";
import ImageGallery from "./ImageGallery";

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSessionId: string | null;
  conversations: ConversationSummary[];
  deletingId: string | null;
  onNewChat: () => void;
  onSelectConversation: (sessionId: string) => void;
  onDeleteConversation: (sessionId: string) => void;
  images: GeneratedImage[];
  onDeleteImage: (imageId: string) => void;
  errorMessage: string | null;
}

function SidebarSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section aria-label={title} className="flex flex-col gap-1.5">
      <h2 className="px-2.5 text-[10px] font-medium uppercase tracking-wider text-[#9aa0a6]">{title}</h2>
      {children}
    </section>
  );
}

export default function ChatSidebar({
  isOpen,
  onClose,
  activeSessionId,
  conversations,
  deletingId,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
  images,
  onDeleteImage,
  errorMessage,
}: ChatSidebarProps) {
  return (
    <>
      {isOpen && <button type="button" aria-label="Close sidebar" onClick={onClose} className="absolute inset-0 z-20 bg-black/50 md:hidden" />}
      <aside
        className={`absolute inset-y-0 left-0 z-30 flex w-60 flex-col gap-3 border-r border-white/[0.06] bg-[#1b1b1c] p-2.5 transition-transform duration-200 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onNewChat}
            className="flex flex-1 cursor-pointer items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1.5 text-[13px] text-[#e3e3e3] transition-colors duration-150 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8]"
          >
            <SquarePen aria-hidden="true" className="h-3.5 w-3.5" />
            New chat
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#c4c7c5] hover:bg-white/[0.06] md:hidden"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        {errorMessage && <p role="alert" className="px-2.5 text-[11px] text-[#f28b82]">{errorMessage}</p>}

        <div className="custom-scrollbar flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
          <SidebarSection title="Recent chats">
            {conversations.length === 0 ? (
              <p className="px-2.5 text-[11px] text-[#9aa0a6]">No saved chats yet.</p>
            ) : (
              <ul className="flex flex-col gap-0.5">
                {conversations.map((conversation) => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    isActive={conversation.id === activeSessionId}
                    isDeleting={deletingId === conversation.id}
                    onSelect={onSelectConversation}
                    onDelete={onDeleteConversation}
                  />
                ))}
              </ul>
            )}
          </SidebarSection>

          <SidebarSection title="Generated images">
            <ImageGallery images={images} onDelete={onDeleteImage} />
          </SidebarSection>
        </div>

        <p className="px-2.5 text-[10px] text-[#9aa0a6]/80">Chats and images auto-delete after {MESSAGE_TTL_HOURS} hours.</p>
      </aside>
    </>
  );
}
