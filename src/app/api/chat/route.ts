import { describeError, jsonFailure, jsonSuccess, readSessionId } from "@/lib/api-response";
import { createChatReplyStream } from "@/lib/chat-reply-stream";
import { validateChatPayload } from "@/lib/chat-validation";
import { deleteSessionImages } from "@/lib/image-repository";
import {
  collectSessionAttachmentUrls,
  deleteExpiredMessages,
  deleteSessionMessages,
  insertMessage,
  listActiveMessages,
} from "@/lib/message-repository";
import { deleteSummary } from "@/lib/summary-repository";
import { deleteUploadedFiles } from "@/lib/upload-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  const sessionId = readSessionId(request);
  if (!sessionId) return jsonFailure("Missing or invalid session id", 400);

  try {
    deleteExpiredMessages();
    return jsonSuccess({ messages: listActiveMessages(sessionId) });
  } catch (error) {
    return jsonFailure(describeError(error, "Failed to load messages"), 500);
  }
}

export async function POST(request: Request) {
  const sessionId = readSessionId(request);
  if (!sessionId) return jsonFailure("Missing or invalid session id", 400);

  const validation = validateChatPayload(await request.json().catch(() => null));
  if (!validation.valid) return jsonFailure(validation.reason, 400);

  try {
    deleteExpiredMessages();
    const userMessage = insertMessage({
      sessionId,
      role: "user",
      content: validation.payload.content,
      model: validation.payload.model,
      attachments: validation.payload.attachments,
    });

    return createChatReplyStream({
      userMessage,
      model: validation.payload.model,
      signal: request.signal,
    });
  } catch (error) {
    return jsonFailure(describeError(error, "Failed to start reply stream"), 500);
  }
}

export async function DELETE(request: Request) {
  const sessionId = readSessionId(request);
  if (!sessionId) return jsonFailure("Missing or invalid session id", 400);

  try {
    const urlsToDelete = collectSessionAttachmentUrls(sessionId);
    deleteSessionMessages(sessionId);
    deleteSummary(sessionId);
    deleteSessionImages(sessionId);
    await deleteUploadedFiles(urlsToDelete);
    return jsonSuccess({ cleared: true });
  } catch (error) {
    return jsonFailure(describeError(error, "Failed to clear conversation"), 500);
  }
}
