export const IMAGE_SIZE_OPTIONS = [
  { id: "1024x1024", ratioLabel: "1:1", orientationLabel: "Square", width: 1024, height: 1024 },
  { id: "1536x1024", ratioLabel: "3:2", orientationLabel: "Landscape", width: 1536, height: 1024 },
  { id: "1024x1536", ratioLabel: "2:3", orientationLabel: "Portrait", width: 1024, height: 1536 },
  { id: "3840x2160", ratioLabel: "16:9", orientationLabel: "Widescreen", width: 3840, height: 2160 },
] as const;

export const IMAGE_QUALITY_OPTIONS = [
  { id: "auto", label: "Auto" },
  { id: "low", label: "Low" },
  { id: "medium", label: "Medium" },
  { id: "high", label: "High" },
] as const;

export const IMAGE_OUTPUT_FORMAT_OPTIONS = [
  { id: "jpeg", label: "JPEG", extension: "jpg" },
  { id: "png", label: "PNG", extension: "png" },
  { id: "webp", label: "WebP", extension: "webp" },
] as const;

export type ImageSizeId = (typeof IMAGE_SIZE_OPTIONS)[number]["id"];
export type ImageQualityId = (typeof IMAGE_QUALITY_OPTIONS)[number]["id"];
export type ImageOutputFormatId = (typeof IMAGE_OUTPUT_FORMAT_OPTIONS)[number]["id"];

export interface ImageOptions {
  size: ImageSizeId;
  quality: ImageQualityId;
  outputFormat: ImageOutputFormatId;
}

export const DEFAULT_IMAGE_OPTIONS: ImageOptions = {
  size: "1024x1024",
  quality: "auto",
  outputFormat: "jpeg",
};

export const IMAGE_RESPONSE_FORMAT = "b64_json";

export function isImageSizeId(value: unknown): value is ImageSizeId {
  return IMAGE_SIZE_OPTIONS.some((option) => option.id === value);
}

export function isImageQualityId(value: unknown): value is ImageQualityId {
  return IMAGE_QUALITY_OPTIONS.some((option) => option.id === value);
}

export function isImageOutputFormatId(value: unknown): value is ImageOutputFormatId {
  return IMAGE_OUTPUT_FORMAT_OPTIONS.some((option) => option.id === value);
}

export function resolveImageSizeOption(sizeId: ImageSizeId) {
  return IMAGE_SIZE_OPTIONS.find((option) => option.id === sizeId) ?? IMAGE_SIZE_OPTIONS[0];
}

export function resolveOutputExtension(outputFormat: ImageOutputFormatId): string {
  return IMAGE_OUTPUT_FORMAT_OPTIONS.find((option) => option.id === outputFormat)?.extension ?? "jpg";
}

export function resolveImageOptions(candidate: unknown): ImageOptions | null {
  if (candidate === undefined || candidate === null) return DEFAULT_IMAGE_OPTIONS;
  if (typeof candidate !== "object") return null;
  const { size, quality, outputFormat } = candidate as Record<string, unknown>;
  const resolvedSize = size === undefined ? DEFAULT_IMAGE_OPTIONS.size : size;
  const resolvedQuality = quality === undefined ? DEFAULT_IMAGE_OPTIONS.quality : quality;
  const resolvedFormat = outputFormat === undefined ? DEFAULT_IMAGE_OPTIONS.outputFormat : outputFormat;
  if (!isImageSizeId(resolvedSize) || !isImageQualityId(resolvedQuality) || !isImageOutputFormatId(resolvedFormat)) {
    return null;
  }
  return { size: resolvedSize, quality: resolvedQuality, outputFormat: resolvedFormat };
}
