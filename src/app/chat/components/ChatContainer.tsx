"use client";
import { useState } from "react";
import type { StudioViewMode } from "./ChatToolbar";
import { useAttachmentQueue } from "../hooks/useAttachmentQueue";
import { useChatMessages } from "../hooks/useChatMessages";
import { useChatRouteSync } from "../hooks/useChatRouteSync";
import { useChatSession } from "../hooks/useChatSession";
import { useConversationList } from "../hooks/useConversationList";
import { useGeneratedImages } from "../hooks/useGeneratedImages";
import { useGeneratedVideos } from "../hooks/useGeneratedVideos";
import ChatPanel from "./ChatPanel";
import ChatSidebar from "./ChatSidebar";

interface ChatContainerProps {
  initialSessionId?: string;
  initialTab?: StudioViewMode;
  initialModel?: string | null;
}

export default function ChatContainer({ initialSessionId, initialTab, initialModel }: ChatContainerProps) {
  const session = useChatSession(initialSessionId);
  const routeSync = useChatRouteSync({
    initialTab,
    initialModel,
    sessionId: session.sessionId,
    onSelectSession: session.selectSession,
  });
  const [draft, setDraft] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const isChatMode = routeSync.studioMode === "chat";
  const isImageMode = routeSync.studioMode === "image";
  const isVideoMode = routeSync.studioMode === "video";

  const chat = useChatMessages(session.sessionId, isChatMode);
  const queue = useAttachmentQueue(session.sessionId);
  const conversationList = useConversationList(session.sessionId, session.sessionIds, chat.messages.length, isChatMode);
  const gallery = useGeneratedImages(session.sessionId, session.sessionIds, isImageMode);
  const videoGallery = useGeneratedVideos(session.sessionId, session.sessionIds, isVideoMode);

  const resetComposer = () => {
    queue.clearItems();
    setDraft("");
    setIsSidebarOpen(false);
  };

  const handleNewSession = () => {
    if (chat.isSending || videoGallery.isGenerating) return;
    resetComposer();
    const nextSessionId = session.startNewSession();
    routeSync.navigateTo(nextSessionId, routeSync.studioMode, routeSync.selectedModel, false);
  };

  const handleSelectConversation = (sessionId: string) => {
    if (chat.isSending) return;
    resetComposer();
    session.selectSession(sessionId);
    routeSync.navigateTo(sessionId, routeSync.studioMode, routeSync.selectedModel, false);
  };

  const handleDeleteConversation = async (sessionId: string) => {
    const isDeleted = await conversationList.removeConversation(sessionId);
    if (!isDeleted) return;
    if (sessionId === session.sessionId) resetComposer();
    const nextActiveId = session.forgetSession(sessionId);
    if (nextActiveId) routeSync.navigateTo(nextActiveId, routeSync.studioMode, routeSync.selectedModel, true);
  };

  const handleSelectStudioMode = (nextMode: StudioViewMode) => {
    if (chat.isSending || videoGallery.isGenerating) return;
    if (nextMode === routeSync.studioMode) return;
    resetComposer();
    const nextSessionId = session.startNewSession();
    routeSync.selectStudioMode(nextMode, nextSessionId);
  };

  const handleCollapseSidebar = () => {
    setIsSidebarOpen(false);
    setIsSidebarCollapsed(true);
  };

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
    setIsSidebarCollapsed(false);
  };

  const activeConversation = conversationList.conversations.find((c) => c.id === session.sessionId);
  const activeTitle =
    routeSync.studioMode === "image"
      ? "Image Studio"
      : routeSync.studioMode === "video"
        ? "Video Studio"
        : (activeConversation?.title || (chat.messages.length > 0 ? "Chat" : "New Chat"));

  return (
    <div className="relative flex h-full min-h-0">
      <ChatSidebar
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={() => setIsSidebarOpen(false)}
        onCollapse={handleCollapseSidebar}
        activeSessionId={session.sessionId}
        conversations={conversationList.conversations}
        deletingId={conversationList.deletingId}
        onNewChat={handleNewSession}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
        images={gallery.images}
        onDeleteImage={gallery.removeImage}
        videos={videoGallery.videos}
        onDeleteVideo={videoGallery.removeVideo}
        errorMessage={conversationList.error ?? gallery.error ?? videoGallery.error}
        studioMode={routeSync.studioMode}
        onSelectStudioMode={handleSelectStudioMode}
      />
      <ChatPanel
        sessionId={session.sessionId}
        activeTitle={activeTitle}
        chat={chat}
        queue={queue}
        draft={draft}
        onDraftChange={setDraft}
        images={gallery.images}
        videos={videoGallery.videos}
        onImageGenerated={gallery.addImage}
        onGenerateVideo={videoGallery.generate}
        isGeneratingVideo={videoGallery.isGenerating}
        onNewChat={handleNewSession}
        onOpenSidebar={handleOpenSidebar}
        isSidebarCollapsed={isSidebarCollapsed}
        studioMode={routeSync.studioMode}
        onSelectStudioMode={handleSelectStudioMode}
        selectedModel={routeSync.selectedModel}
        onSelectModel={routeSync.selectModel}
      />
    </div>
  );
}
