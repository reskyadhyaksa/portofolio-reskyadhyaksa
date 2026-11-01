import { IMAGE_MODELS, type ModelOption } from "./chat-config";
import { IMAGE_MODELS_MEDIA_CONFIG } from "./media-model-catalog";

export type ImageModelCategory =
  | "recraft"
  | "openai"
  | "flux"
  | "google"
  | "bytedance"
  | "sourceful"
  | "microsoft"
  | "krea"
  | "qwen"
  | "xai"
  | "tencent";

export type ImageCapabilityFilterKey = "generate" | "edit_only" | "vector" | "4k" | "multi_image";

export interface ImageModelFilter {
  category: ImageModelCategory | null;
  capability: ImageCapabilityFilterKey | null;
  search: string;
}

export const EMPTY_IMAGE_MODEL_FILTER: ImageModelFilter = {
  category: null,
  capability: null,
  search: "",
};

export const IMAGE_CATEGORY_LABELS: Record<ImageModelCategory, string> = {
  recraft: "Recraft",
  openai: "OpenAI",
  flux: "Black Forest Labs (FLUX)",
  google: "Google Gemini",
  bytedance: "ByteDance Seedream",
  sourceful: "Sourceful Riverflow",
  microsoft: "Microsoft MAI",
  krea: "Krea AI",
  qwen: "Qwen Image",
  xai: "xAI Grok",
  tencent: "Tencent Hunyuan",
};

export const IMAGE_CATEGORY_ORDER: readonly ImageModelCategory[] = [
  "recraft",
  "openai",
  "flux",
  "google",
  "bytedance",
  "sourceful",
  "microsoft",
  "krea",
  "qwen",
  "xai",
  "tencent",
];

export function inferImageCategory(modelId: string): ImageModelCategory {
  if (modelId.startsWith("recraft/")) return "recraft";
  if (modelId.startsWith("openai/")) return "openai";
  if (modelId.startsWith("black-forest-labs/")) return "flux";
  if (modelId.startsWith("google/")) return "google";
  if (modelId.startsWith("bytedance")) return "bytedance";
  if (modelId.startsWith("sourceful/")) return "sourceful";
  if (modelId.startsWith("microsoft/")) return "microsoft";
  if (modelId.startsWith("krea/")) return "krea";
  if (modelId.startsWith("qwen/")) return "qwen";
  if (modelId.startsWith("x-ai/")) return "xai";
  if (modelId.startsWith("tencent/")) return "tencent";
  return "recraft";
}

function matchesImageCapability(modelId: string, capability: ImageCapabilityFilterKey | null): boolean {
  if (!capability) return true;
  const config = IMAGE_MODELS_MEDIA_CONFIG[modelId];
  if (!config) return true;
  if (capability === "generate") return config.canGenerate;
  if (capability === "edit_only") return !config.canGenerate && config.canEdit;
  if (capability === "vector") return modelId.includes("vector");
  if (capability === "4k") return Boolean(config.resolutions?.includes("4K"));
  if (capability === "multi_image") return config.maxInputImages > 1;
  return true;
}

export function filterImageModels(models: readonly ModelOption[], filter: ImageModelFilter): ModelOption[] {
  const searchTerm = filter.search.trim().toLowerCase();
  return models.filter((model) => {
    if (filter.category !== null && inferImageCategory(model.id) !== filter.category) return false;
    if (!matchesImageCapability(model.id, filter.capability)) return false;
    if (searchTerm) {
      const matchLabel = model.label.toLowerCase().includes(searchTerm);
      const matchDesc = model.description.toLowerCase().includes(searchTerm);
      const matchId = model.id.toLowerCase().includes(searchTerm);
      if (!matchLabel && !matchDesc && !matchId) return false;
    }
    return true;
  });
}

export function listAvailableImageCategories(models: readonly ModelOption[]): ImageModelCategory[] {
  const present = new Set(models.map((model) => inferImageCategory(model.id)));
  return IMAGE_CATEGORY_ORDER.filter((category) => present.has(category));
}

export interface ImageCategoryGroup {
  category: ImageModelCategory;
  label: string;
  models: ModelOption[];
}

export function groupImageModelsByCategory(models: readonly ModelOption[]): ImageCategoryGroup[] {
  return listAvailableImageCategories(models)
    .map((category) => ({
      category,
      label: IMAGE_CATEGORY_LABELS[category],
      models: models.filter((model) => inferImageCategory(model.id) === category),
    }))
    .filter((group) => group.models.length > 0);
}

export function countImageModelsByCategory(models: readonly ModelOption[] = IMAGE_MODELS): Record<string, number> {
  const tally: Record<string, number> = { all: models.length };
  for (const model of models) {
    const category = inferImageCategory(model.id);
    tally[category] = (tally[category] ?? 0) + 1;
  }
  return tally;
}
