import { MAX_ATTACHMENTS_PER_MESSAGE, MAX_MESSAGE_LENGTH, isSupportedModel } from "./chat-config";
import type { Attachment, ChatPostPayload } from "./chat-types";
import { sanitizeDisplayName } from "./file-validation";
import { fileNameFromPublicUrl } from "./upload-storage";

export type PayloadValidationResult =
  | { valid: true; payload: ChatPostPayload }
  | { valid: false; reason: string };

function normalizeAttachment(candidate: unknown): Attachment | null {
  if (!candidate || typeof candidate !== "object") return null;
  const { url, type, name } = candidate as Record<string, unknown>;
  if (typeof url !== "string" || !fileNameFromPublicUrl(url)) return null;
  if (type !== "image" && type !== "document") return null;
  return { url, type, name: sanitizeDisplayName(typeof name === "string" ? name : "file") };
}

function normalizeAttachments(candidate: unknown): Attachment[] | null {
  if (candidate === undefined || candidate === null) return [];
  if (!Array.isArray(candidate) || candidate.length > MAX_ATTACHMENTS_PER_MESSAGE) return null;
  const attachments = candidate.map(normalizeAttachment);
  return attachments.every((attachment) => attachment !== null) ? (attachments as Attachment[]) : null;
}

export function validateChatPayload(body: unknown): PayloadValidationResult {
  if (!body || typeof body !== "object") return { valid: false, reason: "Invalid JSON body" };
  const { model, content, attachments } = body as Record<string, unknown>;

  if (!isSupportedModel(model)) return { valid: false, reason: "Unsupported model" };

  const trimmedContent = typeof content === "string" ? content.trim() : "";
  if (trimmedContent.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, reason: `Message exceeds ${MAX_MESSAGE_LENGTH} characters` };
  }

  const normalizedAttachments = normalizeAttachments(attachments);
  if (!normalizedAttachments) return { valid: false, reason: "Invalid attachments" };

  if (!trimmedContent && normalizedAttachments.length === 0) {
    return { valid: false, reason: "Message cannot be empty" };
  }

  return {
    valid: true,
    payload: {
      model,
      content: trimmedContent || "Please review the attached file(s).",
      attachments: normalizedAttachments,
    },
  };
}
