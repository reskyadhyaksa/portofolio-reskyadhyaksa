"use client";
import { useMemo, useState } from "react";
import {
  EMPTY_MODEL_FILTER,
  filterModels,
  groupByProvider,
  listAvailableProviders,
  type ModelFilter,
} from "@/lib/model-filter";
import {
  CATALOG_CHAT_MODELS,
  PROVIDER_LABELS,
  USAGE_LABELS,
  type CapabilityFilterKey,
  type ModelProvider,
  type ModelUsage,
} from "@/lib/model-catalog";
import { USAGE_ICONS } from "./model-usage-icons";
import { getModelSummary } from "@/lib/model-summaries";
import ModelCard from "./ModelCard";
import ModelCardGrid from "./ModelCardGrid";
import ModelEmptyState from "./ModelEmptyState";
import ModelSearchBar from "./ModelSearchBar";
import ProviderLogoIcon from "./ProviderLogoIcon";
import ProviderTabRail from "./ProviderTabRail";
import QuickFilterPills from "./QuickFilterPills";

interface ChatModelCatalogProps {
  selectedModel: string;
  onSelect: (modelId: string) => void;
}

export default function ChatModelCatalog({ selectedModel, onSelect }: ChatModelCatalogProps) {
  const [filter, setFilter] = useState<ModelFilter>(EMPTY_MODEL_FILTER);

  const providers = useMemo(() => listAvailableProviders(CATALOG_CHAT_MODELS), []);
  const filteredModels = useMemo(() => filterModels(CATALOG_CHAT_MODELS, filter), [filter]);
  const groups = useMemo(() => groupByProvider(filteredModels), [filteredModels]);

  const counts = useMemo(() => {
    const tally: Record<string, number> = { all: CATALOG_CHAT_MODELS.length };
    for (const model of CATALOG_CHAT_MODELS) {
      tally[model.provider] = (tally[model.provider] ?? 0) + 1;
    }
    return tally;
  }, []);

  const hasActiveFilter = useMemo(
    () =>
      filter.provider !== null ||
      filter.usage !== null ||
      filter.capability !== null ||
      Boolean(filter.search?.trim()),
    [filter]
  );

  const updateSearch = (search: string) => {
    setFilter((current) => ({ ...current, search }));
  };

  const updateProvider = (provider: ModelProvider | null) => {
    setFilter((current) => ({ ...current, provider }));
  };

  const toggleCapability = (capability: CapabilityFilterKey) => {
    setFilter((current) => ({
      ...current,
      capability: current.capability === capability ? null : capability,
    }));
  };

  const toggleUsage = (usage: ModelUsage) => {
    setFilter((current) => ({
      ...current,
      usage: current.usage === usage ? null : usage,
    }));
  };

  const resetFilters = () => {
    setFilter(EMPTY_MODEL_FILTER);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 flex-col gap-1.5 sm:gap-2.5 border-b border-white/[0.08] bg-[#161718]/60 p-2.5 sm:px-5 sm:py-3.5 backdrop-blur-md">
        <ModelSearchBar
          value={filter.search ?? ""}
          onChange={updateSearch}
          resultCount={filteredModels.length}
          totalCount={CATALOG_CHAT_MODELS.length}
        />
        <ProviderTabRail
          providers={providers}
          activeProvider={filter.provider}
          onSelectProvider={updateProvider}
          counts={counts}
        />
        <QuickFilterPills
          activeCapability={filter.capability}
          activeUsage={filter.usage}
          onToggleCapability={toggleCapability}
          onToggleUsage={toggleUsage}
          hasActiveFilter={hasActiveFilter}
          onResetFilters={resetFilters}
        />
      </div>

      <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-4 pt-3 sm:px-5 sm:pb-[max(env(safe-area-inset-bottom),1.25rem)] sm:pt-4">
        {groups.length === 0 ? (
          <ModelEmptyState onReset={resetFilters} />
        ) : (
          groups.map((group) => (
            <section key={group.provider} aria-label={PROVIDER_LABELS[group.provider]} className="mb-4 sm:mb-6 last:mb-0">
              <div className="flex items-center gap-1.5 sm:gap-2 pb-1.5 sm:pb-2.5">
                <ProviderLogoIcon provider={group.provider} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#c4c7c5]">
                  {PROVIDER_LABELS[group.provider]}
                </h3>
                <span className="text-[10px] sm:text-[11px] text-[#9aa0a6] font-mono">
                  ({group.models.length})
                </span>
              </div>
              <ModelCardGrid label={`${PROVIDER_LABELS[group.provider]} models`}>
                {group.models.map((model) => (
                  <ModelCard
                    key={model.id}
                    model={model}
                    summary={getModelSummary(model.id)}
                    tagLabel={USAGE_LABELS[model.usage]}
                    TagIcon={USAGE_ICONS[model.usage]}
                    capabilities={model.capabilities}
                    isSelected={model.id === selectedModel}
                    onSelect={onSelect}
                    provider={model.provider}
                  />
                ))}
              </ModelCardGrid>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
