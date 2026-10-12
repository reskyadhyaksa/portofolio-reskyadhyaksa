import fs from "node:fs/promises";
import { CODE_EXTENSIONS } from "@/lib/chat-config";
import { extractExtension } from "@/lib/file-validation";
import { resolveUploadPath } from "@/lib/upload-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PLAIN_TEXT_CONTENT_TYPE = "text/plain; charset=utf-8";

const CODE_CONTENT_TYPES: Record<string, string> = Object.fromEntries(
  CODE_EXTENSIONS.map((extension) => [extension, PLAIN_TEXT_CONTENT_TYPE])
);

const CONTENT_TYPE_BY_EXTENSION: Record<string, string> = {
  ...CODE_CONTENT_TYPES,
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  txt: "text/plain; charset=utf-8",
  md: "text/markdown; charset=utf-8",
  csv: "text/csv; charset=utf-8",
  json: "application/json; charset=utf-8",
};

export async function GET(_request: Request, context: { params: Promise<{ file: string }> }) {
  const { file } = await context.params;
  const filePath = resolveUploadPath(file);
  const contentType = CONTENT_TYPE_BY_EXTENSION[extractExtension(file)];
  if (!filePath || !contentType) return new Response("Not found", { status: 404 });

  try {
    const buffer = await fs.readFile(filePath);
    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": contentType.startsWith("image/") ? "inline" : "attachment",
        "Cache-Control": "private, max-age=3600",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
