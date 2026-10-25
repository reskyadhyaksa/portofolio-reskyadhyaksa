import type { ChatModelId, ImageModelId, VideoModelId } from "./chat-config";

export const CHAT_MODEL_SUMMARIES: Record<ChatModelId, string> = {
  "deepseek/deepseek-v4-pro-0813": "DeepSeek V4 Pro 0813 (reasoning).",
  "openai/gpt-5.6-terra": "GPT-5.6 Terra (vision, files, reasoning).",
  "free-models": "Free Models Router (vision, reasoning, free).",
  "dots-studio/dots-3-note-preview:free": "Dots3-Note Preview (free) (vision, reasoning, free).",
  "nvidia/nemotron-3-super-120b-a12b:free": "Nemotron 3 Super (free) (reasoning, free).",
  "nvidia/nemotron-3.5-lightning:free": "Nemotron 3.5 Lightning (free) (reasoning, free).",
  "nvidia/nemotron-3-ultra-550b-a55b:free": "Nemotron 3 Ultra (free) (reasoning, free).",
  "liquid/lfm-2.5-2.6b:free": "LFM2.5-2.6B (free) (reasoning, free).",
  "deepseek/deepseek-v4-flash-vision-exp": "DeepSeek V4 Flash Vision Exp (vision, reasoning).",
  "anthropic/claude-fable-5.1": "Claude Fable 5.1 (vision, files, reasoning).",
  "google/gemini-3.8-flash": "Gemini 3.8 Flash (vision, files, video, audio, reasoning).",
  "openai/gpt-6-astra": "GPT-6 Astra (vision, files, reasoning).",
  "deepseek/deepseek-v4.1-flash": "DeepSeek V4.1 Flash (vision, reasoning).",
  "cohere/north-mini-code:free": "North Mini Code (free) (reasoning, free).",
  "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free": "Nemotron 3 Nano Omni (free) (vision, video, audio, reasoning, free).",
  "poolside/laguna-xs-2.1:free": "Laguna XS 2.1 (free) (reasoning, free).",
  "poolside/laguna-s-2.1:free": "Laguna S 2.1 (free) (reasoning, free).",
  "nvidia/nemotron-3.5-content-safety:free": "Nemotron 3.5 Content Safety (free) (vision, reasoning, free).",
  "free-trial": "Free Models Router (vision, reasoning, free).",
  "anthropic/claude-opus-5.5": "Claude Opus 5.5 (vision, files, reasoning).",
  "openai/gpt-6-luna-pro": "GPT-6 Luna Pro (vision, files, reasoning).",
  "openai/gpt-6-sol-pro": "GPT-6 Sol Pro (vision, files, reasoning).",
  "anthropic/claude-sonnet-5.5": "Claude Sonnet 5.5 (vision, files, reasoning).",
  "openai/gpt-6.1-sol-pro": "GPT-6.1 Sol Pro (vision, files, reasoning).",
  "nvidia/switchyard": "Switchyard (free).",
  "anthropic/claude-haiku-5.5": "Claude Haiku 5.5 (vision, files, reasoning).",
  "google/gemini-4-argon": "Gemini 4 Argon (vision, files, video, audio, reasoning).",
  "nvidia/nemotron-3.5-super-vl:free": "Nemotron 3.5 Super VL (free) (vision, video, reasoning, free).",
  "xingchen-agi/xing4.0-29b-a4b:free": "Xing4.0 29B A4B (free) (reasoning, free).",
  "deepseek/deepseek-v4.1-flash-1017": "DeepSeek V4.1 Flash 1017 (vision, reasoning).",
  "recursive/flint-v1.0:free": "Flint (free) (reasoning, free).",
};

export const IMAGE_MODEL_SUMMARIES: Record<ImageModelId, string> = {
  "bytedance-seed/seedream-4.5": "Seedream 4.5 for high-quality text-to-image and image editing.",
  "bytedance-seed/seedream-5-0-pro": "Seedream 5.0 Pro for high-quality text-to-image and image editing.",
  "recraft/recraft-v4-pro": "Recraft V4 Pro for high-quality text-to-image and image editing.",
  "google/gemini-3.1-flash-image": "Gemini 3.1 Flash Image for high-quality text-to-image and image editing.",
  "google/gemini-3-pro-image": "Gemini 3 Pro Image for high-quality text-to-image and image editing.",
  "openai/gpt-image-2.5-flare": "GPT Image 2.5 Flare for high-quality text-to-image and image editing.",
  "openai/gpt-image-2": "GPT Image 2 for high-quality text-to-image and image editing.",
  "black-forest-labs/flux.2-pro": "FLUX.2 Pro for high-quality text-to-image and image editing.",
  "qwen/qwen-image-3": "Qwen Image 3 for high-quality text-to-image and image editing.",
};

export const VIDEO_MODEL_SUMMARIES: Record<VideoModelId, string> = {
  "google/veo-3.1": "Google Veo 3.1 for generative video with custom camera motion.",
  "google/veo-3.1-lite": "Google Veo 3.1 Lite for generative video with custom camera motion.",
  "bytedance/seedance-2.5": "Seedance 2.5 for generative video with custom camera motion.",
  "alibaba/wan-3.0": "Wan 3.0 for generative video with custom camera motion.",
  "kwaivgi/kling-v3.0-pro": "Kling v3.0 Pro for generative video with custom camera motion.",
  "runway/gen-4.5": "Runway Gen-4.5 for generative video with custom camera motion.",
  "minimax/hailuo-3": "MiniMax Hailuo 3 for generative video with custom camera motion.",
};

const MODEL_SUMMARIES: Readonly<Record<string, string>> = {
  ...CHAT_MODEL_SUMMARIES,
  ...IMAGE_MODEL_SUMMARIES,
  ...VIDEO_MODEL_SUMMARIES,
};

export function getModelSummary(modelId: string): string {
  return MODEL_SUMMARIES[modelId] ?? "";
}
