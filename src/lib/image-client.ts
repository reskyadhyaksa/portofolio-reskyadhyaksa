import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { UPLOAD_PUBLIC_PREFIX } from "./chat-config";
import { IMAGE_RESPONSE_FORMAT, resolveOutputExtension, type ImageOptions } from "./image-options";
import { postRouterJson, readRouterEnv, UpstreamError } from "./router-http";
import { ensureUploadDirectory, resolveUploadPath } from "./upload-storage";

interface ImageGenerationResponse {
  data?: Array<{ b64_json?: string; url?: string }>;
}

async function downloadImage(remoteUrl: string): Promise<Buffer> {
  try {
    const response = await fetch(remoteUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`status ${response.status}`);
    return Buffer.from(await response.arrayBuffer());
  } catch {
    throw new UpstreamError("Failed to download generated image", 502);
  }
}

async function extractImageBuffer(payload: ImageGenerationResponse): Promise<Buffer> {
  const firstImage = payload.data?.[0];
  if (firstImage?.b64_json) return Buffer.from(firstImage.b64_json, "base64");
  if (firstImage?.url) return downloadImage(firstImage.url);
  throw new UpstreamError("AI router returned no image", 502);
}

async function storeGeneratedImage(buffer: Buffer, extension: string): Promise<string> {
  const storedFileName = `${Date.now()}-${randomUUID()}.${extension}`;
  const filePath = resolveUploadPath(storedFileName);
  if (!filePath) throw new UpstreamError("Invalid generated file name", 500);
  await ensureUploadDirectory();
  await fs.writeFile(filePath, buffer);
  return `${UPLOAD_PUBLIC_PREFIX}${storedFileName}`;
}

export async function generateImage(prompt: string, model: string, options: ImageOptions): Promise<string> {
  const endpoint = readRouterEnv("AI_IMAGE_BASE_URL");
  const payload = await postRouterJson<ImageGenerationResponse>(endpoint, {
    model,
    prompt,
    n: 1,
    size: options.size,
    quality: options.quality,
    output_format: options.outputFormat,
    response_format: IMAGE_RESPONSE_FORMAT,
  });
  return storeGeneratedImage(await extractImageBuffer(payload), resolveOutputExtension(options.outputFormat));
}
