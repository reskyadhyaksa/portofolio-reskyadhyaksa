import { MAX_TRACKED_SESSIONS, SESSION_HEADER } from "./chat-config";
import type { ApiResponse } from "./chat-types";

const NO_STORE_HEADERS = { "Cache-Control": "no-store, max-age=0" };

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function jsonSuccess<T>(data: T, status = 200): Response {
  const body: ApiResponse<T> = { success: true, data };
  return Response.json(body, { status, headers: NO_STORE_HEADERS });
}

export function jsonFailure(error: string, status: number): Response {
  const body: ApiResponse<never> = { success: false, error };
  return Response.json(body, { status, headers: NO_STORE_HEADERS });
}

export function isValidSessionId(candidate: unknown): candidate is string {
  return typeof candidate === "string" && UUID_PATTERN.test(candidate);
}

export function isValidMessageId(candidate: unknown): candidate is string {
  return typeof candidate === "string" && UUID_PATTERN.test(candidate);
}

export function readSessionId(request: Request): string | null {
  const sessionId = request.headers.get(SESSION_HEADER)?.trim();
  if (!isValidSessionId(sessionId)) return null;
  return sessionId;
}

export function readSessionIdList(request: Request): string[] | null {
  const rawIds = new URL(request.url).searchParams.get("ids");
  if (!rawIds) return [];
  const sessionIds = [...new Set(rawIds.split(",").map((id) => id.trim()).filter(Boolean))];
  if (sessionIds.length > MAX_TRACKED_SESSIONS || !sessionIds.every(isValidSessionId)) return null;
  return sessionIds;
}

export function describeError(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback;
}
