import fs from "node:fs";
import path from "node:path";
import { MESSAGE_TTL_MS } from "./chat-config";
import { deleteExpiredImages } from "./image-repository";
import { deleteExpiredMessages } from "./message-repository";
import { deleteExpiredSummaries } from "./summary-repository";
import { deleteExpiredVideos } from "./video-repository";
import { UPLOAD_DIRECTORY } from "./upload-storage";

export interface CleanupReport {
  deletedMessages: number;
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
      if (!stats.isFile() || stats.mtimeMs >= expiryThreshold) continue;
      fs.unlinkSync(filePath);
      deletedFiles += 1;
    } catch {
      failedFiles += 1;
    }
  }

  return { deletedFiles, failedFiles };
}

export function runCleanup(): CleanupReport {
  const deletedMessages = deleteExpiredMessages();
  deleteExpiredSummaries();
  deleteExpiredImages();
  deleteExpiredVideos();
  const { deletedFiles, failedFiles } = purgeExpiredUploads();
  return {
    deletedMessages,
    deletedFiles,
    failedFiles,
    executedAt: new Date().toISOString(),
  };
}
