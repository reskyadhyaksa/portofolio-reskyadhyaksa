import { describeError, jsonFailure, jsonSuccess, readSessionId, readSessionIdList } from "@/lib/api-response";
import { DEFAULT_VIDEO_MODEL_ID, isSupportedVideoModel, MAX_VIDEO_PROMPT_LENGTH } from "@/lib/chat-config";
import { createVideoJob } from "@/lib/video-client";
import { deleteExpiredVideos, insertVideoJob, listGeneratedVideos } from "@/lib/video-repository";
import { UpstreamError } from "@/lib/router-http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export function GET(request: Request) {
  const sessionIds = readSessionIdList(request);
  if (!sessionIds) return jsonFailure("Invalid session id list", 400);

  try {
    deleteExpiredVideos();
    return jsonSuccess({ videos: listGeneratedVideos(sessionIds) });
  } catch (error) {
    return jsonFailure(describeError(error, "Failed to load videos"), 500);
  }
}

export async function POST(request: Request) {
  const sessionId = readSessionId(request);
  if (!sessionId) return jsonFailure("Missing or invalid session id", 400);

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== "object") return jsonFailure("Invalid JSON body", 400);

  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt || prompt.length > MAX_VIDEO_PROMPT_LENGTH) {
    return jsonFailure(`Prompt is required (max ${MAX_VIDEO_PROMPT_LENGTH} characters)`, 400);
  }

  const model = typeof body.model === "string" ? body.model : DEFAULT_VIDEO_MODEL_ID;
  if (!isSupportedVideoModel(model)) return jsonFailure("Unsupported video model", 400);

  const duration = typeof body.duration === "number" && body.duration > 0 ? body.duration : 5;
  const resolution = typeof body.resolution === "string" ? body.resolution : "720p";
  const aspectRatio = typeof body.aspectRatio === "string" ? body.aspectRatio : "16:9";

  try {
    const job = await createVideoJob(
      { prompt, model, duration, resolution, aspectRatio },
      request.signal
    );

    const videoRecord = insertVideoJob({
      id: job.id,
      sessionId,
      prompt,
      model,
      duration,
      resolution,
      aspectRatio,
      status: "pending",
    });

    return jsonSuccess(videoRecord, 202);
  } catch (error) {
    const status = error instanceof UpstreamError ? error.status : 500;
    return jsonFailure(describeError(error, "Failed to initiate video generation"), status);
  }
}
