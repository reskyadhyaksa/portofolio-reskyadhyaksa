export interface ModelOption {
  id: string;
  label: string;
  description: string;
}

export const CHAT_MODELS = [
  { id: "deepseek/deepseek-v4-pro-0813", label: "DeepSeek V4 Pro 0813", description: "In $0.66 · Out $1.98 / 1M" },
  { id: "openai/gpt-5.6-terra", label: "GPT-5.6 Terra", description: "In $2 · Out $12 / 1M" },
  { id: "free-models", label: "Free Models Router", description: "Free model" },
  { id: "dots-studio/dots-3-note-preview:free", label: "Dots3-Note Preview (free)", description: "Free model" },
  { id: "nvidia/nemotron-3-super-120b-a12b:free", label: "Nemotron 3 Super (free)", description: "Free model" },
  { id: "nvidia/nemotron-3.5-lightning:free", label: "Nemotron 3.5 Lightning (free)", description: "Free model" },
  { id: "nvidia/nemotron-3-ultra-550b-a55b:free", label: "Nemotron 3 Ultra (free)", description: "Free model" },
  { id: "liquid/lfm-2.5-2.6b:free", label: "LFM2.5-2.6B (free)", description: "Free model" },
  { id: "deepseek/deepseek-v4-flash-vision-exp", label: "DeepSeek V4 Flash Vision Exp", description: "In $0.2156 · Out $0.6468 / 1M" },
  { id: "anthropic/claude-fable-5.1", label: "Claude Fable 5.1", description: "In $10 · Out $50 / 1M" },
  { id: "google/gemini-3.8-flash", label: "Gemini 3.8 Flash", description: "In $0.825 · Out $4.125 / 1M" },
  { id: "openai/gpt-6-astra", label: "GPT-6 Astra", description: "In $10 · Out $50 / 1M" },
  { id: "deepseek/deepseek-v4.1-flash", label: "DeepSeek V4.1 Flash", description: "In $0.02 · Out $1 / 1M" },
  { id: "cohere/north-mini-code:free", label: "North Mini Code (free)", description: "Free model" },
  { id: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free", label: "Nemotron 3 Nano Omni (free)", description: "Free model" },
  { id: "poolside/laguna-xs-2.1:free", label: "Laguna XS 2.1 (free)", description: "Free model" },
  { id: "poolside/laguna-s-2.1:free", label: "Laguna S 2.1 (free)", description: "Free model" },
  { id: "nvidia/nemotron-3.5-content-safety:free", label: "Nemotron 3.5 Content Safety (free)", description: "Free model" },
  { id: "free-trial", label: "Free Models Router", description: "Free model" },
  { id: "anthropic/claude-opus-5.5", label: "Claude Opus 5.5", description: "In $4 · Out $20 / 1M" },
  { id: "openai/gpt-6-luna-pro", label: "GPT-6 Luna Pro", description: "In $0.1 · Out $0.5 / 1M" },
  { id: "openai/gpt-6-sol-pro", label: "GPT-6 Sol Pro", description: "In $2 · Out $10 / 1M" },
  { id: "anthropic/claude-sonnet-5.5", label: "Claude Sonnet 5.5", description: "In $2 · Out $10 / 1M" },
  { id: "openai/gpt-6.1-sol-pro", label: "GPT-6.1 Sol Pro", description: "In $2 · Out $10 / 1M" },
  { id: "nvidia/switchyard", label: "Switchyard", description: "Free model" },
  { id: "anthropic/claude-haiku-5.5", label: "Claude Haiku 5.5", description: "In $0.1 · Out $0.5 / 1M" },
  { id: "google/gemini-4-argon", label: "Gemini 4 Argon", description: "In $2 · Out $10 / 1M" },
  { id: "nvidia/nemotron-3.5-super-vl:free", label: "Nemotron 3.5 Super VL (free)", description: "Free model" },
  { id: "xingchen-agi/xing4.0-29b-a4b:free", label: "Xing4.0 29B A4B (free)", description: "Free model" },
  { id: "deepseek/deepseek-v4.1-flash-1017", label: "DeepSeek V4.1 Flash 1017", description: "In $0.15 · Out $0.6 / 1M" },
  { id: "recursive/flint-v1.0:free", label: "Flint (free)", description: "Free model" },
] as const satisfies readonly ModelOption[];

export const IMAGE_MODELS = [
  { id: "recraft/recraft-v4", label: "Recraft V4", description: "Generate & edit · Design, vector & raster" },
  { id: "black-forest-labs/flux.2-flex", label: "FLUX.2 Flex", description: "Generate & edit · Flexible aspect FLUX" },
  { id: "black-forest-labs/flux.2-klein-4b", label: "FLUX.2 Klein 4B", description: "Generate & edit · Fast compact 4B FLUX" },
  { id: "x-ai/grok-imagine-image-2.0", label: "Grok Imagine Image 2.0", description: "Generate & edit · 1K, 2K xAI image" },
  { id: "recraft/recraft-v4-vector", label: "Recraft V4 Vector", description: "Generate & edit · Vector illustration" },
  { id: "recraft/recraft-v4.1-pro-vector", label: "Recraft V4.1 Pro Vector", description: "Generate & edit · Professional vector design" },
  { id: "qwen/qwen-image-3", label: "Qwen Image 3", description: "Generate & edit · 1K, 2K multilingual" },
  { id: "krea/krea-2-medium", label: "Krea 2 Medium", description: "Generate & edit · 1K aesthetic generation" },
  { id: "sourceful/riverflow-v2.5-fast", label: "Riverflow V2.5 Fast", description: "Generate & edit · 1K, 2K ultra-fast" },
  { id: "recraft/recraft-v4.1", label: "Recraft V4.1", description: "Generate & edit · Refined raster & vector" },
  { id: "krea/krea-2-medium-turbo", label: "Krea 2 Medium Turbo", description: "Generate & edit · 1K real-time turbo" },
  { id: "bytedance-seed/seedream-4.5", label: "Seedream 4.5", description: "Generate & edit · 1K-4K multi-aspect" },
  { id: "bytedance-seed/seedream-5-0-lite", label: "Seedream 5.0 Lite", description: "Generate & edit · 2K, 4K high efficiency" },
  { id: "sourceful/riverflow-v2-fast", label: "Riverflow V2 Fast", description: "Generate & edit · 1K-4K rapid generation" },
  { id: "qwen/qwen-image-3-pro", label: "Qwen Image 3 Pro", description: "Generate & edit · 1K, 2K flagship Qwen" },
  { id: "recraft/recraft-v4-pro", label: "Recraft V4 Pro", description: "Generate & edit · Studio grade Recraft" },
  { id: "recraft/recraft-v4-pro-vector", label: "Recraft V4 Pro Vector", description: "Generate & edit · Studio vector graphics" },
  { id: "bytedance-seed/seedream-5-0-pro", label: "Seedream 5.0 Pro", description: "Generate & edit · 1K, 2K flagship studio" },
  { id: "recraft/recraft-v4-styles-pro", label: "Recraft V4 Styles Pro", description: "Edit Only · Advanced artistic styles transfer" },
  { id: "openai/gpt-image-2.5-flare", label: "GPT Image 2.5 Flare", description: "Generate & edit · Next-gen photorealism" },
  { id: "openai/gpt-image-2.5-sunburst", label: "GPT Image 2.5 Sunburst", description: "Generate & edit · High dynamic range lighting" },
  { id: "recraft/recraft-v4-styles", label: "Recraft V4 Styles", description: "Edit Only · Style transfer & customization" },
  { id: "krea/krea-2-large", label: "Krea 2 Large", description: "Generate & edit · 1K high quality canvas" },
  { id: "recraft/recraft-v4.1-vector", label: "Recraft V4.1 Vector", description: "Generate & edit · Clean scalable vector art" },
  { id: "black-forest-labs/flux.2-max", label: "FLUX.2 Max", description: "Generate & edit · Maximum capacity FLUX" },
  { id: "black-forest-labs/flux.2-pro", label: "FLUX.2 Pro", description: "Generate & edit · Flagship FLUX studio" },
  { id: "x-ai/grok-imagine-image-quality", label: "Grok Imagine Image Quality", description: "Generate & edit · 1K, 2K enhanced detail" },
  { id: "recraft/recraft-v4.1-utility", label: "Recraft V4.1 Utility", description: "Generate & edit · Fast utility generation" },
  { id: "recraft/recraft-v4.1-utility-pro", label: "Recraft V4.1 Utility Pro", description: "Generate & edit · Professional utility toolkit" },
  { id: "sourceful/riverflow-v2.5-pro", label: "Riverflow V2.5 Pro", description: "Generate & edit · 1K-4K master studio" },
  { id: "microsoft/mai-image-2.6", label: "MAI-Image-2.6", description: "Generate & edit · Microsoft AI flagship" },
  { id: "microsoft/mai-image-2.6-flash", label: "MAI-Image-2.6 Flash", description: "Generate & edit · High speed Microsoft AI" },
  { id: "recraft/recraft-v4-styles-pro-vector", label: "Recraft V4 Styles Pro Vector", description: "Edit Only · Pro vector stylization" },
  { id: "recraft/recraft-v4-styles-vector", label: "Recraft V4 Styles Vector", description: "Edit Only · Vector style transformation" },
  { id: "recraft/recraft-v4.1-pro", label: "Recraft V4.1 Pro", description: "Generate & edit · State-of-the-art Recraft" },
  { id: "sourceful/riverflow-v2-pro", label: "Riverflow V2 Pro", description: "Generate & edit · 1K-4K professional" },
  { id: "recraft/recraft-v3", label: "Recraft V3", description: "Generate & edit · Proven design generator" },
  { id: "recraft/recraft-v4.1-flash", label: "Recraft V4.1 Flash", description: "Generate Only · Instant generation" },
  { id: "openai/gpt-image-2", label: "GPT Image 2", description: "Generate & edit · Reliable GPT image model" },
  { id: "microsoft/mai-image-2.5-pro", label: "MAI-Image-2.5 Pro", description: "Generate & edit · High precision enterprise" },
  { id: "openai/gpt-5.4-image-2", label: "GPT-5.4 Image 2", description: "Generate & edit · Advanced reasoning vision" },
  { id: "google/gemini-3.1-flash-image", label: "Nano Banana 2 (Gemini 3.1 Flash Image)", description: "Generate & edit · 512-4K multimodal image" },
  { id: "openai/gpt-image-1", label: "GPT Image 1", description: "Generate & edit · Classic OpenAI image model" },
  { id: "openai/gpt-5-image", label: "GPT-5 Image", description: "Generate & edit · Next-gen foundation image" },
  { id: "google/gemini-3.1-flash-lite-image", label: "Nano Banana 2 Lite (Gemini 3.1 Flash Lite Image)", description: "Generate & edit · 1K lightweight multimodal" },
  { id: "google/gemini-3-pro-image", label: "Nano Banana Pro (Gemini 3 Pro Image)", description: "Generate & edit · 1K-4K high fidelity pro" },
  { id: "google/gemini-2.5-flash-image", label: "Nano Banana (Gemini 2.5 Flash Image)", description: "Generate & edit · Fast Google image AI" },
  { id: "openai/gpt-image-1-mini", label: "GPT Image 1 Mini", description: "Generate & edit · Lightweight OpenAI image" },
  { id: "openai/gpt-5-image-mini", label: "GPT-5 Image Mini", description: "Generate & edit · Fast efficient GPT-5 vision" },
  { id: "microsoft/mai-image-2.5", label: "MAI-Image-2.5", description: "Generate & edit · Balanced Microsoft image model" },
  { id: "tencent/hy-image-v3.5-preview", label: "Hy Image 3.5 Preview", description: "Generate & edit · 1K-4K high resolution Hunyuan" },
  { id: "google/gemini-nano-banana-2.1", label: "Nano Banana 2.1", description: "Generate & edit · 1K-4K versatile Google model" },
  { id: "bytedance-seed/seedream-5-0-flash", label: "Seedream 5.0 Flash", description: "Generate & edit · 1K, 2K lightning fast" },
  { id: "black-forest-labs/flux-3-image", label: "FLUX 3 Image", description: "Generate & edit · 768-4K cutting-edge FLUX" },
] as const satisfies readonly ModelOption[];

export const VIDEO_MODELS = [
  { id: "google/veo-3.1", label: "Google Veo 3.1", description: "Cinematic 1080p video generation" },
  { id: "google/veo-3.1-lite", label: "Google Veo 3.1 Lite", description: "Fast cinematic video generation" },
  { id: "bytedance/seedance-2.5", label: "Seedance 2.5", description: "Dynamic camera motion & realism" },
  { id: "alibaba/wan-3.0", label: "Wan 3.0", description: "High-definition multi-ratio video" },
  { id: "kwaivgi/kling-v3.0-pro", label: "Kling v3.0 Pro", description: "Realistic physical motion simulation" },
  { id: "runway/gen-4.5", label: "Runway Gen-4.5", description: "Creative studio VFX video" },
  { id: "minimax/hailuo-3", label: "MiniMax Hailuo 3", description: "Expressive motion & character video" },
] as const satisfies readonly ModelOption[];

export type ChatModelId = (typeof CHAT_MODELS)[number]["id"];
export type ImageModelId = (typeof IMAGE_MODELS)[number]["id"];
export type VideoModelId = (typeof VIDEO_MODELS)[number]["id"];

export const DEFAULT_MODEL_ID: ChatModelId = "google/gemini-3.8-flash";
export const DEFAULT_IMAGE_MODEL_ID: ImageModelId = "bytedance-seed/seedream-4.5";
export const DEFAULT_VIDEO_MODEL_ID: VideoModelId = "google/veo-3.1";
export const GENERATED_IMAGE_REPLY = "Here is your generated image.";
export const GENERATED_VIDEO_REPLY = "Here is your generated video.";

export const SESSION_HEADER = "x-session-id";
export const SESSION_STORAGE_KEY = "chat-session-id";
export const SESSION_LIST_STORAGE_KEY = "chat-session-ids";
export const MAX_TRACKED_SESSIONS = 50;

export const MESSAGE_TTL_HOURS = 2;
export const MESSAGE_TTL_MS = MESSAGE_TTL_HOURS * 60 * 60 * 1000;

export const MAX_MESSAGE_LENGTH = 25000;
export const MAX_HISTORY_MESSAGES = 30;
export const RECENT_CONTEXT_MESSAGES = 6;
export const SUMMARY_TRIGGER_MESSAGES = 10;
export const MAX_SUMMARY_CHARS = 2000;
export const MAX_CONVERSATION_TITLE_CHARS = 60;
export const MAX_IMAGE_PROMPT_LENGTH = 1000;
export const MAX_VIDEO_PROMPT_LENGTH = 1000;
export const MAX_ATTACHMENTS_PER_MESSAGE = 4;
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const MAX_DOCUMENT_CONTEXT_CHARS = 12000;
export const UPSTREAM_TIMEOUT_MS = 60000;
export const STREAM_IDLE_TIMEOUT_MS = 60000;
export const CLIENT_IMAGE_MAX_DIMENSION = 1600;
export const CLIENT_IMAGE_QUALITY = 0.82;
export const CLIENT_IMAGE_COMPRESS_MIN_BYTES = 300 * 1024;
export const CLIENT_MAX_SOURCE_BYTES = 50 * 1024 * 1024;

export const UPLOAD_PUBLIC_PREFIX = "/uploads/";

export const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "gif", "webp"] as const;
export const DOCUMENT_EXTENSIONS = ["pdf", "docx", "doc", "txt", "md", "csv", "json"] as const;
export const CODE_EXTENSIONS = [
  "ts", "tsx", "js", "jsx", "mjs", "cjs", "vue", "svelte",
  "py", "rb", "php", "go", "rs", "java", "kt", "swift", "dart", "lua", "r",
  "c", "h", "cpp", "hpp", "cs",
  "sql", "sh", "ps1",
  "html", "css", "scss", "xml", "yaml", "yml", "toml", "ini", "log",
] as const;
export const TEXT_READABLE_EXTENSIONS = ["txt", "md", "csv", "json", ...CODE_EXTENSIONS] as const;
export const CODE_FILE_BINARY_PROBE_BYTES = 8192;

export const ACCEPTED_FILE_INPUT = [...IMAGE_EXTENSIONS, ...DOCUMENT_EXTENSIONS, ...CODE_EXTENSIONS]
  .map((extension) => `.${extension}`)
  .join(",");

export function isSupportedModel(modelId: unknown): modelId is ChatModelId {
  return CHAT_MODELS.some((model) => model.id === modelId);
}

export function isSupportedImageModel(modelId: unknown): modelId is ImageModelId {
  return IMAGE_MODELS.some((model) => model.id === modelId);
}

export function isSupportedVideoModel(modelId: unknown): modelId is VideoModelId {
  return VIDEO_MODELS.some((model) => model.id === modelId);
}
