import { CLIENT_IMAGE_COMPRESS_MIN_BYTES, CLIENT_IMAGE_MAX_DIMENSION, CLIENT_IMAGE_QUALITY } from "@/lib/chat-config";

const COMPRESSIBLE_MIME_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);
const OUTPUT_MIME_TYPE = "image/webp";

function computeScaledSize(width: number, height: number): { width: number; height: number } {
  const longestSide = Math.max(width, height);
  if (longestSide <= CLIENT_IMAGE_MAX_DIMENSION) return { width, height };
  const ratio = CLIENT_IMAGE_MAX_DIMENSION / longestSide;
  return { width: Math.round(width * ratio), height: Math.round(height * ratio) };
}

function replaceExtension(fileName: string, extension: string): string {
  const lastDot = fileName.lastIndexOf(".");
  const baseName = lastDot > 0 ? fileName.slice(0, lastDot) : fileName;
  return `${baseName}.${extension}`;
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, OUTPUT_MIME_TYPE, CLIENT_IMAGE_QUALITY));
}

export async function compressImage(file: File): Promise<File> {
  const isCompressible = COMPRESSIBLE_MIME_TYPES.has(file.type);
  const isWorthCompressing = file.size >= CLIENT_IMAGE_COMPRESS_MIN_BYTES;
  if (!isCompressible || !isWorthCompressing) return file;

  const bitmap = await createImageBitmap(file);
  try {
    const { width, height } = computeScaledSize(bitmap.width, bitmap.height);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) return file;
    context.drawImage(bitmap, 0, 0, width, height);

    const blob = await canvasToBlob(canvas);
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], replaceExtension(file.name, "webp"), { type: OUTPUT_MIME_TYPE, lastModified: Date.now() });
  } finally {
    bitmap.close();
  }
}
