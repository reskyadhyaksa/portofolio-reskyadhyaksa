import { DEFAULT_IMAGE_MODEL_ID, MAX_IMAGE_PROMPT_LENGTH, isSupportedImageModel, type ImageModelId } from "./chat-config";
import { resolveImageOptions, type ImageOptions } from "./image-options";

export interface ImageGenerationPayload {
  prompt: string;
  model: ImageModelId;
  options: ImageOptions;
  referenceImageUrl?: string;
  referenceImageUrls?: string[];
}

export type ImagePayloadValidationResult =
  | { valid: true; payload: ImageGenerationPayload }
  | { valid: false; reason: string };

export function validateImagePayload(body: unknown): ImagePayloadValidationResult {
  if (!body || typeof body !== "object") return { valid: false, reason: "Invalid JSON body" };
  const { prompt, model, options, referenceImageUrl, referenceImageUrls } = body as Record<string, unknown>;

  const trimmedPrompt = typeof prompt === "string" ? prompt.trim() : "";
  if (!trimmedPrompt || trimmedPrompt.length > MAX_IMAGE_PROMPT_LENGTH) {
    return { valid: false, reason: `Prompt is required (max ${MAX_IMAGE_PROMPT_LENGTH} characters)` };
  }

  const resolvedModel = model === undefined ? DEFAULT_IMAGE_MODEL_ID : model;
  if (!isSupportedImageModel(resolvedModel)) return { valid: false, reason: "Unsupported image model" };

  const resolvedOptions = resolveImageOptions(options);
  if (!resolvedOptions) return { valid: false, reason: "Invalid image options" };

  const resolvedRefUrl = typeof referenceImageUrl === "string" && referenceImageUrl.trim().length > 0
    ? referenceImageUrl.trim()
    : undefined;

  const resolvedRefUrls = Array.isArray(referenceImageUrls)
    ? referenceImageUrls.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : undefined;

  const finalRefUrls = resolvedRefUrls && resolvedRefUrls.length > 0
    ? resolvedRefUrls
    : resolvedRefUrl
      ? [resolvedRefUrl]
      : undefined;

  return {
    valid: true,
    payload: {
      prompt: trimmedPrompt,
      model: resolvedModel,
      options: resolvedOptions,
      ...(finalRefUrls && finalRefUrls.length > 0
        ? { referenceImageUrl: finalRefUrls[0], referenceImageUrls: finalRefUrls }
        : {}),
    },
  };
}
