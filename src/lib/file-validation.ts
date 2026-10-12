import { CODE_EXTENSIONS, DOCUMENT_EXTENSIONS, IMAGE_EXTENSIONS, MAX_UPLOAD_BYTES } from "./chat-config";
import type { AttachmentKind } from "./chat-types";

const IMAGE_EXTENSION_SET = new Set<string>(IMAGE_EXTENSIONS);
const DOCUMENT_EXTENSION_SET = new Set<string>(DOCUMENT_EXTENSIONS);
const CODE_EXTENSION_SET = new Set<string>(CODE_EXTENSIONS);

export function isCodeExtension(extension: string): boolean {
  return CODE_EXTENSION_SET.has(extension);
}

const DOCUMENT_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "text/markdown",
  "text/csv",
  "application/json",
  "application/octet-stream",
  "",
]);

export type FileValidationResult =
  | { valid: true; kind: AttachmentKind; extension: string }
  | { valid: false; reason: string };

export function extractExtension(fileName: string): string {
  const lastDot = fileName.lastIndexOf(".");
  if (lastDot < 0) return "";
  return fileName.slice(lastDot + 1).toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function sanitizeDisplayName(fileName: string): string {
  const cleaned = fileName.replace(/[\\/:*?"<>|\u0000-\u001f]/g, "_").trim();
  return cleaned.slice(0, 120) || "file";
}

export function validateUploadFile(file: File): FileValidationResult {
  if (file.size === 0) return { valid: false, reason: "File is empty" };
  if (file.size > MAX_UPLOAD_BYTES) return { valid: false, reason: "File exceeds the 10 MB limit" };

  const extension = extractExtension(file.name);

  if (IMAGE_EXTENSION_SET.has(extension) && file.type.startsWith("image/")) {
    return { valid: true, kind: "image", extension };
  }

  if (DOCUMENT_EXTENSION_SET.has(extension) && DOCUMENT_MIME_TYPES.has(file.type)) {
    return { valid: true, kind: "document", extension };
  }

  if (isCodeExtension(extension) && !file.type.startsWith("image/")) {
    return { valid: true, kind: "document", extension };
  }

  return { valid: false, reason: `Unsupported file type: .${extension || "unknown"}` };
}
