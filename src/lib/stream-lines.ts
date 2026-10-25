export async function* readTextLines(body: ReadableStream<Uint8Array>): AsyncGenerator<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      yield* lines;
    }
    buffer += decoder.decode();
    if (buffer) yield buffer;
  } finally {
    await reader.cancel().catch(() => undefined);
  }
}
