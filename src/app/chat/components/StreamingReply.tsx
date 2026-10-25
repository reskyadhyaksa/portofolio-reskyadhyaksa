import AssistantAvatar from "./AssistantAvatar";
import MarkdownContent from "./MarkdownContent";

interface StreamingReplyProps {
  content: string;
  modelId: string | null;
}

export default function StreamingReply({ content, modelId }: StreamingReplyProps) {
  return (
    <div aria-busy="true" className="flex items-start gap-3">
      <AssistantAvatar modelId={modelId} isThinking />
      <div className="min-w-0 flex-1">
        <span className="sr-only">Assistant is responding</span>
        <MarkdownContent content={content} />
      </div>
    </div>
  );
}
