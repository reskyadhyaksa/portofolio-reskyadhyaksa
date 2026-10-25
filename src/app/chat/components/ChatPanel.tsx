"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { MESSAGE_TTL_HOURS, type ImageModelId } from "@/lib/chat-config";
import type { GeneratedImage, GeneratedVideo } from "@/lib/chat-types";
import type { ImageOptions } from "@/lib/image-options";
import { resolveImageSizeOption } from "@/lib/image-options";
import type { useAttachmentQueue } from "../hooks/useAttachmentQueue";
import type { useChatMessages } from "../hooks/useChatMessages";
import { useComposerMode } from "../hooks/useComposerMode";
import { useComposerSubmit } from "../hooks/useComposerSubmit";
import { useMessageEditing } from "../hooks/useMessageEditing";
import { requestImageGeneration, type RequestVideoParams } from "../services/chat-api";
import { CHAT_COLUMN_CLASS, CHAT_GUTTER_CLASS } from "./chat-layout-tokens";
import ChatErrorBanner from "./ChatErrorBanner";
import ChatInput from "./ChatInput";
import ChatToolbar, { type StudioViewMode } from "./ChatToolbar";
import EmptyState from "./EmptyState";
import FileDropZone from "./FileDropZone";
import ImageStudioFlow from "./ImageStudioFlow";
import MessageList from "./MessageList";
import VideoStudioFlow from "./VideoStudioFlow";

interface ChatPanelProps {
  sessionId: string | null;
  chat: ReturnType<typeof useChatMessages>;
  queue: ReturnType<typeof useAttachmentQueue>;
  draft: string;
  onDraftChange: (value: string) => void;
  images: GeneratedImage[];
  videos: GeneratedVideo[];
  onImageGenerated: (image: GeneratedImage) => void;
  onGenerateVideo: (params: RequestVideoParams) => Promise<unknown>;
  isGeneratingVideo: boolean;
  onNewChat: () => void;
  onOpenSidebar: () => void;
  isSidebarCollapsed: boolean;
}

export default function ChatPanel({
  sessionId,
  chat,
  queue,
  draft,
  onDraftChange,
  images,
  videos,
  onImageGenerated,
  onGenerateVideo,
  isGeneratingVideo,
  onNewChat,
  onOpenSidebar,
  isSidebarCollapsed,
}: ChatPanelProps) {
  const [studioMode, setStudioMode] = useState<StudioViewMode>("chat");
  const [isGeneratingStudioImage, setIsGeneratingStudioImage] = useState(false);
  const composer = useComposerMode();
  const { canSubmit, submit } = useComposerSubmit({ sessionId, draft, onDraftChange, chat, queue, composer, onImageGenerated });
  const messageControls = useMessageEditing({ chat, activeModel: composer.activeModel, onRestoreDraft: onDraftChange });
  const isInitializing = !sessionId || chat.isLoadingHistory;
  const canAcceptDrop = Boolean(sessionId) && queue.canAddMore && !chat.isSending && !composer.isImageMode && studioMode === "chat";

  const handleStudioImageGenerate = async (
    prompt: string,
    model: ImageModelId,
    options: ImageOptions,
    referenceImageUrl?: string
  ) => {
    if (!sessionId) return;
    setIsGeneratingStudioImage(true);
    try {
      const res = await requestImageGeneration(sessionId, prompt, model, options, referenceImageUrl);
      onImageGenerated(res.image);
    } finally {
      setIsGeneratingStudioImage(false);
    }
  };

  return (
    <FileDropZone isEnabled={canAcceptDrop} onDropFiles={queue.addFiles} className="relative flex min-w-0 flex-1 flex-col pt-1.5 sm:pt-2">
      <ChatToolbar
        models={composer.activeModels}
        selectedModel={composer.activeModel}
        onSelectModel={composer.selectModel}
        studioMode={studioMode}
        onSelectStudioMode={setStudioMode}
        onNewChat={onNewChat}
        onOpenSidebar={onOpenSidebar}
        isSidebarCollapsed={isSidebarCollapsed}
        isBusy={chat.isSending || isGeneratingVideo || isGeneratingStudioImage}
        hasMessages={chat.messages.length > 0}
      />

      {studioMode === "image" ? (
        <ImageStudioFlow
          sessionId={sessionId}
          images={images}
          isGenerating={isGeneratingStudioImage}
          onGenerate={handleStudioImageGenerate}
        />
      ) : studioMode === "video" ? (
        <VideoStudioFlow
          sessionId={sessionId}
          videos={videos}
          isGenerating={isGeneratingVideo}
          onGenerate={onGenerateVideo as (params: RequestVideoParams) => Promise<void>}
        />
      ) : (
        <>
          <div className="custom-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto pb-48 sm:pb-52">
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
                streamingReply={chat.streamingReply}
                isGeneratingImage={composer.isImageMode}
                pendingModelId={composer.activeModel}
                pendingImageAspect={resolveImageSizeOption(composer.imageOptions.size)}
                controls={messageControls}
              />
            )}
          </div>

          <div className="pointer-events-none absolute bottom-3 sm:bottom-4 md:bottom-5 inset-x-0 z-20 flex flex-col items-center px-3 sm:px-4">
            <div className="pointer-events-auto w-full max-w-4xl space-y-1.5">
              {chat.error && <ChatErrorBanner message={chat.error} onDismiss={chat.dismissError} />}
              <ChatInput
                value={draft}
                onChange={onDraftChange}
                onSubmit={submit}
                onStop={chat.stopExchange}
                attachments={queue.items}
                onAddFiles={queue.addFiles}
                onRemoveAttachment={queue.removeItem}
                canAttach={queue.canAddMore && !chat.isSending}
                canSubmit={canSubmit}
                isSending={chat.isSending}
                isDisabled={!sessionId}
                isImageMode={composer.isImageMode}
                onToggleImageMode={composer.toggleImageMode}
                imageOptions={composer.imageOptions}
                onImageOptionChange={composer.updateImageOption}
                models={composer.activeModels}
                selectedModel={composer.activeModel}
                onSelectModel={composer.selectModel}
              />
              <p className="text-center text-[10px] text-[#9aa0a6]/70 drop-shadow">
                AI can make mistakes. Chats, files, and images are deleted automatically after {MESSAGE_TTL_HOURS} hours.
              </p>
            </div>
          </div>
        </>
      )}
    </FileDropZone>
  );
}
