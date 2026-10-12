import { IMAGE_EXTENSIONS } from "@/lib/chat-config";

const SUPPORTED_EXTENSIONS: readonly string[] = IMAGE_EXTENSIONS;

function resolveExtension(mimeType: string): string | null {
  const subtype = mimeType.split("/")[1]?.toLowerCase();
  const extension = subtype === "jpeg" ? "jpg" : subtype;
  return extension && SUPPORTED_EXTENSIONS.includes(extension) ? extension : null;
}

function nameClipboardImage(file: File, index: number): File | null {
  const extension = resolveExtension(file.type);
  if (!extension) return null;
  return new File([file], `pasted-image-${Date.now()}-${index + 1}.${extension}`, { type: file.type });
}

export function extractClipboardImages(clipboard: DataTransfer | null): File[] {
  if (!clipboard || clipboard.getData("text/plain").length > 0) return [];
  return Array.from(clipboard.files)
    .filter((file) => file.type.startsWith("image/"))
    .map(nameClipboardImage)
    .filter((file): file is File => file !== null);
}
