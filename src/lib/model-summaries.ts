import type { ChatModelId, ImageModelId } from "./chat-config";

export const CHAT_MODEL_SUMMARIES: Record<ChatModelId, string> = {
  "claude-fable-5": "Flagship reasoning for hard problems, long analysis, and detailed writing.",
  "claude-fable-5-1": "Refined Fable 5 with steadier answers on complex, multi-step work.",
  "gpt-6-astra": "Top-tier GPT for deep reasoning, coding, and research tasks.",
  "claude-opus-5": "Strong all-rounder for demanding coding and analysis.",
  "claude-opus-5-5": "Upgraded Opus with sharper reasoning on long, difficult tasks.",
  "gpt-5.6-sol": "Capable GPT for complex coding and structured problem solving.",
  "gpt-6-sol": "Newer Sol generation with more depth on complex requests.",
  "glm-5.3": "Large GLM model, solid for reasoning and multilingual work.",
  "gpt-6.1-sol": "Latest Sol, the highest quality in the Sol line.",
  "kimi-k3": "Long-context model suited to big documents and research.",
  "gpt-5.6-terra": "Balanced GPT for everyday work with good depth.",
  "gemini-3.7-flash": "Quick Gemini for fast replies, summaries, and light tasks.",
  "gemini-3.8-flash": "Newer Flash with faster, more accurate everyday answers.",
  "claude-sonnet-5": "Balanced Claude for writing, coding, and daily questions.",
  "claude-sonnet-5.5": "Improved Sonnet with better coding and instruction following.",
  "qwen-3.8-max": "Qwen flagship for reasoning, coding, and multilingual chat.",
  "claude-fable-cheap": "Lower-cost Fable tier for steady reasoning on a budget.",
  "deepseek-v4-pro": "Strong reasoning and coding at a moderate price.",
  "deepseek-v4-pro-0813": "Dated snapshot of V4 Pro for consistent results.",
  "claude-opus-cheap": "Budget Opus tier for heavier tasks without the top price.",
  "claude-sonnet-cheap": "Budget Sonnet tier for everyday chat and writing.",
  "claude-haiku-5-5": "Fastest Claude for short answers, quick edits, and chat.",
  "gpt-5.6-luna": "Very low-cost GPT for quick, simple questions.",
  "gpt-6-luna": "Newer Luna, cheap and fast for light everyday tasks.",
  "deepseek-v4.1-flash": "Fast, inexpensive replies for routine tasks.",
  "glm-5.3-flash": "Lightweight GLM for quick answers at low cost.",
  "deepseek-v4-flash": "Lowest-cost fast option for simple prompts and drafts.",
  "deepseek-v4-flash-0731": "Dated snapshot of V4 Flash for consistent results.",
};

export const IMAGE_MODEL_SUMMARIES: Record<ImageModelId, string> = {
  "gpt-image-2": "Generates 1024x1024 images from a text prompt.",
  "gpt-image-2.5": "Newer image model with finer detail and closer prompt matching.",
};

const MODEL_SUMMARIES: Readonly<Record<string, string>> = {
  ...CHAT_MODEL_SUMMARIES,
  ...IMAGE_MODEL_SUMMARIES,
};

export function getModelSummary(modelId: string): string {
  return MODEL_SUMMARIES[modelId] ?? "";
}
