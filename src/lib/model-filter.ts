import {
  CAPABILITY_ORDER,
  PROVIDER_ORDER,
  USAGE_ORDER,
  type CapabilityFilterKey,
  type CatalogModel,
  type ModelProvider,
  type ModelUsage,
} from "./model-catalog";

export interface ModelFilter {
  provider: ModelProvider | null;
  usage: ModelUsage | null;
  capability: CapabilityFilterKey | null;
  search?: string;
}

export const EMPTY_MODEL_FILTER: ModelFilter = {
  provider: null,
  usage: null,
  capability: null,
  search: "",
};

function matchesCapability(model: CatalogModel, capability: CapabilityFilterKey | null): boolean {
  if (!capability) return true;
  if (capability === "image") return model.capabilities.canReadImage;
  if (capability === "file") return model.capabilities.canReadFile;
  if (capability === "video") return model.capabilities.canReadVideo;
  if (capability === "audio") return model.capabilities.canHearAudio;
  if (capability === "reasoning") return model.capabilities.hasReasoning;
  if (capability === "free") return model.capabilities.isFree;
  return true;
}

export function filterModels(models: readonly CatalogModel[], filter: ModelFilter): CatalogModel[] {
  const searchTerm = (filter.search ?? "").trim().toLowerCase();
  return models.filter((model) => {
    if (filter.provider !== null && model.provider !== filter.provider) return false;
    if (filter.usage !== null && model.usage !== filter.usage) return false;
    if (!matchesCapability(model, filter.capability)) return false;
    if (searchTerm) {
      const matchLabel = model.label.toLowerCase().includes(searchTerm);
      const matchDesc = model.description.toLowerCase().includes(searchTerm);
      const matchId = model.id.toLowerCase().includes(searchTerm);
      if (!matchLabel && !matchDesc && !matchId) return false;
    }
    return true;
  });
}

export function listAvailableProviders(models: readonly CatalogModel[]): ModelProvider[] {
  const present = new Set(models.map((model) => model.provider));
  return PROVIDER_ORDER.filter((provider) => present.has(provider));
}

export function listAvailableUsages(models: readonly CatalogModel[]): ModelUsage[] {
  const present = new Set(models.map((model) => model.usage));
  return USAGE_ORDER.filter((usage) => present.has(usage));
}

export function listAvailableCapabilities(): CapabilityFilterKey[] {
  return [...CAPABILITY_ORDER];
}

export function groupByProvider(models: readonly CatalogModel[]): Array<{ provider: ModelProvider; models: CatalogModel[] }> {
  return listAvailableProviders(models)
    .map((provider) => ({
      provider,
      models: models.filter((model) => model.provider === provider),
    }))
    .filter((group) => group.models.length > 0);
}
