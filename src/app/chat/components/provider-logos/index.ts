import type { ModelProvider } from "@/lib/model-catalog";
import { CLAUDE_LOGO_PATHS } from "./claude";
import { DEEPSEEK_LOGO_PATHS } from "./deepseek";
import { GEMINI_LOGO_PATHS } from "./gemini";
import { KIMI_LOGO_PATHS } from "./kimi";
import { OPENAI_LOGO_PATHS } from "./openai";
import { QWEN_LOGO_PATHS } from "./qwen";
import { ZHIPU_LOGO_PATHS } from "./zhipu";

export interface ProviderLogo {
  paths: readonly string[];
  tintClassName: string;
}

export const PROVIDER_LOGOS: Record<ModelProvider, ProviderLogo> = {
  claude: { paths: CLAUDE_LOGO_PATHS, tintClassName: "text-[#e08a6a]" },
  gemini: { paths: GEMINI_LOGO_PATHS, tintClassName: "text-[#8ab4f8]" },
  gpt: { paths: OPENAI_LOGO_PATHS, tintClassName: "text-[#e8eaed]" },
  deepseek: { paths: DEEPSEEK_LOGO_PATHS, tintClassName: "text-[#6d8bff]" },
  glm: { paths: ZHIPU_LOGO_PATHS, tintClassName: "text-[#9db4ff]" },
  kimi: { paths: KIMI_LOGO_PATHS, tintClassName: "text-[#5fb0ff]" },
  qwen: { paths: QWEN_LOGO_PATHS, tintClassName: "text-[#b39dff]" },
};
