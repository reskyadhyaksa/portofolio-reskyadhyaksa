export interface ImageModelMediaConfig {
  id: string;
  label: string;
  canGenerate: boolean;
  canEdit: boolean;
  maxInputImages: number;
  aspectRatios: readonly string[];
  resolutions: readonly string[] | null;
  defaultAspectRatio: string;
  defaultResolution: string | null;
}

export interface VideoModelMediaConfig {
  id: string;
  label: string;
  canGenerate: boolean;
  aspectRatios: readonly string[];
  resolutions: readonly string[];
  durations: readonly number[];
  defaultDuration: number;
  defaultAspectRatio: string;
  defaultResolution: string;
  maxInputImages: number | null;
}

const DEFAULT_IMAGE_CONFIG: ImageModelMediaConfig = {
  id: "default",
  label: "Default Image Model",
  canGenerate: true,
  canEdit: true,
  maxInputImages: 1,
  aspectRatios: ["1:1", "16:9", "9:16", "4:3"],
  resolutions: ["1K"],
  defaultAspectRatio: "1:1",
  defaultResolution: "1K",
};

const DEFAULT_VIDEO_CONFIG: VideoModelMediaConfig = {
  id: "default",
  label: "Default Video Model",
  canGenerate: true,
  aspectRatios: ["16:9", "9:16"],
  resolutions: ["720p"],
  durations: [5],
  defaultDuration: 5,
  defaultAspectRatio: "16:9",
  defaultResolution: "720p",
  maxInputImages: null,
};

export const IMAGE_MODELS_MEDIA_CONFIG: Record<string, ImageModelMediaConfig> = {
  "bytedance-seed/seedream-4.5": {
    id: "bytedance-seed/seedream-4.5",
    label: "Seedream 4.5",
    canGenerate: true,
    canEdit: true,
    maxInputImages: 14,
    aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3", "21:9", "9:21", "2:1", "1:2"],
    resolutions: ["1K", "2K", "4K"],
    defaultAspectRatio: "1:1",
    defaultResolution: "1K",
  },
  "bytedance-seed/seedream-5-0-pro": {
    id: "bytedance-seed/seedream-5-0-pro",
    label: "Seedream 5.0 Pro",
    canGenerate: true,
    canEdit: true,
    maxInputImages: 14,
    aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3", "21:9", "9:21", "2:1", "1:2"],
    resolutions: ["1K", "2K"],
    defaultAspectRatio: "1:1",
    defaultResolution: "1K",
  },
  "recraft/recraft-v4-pro": {
    id: "recraft/recraft-v4-pro",
    label: "Recraft V4 Pro",
    canGenerate: true,
    canEdit: true,
    maxInputImages: 1,
    aspectRatios: ["1:1", "4:3", "3:4", "16:9", "9:16"],
    resolutions: null,
    defaultAspectRatio: "1:1",
    defaultResolution: null,
  },
  "google/gemini-3.1-flash-image": {
    id: "google/gemini-3.1-flash-image",
    label: "Gemini 3.1 Flash Image",
    canGenerate: true,
    canEdit: true,
    maxInputImages: 14,
    aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3", "21:9", "4:5", "5:4"],
    resolutions: ["512", "1K", "2K", "4K"],
    defaultAspectRatio: "1:1",
    defaultResolution: "512",
  },
  "google/gemini-3-pro-image": {
    id: "google/gemini-3-pro-image",
    label: "Gemini 3 Pro Image",
    canGenerate: true,
    canEdit: true,
    maxInputImages: 14,
    aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3", "21:9", "4:5", "5:4"],
    resolutions: ["1K", "2K", "4K"],
    defaultAspectRatio: "1:1",
    defaultResolution: "1K",
  },
  "openai/gpt-image-2.5-flare": {
    id: "openai/gpt-image-2.5-flare",
    label: "GPT Image 2.5 Flare",
    canGenerate: true,
    canEdit: true,
    maxInputImages: 16,
    aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3", "21:9"],
    resolutions: null,
    defaultAspectRatio: "1:1",
    defaultResolution: null,
  },
  "openai/gpt-image-2": {
    id: "openai/gpt-image-2",
    label: "GPT Image 2",
    canGenerate: true,
    canEdit: true,
    maxInputImages: 16,
    aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3", "21:9"],
    resolutions: null,
    defaultAspectRatio: "1:1",
    defaultResolution: null,
  },
  "black-forest-labs/flux.2-pro": {
    id: "black-forest-labs/flux.2-pro",
    label: "FLUX.2 Pro",
    canGenerate: true,
    canEdit: true,
    maxInputImages: 8,
    aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3", "21:9"],
    resolutions: null,
    defaultAspectRatio: "1:1",
    defaultResolution: null,
  },
  "qwen/qwen-image-3": {
    id: "qwen/qwen-image-3",
    label: "Qwen Image 3",
    canGenerate: true,
    canEdit: true,
    maxInputImages: 3,
    aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3", "2:1", "1:2"],
    resolutions: ["1K", "2K"],
    defaultAspectRatio: "1:1",
    defaultResolution: "1K",
  },
};

export const VIDEO_MODELS_MEDIA_CONFIG: Record<string, VideoModelMediaConfig> = {
  "google/veo-3.1": {
    id: "google/veo-3.1",
    label: "Google Veo 3.1",
    canGenerate: true,
    aspectRatios: ["16:9", "9:16"],
    resolutions: ["720p", "1080p", "4K"],
    durations: [4, 6, 8],
    defaultDuration: 4,
    defaultAspectRatio: "16:9",
    defaultResolution: "720p",
    maxInputImages: null,
  },
  "google/veo-3.1-lite": {
    id: "google/veo-3.1-lite",
    label: "Google Veo 3.1 Lite",
    canGenerate: true,
    aspectRatios: ["16:9", "9:16"],
    resolutions: ["720p", "1080p"],
    durations: [4, 6, 8],
    defaultDuration: 4,
    defaultAspectRatio: "16:9",
    defaultResolution: "720p",
    maxInputImages: null,
  },
  "bytedance/seedance-2.5": {
    id: "bytedance/seedance-2.5",
    label: "Seedance 2.5",
    canGenerate: true,
    aspectRatios: ["16:9", "4:3", "1:1", "3:4", "9:16", "21:9"],
    resolutions: ["480p", "720p"],
    durations: [5, 10, 15, 20],
    defaultDuration: 5,
    defaultAspectRatio: "16:9",
    defaultResolution: "480p",
    maxInputImages: null,
  },
  "alibaba/wan-3.0": {
    id: "alibaba/wan-3.0",
    label: "Wan 3.0",
    canGenerate: true,
    aspectRatios: ["16:9", "4:3", "1:1", "3:4", "9:16"],
    resolutions: ["480p", "720p", "1080p"],
    durations: [3, 5, 10, 15],
    defaultDuration: 5,
    defaultAspectRatio: "16:9",
    defaultResolution: "480p",
    maxInputImages: null,
  },
  "kwaivgi/kling-v3.0-pro": {
    id: "kwaivgi/kling-v3.0-pro",
    label: "Kling v3.0 Pro",
    canGenerate: true,
    aspectRatios: ["16:9", "9:16", "1:1"],
    resolutions: ["720p"],
    durations: [5, 10, 15],
    defaultDuration: 5,
    defaultAspectRatio: "16:9",
    defaultResolution: "720p",
    maxInputImages: null,
  },
  "runway/gen-4.5": {
    id: "runway/gen-4.5",
    label: "Runway Gen-4.5",
    canGenerate: true,
    aspectRatios: ["16:9", "9:16"],
    resolutions: ["720p"],
    durations: [3, 5, 8, 10],
    defaultDuration: 5,
    defaultAspectRatio: "16:9",
    defaultResolution: "720p",
    maxInputImages: null,
  },
  "minimax/hailuo-3": {
    id: "minimax/hailuo-3",
    label: "MiniMax Hailuo 3",
    canGenerate: true,
    aspectRatios: ["21:9", "16:9", "4:3", "1:1", "3:4", "9:16"],
    resolutions: ["2K"],
    durations: [5, 10, 15],
    defaultDuration: 5,
    defaultAspectRatio: "21:9",
    defaultResolution: "2K",
    maxInputImages: null,
  },
};

export function getImageModelConfig(modelId: string): ImageModelMediaConfig {
  return IMAGE_MODELS_MEDIA_CONFIG[modelId] ?? DEFAULT_IMAGE_CONFIG;
}

export function getVideoModelConfig(modelId: string): VideoModelMediaConfig {
  return VIDEO_MODELS_MEDIA_CONFIG[modelId] ?? DEFAULT_VIDEO_CONFIG;
}
