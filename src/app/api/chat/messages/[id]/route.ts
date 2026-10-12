import { describeError, isValidMessageId, jsonFailure, jsonSuccess, readSessionId } from "@/lib/api-response";
import { deleteImagesByUrls } from "@/lib/image-repository";
import { truncateFromMessage } from "@/lib/message-truncation-repository";
import { deleteSummary } from "@/lib/summary-repository";
import { deleteUploadedFiles } from "@/lib/upload-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const sessionId = readSessionId(request);
  if (!sessionId) return jsonFailure("Missing or invalid session id", 400);

  const { id } = await context.params;
  if (!isValidMessageId(id)) return jsonFailure("Invalid message id", 400);

  try {
    const result = truncateFromMessage(sessionId, id);
    if (!result) return jsonFailure("Message not found", 404);

    const isKeepingAnchorFiles = new URL(request.url).searchParams.get("keepAnchorFiles") === "1";
    const keptUrls = new Set(isKeepingAnchorFiles ? result.anchorAttachmentUrls : []);
    const urlsToRemove = result.attachmentUrls.filter((url) => !keptUrls.has(url));

    deleteSummary(sessionId);
    deleteImagesByUrls(sessionId, urlsToRemove);
    const deletedFiles = await deleteUploadedFiles(urlsToRemove);
    return jsonSuccess({ deleted: result.deletedCount, deletedFiles });
  } catch (error) {
    return jsonFailure(describeError(error, "Failed to revert chat"), 500);
  }
}
