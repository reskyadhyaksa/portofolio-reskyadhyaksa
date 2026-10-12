import type { ChatMessage } from "@/lib/chat-types";
import { useAutoScroll } from "../hooks/useAutoScroll";
import MessageBubble, { type UserMessageControls } from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

interface MessageListProps {
  messages: ChatMessage[];
  isSending: boolean;
  isGeneratingImage?: boolean;
  pendingModelId?: string | null;
  pendingImageAspect?: { width: number; height: number };
  controls?: UserMessageControls;
}

export default function MessageList({ messages, isSending, isGeneratingImage = false, pendingModelId = null, pendingImageAspect, controls }: MessageListProps) {
  const scrollTrigger = `${messages.length}-${isSending}`;
  const bottomAnchorRef = useAutoScroll<HTMLDivElement>(scrollTrigger);

  return (
    <section aria-label="Conversation" aria-live="polite" className="mx-auto flex w-full max-w-[60rem] flex-col gap-4 px-4 pb-3 pt-4 sm:px-6">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} controls={controls} />
      ))}
      {isSending && (
        <TypingIndicator variant={isGeneratingImage ? "image" : "text"} modelId={pendingModelId} imageAspect={pendingImageAspect} />
      )}
      <div ref={bottomAnchorRef} aria-hidden="true" />
    </section>
  );
}
