import type { ChatMessage } from "@/lib/chat-types";
import { useAutoScroll } from "../hooks/useAutoScroll";
import { CHAT_COLUMN_CLASS, CHAT_GUTTER_CLASS } from "./chat-layout-tokens";
import MessageBubble, { type UserMessageControls } from "./MessageBubble";
import StreamingReply from "./StreamingReply";
import TypingIndicator from "./TypingIndicator";

interface MessageListProps {
  messages: ChatMessage[];
  isSending: boolean;
  streamingReply?: string | null;
  isGeneratingImage?: boolean;
  pendingModelId?: string | null;
  pendingImageAspect?: { width: number; height: number };
  controls?: UserMessageControls;
}

function countLines(text: string | null): number {
  return text ? text.split("\n").length : 0;
}

export default function MessageList({
  messages,
  isSending,
  streamingReply = null,
  isGeneratingImage = false,
  pendingModelId = null,
  pendingImageAspect,
  controls,
}: MessageListProps) {
  const hasStreamedText = Boolean(streamingReply);
  const scrollTrigger = `${messages.length}-${isSending}-${countLines(streamingReply)}`;
  const bottomAnchorRef = useAutoScroll<HTMLDivElement>(scrollTrigger);

  return (
    <section aria-label="Conversation" aria-live="polite" className={`${CHAT_COLUMN_CLASS} ${CHAT_GUTTER_CLASS} flex flex-col gap-4 pb-3 pt-4`}>
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} controls={controls} />
      ))}
      {isSending && hasStreamedText && <StreamingReply content={streamingReply ?? ""} modelId={pendingModelId} />}
      {isSending && !hasStreamedText && (
        <TypingIndicator variant={isGeneratingImage ? "image" : "text"} modelId={pendingModelId} imageAspect={pendingImageAspect} />
      )}
      <div ref={bottomAnchorRef} aria-hidden="true" />
    </section>
  );
}

