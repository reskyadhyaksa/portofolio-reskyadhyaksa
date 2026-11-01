import { describeError, jsonFailure, jsonSuccess, readSessionId, readSessionIdList } from "@/lib/api-response";
import { UPLOAD_PUBLIC_PREFIX } from "@/lib/chat-config";
import { downloadVideoBuffer, getVideoJobStatus, storeGeneratedVideo } from "@/lib/video-client";
import { deleteGeneratedVideo, findGeneratedVideo, updateVideoJobStatus } from "@/lib/video-repository";
import { deleteUploadedFiles } from "@/lib/upload-storage";
import { UpstreamError } from "@/lib/router-http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteParams) {
  const sessionId = readSessionId(request);
  if (!sessionId) return jsonFailure("Missing or invalid session id", 400);

  const { id } = await context.params;
  if (!id) return jsonFailure("Missing video id", 400);

  const existing = findGeneratedVideo(id);
  if (existing?.status === "completed" && existing.url?.startsWith(UPLOAD_PUBLIC_PREFIX)) {
    return jsonSuccess(existing);
  }

  try {
    const upstream = await getVideoJobStatus(id);
    let resolvedStatus: "pending" | "in_progress" | "completed" | "failed" = "pending";

    if (upstream.status === "completed") resolvedStatus = "completed";
    else if (upstream.status === "in_progress") resolvedStatus = "in_progress";
    else if (upstream.status === "failed" || upstream.status === "cancelled" || upstream.status === "expired") {
      resolvedStatus = "failed";
    }

    let localUrl = existing?.url ?? null;
    if (resolvedStatus === "completed" && (!localUrl || !localUrl.startsWith(UPLOAD_PUBLIC_PREFIX))) {
      const defaultEndpoint = process.env.AI_VIDEO_BASE_URL || "https://gateway.yupi.ai.id/v1/videos";
      const fallbackDownload = `${defaultEndpoint.replace(/\/+$/, "")}/${encodeURIComponent(id)}/content?index=0`;
      const downloadTarget = upstream.unsigned_urls?.[0] || fallbackDownload;
      const buffer = await downloadVideoBuffer(downloadTarget, request.signal);
      localUrl = await storeGeneratedVideo(buffer);
    }

    const updated = updateVideoJobStatus(id, resolvedStatus, localUrl);
    if (updated) return jsonSuccess(updated);
    return jsonSuccess(existing ?? upstream);
  } catch (error) {
    const status = error instanceof UpstreamError ? error.status : 500;
    return jsonFailure(describeError(error, "Failed to check video status"), status);
  }
}

export async function DELETE(request: Request, context: RouteParams) {
  const { id } = await context.params;
  if (!id) return jsonFailure("Missing video id", 400);

  const ownedSessionIds = readSessionIdList(request);
  if (!ownedSessionIds || ownedSessionIds.length === 0) return jsonFailure("Invalid session id list", 400);

  try {
    const video = findGeneratedVideo(id);
    if (!video || !ownedSessionIds.includes(video.sessionId)) return jsonFailure("Video not found", 404);
    deleteGeneratedVideo(id);
    if (video.url) await deleteUploadedFiles([video.url]);
    return jsonSuccess({ deleted: id });
  } catch (error) {
    return jsonFailure(describeError(error, "Failed to delete video"), 500);
  }
}
