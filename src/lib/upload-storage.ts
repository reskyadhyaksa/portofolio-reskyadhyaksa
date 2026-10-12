import fs from "node:fs/promises";
import path from "node:path";

export const UPLOAD_DIRECTORY = path.join(process.cwd(), "public", "uploads");

export async function ensureUploadDirectory(): Promise<void> {
  await fs.mkdir(UPLOAD_DIRECTORY, { recursive: true });
}

export function resolveUploadPath(fileName: string): string | null {
  if (!/^[A-Za-z0-9-]+\.[a-z0-9]+$/.test(fileName)) return null;
  const safeName = path.basename(fileName);
  if (safeName !== fileName) return null;
  return path.join(UPLOAD_DIRECTORY, safeName);
}

export function fileNameFromPublicUrl(publicUrl: string): string | null {
  const match = /^\/uploads\/([A-Za-z0-9-]+\.[a-z0-9]+)$/.exec(publicUrl);
  return match ? match[1] : null;
}

export async function deleteUploadedFiles(publicUrls: string[]): Promise<number> {
  const results = await Promise.allSettled(
    publicUrls.map(async (publicUrl) => {
      const fileName = fileNameFromPublicUrl(publicUrl);
      const filePath = fileName ? resolveUploadPath(fileName) : null;
      if (!filePath) throw new Error("Invalid upload url");
      await fs.unlink(filePath);
    })
  );
  return results.filter((result) => result.status === "fulfilled").length;
}
