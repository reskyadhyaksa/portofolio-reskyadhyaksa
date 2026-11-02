import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { UPLOAD_PUBLIC_PREFIX } from "./chat-config";
import { extractExtension } from "./file-validation";
import type { ImageOptions } from "./image-options";
import { postRouterJson, readRouterEnv, UpstreamError } from "./router-http";
import { ensureUploadDirectory, fileNameFromPublicUrl, resolveUploadPath } from "./upload-storage";

interface ImageGenerationResponse {
  data?: Array<{ b64_json?: string; url?: string; media_type?: string }>;
}

function resolveExtensionFromMediaType(mediaType?: string, fallbackFormat?: string): string {
  if (mediaType?.includes("jpeg") || mediaType?.includes("jpg")) return "jpg";
  if (mediaType?.includes("webp")) return "webp";
  if (mediaType?.includes("png")) return "png";
  if (fallbackFormat === "jpeg") return "jpg";
  if (fallbackFormat === "webp") return "webp";
  return "png";
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

async function resolveReferenceImageUrl(rawUrl: string): Promise<string> {
  if (rawUrl.startsWith("data:")) return rawUrl;

  let pathname = rawUrl;
  if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) {
    try {
      const parsed = new URL(rawUrl);
      if (
        parsed.hostname === "localhost" ||
        parsed.hostname === "127.0.0.1" ||
        parsed.hostname.startsWith("192.168.") ||
        parsed.hostname.startsWith("10.")
      ) {
        pathname = parsed.pathname;
      } else {
        return rawUrl;
      }
    } catch {
      return rawUrl;
    }
  }

  const fileName = fileNameFromPublicUrl(pathname);
  const filePath = fileName ? resolveUploadPath(fileName) : null;
  if (filePath) {
    try {
      const buffer = await fs.readFile(filePath);
      const ext = extractExtension(filePath) || "png";
      const mimeType = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : ext === "webp" ? "image/webp" : "image/png";
      return `data:${mimeType};base64,${buffer.toString("base64")}`;
    } catch {
      return rawUrl;
    }
  }

  return rawUrl;
}

export async function generateImage(
  prompt: string,
  model: string,
  options: ImageOptions,
  referenceImageUrls?: string[] | string | null,
  signal?: AbortSignal
): Promise<string> {
  const endpoint = readRouterEnv("AI_IMAGE_BASE_URL");
  const requestBody: Record<string, unknown> = {
    model,
    prompt,
    n: 1,
  };

  if (options.aspectRatio) {
    requestBody.aspect_ratio = options.aspectRatio;
  }

  if (options.resolution && options.resolution !== "auto") {
    requestBody.resolution = options.resolution;
  }

  const urls = Array.isArray(referenceImageUrls)
    ? referenceImageUrls.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : typeof referenceImageUrls === "string" && referenceImageUrls.trim().length > 0
      ? [referenceImageUrls.trim()]
      : [];

  if (urls.length > 0) {
    const resolvedUrls = await Promise.all(urls.map(resolveReferenceImageUrl));
    requestBody.input_references = resolvedUrls.map((url) => ({
      type: "image_url",
      image_url: { url },
    }));
  }

  const payload = await postRouterJson<ImageGenerationResponse>(endpoint, requestBody, signal);
  const mediaType = payload.data?.[0]?.media_type;
  const extension = resolveExtensionFromMediaType(mediaType, options.outputFormat);
  return storeGeneratedImage(await extractImageBuffer(payload, signal), extension);
}
