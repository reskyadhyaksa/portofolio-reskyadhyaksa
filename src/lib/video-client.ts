import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { UPLOAD_PUBLIC_PREFIX } from "./chat-config";
import { postRouterJson, getRouterJson, readRouterApiKey, UpstreamError } from "./router-http";
import { ensureUploadDirectory, resolveUploadPath } from "./upload-storage";

export interface VideoJobCreationResponse {
  id: string;
  polling_url?: string;
  status?: "pending" | "in_progress" | "completed" | "failed";
}

export interface VideoJobStatusResponse {
  id: string;
  status: "pending" | "in_progress" | "completed" | "failed" | "cancelled" | "expired";
  unsigned_urls?: string[];
  error?: string;
}

export interface CreateVideoParams {
  prompt: string;
  model: string;
  duration?: number;
  resolution?: string;
  aspectRatio?: string;
}

export async function createVideoJob(params: CreateVideoParams, signal?: AbortSignal): Promise<VideoJobCreationResponse> {
  const endpoint = process.env.AI_VIDEO_BASE_URL || "https://gateway.yupi.ai.id/v1/videos";
  const body = {
    model: params.model,
    prompt: params.prompt,
    duration: params.duration ?? 5,
    resolution: params.resolution ?? "720p",
    aspect_ratio: params.aspectRatio ?? "16:9",
  };
  const idempotencyKey = `video-${Date.now()}-${randomUUID().slice(0, 8)}`;

  return postRouterJson<VideoJobCreationResponse>(endpoint, body, signal, {
    "Idempotency-Key": idempotencyKey,
  });
}

export async function getVideoJobStatus(jobId: string): Promise<VideoJobStatusResponse> {
  const baseUrl = process.env.AI_VIDEO_BASE_URL || "https://gateway.yupi.ai.id/v1/videos";
  const endpoint = `${baseUrl.replace(/\/+$/, "")}/${encodeURIComponent(jobId)}`;
  return getRouterJson<VideoJobStatusResponse>(endpoint);
}

export async function downloadVideoBuffer(downloadUrl: string, signal?: AbortSignal): Promise<Buffer> {
  try {
    const response = await fetch(downloadUrl, {
      headers: { Authorization: `Bearer ${readRouterApiKey()}` },
      cache: "no-store",
      signal,
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return Buffer.from(await response.arrayBuffer());
  } catch (error) {
    if (error instanceof UpstreamError) throw error;
    throw new UpstreamError("Failed to download generated video content", 502);
  }
}

export async function storeGeneratedVideo(buffer: Buffer): Promise<string> {
  const storedFileName = `${Date.now()}-${randomUUID()}.mp4`;
  const filePath = resolveUploadPath(storedFileName);
  if (!filePath) throw new UpstreamError("Invalid generated video path", 500);
  await ensureUploadDirectory();
  await fs.writeFile(filePath, buffer);
  return `${UPLOAD_PUBLIC_PREFIX}${storedFileName}`;
}
