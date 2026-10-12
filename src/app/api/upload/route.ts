import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { describeError, jsonFailure, jsonSuccess, readSessionId } from "@/lib/api-response";
import { UPLOAD_PUBLIC_PREFIX } from "@/lib/chat-config";
import type { Attachment } from "@/lib/chat-types";
import { sanitizeDisplayName, validateUploadFile } from "@/lib/file-validation";
import { ensureUploadDirectory, resolveUploadPath } from "@/lib/upload-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!readSessionId(request)) return jsonFailure("Missing or invalid session id", 400);

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  if (!(file instanceof File)) return jsonFailure("Field 'file' is required", 400);

  const validation = validateUploadFile(file);
  if (!validation.valid) return jsonFailure(validation.reason, 415);

  const storedFileName = `${Date.now()}-${randomUUID()}.${validation.extension}`;
  const filePath = resolveUploadPath(storedFileName);
  if (!filePath) return jsonFailure("Invalid file name", 400);

  try {
    await ensureUploadDirectory();
    await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
  } catch (error) {
    return jsonFailure(describeError(error, "Failed to store file"), 500);
  }

  const attachment: Attachment = {
    url: `${UPLOAD_PUBLIC_PREFIX}${storedFileName}`,
    type: validation.kind,
    name: sanitizeDisplayName(file.name),
    mimeType: file.type,
    size: file.size,
  };

  return jsonSuccess({ attachment }, 201);
}
