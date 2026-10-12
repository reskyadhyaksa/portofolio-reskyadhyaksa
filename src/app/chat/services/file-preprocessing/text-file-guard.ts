import { CODE_FILE_BINARY_PROBE_BYTES } from "@/lib/chat-config";

const NULL_BYTE = 0;

export async function assertReadableTextFile(file: File): Promise<void> {
  const probe = new Uint8Array(await file.slice(0, CODE_FILE_BINARY_PROBE_BYTES).arrayBuffer());
  if (probe.includes(NULL_BYTE)) throw new Error(`${file.name} looks like a binary file, not source code`);
}
