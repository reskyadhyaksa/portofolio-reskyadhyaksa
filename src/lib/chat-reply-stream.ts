import type { ChatMessage, ChatStreamEvent } from "./chat-types";
import { describeError } from "./api-response";
import { buildConversationContext } from "./conversation-context";
import { streamChatCompletion } from "./llm-stream";
import { deleteMessageById, insertMessage, listActiveMessages } from "./message-repository";

const NDJSON_HEADERS = {
  "Content-Type": "application/x-ndjson; charset=utf-8",
  "Cache-Control": "no-store, max-age=0",
  "X-Accel-Buffering": "no",
};

interface ChatReplyStreamOptions {
  userMessage: ChatMessage;
  model: string;
  signal: AbortSignal;
}

async function produceReply(
  { userMessage, model, signal }: ChatReplyStreamOptions,
  emit: (event: ChatStreamEvent) => void
): Promise<void> {
  emit({ type: "user", message: userMessage });
  const upstreamMessages = await buildConversationContext(userMessage.sessionId, model, listActiveMessages(userMessage.sessionId));

  let replyText = "";
  for await (const text of streamChatCompletion(model, upstreamMessages, signal)) {
    replyText += text;
    emit({ type: "delta", text });
  }

  const completion = replyText.trim();
  if (!completion) throw new Error("AI router returned an empty response");
  if (signal.aborted) throw new Error("Request cancelled by client");
  const assistantMessage = insertMessage({ sessionId: userMessage.sessionId, role: "assistant", content: completion, model });
  emit({ type: "done", message: assistantMessage });
}

export function createChatReplyStream(options: ChatReplyStreamOptions): Response {
  const encoder = new TextEncoder();
  let isClosed = false;

  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (event: ChatStreamEvent) => {
        if (isClosed || options.signal.aborted) return;
        controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      };

      try {
        await produceReply(options, emit);
      } catch (error) {
        deleteMessageById(options.userMessage.id);
        emit({ type: "error", error: describeError(error, "Failed to process chat message") });
      } finally {
        if (!isClosed) controller.close();
        isClosed = true;
      }
    },
    cancel() {
      isClosed = true;
    },
  });

  return new Response(body, { status: 200, headers: NDJSON_HEADERS });
}
