"use client";
import { useMemo, useState } from "react";
import { Image as ImageIcon, Sparkles } from "lucide-react";
import { IMAGE_MODELS } from "@/lib/chat-config";
import {
  countImageModelsByCategory,
  EMPTY_IMAGE_MODEL_FILTER,
  filterImageModels,
  groupImageModelsByCategory,
  listAvailableImageCategories,
  type ImageCapabilityFilterKey,
  type ImageModelCategory,
  type ImageModelFilter,
} from "@/lib/image-model-filter";
import { IMAGE_MODELS_MEDIA_CONFIG } from "@/lib/media-model-catalog";
import { getModelSummary } from "@/lib/model-summaries";
import ImageCategoryTabRail, { CATEGORY_ICONS } from "./ImageCategoryTabRail";
import ImageQuickFilterPills from "./ImageQuickFilterPills";
import ModelCard from "./ModelCard";
import ModelCardGrid from "./ModelCardGrid";
import ModelEmptyState from "./ModelEmptyState";
import ModelSearchBar from "./ModelSearchBar";

interface ImageModelCatalogProps {
  selectedModel: string;
  onSelect: (modelId: string) => void;
}

export default function ImageModelCatalog({ selectedModel, onSelect }: ImageModelCatalogProps) {
  const [filter, setFilter] = useState<ImageModelFilter>(EMPTY_IMAGE_MODEL_FILTER);

  const categories = useMemo(() => listAvailableImageCategories(IMAGE_MODELS), []);
  const filteredModels = useMemo(() => filterImageModels(IMAGE_MODELS, filter), [filter]);
  const groups = useMemo(() => groupImageModelsByCategory(filteredModels), [filteredModels]);
  const counts = useMemo(() => countImageModelsByCategory(IMAGE_MODELS), []);

  const hasActiveFilter = useMemo(
    () => filter.category !== null || filter.capability !== null || Boolean(filter.search.trim()),
    [filter]
  );

  const updateSearch = (search: string) => {
    setFilter((current) => ({ ...current, search }));
  };

  const updateCategory = (category: ImageModelCategory | null) => {
    setFilter((current) => ({ ...current, category }));
  };

  const toggleCapability = (capability: ImageCapabilityFilterKey) => {
    setFilter((current) => ({
      ...current,
      capability: current.capability === capability ? null : capability,
    }));
  };

  const resetFilters = () => {
    setFilter(EMPTY_IMAGE_MODEL_FILTER);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 flex-col gap-1.5 sm:gap-2.5 border-b border-white/[0.08] bg-[#161718]/60 p-2.5 sm:px-5 sm:py-3.5 backdrop-blur-md">
        <ModelSearchBar
          value={filter.search}
          onChange={updateSearch}
          resultCount={filteredModels.length}
          totalCount={IMAGE_MODELS.length}
          placeholder="Search image models..."
        />
        <ImageCategoryTabRail
          categories={categories}
          activeCategory={filter.category}
          onSelectCategory={updateCategory}
          counts={counts}
        />
        <ImageQuickFilterPills
          activeCapability={filter.capability}
          onToggleCapability={toggleCapability}
          hasActiveFilter={hasActiveFilter}
          onResetFilters={resetFilters}
        />
      </div>

      <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-4 pt-3 sm:px-5 sm:pb-[max(env(safe-area-inset-bottom),1.25rem)] sm:pt-4">
        {groups.length === 0 ? (
          <ModelEmptyState onReset={resetFilters} />
        ) : (
          groups.map((group) => {
            const Icon = CATEGORY_ICONS[group.category] ?? Sparkles;
            return (
              <section key={group.category} aria-label={group.label} className="mb-4 sm:mb-6 last:mb-0">
                <div className="flex items-center gap-1.5 sm:gap-2 pb-1.5 sm:pb-2.5">
                  <div className="flex h-4.5 w-4.5 sm:h-5 sm:w-5 items-center justify-center rounded-md bg-white/[0.06] border border-white/[0.08]">
                    <Icon className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#8ab4f8]" aria-hidden="true" />
                  </div>
                  <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#c4c7c5]">
                    {group.label}
                  </h3>
                  <span className="text-[10px] sm:text-[11px] text-[#9aa0a6] font-mono">
                    ({group.models.length})
                  </span>
                </div>
                <ModelCardGrid label={`${group.label} models`}>
                  {group.models.map((model) => {
                    const conf = IMAGE_MODELS_MEDIA_CONFIG[model.id];
                    const tagLabel = !conf?.canGenerate
                      ? "Edit Only"
                      : conf?.resolutions?.includes("4K")
                        ? "4K Studio"
                        : "Generate & Edit";
                    return (
                      <ModelCard
                        key={model.id}
                        model={model}
                        summary={getModelSummary(model.id)}
                        tagLabel={tagLabel}
                        TagIcon={ImageIcon}
                        isSelected={model.id === selectedModel}
                        onSelect={onSelect}
                      />
                    );
                  })}
                </ModelCardGrid>
              </section>
            );
          })
        )}
      </div>
    </div>
  );
}
