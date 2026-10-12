import type { UpstreamMessage } from "./llm-payload";
import { postRouterJson, readRouterEnv, UpstreamError } from "./router-http";

export { UpstreamError };

interface CompletionChoice {
  message?: { content?: string | Array<{ type?: string; text?: string }> };
}

interface CompletionResponse {
  choices?: CompletionChoice[];
}

function extractCompletionText(payload: CompletionResponse): string {
  const content = payload.choices?.[0]?.message?.content;
  if (typeof content === "string") return content.trim();
  if (Array.isArray(content)) {
    return content.map((part) => part.text ?? "").join("").trim();
  }
  return "";
}

export async function requestChatCompletion(model: string, messages: UpstreamMessage[]): Promise<string> {
  const endpoint = readRouterEnv("AI_ROUTER_BASE_URL");
  const payload = await postRouterJson<CompletionResponse>(endpoint, { model, messages, stream: false });
  const completionText = extractCompletionText(payload);
  if (!completionText) throw new UpstreamError("AI router returned an empty response", 502);
  return completionText;
}
