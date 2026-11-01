"use client";
import {
  Aperture,
  Bot,
  Boxes,
  Camera,
  Cloud,
  Compass,
  Flame,
  Layers,
  Palette,
  Sparkles,
  Waves,
  type LucideIcon,
} from "lucide-react";
import {
  IMAGE_CATEGORY_LABELS,
  type ImageModelCategory,
} from "@/lib/image-model-filter";

interface ImageCategoryTabRailProps {
  categories: readonly ImageModelCategory[];
  activeCategory: ImageModelCategory | null;
  onSelectCategory: (category: ImageModelCategory | null) => void;
  counts: Record<string, number>;
}

export const CATEGORY_ICONS: Record<ImageModelCategory, LucideIcon> = {
  recraft: Palette,
  openai: Sparkles,
  flux: Flame,
  google: Sparkles,
  bytedance: Layers,
  sourceful: Waves,
  microsoft: Boxes,
  krea: Camera,
  qwen: Cloud,
  xai: Bot,
  tencent: Compass,
};

export default function ImageCategoryTabRail({
  categories,
  activeCategory,
  onSelectCategory,
  counts,
}: ImageCategoryTabRailProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter image models by category"
      className="custom-scrollbar flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar"
    >
      <button
        type="button"
        role="tab"
        aria-selected={activeCategory === null}
        onClick={() => onSelectCategory(null)}
        className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8] ${
          activeCategory === null
            ? "border border-white/20 bg-white/[0.14] text-white shadow-sm"
            : "border border-white/[0.06] bg-white/[0.03] text-slate-400 hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white"
        }`}
      >
        <Sparkles className="h-3.5 w-3.5 text-[#8ab4f8]" aria-hidden="true" />
        <span>All</span>
        <span className="ml-0.5 rounded-full bg-white/[0.08] px-1.5 py-0.2 text-[10px] tabular-nums font-mono text-[#c4c7c5]">
          {counts.all ?? 0}
        </span>
      </button>

      {categories.map((category) => {
        const isActive = activeCategory === category;
        const count = counts[category] ?? 0;
        const Icon = CATEGORY_ICONS[category] ?? Sparkles;
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectCategory(category)}
            className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8] ${
              isActive
                ? "border border-white/20 bg-white/[0.14] text-white shadow-sm font-semibold"
                : "border border-white/[0.06] bg-white/[0.03] text-slate-400 hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            <Icon className="h-3.5 w-3.5 text-[#8ab4f8]" aria-hidden="true" />
            <span>{IMAGE_CATEGORY_LABELS[category]}</span>
            <span className="ml-0.5 rounded-full bg-white/[0.08] px-1.5 py-0.2 text-[10px] tabular-nums font-mono text-[#c4c7c5]">
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
