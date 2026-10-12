import { SESSION_HEADER } from "@/lib/chat-config";
import type {
  ApiResponse,
  Attachment,
  ChatMessage,
  ChatPostPayload,
  ConversationSummary,
  GeneratedImage,
} from "@/lib/chat-types";

async function requestJson<T>(input: string, sessionId: string, init: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(input, {
      ...init,
      cache: "no-store",
      headers: { ...init.headers, [SESSION_HEADER]: sessionId },
    });
  } catch {
    throw new Error("Network error. Check your connection and try again.");
  }

  const body = (await response.json().catch(() => null)) as ApiResponse<T> | null;
  if (!body) throw new Error(`Unexpected server response (${response.status})`);
  if (!body.success) throw new Error(body.error);
  return body.data;
}

export async function fetchChatHistory(sessionId: string): Promise<ChatMessage[]> {
  const data = await requestJson<{ messages: ChatMessage[] }>("/api/chat", sessionId);
  return data.messages;
}

export function sendChatMessage(
  sessionId: string,
  payload: ChatPostPayload
): Promise<{ userMessage: ChatMessage; assistantMessage: ChatMessage }> {
  return requestJson("/api/chat", sessionId, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function deleteConversation(sessionId: string): Promise<void> {
  await requestJson<{ deleted: number }>("/api/chat", sessionId, { method: "DELETE" });
}

export async function revertToMessage(sessionId: string, messageId: string, shouldKeepAnchorFiles: boolean): Promise<number> {
  const query = shouldKeepAnchorFiles ? "?keepAnchorFiles=1" : "";
  const data = await requestJson<{ deleted: number }>(`/api/chat/messages/${messageId}${query}`, sessionId, { method: "DELETE" });
  return data.deleted;
}

function toIdsQuery(sessionIds: string[]): string {
  return `ids=${encodeURIComponent(sessionIds.join(","))}`;
}

export async function fetchConversations(currentSessionId: string, sessionIds: string[]): Promise<ConversationSummary[]> {
  if (sessionIds.length === 0) return [];
  const data = await requestJson<{ conversations: ConversationSummary[] }>(
    `/api/conversations?${toIdsQuery(sessionIds)}`,
    currentSessionId
  );
  return data.conversations;
}

export async function fetchGeneratedImages(currentSessionId: string, sessionIds: string[]): Promise<GeneratedImage[]> {
  if (sessionIds.length === 0) return [];
  const data = await requestJson<{ images: GeneratedImage[] }>(`/api/images?${toIdsQuery(sessionIds)}`, currentSessionId);
  return data.images;
}

export interface ImageGenerationResult {
  image: GeneratedImage;
  userMessage: ChatMessage;
  assistantMessage: ChatMessage;
}

export function requestImageGeneration(sessionId: string, prompt: string, model: string): Promise<ImageGenerationResult> {
  return requestJson<ImageGenerationResult>("/api/images", sessionId, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, model }),
  });
}

export async function deleteGeneratedImage(currentSessionId: string, imageId: string, sessionIds: string[]): Promise<void> {
  await requestJson<{ deleted: string }>(`/api/images/${imageId}?${toIdsQuery(sessionIds)}`, currentSessionId, {
    method: "DELETE",
  });
}

export async function uploadAttachment(sessionId: string, file: File): Promise<Attachment> {
  const formData = new FormData();
  formData.append("file", file);
  const data = await requestJson<{ attachment: Attachment }>("/api/upload", sessionId, {
    method: "POST",
    body: formData,
  });
  return data.attachment;
}

export async function fetchBalance(sessionId: string): Promise<number | null> {
  const data = await requestJson<{ remainingUsd: number | null }>("/api/balance", sessionId);
  return data.remainingUsd;
}

