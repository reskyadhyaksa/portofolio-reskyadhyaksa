import { describeError, jsonFailure, jsonSuccess, readSessionId } from "@/lib/api-response";
import { validateChatPayload } from "@/lib/chat-validation";
import { buildConversationContext } from "@/lib/conversation-context";
import { deleteSessionImages } from "@/lib/image-repository";
import {
  collectSessionAttachmentUrls,
  deleteExpiredMessages,
  deleteMessageById,
  deleteSessionMessages,
  insertMessage,
  listActiveMessages,
} from "@/lib/message-repository";
import { requestChatCompletion, UpstreamError } from "@/lib/llm-client";
import { deleteSummary } from "@/lib/summary-repository";
import { deleteUploadedFiles } from "@/lib/upload-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const sessionId = readSessionId(request);
  if (!sessionId) return jsonFailure("Missing or invalid session id", 400);

  try {
    deleteExpiredMessages();
    return jsonSuccess({ messages: listActiveMessages(sessionId) });
  } catch (error) {
    return jsonFailure(describeError(error, "Failed to load chat history"), 500);
  }
}

export async function POST(request: Request) {
  const sessionId = readSessionId(request);
  if (!sessionId) return jsonFailure("Missing or invalid session id", 400);

  const body: unknown = await request.json().catch(() => null);
  const validation = validateChatPayload(body);
  if (!validation.valid) return jsonFailure(validation.reason, 400);

  const { model, content, attachments } = validation.payload;
  let pendingUserMessageId: string | null = null;

  try {
    deleteExpiredMessages();
    const userMessage = insertMessage({ sessionId, role: "user", content, model, attachments });
    pendingUserMessageId = userMessage.id;
    const upstreamMessages = await buildConversationContext(sessionId, model, listActiveMessages(sessionId));
    const completion = await requestChatCompletion(model, upstreamMessages);
    const assistantMessage = insertMessage({ sessionId, role: "assistant", content: completion, model });
    return jsonSuccess({ userMessage, assistantMessage }, 201);
  } catch (error) {
    if (pendingUserMessageId) deleteMessageById(pendingUserMessageId);
    const status = error instanceof UpstreamError ? error.status : 500;
    return jsonFailure(describeError(error, "Failed to process chat message"), status);
  }
}

export async function DELETE(request: Request) {
  const sessionId = readSessionId(request);
  if (!sessionId) return jsonFailure("Missing or invalid session id", 400);

  try {
    const attachmentUrls = collectSessionAttachmentUrls(sessionId);
    const deleted = deleteSessionMessages(sessionId);
    const imageUrls = deleteSessionImages(sessionId);
    deleteSummary(sessionId);
    const deletedFiles = await deleteUploadedFiles([...attachmentUrls, ...imageUrls]);
    return jsonSuccess({ deleted, deletedFiles });
  } catch (error) {
    return jsonFailure(describeError(error, "Failed to delete chat"), 500);
  }
}
