import { CLIENT_MAX_SOURCE_BYTES, MAX_UPLOAD_BYTES } from "@/lib/chat-config";
import { extractExtension, isCodeExtension } from "@/lib/file-validation";
import { compressImage } from "./image-compression";
import { assertReadableTextFile } from "./text-file-guard";
import { extractDocxText, extractPdfText } from "./text-extraction";

const TEXT_MIME_TYPE = "text/plain";

type TextExtractor = (file: File) => Promise<string>;

const BINARY_DOCUMENT_EXTRACTORS: Record<string, TextExtractor> = {
  pdf: extractPdfText,
  docx: extractDocxText,
};

function toTextFile(sourceName: string, text: string): File {
  return new File([text], `${sourceName}.txt`, { type: TEXT_MIME_TYPE, lastModified: Date.now() });
}

function assertWithinSourceLimit(file: File): void {
  if (file.size > CLIENT_MAX_SOURCE_BYTES) {
    throw new Error(`${file.name} exceeds the ${CLIENT_MAX_SOURCE_BYTES / (1024 * 1024)} MB limit`);
  }
}

function assertWithinUploadLimit(file: File): void {
  if (file.size > MAX_UPLOAD_BYTES) throw new Error(`${file.name} is still larger than 10 MB after processing`);
}

async function preprocessDocument(file: File, extension: string): Promise<File> {
  if (isCodeExtension(extension)) {
    await assertReadableTextFile(file);
    return file;
  }
  const extractor = BINARY_DOCUMENT_EXTRACTORS[extension];
  if (!extractor) return file;
  const text = await extractor(file);
  if (!text) throw new Error(`No readable text found in ${file.name}`);
  return toTextFile(file.name, text);
}

export async function preprocessFile(file: File): Promise<File> {
  assertWithinSourceLimit(file);
  const extension = extractExtension(file.name);
  const processed = file.type.startsWith("image/") ? await compressImage(file) : await preprocessDocument(file, extension);
  assertWithinUploadLimit(processed);
  return processed;
}
