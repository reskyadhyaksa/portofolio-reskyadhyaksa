import { Menu, SquarePen, MessageSquare, Image as ImageIcon, Film } from "lucide-react";
import { MESSAGE_TTL_HOURS, type ModelOption } from "@/lib/chat-config";
import { CHAT_COLUMN_CLASS, CHAT_SIDEBAR_ID, CHAT_TOOLBAR_GUTTER_CLASS } from "./chat-layout-tokens";
import ModelSelector from "./ModelSelector";

export type StudioViewMode = "chat" | "image" | "video";

interface ChatToolbarProps {
  models: readonly ModelOption[];
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
  studioMode: StudioViewMode;
  onSelectStudioMode: (mode: StudioViewMode) => void;
  onNewChat: () => void;
  onOpenSidebar: () => void;
  isSidebarCollapsed: boolean;
  isBusy: boolean;
  hasMessages: boolean;
}

const TOOLBAR_BUTTON_CLASS =
  "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#c4c7c5] transition-colors duration-200 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8] disabled:cursor-not-allowed disabled:opacity-40";

export default function ChatToolbar({
  models,
  selectedModel,
  onSelectModel,
  studioMode,
  onSelectStudioMode,
  onNewChat,
  onOpenSidebar,
  isSidebarCollapsed,
  isBusy,
  hasMessages,
}: ChatToolbarProps) {
  return (
    <header className={`${CHAT_COLUMN_CLASS} ${CHAT_TOOLBAR_GUTTER_CLASS} flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-2 sm:pb-3`}>
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
          aria-controls={CHAT_SIDEBAR_ID}
          title="Open sidebar"
          className={`${TOOLBAR_BUTTON_CLASS} ${isSidebarCollapsed ? "" : "md:hidden"}`}
        >
          <Menu aria-hidden="true" className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1 rounded-xl bg-white/[0.04] p-0.5 border border-white/[0.08]">
          <button
            type="button"
            onClick={() => onSelectStudioMode("chat")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              studioMode === "chat"
                ? "bg-[#8ab4f8]/20 text-[#8ab4f8] border border-[#8ab4f8]/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <MessageSquare className="h-3 w-3" />
            <span>Chat</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectStudioMode("image")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              studioMode === "image"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ImageIcon className="h-3 w-3" />
            <span>Image Flow</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectStudioMode("video")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              studioMode === "video"
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Film className="h-3 w-3" />
            <span>Video Flow</span>
          </button>
        </div>

        {studioMode === "chat" && (
          <ModelSelector
            models={models}
            selectedModel={selectedModel}
            onSelect={onSelectModel}
            isImageMode={false}
            disabled={isBusy}
          />
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <span className="hidden text-[11px] text-[#9aa0a6] sm:inline">Auto-deletes after {MESSAGE_TTL_HOURS}h</span>
        {studioMode === "chat" && (
          <button
            type="button"
            onClick={onNewChat}
            disabled={isBusy || !hasMessages}
            aria-label="Start new chat"
            title="New chat"
            className={TOOLBAR_BUTTON_CLASS}
          >
            <SquarePen aria-hidden="true" className="h-4 w-4" />
          </button>
        )}
      </div>
    </header>
  );
}
