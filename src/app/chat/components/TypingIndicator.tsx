import AssistantAvatar from "./AssistantAvatar";

type TypingIndicatorVariant = "text" | "image";

interface TypingIndicatorProps {
  variant?: TypingIndicatorVariant;
  modelId?: string | null;
}

const STATUS_LABELS: Record<TypingIndicatorVariant, string> = {
  text: "Assistant is thinking",
  image: "Generating image",
};

function TextSkeleton() {
  return (
    <div className="flex flex-col gap-2" aria-hidden="true">
      <span className="h-2.5 w-4/5 animate-pulse rounded-full bg-gradient-to-r from-[#1e1f20] via-[#2a2b2e] to-[#1e1f20]" />
      <span className="h-2.5 w-3/5 animate-pulse rounded-full bg-gradient-to-r from-[#1e1f20] via-[#2a2b2e] to-[#1e1f20]" />
    </div>
  );
}

function ImageSkeleton() {
  return (
    <div className="flex flex-col gap-1.5" aria-hidden="true">
      <span className="text-[11px] text-[#9aa0a6]">Generating image…</span>
      <span className="aspect-square w-full max-w-sm animate-pulse rounded-xl border border-white/[0.06] bg-gradient-to-br from-[#1e1f20] via-[#2a2b2e] to-[#1e1f20] motion-reduce:animate-none" />
    </div>
  );
}

export default function TypingIndicator({ variant = "text", modelId = null }: TypingIndicatorProps) {
  return (
    <div role="status" aria-live="polite" className="flex items-start gap-3 animate-fade-in-soft">
      <AssistantAvatar modelId={modelId} isThinking />
      <div className="flex flex-1 flex-col gap-2 pt-1">
        <span className="sr-only">{STATUS_LABELS[variant]}</span>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              style={{ animationDelay: `${delay}ms` }}
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#8ab4f8]/80 motion-reduce:animate-none"
            />
          ))}
        </div>
        {variant === "image" ? <ImageSkeleton /> : <TextSkeleton />}
      </div>
    </div>
  );
}
