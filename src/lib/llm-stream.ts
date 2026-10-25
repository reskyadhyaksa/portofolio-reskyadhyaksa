import { STREAM_IDLE_TIMEOUT_MS } from "./chat-config";
import { extractCompletionText } from "./llm-client";
import type { UpstreamMessage } from "./llm-payload";
import { extractRouterError, readRouterApiKey, readRouterEnv, UpstreamError, type RouterErrorPayload } from "./router-http";
import { readTextLines } from "./stream-lines";

const SSE_DATA_PREFIX = "data:";
const SSE_DONE_MARKER = "[DONE]";

interface StreamChunk extends RouterErrorPayload {
  choices?: Array<{ delta?: { content?: string | null } }>;
}

function createIdleWatchdog(timeoutMs: number) {
  const controller = new AbortController();
  let timer = setTimeout(() => controller.abort(), timeoutMs);
  return {
    signal: controller.signal,
    reset() {
      clearTimeout(timer);
      timer = setTimeout(() => controller.abort(), timeoutMs);
    },
    dispose() {
      clearTimeout(timer);
    },
  };
}

function parseDeltaText(line: string): string | null {
  if (!line.startsWith(SSE_DATA_PREFIX)) return null;
  const data = line.slice(SSE_DATA_PREFIX.length).trim();
  if (!data || data === SSE_DONE_MARKER) return null;

  let chunk: StreamChunk;
  try {
    chunk = JSON.parse(data) as StreamChunk;
  } catch {
    return null;
  }
  if (chunk.error) throw new UpstreamError(extractRouterError(chunk, "AI router stream failed"), 502);
  return chunk.choices?.[0]?.delta?.content ?? null;
}

function toStreamError(error: unknown, clientSignal: AbortSignal | undefined, idleSignal: AbortSignal): UpstreamError {
  if (error instanceof UpstreamError) return error;
  if (clientSignal?.aborted) return new UpstreamError("Request cancelled by client", 499);
  if (idleSignal.aborted) return new UpstreamError("AI router stopped responding", 504);
  return new UpstreamError("Failed to reach AI router", 502);
}

async function openCompletionStream(model: string, messages: UpstreamMessage[], signal: AbortSignal): Promise<Response> {
  const response = await fetch(readRouterEnv("AI_ROUTER_BASE_URL"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      Authorization: `Bearer ${readRouterApiKey()}`,
    },
    body: JSON.stringify({ model, messages, stream: true, max_tokens: 8192 }),
    cache: "no-store",
    signal,
  });
  if (response.ok && response.body) return response;
  const payload = (await response.json().catch(() => null)) as RouterErrorPayload | null;
  throw new UpstreamError(extractRouterError(payload, `AI router error (${response.status})`), 502);
}

export async function* streamChatCompletion(
  model: string,
  messages: UpstreamMessage[],
  clientSignal?: AbortSignal
): AsyncGenerator<string> {
  const watchdog = createIdleWatchdog(STREAM_IDLE_TIMEOUT_MS);
  const signal = clientSignal ? AbortSignal.any([watchdog.signal, clientSignal]) : watchdog.signal;

  try {
    const response = await openCompletionStream(model, messages, signal);
    if (response.headers.get("content-type")?.includes("application/json")) {
      yield extractCompletionText(await response.json());
      return;
    }
    for await (const line of readTextLines(response.body!)) {
      watchdog.reset();
      const text = parseDeltaText(line);
      if (text) yield text;
    }
  } catch (error) {
    throw toStreamError(error, clientSignal, watchdog.signal);
  } finally {
    watchdog.dispose();
  }
}
