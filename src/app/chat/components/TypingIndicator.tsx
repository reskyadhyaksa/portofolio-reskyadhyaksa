import AssistantAvatar from "./AssistantAvatar";

type TypingIndicatorVariant = "text" | "image";

interface ImageAspect {
  width: number;
  height: number;
}

interface TypingIndicatorProps {
  variant?: TypingIndicatorVariant;
  modelId?: string | null;
  imageAspect?: ImageAspect;
}

const STATUS_LABELS: Record<TypingIndicatorVariant, string> = {
  text: "Assistant is thinking",
  image: "Generating image",
};

const SQUARE_ASPECT: ImageAspect = { width: 1, height: 1 };

function TextSkeleton() {
  return (
    <div className="flex flex-col gap-2" aria-hidden="true">
      <span className="h-2.5 w-4/5 animate-loading-pulse rounded-full bg-[#3a3c40]" />
      <span className="h-2.5 w-3/5 animate-loading-pulse rounded-full bg-[#3a3c40]" />
    </div>
  );
}

function ImageSkeleton({ aspect }: { aspect: ImageAspect }) {
  return (
    <div className="flex flex-col gap-1.5" aria-hidden="true">
      <span className="text-[11px] text-[#9aa0a6]">Generating image…</span>
      <span
        style={{ aspectRatio: `${aspect.width} / ${aspect.height}` }}
        className="w-full max-w-sm animate-loading-pulse rounded-xl border border-white/[0.08] bg-[#2a2c30]"
      />
    </div>
  );
}

export default function TypingIndicator({ variant = "text", modelId = null, imageAspect = SQUARE_ASPECT }: TypingIndicatorProps) {
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
              className="h-1.5 w-1.5 animate-loading-pulse rounded-full bg-[#8ab4f8]"
            />
          ))}
        </div>
        {variant === "image" ? <ImageSkeleton aspect={imageAspect} /> : <TextSkeleton />}
      </div>
    </div>
  );
}
