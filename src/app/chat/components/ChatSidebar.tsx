"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { Home, PanelLeftClose, SquarePen } from "lucide-react";
import { MESSAGE_TTL_HOURS } from "@/lib/chat-config";
import type { ConversationSummary, GeneratedImage } from "@/lib/chat-types";
import ConversationItem from "./ConversationItem";
import { CHAT_SIDEBAR_ID } from "./chat-layout-tokens";
import ImageGallery from "./ImageGallery";

interface ChatSidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onCollapse: () => void;
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
  isCollapsed,
  onClose,
  onCollapse,
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
        id={CHAT_SIDEBAR_ID}
        className={`absolute inset-y-0 left-0 z-30 flex w-60 flex-col gap-3 border-r border-white/[0.06] bg-[#1b1b1c] p-2.5 transition-transform duration-200 md:static md:w-60 md:translate-x-0 lg:w-64 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "md:hidden" : ""}`}
      >
        <div className="flex items-center gap-1 border-b border-white/[0.06] pb-2">
          <Link
            href="/"
            className="flex min-h-9 flex-1 items-center gap-2 rounded-full px-3 text-[13px] text-[#c4c7c5] transition-colors duration-150 hover:bg-white/[0.06] hover:text-[#e3e3e3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8]"
          >
            <Home aria-hidden="true" className="h-3.5 w-3.5" />
            Home
          </Link>
          <button
            type="button"
            onClick={onCollapse}
            aria-label="Minimize sidebar"
            aria-controls={CHAT_SIDEBAR_ID}
            aria-expanded="true"
            title="Minimize sidebar"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#c4c7c5] transition-colors duration-150 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8]"
          >
            <PanelLeftClose aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={onNewChat}
          className="flex cursor-pointer items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1.5 text-[13px] text-[#e3e3e3] transition-colors duration-150 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8]"
        >
          <SquarePen aria-hidden="true" className="h-3.5 w-3.5" />
          New chat
        </button>

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
