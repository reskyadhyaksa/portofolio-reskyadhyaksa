export interface ModelOption {
  id: string;
  label: string;
  description: string;
}

export const CHAT_MODELS = [
  { id: "claude-fable-5", label: "Claude Fable 5", description: "In $7.00 · Out $25.00 / 1M" },
  { id: "claude-fable-5-1", label: "Claude Fable 5.1", description: "In $7.00 · Out $25.00 / 1M" },
  { id: "gpt-6-astra", label: "GPT-6 Astra", description: "In $8.00 · Out $25.00 / 1M" },
  { id: "claude-opus-5", label: "Claude Opus 5", description: "In $4.00 · Out $20.00 / 1M" },
  { id: "claude-opus-5-5", label: "Claude Opus 5.5", description: "In $4.00 · Out $20.00 / 1M" },
  { id: "gpt-5.6-sol", label: "GPT-5.6 Sol", description: "In $5.00 · Out $20.00 / 1M" },
  { id: "gpt-6-sol", label: "GPT-6 Sol", description: "In $4.00 · Out $20.00 / 1M" },
  { id: "glm-5.3", label: "GLM 5.3", description: "In $3.00 · Out $15.00 / 1M" },
  { id: "gpt-6.1-sol", label: "GPT-6.1 Sol", description: "In $5.00 · Out $15.00 / 1M" },
  { id: "kimi-k3", label: "Kimi K3", description: "In $3.00 · Out $15.00 / 1M" },
  { id: "gpt-5.6-terra", label: "GPT-5.6 Terra", description: "In $2.00 · Out $12.00 / 1M" },
  { id: "gemini-3.7-flash", label: "Gemini 3.7 Flash", description: "In $1.50 · Out $7.50 / 1M" },
  { id: "gemini-3.8-flash", label: "Gemini 3.8 Flash", description: "In $1.50 · Out $7.50 / 1M" },
  { id: "claude-sonnet-5", label: "Claude Sonnet 5", description: "In $1.80 · Out $7.00 / 1M" },
  { id: "claude-sonnet-5.5", label: "Claude Sonnet 5.5", description: "In $1.80 · Out $7.00 / 1M" },
  { id: "qwen-3.8-max", label: "Qwen 3.8 Max", description: "In $2.00 · Out $6.00 / 1M" },
  { id: "claude-fable-cheap", label: "Claude Fable Cheap", description: "In $3.00 · Out $5.00 / 1M" },
  { id: "deepseek-v4-pro", label: "DeepSeek V4 Pro", description: "In $1.50 · Out $4.00 / 1M" },
  { id: "deepseek-v4-pro-0813", label: "DeepSeek V4 Pro 0813", description: "In $1.50 · Out $4.00 / 1M" },
  { id: "claude-opus-cheap", label: "Claude Opus Cheap", description: "In $2.00 · Out $4.00 / 1M" },
  { id: "claude-sonnet-cheap", label: "Claude Sonnet Cheap", description: "In $1.00 · Out $3.00 / 1M" },
  { id: "claude-haiku-5-5", label: "Claude Haiku 5.5", description: "In $0.50 · Out $2.50 / 1M" },
  { id: "gpt-5.6-luna", label: "GPT-5.6 Luna", description: "In $0.20 · Out $1.20 / 1M" },
  { id: "gpt-6-luna", label: "GPT-6 Luna", description: "In $0.20 · Out $1.20 / 1M" },
  { id: "deepseek-v4.1-flash", label: "DeepSeek V4.1 Flash", description: "In $0.50 · Out $1.00 / 1M" },
  { id: "glm-5.3-flash", label: "GLM 5.3 Flash", description: "In $0.50 · Out $1.00 / 1M" },
  { id: "deepseek-v4-flash", label: "DeepSeek V4 Flash", description: "In $0.44 · Out $0.84 / 1M" },
  { id: "deepseek-v4-flash-0731", label: "DeepSeek V4 Flash 0731", description: "In $0.44 · Out $0.84 / 1M" },
] as const satisfies readonly ModelOption[];

export const IMAGE_MODELS = [
  { id: "gpt-image-2", label: "GPT Image 2", description: "Image generation · $1.00" },
  { id: "gpt-image-2.5", label: "GPT Image 2.5", description: "Image generation · $1.50" },
] as const satisfies readonly ModelOption[];

export type ChatModelId = (typeof CHAT_MODELS)[number]["id"];
export type ImageModelId = (typeof IMAGE_MODELS)[number]["id"];

export const DEFAULT_MODEL_ID: ChatModelId = "gpt-6-luna";
export const DEFAULT_IMAGE_MODEL_ID: ImageModelId = "gpt-image-2";
export const GENERATED_IMAGE_REPLY = "Here is your generated image.";

export const SESSION_HEADER = "x-session-id";
export const SESSION_STORAGE_KEY = "chat-session-id";
export const SESSION_LIST_STORAGE_KEY = "chat-session-ids";
export const MAX_TRACKED_SESSIONS = 50;

export const MESSAGE_TTL_HOURS = 2;
export const MESSAGE_TTL_MS = MESSAGE_TTL_HOURS * 60 * 60 * 1000;

export const MAX_MESSAGE_LENGTH = 8000;
export const MAX_HISTORY_MESSAGES = 30;
export const RECENT_CONTEXT_MESSAGES = 6;
export const SUMMARY_TRIGGER_MESSAGES = 10;
export const MAX_SUMMARY_CHARS = 2000;
export const MAX_CONVERSATION_TITLE_CHARS = 60;
export const MAX_IMAGE_PROMPT_LENGTH = 1000;
export const MAX_ATTACHMENTS_PER_MESSAGE = 4;
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const MAX_DOCUMENT_CONTEXT_CHARS = 12000;
export const UPSTREAM_TIMEOUT_MS = 60000;
export const CLIENT_IMAGE_MAX_DIMENSION = 1600;
export const CLIENT_IMAGE_QUALITY = 0.82;
export const CLIENT_IMAGE_COMPRESS_MIN_BYTES = 300 * 1024;
export const CLIENT_MAX_SOURCE_BYTES = 50 * 1024 * 1024;
export const BALANCE_CACHE_TTL_MS = 15000;

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
