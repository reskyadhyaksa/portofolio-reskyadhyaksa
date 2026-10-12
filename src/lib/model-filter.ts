import {
  PROVIDER_ORDER,
  USAGE_ORDER,
  type CatalogModel,
  type ModelProvider,
  type ModelUsage,
} from "./model-catalog";

export interface ModelFilter {
  provider: ModelProvider | null;
  usage: ModelUsage | null;
}

export const EMPTY_MODEL_FILTER: ModelFilter = { provider: null, usage: null };

export function filterModels(models: readonly CatalogModel[], filter: ModelFilter): CatalogModel[] {
  return models.filter(
    (model) =>
      (filter.provider === null || model.provider === filter.provider) &&
      (filter.usage === null || model.usage === filter.usage)
  );
}

export function listAvailableProviders(models: readonly CatalogModel[]): ModelProvider[] {
  const present = new Set(models.map((model) => model.provider));
  return PROVIDER_ORDER.filter((provider) => present.has(provider));
}

export function listAvailableUsages(models: readonly CatalogModel[]): ModelUsage[] {
  const present = new Set(models.map((model) => model.usage));
  return USAGE_ORDER.filter((usage) => present.has(usage));
}

export function groupByProvider(models: readonly CatalogModel[]): Array<{ provider: ModelProvider; models: CatalogModel[] }> {
  return listAvailableProviders(models).map((provider) => ({
    provider,
    models: models.filter((model) => model.provider === provider),
  }));
}
