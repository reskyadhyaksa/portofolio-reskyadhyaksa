import { isSupportedImageModel } from "@/lib/chat-config";
import type { ChatMessage } from "@/lib/chat-types";
import AssistantAvatar from "./AssistantAvatar";
import MarkdownContent from "./MarkdownContent";
import MessageAttachments from "./MessageAttachments";
import UserMessageActions from "./UserMessageActions";
import UserMessageEditor from "./UserMessageEditor";

const OPTIMISTIC_PREFIX = "optimistic-";

export interface UserMessageControls {
  editingMessageId: string | null;
  isDisabled: boolean;
  onStartEdit: (messageId: string) => void;
  onCancelEdit: () => void;
  onSubmitEdit: (message: ChatMessage, content: string) => void;
  onRevert: (message: ChatMessage) => void;
}

interface MessageBubbleProps {
  message: ChatMessage;
  controls?: UserMessageControls;
}

interface UserMessageProps {
  message: ChatMessage;
  controls?: UserMessageControls;
}

function UserMessage({ message, controls }: UserMessageProps) {
  const isPersisted = !message.id.startsWith(OPTIMISTIC_PREFIX);
  const isEditable = !isSupportedImageModel(message.model);

  if (controls?.editingMessageId === message.id && isEditable) {
    return (
      <div className="flex flex-col items-end animate-fade-in-soft">
        <UserMessageEditor
          initialContent={message.content}
          onCancel={controls.onCancelEdit}
          onSubmit={(content) => controls.onSubmitEdit(message, content)}
        />
      </div>
    );
  }

  return (
    <div className="group flex flex-col items-end animate-fade-in-soft">
      <MessageAttachments attachments={message.attachments} alignEnd />
      <div className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-tr-md bg-[#28292a] px-3.5 py-2 text-[12.5px] leading-[1.6] text-[#e3e3e3] sm:max-w-[75%]">
        {message.content}
      </div>
      {controls && isPersisted && (
        <div className="opacity-100 transition-opacity duration-200 focus-within:opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
          <UserMessageActions
            disabled={controls.isDisabled}
            canEdit={isEditable}
            onEdit={() => controls.onStartEdit(message.id)}
            onRevert={() => controls.onRevert(message)}
          />
        </div>
      )}
    </div>
  );
}

function AssistantMessage({ message }: { message: ChatMessage }) {
  return (
    <div className="flex items-start gap-3 animate-fade-in-soft">
      <AssistantAvatar modelId={message.model} />
      <div className="min-w-0 flex-1">
        <MarkdownContent content={message.content} />
        {message.attachments.length > 0 && (
          <div className="mt-2">
            <MessageAttachments attachments={message.attachments} alignEnd={false} size="preview" />
          </div>
        )}
        {message.model && <p className="mt-1.5 text-[10px] uppercase tracking-wider text-[#9aa0a6]/70">{message.model}</p>}
      </div>
    </div>
  );
}

export default function MessageBubble({ message, controls }: MessageBubbleProps) {
  return message.role === "user" ? <UserMessage message={message} controls={controls} /> : <AssistantMessage message={message} />;
}
