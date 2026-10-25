import { UPSTREAM_TIMEOUT_MS } from "./chat-config";

export class UpstreamError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "UpstreamError";
  }
}

export interface RouterErrorPayload {
  error?: { message?: string } | string;
}

export function readRouterApiKey(): string {
  const apiKey = process.env.AI_ROUTER_API_KEY;
  if (!apiKey) throw new UpstreamError("AI router is not configured", 500);
  return apiKey;
}

export function extractRouterError(payload: RouterErrorPayload | null, fallback: string): string {
  if (!payload?.error) return fallback;
  return typeof payload.error === "string" ? payload.error : payload.error.message ?? fallback;
}

export function readRouterEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new UpstreamError(`${name} is not configured`, 500);
  return value;
}

async function requestRouterJson<T>(endpoint: string, init: RequestInit): Promise<T> {
  const clientSignal = init.signal ?? null;
  const timeoutSignal = AbortSignal.timeout(UPSTREAM_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(endpoint, {
      ...init,
      headers: { ...init.headers, Authorization: `Bearer ${readRouterApiKey()}` },
      cache: "no-store",
      signal: clientSignal ? AbortSignal.any([timeoutSignal, clientSignal]) : timeoutSignal,
    });
  } catch (error) {
    if (error instanceof UpstreamError) throw error;
    if (clientSignal?.aborted) throw new UpstreamError("Request cancelled by client", 499);
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

export function postRouterJson<T>(
  endpoint: string,
  body: unknown,
  signal?: AbortSignal,
  extraHeaders?: Record<string, string>
): Promise<T> {
  return requestRouterJson<T>(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...extraHeaders },
    body: JSON.stringify(body),
    signal,
  });
}

export function getRouterJson<T>(endpoint: string): Promise<T> {
  return requestRouterJson<T>(endpoint, { method: "GET" });
}
