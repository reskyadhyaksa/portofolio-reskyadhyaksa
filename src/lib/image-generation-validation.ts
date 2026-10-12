import { DEFAULT_IMAGE_MODEL_ID, MAX_IMAGE_PROMPT_LENGTH, isSupportedImageModel, type ImageModelId } from "./chat-config";

export interface ImageGenerationPayload {
  prompt: string;
  model: ImageModelId;
}

export type ImagePayloadValidationResult =
  | { valid: true; payload: ImageGenerationPayload }
  | { valid: false; reason: string };

export function validateImagePayload(body: unknown): ImagePayloadValidationResult {
  if (!body || typeof body !== "object") return { valid: false, reason: "Invalid JSON body" };
  const { prompt, model } = body as Record<string, unknown>;

  const trimmedPrompt = typeof prompt === "string" ? prompt.trim() : "";
  if (!trimmedPrompt || trimmedPrompt.length > MAX_IMAGE_PROMPT_LENGTH) {
    return { valid: false, reason: `Prompt is required (max ${MAX_IMAGE_PROMPT_LENGTH} characters)` };
  }

  const resolvedModel = model === undefined ? DEFAULT_IMAGE_MODEL_ID : model;
  if (!isSupportedImageModel(resolvedModel)) return { valid: false, reason: "Unsupported image model" };

  return { valid: true, payload: { prompt: trimmedPrompt, model: resolvedModel } };
}