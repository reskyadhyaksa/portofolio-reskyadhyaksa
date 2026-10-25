import { SESSION_HEADER } from "@/lib/chat-config";
import type { ImageOptions } from "@/lib/image-options";
import { readTextLines } from "@/lib/stream-lines";
import type {
  ApiResponse,
  Attachment,
  ChatMessage,
  ChatPostPayload,
  ChatStreamEvent,
  ConversationSummary,
  GeneratedImage,
  GeneratedVideo,
} from "@/lib/chat-types";

async function requestJson<T>(input: string, sessionId: string, init: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(input, {
      ...init,
      cache: "no-store",
      headers: { ...init.headers, [SESSION_HEADER]: sessionId },
    });
  } catch (error) {
    if (init.signal?.aborted) throw error;
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

export interface ChatStreamHandlers {
  onDelta: (text: string) => void;
}

async function openChatStream(sessionId: string, payload: ChatPostPayload, signal: AbortSignal): Promise<Response> {
  try {
    return await fetch("/api/chat", {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json", [SESSION_HEADER]: sessionId },
      body: JSON.stringify(payload),
      signal,
    });
  } catch (error) {
    if (signal.aborted) throw error;
    throw new Error("Network error. Check your connection and try again.");
  }
}

function parseStreamEvent(line: string): ChatStreamEvent | null {
  if (!line.trim()) return null;
  try {
    return JSON.parse(line) as ChatStreamEvent;
  } catch {
    return null;
  }
}

export async function streamChatMessage(
  sessionId: string,
  payload: ChatPostPayload,
  handlers: ChatStreamHandlers,
  signal: AbortSignal
): Promise<{ userMessage: ChatMessage; assistantMessage: ChatMessage }> {
  const response = await openChatStream(sessionId, payload, signal);
  if (!response.ok || !response.body) {
    const body = (await response.json().catch(() => null)) as ApiResponse<never> | null;
    throw new Error(body && !body.success ? body.error : `Unexpected server response (${response.status})`);
  }

  let userMessage: ChatMessage | null = null;
  for await (const line of readTextLines(response.body)) {
    const event = parseStreamEvent(line);
    if (!event) continue;
    if (event.type === "error") throw new Error(event.error);
    if (event.type === "delta") handlers.onDelta(event.text);
    if (event.type === "user") userMessage = event.message;
    if (event.type === "done" && userMessage) return { userMessage, assistantMessage: event.message };
  }

  if (signal.aborted) throw new DOMException("Aborted", "AbortError");
  throw new Error("Connection to the AI was interrupted. Please try again.");
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

export function requestImageGeneration(
  sessionId: string,
  prompt: string,
  model: string,
  options: ImageOptions,
  referenceImageUrlOrSignal?: string | AbortSignal | null,
  optionalSignal?: AbortSignal
): Promise<ImageGenerationResult> {
  const referenceImageUrl = typeof referenceImageUrlOrSignal === "string" ? referenceImageUrlOrSignal : undefined;
  const signal = referenceImageUrlOrSignal instanceof AbortSignal ? referenceImageUrlOrSignal : optionalSignal;
  return requestJson<ImageGenerationResult>("/api/images", sessionId, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, model, options, referenceImageUrl }),
    signal,
  });
}

export async function deleteGeneratedImage(currentSessionId: string, imageId: string, sessionIds: string[]): Promise<void> {
  await requestJson<{ deleted: string }>(`/api/images/${imageId}?${toIdsQuery(sessionIds)}`, currentSessionId, {
    method: "DELETE",
  });
}

export async function fetchGeneratedVideos(currentSessionId: string, sessionIds: string[]): Promise<GeneratedVideo[]> {
  if (sessionIds.length === 0) return [];
  const data = await requestJson<{ videos: GeneratedVideo[] }>(`/api/videos?${toIdsQuery(sessionIds)}`, currentSessionId);
  return data.videos;
}

export interface RequestVideoParams {
  prompt: string;
  model: string;
  duration?: number;
  resolution?: string;
  aspectRatio?: string;
}

export function requestVideoGeneration(
  sessionId: string,
  params: RequestVideoParams,
  signal?: AbortSignal
): Promise<GeneratedVideo> {
  return requestJson<GeneratedVideo>("/api/videos", sessionId, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
    signal,
  });
}

export function pollVideoStatus(sessionId: string, videoId: string): Promise<GeneratedVideo> {
  return requestJson<GeneratedVideo>(`/api/videos/${encodeURIComponent(videoId)}`, sessionId);
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
