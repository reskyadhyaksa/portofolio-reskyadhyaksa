import { describeError, jsonFailure, jsonSuccess, readSessionIdList } from "@/lib/api-response";
import { deleteGeneratedImage, findGeneratedImage } from "@/lib/image-repository";
import { deleteUploadedFiles } from "@/lib/upload-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const IMAGE_ID_PATTERN = /^[0-9a-f-]{36}$/i;

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!IMAGE_ID_PATTERN.test(id)) return jsonFailure("Invalid image id", 400);

  const ownedSessionIds = readSessionIdList(request);
  if (!ownedSessionIds || ownedSessionIds.length === 0) return jsonFailure("Invalid session id list", 400);

  try {
    const image = findGeneratedImage(id);
    if (!image || !ownedSessionIds.includes(image.sessionId)) return jsonFailure("Image not found", 404);
    deleteGeneratedImage(id);
    await deleteUploadedFiles([image.url]);
    return jsonSuccess({ deleted: id });
  } catch (error) {
    return jsonFailure(describeError(error, "Failed to delete image"), 500);
  }
}
