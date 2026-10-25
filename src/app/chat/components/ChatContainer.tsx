"use client";
import { useState } from "react";
import { useAttachmentQueue } from "../hooks/useAttachmentQueue";
import { useChatMessages } from "../hooks/useChatMessages";
import { useChatSession } from "../hooks/useChatSession";
import { useConversationList } from "../hooks/useConversationList";
import { useGeneratedImages } from "../hooks/useGeneratedImages";
import { useGeneratedVideos } from "../hooks/useGeneratedVideos";
import ChatPanel from "./ChatPanel";
import ChatSidebar from "./ChatSidebar";

export default function ChatContainer() {
  const session = useChatSession();
  const [draft, setDraft] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const chat = useChatMessages(session.sessionId);
  const queue = useAttachmentQueue(session.sessionId);
  const conversationList = useConversationList(session.sessionId, session.sessionIds, chat.messages.length);
  const gallery = useGeneratedImages(session.sessionId, session.sessionIds);
  const videoGallery = useGeneratedVideos(session.sessionId, session.sessionIds);

  const resetComposer = () => {
    queue.clearItems();
    setDraft("");
    setIsSidebarOpen(false);
  };

  const handleNewChat = () => {
    if (chat.isSending) return;
    resetComposer();
    session.startNewSession();
  };

  const handleSelectConversation = (sessionId: string) => {
    if (chat.isSending) return;
    resetComposer();
    session.selectSession(sessionId);
  };

  const handleDeleteConversation = async (sessionId: string) => {
    const isDeleted = await conversationList.removeConversation(sessionId);
    if (!isDeleted) return;
    if (sessionId === session.sessionId) resetComposer();
    session.forgetSession(sessionId);
  };

  const handleCollapseSidebar = () => {
    setIsSidebarOpen(false);
    setIsSidebarCollapsed(true);
  };

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
    setIsSidebarCollapsed(false);
  };

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
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
        images={gallery.images}
        onDeleteImage={gallery.removeImage}
        errorMessage={conversationList.error ?? gallery.error ?? videoGallery.error}
      />
      <ChatPanel
        sessionId={session.sessionId}
        chat={chat}
        queue={queue}
        draft={draft}
        onDraftChange={setDraft}
        images={gallery.images}
        videos={videoGallery.videos}
        onImageGenerated={gallery.addImage}
        onGenerateVideo={videoGallery.generate}
        isGeneratingVideo={videoGallery.isGenerating}
        onNewChat={handleNewChat}
        onOpenSidebar={handleOpenSidebar}
        isSidebarCollapsed={isSidebarCollapsed}
      />
    </div>
  );
}
