import { Check, type LucideIcon, Image as ImageIcon, FileText, Video, Mic, Brain, Sparkles } from "lucide-react";
import type { ModelOption } from "@/lib/chat-config";
import type { ModelCapabilities } from "@/lib/model-catalog";

interface ModelCardProps {
  model: ModelOption;
  summary: string;
  tagLabel: string;
  TagIcon: LucideIcon;
  capabilities?: ModelCapabilities;
  isSelected: boolean;
  onSelect: (modelId: string) => void;
}

export default function ModelCard({ model, summary, tagLabel, TagIcon, capabilities, isSelected, onSelect }: ModelCardProps) {
  return (
    <li className="flex">
      <button
        type="button"
        aria-pressed={isSelected}
        onClick={() => onSelect(model.id)}
        className={`group flex w-full cursor-pointer flex-col gap-1.5 rounded-xl border p-3 text-left sm:min-h-[120px] sm:gap-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8] motion-reduce:transition-none ${
          isSelected
            ? "border-[#8ab4f8]/60 bg-[#8ab4f8]/10"
            : "border-white/[0.06] bg-white/[0.03] hover:border-white/[0.16] hover:bg-white/[0.06]"
        }`}
      >
        <span className="flex items-start justify-between gap-2">
          <span className="text-[13px] font-semibold leading-5 text-[#e8eaed]">{model.label}</span>
          {isSelected && (
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8ab4f8] text-[#131314]">
              <Check aria-hidden="true" className="h-3 w-3" strokeWidth={3} />
              <span className="sr-only">Selected</span>
            </span>
          )}
        </span>

        <span className="line-clamp-2 text-[12px] leading-[1.5] text-[#c4c7c5] sm:line-clamp-none">{summary}</span>

        {capabilities && (
          <span className="flex flex-wrap items-center gap-1 pt-1">
            {capabilities.isFree && (
              <span className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-medium bg-emerald-950/70 text-emerald-300 border border-emerald-500/30">
                <Sparkles aria-hidden="true" className="h-2.5 w-2.5" />
                <span>Free</span>
              </span>
            )}
            {capabilities.canReadImage && (
              <span className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-medium bg-white/[0.04] text-slate-300 border border-white/[0.06]" title="Reads image">
                <ImageIcon aria-hidden="true" className="h-2.5 w-2.5" />
                <span>Image</span>
              </span>
            )}
            {capabilities.canReadFile && (
              <span className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-medium bg-white/[0.04] text-slate-300 border border-white/[0.06]" title="Reads file">
                <FileText aria-hidden="true" className="h-2.5 w-2.5" />
                <span>File</span>
              </span>
            )}
            {capabilities.canReadVideo && (
              <span className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-medium bg-white/[0.04] text-slate-300 border border-white/[0.06]" title="Reads video">
                <Video aria-hidden="true" className="h-2.5 w-2.5" />
                <span>Video</span>
              </span>
            )}
            {capabilities.canHearAudio && (
              <span className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-medium bg-white/[0.04] text-slate-300 border border-white/[0.06]" title="Hears audio">
                <Mic aria-hidden="true" className="h-2.5 w-2.5" />
                <span>Audio</span>
              </span>
            )}
            {capabilities.hasReasoning && (
              <span className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-medium bg-purple-950/50 text-purple-300 border border-purple-500/30" title="Reasoning capability">
                <Brain aria-hidden="true" className="h-2.5 w-2.5" />
                <span>Reasoning</span>
              </span>
            )}
          </span>
        )}

        <span className="mt-auto flex flex-wrap items-center justify-between gap-x-2 gap-y-1 border-t border-white/[0.06] pt-2">
          <span className="flex items-center gap-1 text-[11px] font-medium text-[#aecbfa]">
            <TagIcon aria-hidden="true" className="h-3 w-3" />
            {tagLabel}
          </span>
          <span className="text-[10.5px] tabular-nums text-[#9aa0a6]">{model.description}</span>
        </span>
      </button>
    </li>
  );
}
