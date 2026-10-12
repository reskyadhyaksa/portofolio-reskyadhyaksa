import { UPSTREAM_TIMEOUT_MS } from "./chat-config";

export class UpstreamError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "UpstreamError";
  }
}

interface RouterErrorPayload {
  error?: { message?: string } | string;
}

function readRouterApiKey(): string {
  const apiKey = process.env.AI_ROUTER_API_KEY;
  if (!apiKey) throw new UpstreamError("AI router is not configured", 500);
  return apiKey;
}

function extractRouterError(payload: RouterErrorPayload | null, fallback: string): string {
  if (!payload?.error) return fallback;
  return typeof payload.error === "string" ? payload.error : payload.error.message ?? fallback;
}

export function readRouterEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new UpstreamError(`${name} is not configured`, 500);
  return value;
}

async function requestRouterJson<T>(endpoint: string, init: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(endpoint, {
      ...init,
      headers: { ...init.headers, Authorization: `Bearer ${readRouterApiKey()}` },
      cache: "no-store",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch (error) {
    if (error instanceof UpstreamError) throw error;
    const isTimeout = error instanceof Error && error.name === "TimeoutError";
    throw new UpstreamError(isTimeout ? "AI router timed out" : "Failed to reach AI router", isTimeout ? 504 : 502);
  }

  const payload = (await response.json().catch(() => null)) as (T & RouterErrorPayload) | null;
  if (!response.ok) {
    throw new UpstreamError(extractRouterError(payload, `AI router error (${response.status})`), 502);
  }
  if (!payload) throw new UpstreamError("AI router returned an invalid response", 502);
  return payload;
}

export function postRouterJson<T>(endpoint: string, body: unknown): Promise<T> {
  return requestRouterJson<T>(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export function getRouterJson<T>(endpoint: string): Promise<T> {
  return requestRouterJson<T>(endpoint, { method: "GET" });
}
