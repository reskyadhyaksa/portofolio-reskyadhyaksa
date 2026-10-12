import { Sparkles } from "lucide-react";
import { findModelProvider } from "@/lib/model-catalog";
import { PROVIDER_LOGOS } from "./provider-logos";

interface AssistantAvatarProps {
  modelId?: string | null;
  isThinking?: boolean;
}

const THINKING_CLASS = "animate-loading-pulse";

export default function AssistantAvatar({ modelId = null, isThinking = false }: AssistantAvatarProps) {
  const provider = findModelProvider(modelId);
  const logo = provider ? PROVIDER_LOGOS[provider] : null;

  return (
    <span
      aria-hidden="true"
      className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-[#1e1f20] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
    >
      {logo ? (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          fillRule="evenodd"
          className={`h-3.5 w-3.5 ${logo.tintClassName} ${isThinking ? THINKING_CLASS : ""}`}
        >
          {logo.paths.map((path) => (
            <path key={path} d={path} />
          ))}
        </svg>
      ) : (
        <Sparkles className={`h-3.5 w-3.5 text-[#8ab4f8] ${isThinking ? THINKING_CLASS : ""}`} />
      )}
    </span>
  );
}
