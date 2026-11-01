import { Check, type LucideIcon, Image as ImageIcon, FileText, Video, Mic, Brain, Sparkles } from "lucide-react";
import type { ModelOption } from "@/lib/chat-config";
import type { ModelCapabilities, ModelProvider } from "@/lib/model-catalog";
import ProviderLogoIcon from "./ProviderLogoIcon";

interface ModelCardProps {
  model: ModelOption;
  summary: string;
  tagLabel: string;
  TagIcon: LucideIcon;
  capabilities?: ModelCapabilities;
  isSelected: boolean;
  onSelect: (modelId: string) => void;
  provider?: ModelProvider;
}

const PROVIDER_NAMES: Record<ModelProvider, string> = {
  gemini: "Google",
  claude: "Anthropic",
  gpt: "OpenAI",
  deepseek: "DeepSeek",
  free: "Community",
};

function inferProvider(id: string): ModelProvider {
  if (id.includes("gemini") || id.includes("veo") || id.startsWith("google/")) return "gemini";
  if (id.includes("claude") || id.startsWith("anthropic/")) return "claude";
  if (id.includes("gpt") || id.startsWith("openai/")) return "gpt";
  if (id.includes("deepseek")) return "deepseek";
  if (id.includes(":free") || id.includes("free-models") || id.includes("free-trial")) return "free";
  return "free";
}

function resolveProviderName(id: string, defaultName: string): string {
  if (id.startsWith("google/") || id.includes("veo") || id.includes("gemini")) return "Google";
  if (id.startsWith("openai/")) return "OpenAI";
  if (id.startsWith("anthropic/")) return "Anthropic";
  if (id.startsWith("deepseek/")) return "DeepSeek";
  if (id.startsWith("bytedance")) return "ByteDance";
  if (id.startsWith("recraft/")) return "Recraft";
  if (id.startsWith("black-forest-labs/")) return "Black Forest";
  if (id.startsWith("qwen/") || id.startsWith("alibaba/")) return "Alibaba";
  if (id.startsWith("kwaivgi/")) return "Kuaishou";
  if (id.startsWith("runway/")) return "Runway";
  if (id.startsWith("minimax/")) return "MiniMax";
  if (id.startsWith("x-ai/")) return "xAI";
  if (id.startsWith("krea/")) return "Krea";
  if (id.startsWith("sourceful/")) return "Sourceful";
  if (id.startsWith("microsoft/")) return "Microsoft";
  if (id.startsWith("tencent/")) return "Tencent";
  return defaultName;
}

export default function ModelCard({
  model,
  summary,
  tagLabel,
  TagIcon,
  capabilities,
  isSelected,
  onSelect,
  provider,
}: ModelCardProps) {
  const activeProvider = provider ?? inferProvider(model.id);
  const providerLabel = resolveProviderName(model.id, PROVIDER_NAMES[activeProvider] ?? "AI");

  return (
    <li className="flex">
      <button
        type="button"
        aria-pressed={isSelected}
        onClick={() => onSelect(model.id)}
        className={`group relative flex w-full cursor-pointer flex-col justify-between gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border p-2.5 sm:p-3.5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8] ${
          isSelected
            ? "border-[#8ab4f8] bg-[#8ab4f8]/[0.08] shadow-[0_0_20px_rgba(138,180,248,0.16)] ring-1 ring-[#8ab4f8]/40"
            : "border-white/[0.08] bg-white/[0.025] hover:border-white/[0.2] hover:bg-white/[0.05] hover:shadow-lg hover:shadow-black/40"
        }`}
      >
        <div className="flex flex-col gap-1.5 sm:gap-2.5">
          <div className="flex items-start justify-between gap-2 sm:gap-2.5">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="flex h-7.5 w-7.5 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-white/[0.05] border border-white/[0.08] transition-colors group-hover:border-white/[0.18]">
                <ProviderLogoIcon provider={activeProvider} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-[13.5px] font-semibold text-white leading-tight truncate group-hover:text-[#8ab4f8] transition-colors">
                  {model.label}
                </h4>
                <span className="text-[10px] sm:text-[11px] text-[#9aa0a6] font-medium">
                  {providerLabel}
                </span>
              </div>
            </div>

            <div className="shrink-0 pt-0.5">
              {isSelected ? (
                <span className="flex h-4.5 w-4.5 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-[#8ab4f8] text-[#131314] shadow-sm shadow-[#8ab4f8]/40">
                  <Check className="h-3 w-3 stroke-[3]" aria-hidden="true" />
                  <span className="sr-only">Selected</span>
                </span>
              ) : (
                <span className="flex h-4.5 w-4.5 sm:h-5 sm:w-5 items-center justify-center rounded-full border border-white/20 group-hover:border-white/40 transition-colors" />
              )}
            </div>
          </div>

          {capabilities && (
            <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-0.5">
              {capabilities.isFree && (
                <span className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9.5px] sm:text-[10.5px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
                  <span>Free</span>
                </span>
              )}
              {capabilities.hasReasoning && (
                <span title="Reasoning" className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9.5px] sm:text-[10.5px] font-medium bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  <Brain className="h-2.5 w-2.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Reasoning</span>
                </span>
              )}
              {capabilities.canReadImage && (
                <span title="Vision" className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9.5px] sm:text-[10.5px] font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  <ImageIcon className="h-2.5 w-2.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Vision</span>
                </span>
              )}
              {capabilities.canReadFile && (
                <span title="Files" className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9.5px] sm:text-[10.5px] font-medium bg-sky-500/10 text-sky-300 border border-sky-500/20">
                  <FileText className="h-2.5 w-2.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Files</span>
                </span>
              )}
              {capabilities.canReadVideo && (
                <span title="Video" className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9.5px] sm:text-[10.5px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  <Video className="h-2.5 w-2.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Video</span>
                </span>
              )}
              {capabilities.canHearAudio && (
                <span title="Audio" className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9.5px] sm:text-[10.5px] font-medium bg-rose-500/10 text-rose-300 border border-rose-500/20">
                  <Mic className="h-2.5 w-2.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Audio</span>
                </span>
              )}
            </div>
          )}

          {summary && !capabilities && (
            <p className="line-clamp-2 text-[11px] sm:text-[12px] text-[#c4c7c5] leading-relaxed">
              {summary}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-white/[0.06] pt-1.5 sm:pt-2.5 mt-0.5 sm:mt-1 text-[10px] sm:text-[11px]">
          <span className="flex items-center gap-1 font-medium text-[#8ab4f8]">
            <TagIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" aria-hidden="true" />
            {tagLabel}
          </span>
          <span className="tabular-nums font-mono text-[9.5px] sm:text-[10.5px] text-[#9aa0a6]">
            {model.description}
          </span>
        </div>
      </button>
    </li>
  );
}
