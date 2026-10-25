import { describeError, jsonFailure, jsonSuccess, readSessionId, readSessionIdList } from "@/lib/api-response";
import { generateImageInChat } from "@/lib/image-chat-service";
import { validateImagePayload } from "@/lib/image-generation-validation";
import { deleteExpiredImages, listGeneratedImages } from "@/lib/image-repository";
import { deleteExpiredMessages } from "@/lib/message-repository";
import { UpstreamError } from "@/lib/router-http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export function GET(request: Request) {
  const sessionIds = readSessionIdList(request);
  if (!sessionIds) return jsonFailure("Invalid session id list", 400);

  try {
    deleteExpiredImages();
    return jsonSuccess({ images: listGeneratedImages(sessionIds) });
  } catch (error) {
    return jsonFailure(describeError(error, "Failed to load images"), 500);
  }
}

export async function POST(request: Request) {
  const sessionId = readSessionId(request);
  if (!sessionId) return jsonFailure("Missing or invalid session id", 400);

  const validation = validateImagePayload(await request.json().catch(() => null));
  if (!validation.valid) return jsonFailure(validation.reason, 400);

  try {
    deleteExpiredMessages();
    return jsonSuccess(await generateImageInChat(sessionId, validation.payload, request.signal), 201);
  } catch (error) {
    const status = error instanceof UpstreamError ? error.status : 500;
    return jsonFailure(describeError(error, "Failed to generate image"), status);
  }
}
