import fs from "node:fs/promises";
import { MAX_DOCUMENT_CONTEXT_CHARS, TEXT_READABLE_EXTENSIONS } from "./chat-config";
import type { Attachment, ChatMessage } from "./chat-types";
import { extractExtension } from "./file-validation";
import { fileNameFromPublicUrl, resolveUploadPath } from "./upload-storage";

type TextPart = { type: "text"; text: string };
type ImagePart = { type: "image_url"; image_url: { url: string } };
type ContentPart = TextPart | ImagePart;

export interface UpstreamMessage {
  role: "system" | "user" | "assistant";
  content: string | ContentPart[];
}

const TEXT_READABLE_SET = new Set<string>(TEXT_READABLE_EXTENSIONS);

const IMAGE_MIME_BY_EXTENSION: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
};

async function readUploadedFile(attachment: Attachment): Promise<Buffer | null> {
  const fileName = fileNameFromPublicUrl(attachment.url);
  const filePath = fileName ? resolveUploadPath(fileName) : null;
  if (!filePath) return null;
  try {
    return await fs.readFile(filePath);
  } catch {
    return null;
  }
}

async function buildImagePart(attachment: Attachment): Promise<ContentPart | null> {
  const buffer = await readUploadedFile(attachment);
  if (!buffer) return null;
  const mimeType = IMAGE_MIME_BY_EXTENSION[extractExtension(attachment.url)] ?? "image/png";
  return { type: "image_url", image_url: { url: `data:${mimeType};base64,${buffer.toString("base64")}` } };
}

async function buildDocumentPart(attachment: Attachment): Promise<TextPart> {
  const header = `[Attached document: ${attachment.name}]`;
  if (!TEXT_READABLE_SET.has(extractExtension(attachment.url))) {
    return { type: "text", text: `${header}\n(Binary document; content not extracted.)` };
  }
  const buffer = await readUploadedFile(attachment);
  if (!buffer) return { type: "text", text: `${header}\n(File expired or unavailable.)` };
  const excerpt = buffer.toString("utf8").slice(0, MAX_DOCUMENT_CONTEXT_CHARS);
  return { type: "text", text: `${header}\n${excerpt}` };
}

async function buildAttachmentParts(attachments: Attachment[]): Promise<ContentPart[]> {
  const parts = await Promise.all(
    attachments.map((attachment) =>
      attachment.type === "image" ? buildImagePart(attachment) : buildDocumentPart(attachment)
    )
  );
  return parts.filter((part): part is ContentPart => part !== null);
}

async function toUpstreamMessage(message: ChatMessage): Promise<UpstreamMessage> {
  if (message.role === "assistant" || message.attachments.length === 0) {
    return { role: message.role, content: message.content };
  }
  const attachmentParts = await buildAttachmentParts(message.attachments);
  return { role: message.role, content: [{ type: "text", text: message.content }, ...attachmentParts] };
}

export function buildUpstreamMessages(history: ChatMessage[]): Promise<UpstreamMessage[]> {
  return Promise.all(history.map(toUpstreamMessage));
}
