import { CHAT_MODELS, type ChatModelId, type ModelOption } from "./chat-config";

export type ModelProvider = "claude" | "gemini" | "gpt" | "deepseek" | "glm" | "kimi" | "qwen";
export type ModelUsage = "fast" | "complex" | "daily";

export interface CatalogModel extends ModelOption {
  provider: ModelProvider;
  usage: ModelUsage;
}

export const PROVIDER_LABELS: Record<ModelProvider, string> = {
  claude: "Claude",
  gemini: "Gemini",
  gpt: "GPT",
  deepseek: "DeepSeek",
  glm: "GLM",
  kimi: "Kimi",
  qwen: "Qwen",
};

export const USAGE_LABELS: Record<ModelUsage, string> = {
  fast: "Fast",
  complex: "Complex",
  daily: "Daily chat",
};

export const PROVIDER_ORDER: readonly ModelProvider[] = ["claude", "gemini", "gpt", "deepseek", "glm", "kimi", "qwen"];
export const USAGE_ORDER: readonly ModelUsage[] = ["fast", "daily", "complex"];

const PROVIDER_ID_PREFIXES: ReadonlyArray<readonly [string, ModelProvider]> = [
  ["claude-", "claude"],
  ["gemini-", "gemini"],
  ["gpt-", "gpt"],
  ["deepseek-", "deepseek"],
  ["glm-", "glm"],
  ["kimi-", "kimi"],
  ["qwen-", "qwen"],
];

const FAST_MODEL_IDS: ReadonlySet<string> = new Set<ChatModelId>([
  "gemini-3.7-flash",
  "gemini-3.8-flash",
  "claude-haiku-5-5",
  "gpt-5.6-luna",
  "gpt-6-luna",
  "deepseek-v4.1-flash",
  "deepseek-v4-flash",
  "deepseek-v4-flash-0731",
  "glm-5.3-flash",
]);

const COMPLEX_MODEL_IDS: ReadonlySet<string> = new Set<ChatModelId>([
  "claude-fable-5",
  "claude-fable-5-1",
  "claude-opus-5",
  "claude-opus-5-5",
  "gpt-6-astra",
  "gpt-5.6-sol",
  "gpt-6-sol",
  "gpt-6.1-sol",
  "glm-5.3",
  "kimi-k3",
  "qwen-3.8-max",
  "deepseek-v4-pro",
  "deepseek-v4-pro-0813",
]);

export function findModelProvider(modelId: string | null | undefined): ModelProvider | null {
  if (!modelId) return null;
  const match = PROVIDER_ID_PREFIXES.find(([prefix]) => modelId.startsWith(prefix));
  return match ? match[1] : null;
}

function resolveProvider(modelId: string): ModelProvider {
  return findModelProvider(modelId) ?? "gpt";
}

function resolveUsage(modelId: string): ModelUsage {
  if (FAST_MODEL_IDS.has(modelId)) return "fast";
  if (COMPLEX_MODEL_IDS.has(modelId)) return "complex";
  return "daily";
}

export const CATALOG_CHAT_MODELS: readonly CatalogModel[] = CHAT_MODELS.map((model) => ({
  ...model,
  provider: resolveProvider(model.id),
  usage: resolveUsage(model.id),
}));
