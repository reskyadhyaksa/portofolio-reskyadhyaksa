"use client";
import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  Home,
  PanelLeftClose,
  Plus,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { MESSAGE_TTL_HOURS } from "@/lib/chat-config";
import type { ConversationSummary, GeneratedImage, GeneratedVideo } from "@/lib/chat-types";
import { groupConversationsByDate } from "@/lib/conversation-grouping";
import type { StudioViewMode } from "./ChatToolbar";
import ConversationItem from "./ConversationItem";
import ImageSidebarHistory from "./ImageSidebarHistory";
import VideoSidebarHistory from "./VideoSidebarHistory";
import { CHAT_SIDEBAR_ID } from "./chat-layout-tokens";

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
  videos?: GeneratedVideo[];
  onDeleteVideo?: (videoId: string) => void;
  errorMessage: string | null;
  studioMode: StudioViewMode;
}

function SidebarSection({
  title,
  count,
  children,
}: {
  title: string;
  count?: number;
  children: ReactNode;
}) {
  return (
    <section aria-label={title} className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-[9.5px] font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </h3>
        {count !== undefined && count > 0 && (
          <span className="font-mono text-[9px] text-slate-500">{count}</span>
        )}
      </div>
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
  videos = [],
  onDeleteVideo,
  errorMessage,
  studioMode,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = useMemo(() => {
    if (studioMode !== "chat") return [];
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) return conversations;
    return conversations.filter((c) => c.title.toLowerCase().includes(trimmed));
  }, [conversations, searchQuery, studioMode]);

  const filteredImages = useMemo(() => {
    if (studioMode !== "image") return [];
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) return images;
    return images.filter((img) => img.prompt.toLowerCase().includes(trimmed));
  }, [images, searchQuery, studioMode]);

  const filteredVideos = useMemo(() => {
    if (studioMode !== "video") return [];
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) return videos;
    return videos.filter((vid) => vid.prompt.toLowerCase().includes(trimmed));
  }, [videos, searchQuery, studioMode]);

  const grouped = useMemo(
    () => groupConversationsByDate(filteredConversations),
    [filteredConversations]
  );

  const newButtonLabel =
    studioMode === "image"
      ? "New Image Session"
      : studioMode === "video"
        ? "New Video Session"
        : "New Chat Session";

  const searchPlaceholder =
    studioMode === "image"
      ? "Search images..."
      : studioMode === "video"
        ? "Search videos..."
        : "Search chats...";

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        id={CHAT_SIDEBAR_ID}
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col gap-2.5 border-r border-white/[0.08] bg-[#171819] p-3 shadow-2xl transition-transform duration-200 md:static md:w-64 md:translate-x-0 md:shadow-none lg:w-72 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "md:hidden" : ""}`}
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/[0.06] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8]"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-sm">
              <Home aria-hidden="true" className="h-3.5 w-3.5" />
            </div>
            <span className="tracking-wide">Home</span>
          </Link>

          <button
            type="button"
            onClick={onCollapse}
            aria-label="Collapse sidebar"
            aria-controls={CHAT_SIDEBAR_ID}
            aria-expanded="true"
            title="Collapse sidebar"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-slate-400 hover:bg-white/[0.06] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8]"
          >
            <PanelLeftClose aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={onNewChat}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-blue-950/40 hover:brightness-110 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8]"
        >
          <Plus aria-hidden="true" className="h-3.5 w-3.5 stroke-[2.5]" />
          <span>{newButtonLabel}</span>
        </button>

        {errorMessage && (
          <p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-950/20 px-2.5 py-1 text-[11px] text-rose-300">
            {errorMessage}
          </p>
        )}

        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="h-7.5 w-full rounded-lg border border-white/[0.08] bg-white/[0.03] pl-8 pr-7 text-[11px] text-white placeholder-slate-500 focus:border-[#8ab4f8] focus:bg-white/[0.06] focus:outline-none"
          />
          {searchQuery.length > 0 && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-1.5 flex h-5 w-5 items-center justify-center rounded-md text-slate-400 hover:text-white"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        <div className="custom-scrollbar flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto pr-0.5">
          {studioMode === "chat" && (
            filteredConversations.length === 0 ? (
              <div className="py-6 text-center text-[11px] text-slate-500">
                {searchQuery ? "No matching conversations found." : "No saved conversations yet."}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {grouped.today.length > 0 && (
                  <SidebarSection title="Today" count={grouped.today.length}>
                    <ul className="flex flex-col gap-0.5">
                      {grouped.today.map((conversation) => (
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
                  </SidebarSection>
                )}

                {grouped.yesterday.length > 0 && (
                  <SidebarSection title="Yesterday" count={grouped.yesterday.length}>
                    <ul className="flex flex-col gap-0.5">
                      {grouped.yesterday.map((conversation) => (
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
                  </SidebarSection>
                )}

                {grouped.lastWeek.length > 0 && (
                  <SidebarSection title="Previous 7 Days" count={grouped.lastWeek.length}>
                    <ul className="flex flex-col gap-0.5">
                      {grouped.lastWeek.map((conversation) => (
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
                  </SidebarSection>
                )}

                {grouped.older.length > 0 && (
                  <SidebarSection title="Older" count={grouped.older.length}>
                    <ul className="flex flex-col gap-0.5">
                      {grouped.older.map((conversation) => (
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
                  </SidebarSection>
                )}
              </div>
            )
          )}

          {studioMode === "image" && (
            filteredImages.length === 0 ? (
              <div className="py-6 text-center text-[11px] text-slate-500">
                {searchQuery ? "No matching images found." : "No generated images yet."}
              </div>
            ) : (
              <SidebarSection title="Image History" count={filteredImages.length}>
                <ImageSidebarHistory images={filteredImages} onDeleteImage={onDeleteImage} />
              </SidebarSection>
            )
          )}

          {studioMode === "video" && (
            filteredVideos.length === 0 ? (
              <div className="py-6 text-center text-[11px] text-slate-500">
                {searchQuery ? "No matching videos found." : "No generated videos yet."}
              </div>
            ) : (
              <SidebarSection title="Video History" count={filteredVideos.length}>
                <VideoSidebarHistory
                  videos={filteredVideos}
                  onDeleteVideo={onDeleteVideo ?? (() => {})}
                />
              </SidebarSection>
            )
          )}
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.025] px-2.5 py-1.5 text-[10.5px] text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400/90 shrink-0" />
          <span className="truncate leading-tight">
            Ephemeral session · Auto-wiped in {MESSAGE_TTL_HOURS}h
          </span>
        </div>
      </aside>
    </>
  );
}
