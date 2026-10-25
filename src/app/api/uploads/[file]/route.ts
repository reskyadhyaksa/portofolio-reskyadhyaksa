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
  mp4: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  txt: "text/plain; charset=utf-8",
  md: "text/markdown; charset=utf-8",
  csv: "text/csv; charset=utf-8",
  json: "application/json; charset=utf-8",
};

export async function GET(request: Request, context: { params: Promise<{ file: string }> }) {
  const { file } = await context.params;
  const filePath = resolveUploadPath(file);
  const contentType = CONTENT_TYPE_BY_EXTENSION[extractExtension(file)];
  if (!filePath || !contentType) return new Response("Not found", { status: 404 });

  try {
    const stat = await fs.stat(filePath);
    const totalSize = stat.size;
    const rangeHeader = request.headers.get("range");
    const isInline = contentType.startsWith("image/") || contentType.startsWith("video/");

    if (rangeHeader && rangeHeader.startsWith("bytes=")) {
      const parts = rangeHeader.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10) || 0;
      const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;

      if (start >= totalSize || end >= totalSize || start > end) {
        return new Response("Requested range not satisfiable", {
          status: 416,
          headers: {
            "Content-Range": `bytes */${totalSize}`,
          },
        });
      }

      const chunkSize = end - start + 1;
      const fileHandle = await fs.open(filePath, "r");
      const buffer = Buffer.alloc(chunkSize);
      await fileHandle.read(buffer, 0, chunkSize, start);
      await fileHandle.close();

      return new Response(new Uint8Array(buffer), {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${totalSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": String(chunkSize),
          "Content-Type": contentType,
          "Content-Disposition": isInline ? "inline" : "attachment",
          "Cache-Control": "private, max-age=3600",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    const buffer = await fs.readFile(filePath);
    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(totalSize),
        "Accept-Ranges": "bytes",
        "Content-Disposition": isInline ? "inline" : "attachment",
        "Cache-Control": "private, max-age=3600",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
