"use client";
import { Loader2 } from "lucide-react";
import { MESSAGE_TTL_HOURS } from "@/lib/chat-config";
import type { GeneratedImage } from "@/lib/chat-types";
import type { useAttachmentQueue } from "../hooks/useAttachmentQueue";
import type { useChatMessages } from "../hooks/useChatMessages";
import { useBalance } from "../hooks/useBalance";
import { useComposerMode } from "../hooks/useComposerMode";
import { useComposerSubmit } from "../hooks/useComposerSubmit";
import { useMessageEditing } from "../hooks/useMessageEditing";
import BalanceBadge from "./BalanceBadge";
import ChatErrorBanner from "./ChatErrorBanner";
import ChatInput from "./ChatInput";
import ChatToolbar from "./ChatToolbar";
import EmptyState from "./EmptyState";
import FileDropZone from "./FileDropZone";
import MessageList from "./MessageList";

interface ChatPanelProps {
  sessionId: string | null;
  chat: ReturnType<typeof useChatMessages>;
  queue: ReturnType<typeof useAttachmentQueue>;
  draft: string;
  onDraftChange: (value: string) => void;
  onImageGenerated: (image: GeneratedImage) => void;
  onNewChat: () => void;
  onOpenSidebar: () => void;
}

export default function ChatPanel({
  sessionId,
  chat,
  queue,
  draft,
  onDraftChange,
  onImageGenerated,
  onNewChat,
  onOpenSidebar,
}: ChatPanelProps) {
  const composer = useComposerMode();
  const { canSubmit, submit } = useComposerSubmit({ sessionId, draft, onDraftChange, chat, queue, composer, onImageGenerated });
  const messageControls = useMessageEditing({ chat, activeModel: composer.activeModel, onRestoreDraft: onDraftChange });
  const isInitializing = !sessionId || chat.isLoadingHistory;
  const balance = useBalance(sessionId, chat.messages.length);
  const canAcceptDrop = Boolean(sessionId) && queue.canAddMore && !chat.isSending && !composer.isImageMode;

  return (
    <FileDropZone isEnabled={canAcceptDrop} onDropFiles={queue.addFiles} className="relative flex min-w-0 flex-1 flex-col pt-1.5 sm:pt-2">
      <ChatToolbar
        models={composer.activeModels}
        selectedModel={composer.activeModel}
        onSelectModel={composer.selectModel}
        isImageMode={composer.isImageMode}
        onNewChat={onNewChat}
        onOpenSidebar={onOpenSidebar}
        isBusy={chat.isSending}
        hasMessages={chat.messages.length > 0}
      />

      <div className="custom-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto">
        {isInitializing ? (
          <div role="status" className="flex flex-1 items-center justify-center text-[#9aa0a6]">
            <Loader2 aria-hidden="true" className="h-6 w-6 animate-spin motion-reduce:animate-none" />
            <span className="sr-only">Loading conversation</span>
          </div>
        ) : chat.messages.length === 0 && !chat.isSending ? (
          <EmptyState onSelectPrompt={onDraftChange} />
        ) : (
          <MessageList
            messages={chat.messages}
            isSending={chat.isSending}
            isGeneratingImage={composer.isImageMode}
            pendingModelId={composer.activeModel}
            controls={messageControls}
          />
        )}
      </div>

      <div className="mx-auto w-full max-w-[60rem] px-3 pb-[max(env(safe-area-inset-bottom),8px)] pt-1.5 sm:px-6">
        {chat.error && <ChatErrorBanner message={chat.error} onDismiss={chat.dismissError} />}
        <ChatInput
          value={draft}
          onChange={onDraftChange}
          onSubmit={submit}
          attachments={queue.items}
          onAddFiles={queue.addFiles}
          onRemoveAttachment={queue.removeItem}
          canAttach={queue.canAddMore && !chat.isSending}
          canSubmit={canSubmit}
          isSending={chat.isSending}
          isDisabled={!sessionId}
          isImageMode={composer.isImageMode}
          onToggleImageMode={composer.toggleImageMode}
        />
        <div className="mt-1.5 flex items-center justify-between gap-3 text-[10px] text-[#9aa0a6]/80">
          <p className="min-w-0 flex-1 truncate">
            AI can make mistakes. Chats, files, and images are deleted automatically after {MESSAGE_TTL_HOURS} hours.
          </p>
          <BalanceBadge remainingUsd={balance.remainingUsd} hasError={balance.hasError} />
        </div>
      </div>
    </FileDropZone>
  );
}
