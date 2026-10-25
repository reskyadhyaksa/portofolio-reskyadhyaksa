import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { UPLOAD_PUBLIC_PREFIX } from "./chat-config";
import { IMAGE_RESPONSE_FORMAT, resolveOutputExtension, type ImageOptions } from "./image-options";
import { postRouterJson, readRouterApiKey, readRouterEnv, UpstreamError } from "./router-http";
import { ensureUploadDirectory, resolveUploadPath } from "./upload-storage";

interface ImageGenerationResponse {
  data?: Array<{ b64_json?: string; url?: string }>;
}

async function downloadImage(remoteUrl: string, signal?: AbortSignal): Promise<Buffer> {
  try {
    const headers: Record<string, string> = {};
    const apiKey = process.env.AI_ROUTER_API_KEY;
    if (apiKey) {
      headers.Authorization = `Bearer ${apiKey}`;
    }
    const response = await fetch(remoteUrl, { headers, cache: "no-store", signal });
    if (!response.ok) throw new Error(`status ${response.status}`);
    return Buffer.from(await response.arrayBuffer());
  } catch {
    throw new UpstreamError("Failed to download generated image", 502);
  }
}

async function extractImageBuffer(payload: ImageGenerationResponse, signal?: AbortSignal): Promise<Buffer> {
  const firstImage = payload.data?.[0];
  if (firstImage?.b64_json) return Buffer.from(firstImage.b64_json, "base64");
  if (firstImage?.url) return downloadImage(firstImage.url, signal);
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

export async function generateImage(
  prompt: string,
  model: string,
  options: ImageOptions,
  referenceImageUrl?: string | null,
  signal?: AbortSignal
): Promise<string> {
  const endpoint = readRouterEnv("AI_IMAGE_BASE_URL");
  const requestBody: Record<string, unknown> = {
    model,
    prompt,
    n: 1,
    size: options.size,
    aspect_ratio: options.aspectRatio,
    quality: options.quality,
    output_format: options.outputFormat,
    response_format: IMAGE_RESPONSE_FORMAT,
  };

  if (referenceImageUrl) {
    requestBody.input_references = [
      {
        type: "image_url",
        image_url: { url: referenceImageUrl },
      },
    ];
  }

  const payload = await postRouterJson<ImageGenerationResponse>(endpoint, requestBody, signal);
  return storeGeneratedImage(await extractImageBuffer(payload, signal), resolveOutputExtension(options.outputFormat));
}
