export type ChatRole = "user" | "assistant";

export type AttachmentKind = "image" | "document";

export interface Attachment {
  url: string;
  type: AttachmentKind;
  name: string;
  mimeType?: string;
  size?: number;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: ChatRole;
  content: string;
  model: string | null;
  attachments: Attachment[];
  createdAt: string;
}

export interface ChatPostPayload {
  model: string;
  content: string;
  attachments: Attachment[];
}

export type ChatStreamEvent =
  | { type: "user"; message: ChatMessage }
  | { type: "delta"; text: string }
  | { type: "done"; message: ChatMessage }
  | { type: "error"; error: string };

export interface ConversationSummary {
  id: string;
  title: string;
  messageCount: number;
  updatedAt: string;
}

export interface GeneratedImage {
  id: string;
  sessionId: string;
  prompt: string;
  url: string;
  createdAt: string;
}

export interface GeneratedVideo {
  id: string;
  sessionId: string;
  prompt: string;
  model: string;
  url: string | null;
  status: "pending" | "in_progress" | "completed" | "failed";
  duration: number;
  resolution: string;
  aspectRatio: string;
  createdAt: string;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiFailure {
  success: false;
  error: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
