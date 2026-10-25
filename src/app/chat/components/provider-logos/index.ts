import type { ModelProvider } from "@/lib/model-catalog";
import { CLAUDE_LOGO_PATHS } from "./claude";
import { DEEPSEEK_LOGO_PATHS } from "./deepseek";
import { GEMINI_LOGO_PATHS } from "./gemini";
import { OPENAI_LOGO_PATHS } from "./openai";

export interface ProviderLogo {
  paths: readonly string[];
  tintClassName: string;
}

const FREE_LOGO_PATHS = [
  "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z",
] as const;

export const PROVIDER_LOGOS: Record<ModelProvider, ProviderLogo> = {
  gemini: { paths: GEMINI_LOGO_PATHS, tintClassName: "text-[#8ab4f8]" },
  claude: { paths: CLAUDE_LOGO_PATHS, tintClassName: "text-[#e08a6a]" },
  gpt: { paths: OPENAI_LOGO_PATHS, tintClassName: "text-[#e8eaed]" },
  deepseek: { paths: DEEPSEEK_LOGO_PATHS, tintClassName: "text-[#6d8bff]" },
  free: { paths: FREE_LOGO_PATHS, tintClassName: "text-emerald-400" },
};
