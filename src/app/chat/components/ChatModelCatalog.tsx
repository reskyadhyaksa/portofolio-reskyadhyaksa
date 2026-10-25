"use client";
import { useMemo, useState } from "react";
import {
  EMPTY_MODEL_FILTER,
  filterModels,
  groupByProvider,
  listAvailableCapabilities,
  listAvailableProviders,
  listAvailableUsages,
  type ModelFilter,
} from "@/lib/model-filter";
import {
  CATALOG_CHAT_MODELS,
  PROVIDER_LABELS,
  USAGE_LABELS,
  CAPABILITY_LABELS,
  type ModelProvider,
  type ModelUsage,
  type CapabilityFilterKey,
} from "@/lib/model-catalog";
import FilterChips from "./FilterChips";
import ModelCard from "./ModelCard";
import ModelCardGrid from "./ModelCardGrid";
import { USAGE_ICONS, CAPABILITY_ICONS } from "./model-usage-icons";
import { getModelSummary } from "@/lib/model-summaries";

interface ChatModelCatalogProps {
  selectedModel: string;
  onSelect: (modelId: string) => void;
}

export default function ChatModelCatalog({ selectedModel, onSelect }: ChatModelCatalogProps) {
  const [filter, setFilter] = useState<ModelFilter>(EMPTY_MODEL_FILTER);

  const providers = useMemo(() => listAvailableProviders(CATALOG_CHAT_MODELS), []);
  const usages = useMemo(() => listAvailableUsages(CATALOG_CHAT_MODELS), []);
  const capabilities = useMemo(() => listAvailableCapabilities(), []);
  const groups = useMemo(() => groupByProvider(filterModels(CATALOG_CHAT_MODELS, filter)), [filter]);

  const updateProvider = (provider: ModelProvider | null) => setFilter((current) => ({ ...current, provider }));
  const updateUsage = (usage: ModelUsage | null) => setFilter((current) => ({ ...current, usage }));
  const updateCapability = (capability: CapabilityFilterKey | null) => setFilter((current) => ({ ...current, capability }));

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 flex-col gap-2 border-b border-white/[0.06] px-4 py-2.5 sm:gap-2.5 sm:px-5">
        <FilterChips
          title="Provider"
          allLabel="All providers"
          options={providers}
          labels={PROVIDER_LABELS}
          value={filter.provider}
          onChange={updateProvider}
          className="min-w-0"
        />
        <FilterChips
          title="Capability"
          allLabel="All capabilities"
          options={capabilities}
          labels={CAPABILITY_LABELS}
          icons={CAPABILITY_ICONS}
          value={filter.capability}
          onChange={updateCapability}
          className="min-w-0"
        />
        <FilterChips
          title="Best for"
          allLabel="Any use"
          options={usages}
          labels={USAGE_LABELS}
          icons={USAGE_ICONS}
          value={filter.usage}
          onChange={updateUsage}
          className="min-w-0"
        />
      </div>

      <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-3 sm:px-5 sm:pt-4">
        {groups.length === 0 && <p className="py-10 text-center text-[12px] text-[#9aa0a6]">No models match this filter.</p>}
        {groups.map((group) => (
          <section key={group.provider} aria-label={PROVIDER_LABELS[group.provider]} className="mb-5 last:mb-0">
            <h3 className="pb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9aa0a6]">
              {PROVIDER_LABELS[group.provider]}
            </h3>
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
                />
              ))}
            </ModelCardGrid>
          </section>
        ))}
      </div>
    </div>
  );
}
