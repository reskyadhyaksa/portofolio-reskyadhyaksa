import fs from "node:fs";
import path from "node:path";
import { MESSAGE_TTL_MS } from "./chat-config";
import { deleteExpiredImages } from "./image-repository";
import { deleteExpiredMessages } from "./message-repository";
import { deleteExpiredSummaries } from "./summary-repository";
import { deleteExpiredVideos } from "./video-repository";
import { deleteUploadedFiles, UPLOAD_DIRECTORY } from "./upload-storage";

export interface CleanupReport {
  deletedMessages: number;
  deletedSummaries: number;
  deletedImages: number;
  deletedVideos: number;
  deletedFiles: number;
  failedFiles: number;
  executedAt: string;
}

const PRESERVED_FILES = new Set([".gitkeep"]);

export function purgeExpiredUploads(now: number = Date.now()): Pick<CleanupReport, "deletedFiles" | "failedFiles"> {
  if (!fs.existsSync(UPLOAD_DIRECTORY)) return { deletedFiles: 0, failedFiles: 0 };

  const expiryThreshold = now - MESSAGE_TTL_MS;
  let deletedFiles = 0;
  let failedFiles = 0;

  for (const entry of fs.readdirSync(UPLOAD_DIRECTORY)) {
    if (PRESERVED_FILES.has(entry)) continue;
    const filePath = path.join(UPLOAD_DIRECTORY, entry);
    try {
      const stats = fs.statSync(filePath);
      if (!stats.isFile()) continue;

      const timeMatch = /^(\d{13})-/.exec(entry);
      const fileTimestamp = timeMatch ? parseInt(timeMatch[1], 10) : stats.mtimeMs;

      if (fileTimestamp >= expiryThreshold && stats.mtimeMs >= expiryThreshold) continue;

      fs.unlinkSync(filePath);
      deletedFiles += 1;
    } catch {
      failedFiles += 1;
    }
  }

  return { deletedFiles, failedFiles };
}

export async function runCleanup(): Promise<CleanupReport> {
  const deletedMessages = deleteExpiredMessages();
  const deletedSummaries = deleteExpiredSummaries();
  const expiredImageUrls = deleteExpiredImages();
  const expiredVideoUrls = deleteExpiredVideos();

  const allExpiredUrls = [...expiredImageUrls, ...expiredVideoUrls];
  if (allExpiredUrls.length > 0) {
    await deleteUploadedFiles(allExpiredUrls);
  }

  const { deletedFiles, failedFiles } = purgeExpiredUploads();
  return {
    deletedMessages,
    deletedSummaries,
    deletedImages: expiredImageUrls.length,
    deletedVideos: expiredVideoUrls.length,
    deletedFiles,
    failedFiles,
    executedAt: new Date().toISOString(),
  };
}
