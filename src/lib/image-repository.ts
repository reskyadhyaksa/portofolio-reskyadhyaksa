import { randomUUID } from "node:crypto";
import { getDatabase } from "./db";
import type { GeneratedImage } from "./chat-types";
import { ACTIVE_WINDOW, toIsoTimestamp } from "./message-repository";

interface ImageRow {
  id: string;
  session_id: string;
  prompt: string;
  url: string;
  created_at: string;
}

function toGeneratedImage(row: ImageRow): GeneratedImage {
  return {
    id: row.id,
    sessionId: row.session_id,
    prompt: row.prompt,
    url: row.url,
    createdAt: toIsoTimestamp(row.created_at),
  };
}

export function insertGeneratedImage(sessionId: string, prompt: string, url: string): GeneratedImage {
  const row = getDatabase()
    .prepare(`INSERT INTO generated_images (id, session_id, prompt, url) VALUES (?, ?, ?, ?) RETURNING *`)
    .get(randomUUID(), sessionId, prompt, url) as ImageRow;
  return toGeneratedImage(row);
}

export function listGeneratedImages(sessionIds: string[]): GeneratedImage[] {
  if (sessionIds.length === 0) return [];
  const placeholders = sessionIds.map(() => "?").join(", ");
  const rows = getDatabase()
    .prepare(
      `SELECT * FROM generated_images
       WHERE session_id IN (${placeholders}) AND datetime(created_at) >= datetime('now', ?)
       ORDER BY created_at DESC, rowid DESC`
    )
    .all(...sessionIds, ACTIVE_WINDOW) as ImageRow[];
  return rows.map(toGeneratedImage);
}

export function findGeneratedImage(imageId: string): GeneratedImage | null {
  const row = getDatabase().prepare(`SELECT * FROM generated_images WHERE id = ?`).get(imageId) as ImageRow | undefined;
  return row ? toGeneratedImage(row) : null;
}

export function deleteGeneratedImage(imageId: string): void {
  getDatabase().prepare(`DELETE FROM generated_images WHERE id = ?`).run(imageId);
}

export function deleteSessionImages(sessionId: string): string[] {
  const rows = getDatabase()
    .prepare(`DELETE FROM generated_images WHERE session_id = ? RETURNING url`)
    .all(sessionId) as Array<{ url: string }>;
  return rows.map((row) => row.url);
}

export function deleteExpiredImages(): number {
  const result = getDatabase()
    .prepare(`DELETE FROM generated_images WHERE datetime(created_at) < datetime('now', ?)`)
    .run(ACTIVE_WINDOW);
  return result.changes;
}

export function deleteImagesByUrls(sessionId: string, urls: string[]): void {
  if (urls.length === 0) return;
  const placeholders = urls.map(() => "?").join(", ");
  getDatabase()
    .prepare(`DELETE FROM generated_images WHERE session_id = ? AND url IN (${placeholders})`)
    .run(sessionId, ...urls);
}

