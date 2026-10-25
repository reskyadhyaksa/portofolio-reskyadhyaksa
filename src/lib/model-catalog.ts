import { CHAT_MODELS, type ChatModelId, type ModelOption } from "./chat-config";

export type ModelProvider = "gemini" | "claude" | "gpt" | "deepseek" | "free";
export type ModelUsage = "fast" | "complex" | "daily";
export type CapabilityFilterKey = "image" | "file" | "video" | "audio" | "reasoning" | "free";

export interface ModelCapabilities {
  canReadImage: boolean;
  canReadFile: boolean;
  canReadVideo: boolean;
  canHearAudio: boolean;
  hasReasoning: boolean;
  isFree: boolean;
}

export interface CatalogModel extends ModelOption {
  provider: ModelProvider;
  usage: ModelUsage;
  capabilities: ModelCapabilities;
}

export const PROVIDER_LABELS: Record<ModelProvider, string> = {
  gemini: "Google Gemini",
  claude: "Anthropic Claude",
  gpt: "OpenAI GPT",
  deepseek: "DeepSeek",
  free: "Gratis (Free)",
};

export const USAGE_LABELS: Record<ModelUsage, string> = {
  fast: "Fast",
  complex: "Complex",
  daily: "Daily chat",
};

export const CAPABILITY_LABELS: Record<CapabilityFilterKey, string> = {
  image: "Baca Gambar",
  file: "Baca File",
  video: "Baca Video",
  audio: "Dengar Audio",
  reasoning: "Reasoning",
  free: "Model Gratis",
};

export const PROVIDER_ORDER: readonly ModelProvider[] = ["gemini", "claude", "gpt", "deepseek", "free"];
export const USAGE_ORDER: readonly ModelUsage[] = ["fast", "daily", "complex"];
export const CAPABILITY_ORDER: readonly CapabilityFilterKey[] = ["image", "file", "video", "audio", "reasoning", "free"];

export const CATALOG_CHAT_MODELS: readonly CatalogModel[] = [
  {
    id: "deepseek/deepseek-v4-pro-0813",
    label: "DeepSeek V4 Pro 0813",
    description: "In $0.66 · Out $1.98 / 1M",
    provider: "deepseek",
    usage: "complex",
    capabilities: {"canReadImage":false,"canReadFile":false,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":false},
  },
  {
    id: "openai/gpt-5.6-terra",
    label: "GPT-5.6 Terra",
    description: "In $2 · Out $12 / 1M",
    provider: "gpt",
    usage: "daily",
    capabilities: {"canReadImage":true,"canReadFile":true,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":false},
  },
  {
    id: "free-models",
    label: "Free Models Router",
    description: "Free model",
    provider: "free",
    usage: "daily",
    capabilities: {"canReadImage":true,"canReadFile":false,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":true},
  },
  {
    id: "dots-studio/dots-3-note-preview:free",
    label: "Dots3-Note Preview (free)",
    description: "Free model",
    provider: "free",
    usage: "daily",
    capabilities: {"canReadImage":true,"canReadFile":false,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":true},
  },
  {
    id: "nvidia/nemotron-3-super-120b-a12b:free",
    label: "Nemotron 3 Super (free)",
    description: "Free model",
    provider: "free",
    usage: "complex",
    capabilities: {"canReadImage":false,"canReadFile":false,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":true},
  },
  {
    id: "nvidia/nemotron-3.5-lightning:free",
    label: "Nemotron 3.5 Lightning (free)",
    description: "Free model",
    provider: "free",
    usage: "fast",
    capabilities: {"canReadImage":false,"canReadFile":false,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":true},
  },
  {
    id: "nvidia/nemotron-3-ultra-550b-a55b:free",
    label: "Nemotron 3 Ultra (free)",
    description: "Free model",
    provider: "free",
    usage: "complex",
    capabilities: {"canReadImage":false,"canReadFile":false,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":true},
  },
  {
    id: "liquid/lfm-2.5-2.6b:free",
    label: "LFM2.5-2.6B (free)",
    description: "Free model",
    provider: "free",
    usage: "fast",
    capabilities: {"canReadImage":false,"canReadFile":false,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":true},
  },
  {
    id: "deepseek/deepseek-v4-flash-vision-exp",
    label: "DeepSeek V4 Flash Vision Exp",
    description: "In $0.2156 · Out $0.6468 / 1M",
    provider: "deepseek",
    usage: "fast",
    capabilities: {"canReadImage":true,"canReadFile":false,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":false},
  },
  {
    id: "anthropic/claude-fable-5.1",
    label: "Claude Fable 5.1",
    description: "In $10 · Out $50 / 1M",
    provider: "claude",
    usage: "complex",
    capabilities: {"canReadImage":true,"canReadFile":true,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":false},
  },
  {
    id: "google/gemini-3.8-flash",
    label: "Gemini 3.8 Flash",
    description: "In $0.825 · Out $4.125 / 1M",
    provider: "gemini",
    usage: "fast",
    capabilities: {"canReadImage":true,"canReadFile":true,"canReadVideo":true,"canHearAudio":true,"hasReasoning":true,"isFree":false},
  },
  {
    id: "openai/gpt-6-astra",
    label: "GPT-6 Astra",
    description: "In $10 · Out $50 / 1M",
    provider: "gpt",
    usage: "complex",
    capabilities: {"canReadImage":true,"canReadFile":true,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":false},
  },
  {
    id: "deepseek/deepseek-v4.1-flash",
    label: "DeepSeek V4.1 Flash",
    description: "In $0.02 · Out $1 / 1M",
    provider: "deepseek",
    usage: "fast",
    capabilities: {"canReadImage":true,"canReadFile":false,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":false},
  },
  {
    id: "cohere/north-mini-code:free",
    label: "North Mini Code (free)",
    description: "Free model",
    provider: "free",
    usage: "fast",
    capabilities: {"canReadImage":false,"canReadFile":false,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":true},
  },
  {
    id: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
    label: "Nemotron 3 Nano Omni (free)",
    description: "Free model",
    provider: "free",
    usage: "daily",
    capabilities: {"canReadImage":true,"canReadFile":false,"canReadVideo":true,"canHearAudio":true,"hasReasoning":true,"isFree":true},
  },
  {
    id: "poolside/laguna-xs-2.1:free",
    label: "Laguna XS 2.1 (free)",
    description: "Free model",
    provider: "free",
    usage: "fast",
    capabilities: {"canReadImage":false,"canReadFile":false,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":true},
  },
  {
    id: "poolside/laguna-s-2.1:free",
    label: "Laguna S 2.1 (free)",
    description: "Free model",
    provider: "free",
    usage: "daily",
    capabilities: {"canReadImage":false,"canReadFile":false,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":true},
  },
  {
    id: "nvidia/nemotron-3.5-content-safety:free",
    label: "Nemotron 3.5 Content Safety (free)",
    description: "Free model",
    provider: "free",
    usage: "fast",
    capabilities: {"canReadImage":true,"canReadFile":false,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":true},
  },
  {
    id: "free-trial",
    label: "Free Models Router",
    description: "Free model",
    provider: "free",
    usage: "daily",
    capabilities: {"canReadImage":true,"canReadFile":false,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":true},
  },
  {
    id: "anthropic/claude-opus-5.5",
    label: "Claude Opus 5.5",
    description: "In $4 · Out $20 / 1M",
    provider: "claude",
    usage: "complex",
    capabilities: {"canReadImage":true,"canReadFile":true,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":false},
  },
  {
    id: "openai/gpt-6-luna-pro",
    label: "GPT-6 Luna Pro",
    description: "In $0.1 · Out $0.5 / 1M",
    provider: "gpt",
    usage: "fast",
    capabilities: {"canReadImage":true,"canReadFile":true,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":false},
  },
  {
    id: "openai/gpt-6-sol-pro",
    label: "GPT-6 Sol Pro",
    description: "In $2 · Out $10 / 1M",
    provider: "gpt",
    usage: "daily",
    capabilities: {"canReadImage":true,"canReadFile":true,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":false},
  },
  {
    id: "anthropic/claude-sonnet-5.5",
    label: "Claude Sonnet 5.5",
    description: "In $2 · Out $10 / 1M",
    provider: "claude",
    usage: "daily",
    capabilities: {"canReadImage":true,"canReadFile":true,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":false},
  },
  {
    id: "openai/gpt-6.1-sol-pro",
    label: "GPT-6.1 Sol Pro",
    description: "In $2 · Out $10 / 1M",
    provider: "gpt",
    usage: "complex",
    capabilities: {"canReadImage":true,"canReadFile":true,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":false},
  },
  {
    id: "nvidia/switchyard",
    label: "Switchyard",
    description: "Free model",
    provider: "free",
    usage: "fast",
    capabilities: {"canReadImage":false,"canReadFile":false,"canReadVideo":false,"canHearAudio":false,"hasReasoning":false,"isFree":true},
  },
  {
    id: "anthropic/claude-haiku-5.5",
    label: "Claude Haiku 5.5",
    description: "In $0.1 · Out $0.5 / 1M",
    provider: "claude",
    usage: "fast",
    capabilities: {"canReadImage":true,"canReadFile":true,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":false},
  },
  {
    id: "google/gemini-4-argon",
    label: "Gemini 4 Argon",
    description: "In $2 · Out $10 / 1M",
    provider: "gemini",
    usage: "complex",
    capabilities: {"canReadImage":true,"canReadFile":true,"canReadVideo":true,"canHearAudio":true,"hasReasoning":true,"isFree":false},
  },
  {
    id: "nvidia/nemotron-3.5-super-vl:free",
    label: "Nemotron 3.5 Super VL (free)",
    description: "Free model",
    provider: "free",
    usage: "complex",
    capabilities: {"canReadImage":true,"canReadFile":false,"canReadVideo":true,"canHearAudio":false,"hasReasoning":true,"isFree":true},
  },
  {
    id: "xingchen-agi/xing4.0-29b-a4b:free",
    label: "Xing4.0 29B A4B (free)",
    description: "Free model",
    provider: "free",
    usage: "daily",
    capabilities: {"canReadImage":false,"canReadFile":false,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":true},
  },
  {
    id: "deepseek/deepseek-v4.1-flash-1017",
    label: "DeepSeek V4.1 Flash 1017",
    description: "In $0.15 · Out $0.6 / 1M",
    provider: "deepseek",
    usage: "fast",
    capabilities: {"canReadImage":true,"canReadFile":false,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":false},
  },
  {
    id: "recursive/flint-v1.0:free",
    label: "Flint (free)",
    description: "Free model",
    provider: "free",
    usage: "daily",
    capabilities: {"canReadImage":false,"canReadFile":false,"canReadVideo":false,"canHearAudio":false,"hasReasoning":true,"isFree":true},
  },
];

export function findModelProvider(modelId: string | null | undefined): ModelProvider | null {
  if (!modelId) return null;
  const match = CATALOG_CHAT_MODELS.find((model) => model.id === modelId);
  return match ? match.provider : null;
}
