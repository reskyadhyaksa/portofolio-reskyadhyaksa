import { Menu, SquarePen } from "lucide-react";
import { MESSAGE_TTL_HOURS, type ModelOption } from "@/lib/chat-config";
import ModelSelector from "./ModelSelector";

interface ChatToolbarProps {
  models: readonly ModelOption[];
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
  isImageMode: boolean;
  onNewChat: () => void;
  onOpenSidebar: () => void;
  isBusy: boolean;
  hasMessages: boolean;
}

const TOOLBAR_BUTTON_CLASS =
  "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#c4c7c5] transition-colors duration-200 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8] disabled:cursor-not-allowed disabled:opacity-40";

export default function ChatToolbar({
  models,
  selectedModel,
  onSelectModel,
  isImageMode,
  onNewChat,
  onOpenSidebar,
  isBusy,
  hasMessages,
}: ChatToolbarProps) {
  return (
    <header className="mx-auto flex w-full max-w-[60rem] items-center justify-between gap-2 px-2 sm:px-4">
      <div className="flex items-center gap-1">
        <button type="button" onClick={onOpenSidebar} aria-label="Open chat list" className={`${TOOLBAR_BUTTON_CLASS} md:hidden`}>
          <Menu aria-hidden="true" className="h-4 w-4" />
        </button>
        <ModelSelector
          models={models}
          selectedModel={selectedModel}
          onSelect={onSelectModel}
          isImageMode={isImageMode}
          disabled={isBusy}
        />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="hidden text-[11px] text-[#9aa0a6] sm:inline">Auto-deletes after {MESSAGE_TTL_HOURS}h</span>
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
      </div>
    </header>
  );
}
