import { getDatabase } from "./db";
import type { GeneratedVideo } from "./chat-types";
import { ACTIVE_WINDOW, toIsoTimestamp } from "./message-repository";

interface VideoRow {
  id: string;
  session_id: string;
  prompt: string;
  model: string;
  url: string | null;
  status: "pending" | "in_progress" | "completed" | "failed";
  duration: number;
  resolution: string;
  aspect_ratio: string;
  created_at: string;
}

function toGeneratedVideo(row: VideoRow): GeneratedVideo {
  return {
    id: row.id,
    sessionId: row.session_id,
    prompt: row.prompt,
    model: row.model,
    url: row.url,
    status: row.status,
    duration: row.duration,
    resolution: row.resolution,
    aspectRatio: row.aspect_ratio,
    createdAt: toIsoTimestamp(row.created_at),
  };
}

export function insertVideoJob(params: {
  id: string;
  sessionId: string;
  prompt: string;
  model: string;
  duration: number;
  resolution: string;
  aspectRatio: string;
  status: "pending" | "in_progress" | "completed" | "failed";
}): GeneratedVideo {
  const row = getDatabase()
    .prepare(
      `INSERT INTO generated_videos (id, session_id, prompt, model, url, status, duration, resolution, aspect_ratio)
       VALUES (?, ?, ?, ?, NULL, ?, ?, ?, ?) RETURNING *`
    )
    .get(
      params.id,
      params.sessionId,
      params.prompt,
      params.model,
      params.status,
      params.duration,
      params.resolution,
      params.aspectRatio
    ) as VideoRow;
  return toGeneratedVideo(row);
}

export function updateVideoJobStatus(
  id: string,
  status: "pending" | "in_progress" | "completed" | "failed",
  url?: string | null
): GeneratedVideo | null {
  const row = getDatabase()
    .prepare(
      `UPDATE generated_videos
       SET status = ?, url = COALESCE(?, url)
       WHERE id = ? RETURNING *`
    )
    .get(status, url ?? null, id) as VideoRow | undefined;
  return row ? toGeneratedVideo(row) : null;
}

export function listGeneratedVideos(sessionIds: string[]): GeneratedVideo[] {
  if (sessionIds.length === 0) return [];
  const placeholders = sessionIds.map(() => "?").join(", ");
  const rows = getDatabase()
    .prepare(
      `SELECT * FROM generated_videos
       WHERE session_id IN (${placeholders}) AND datetime(created_at) >= datetime('now', ?)
       ORDER BY created_at DESC, rowid DESC`
    )
    .all(...sessionIds, ACTIVE_WINDOW) as VideoRow[];
  return rows.map(toGeneratedVideo);
}

export function findGeneratedVideo(id: string): GeneratedVideo | null {
  const row = getDatabase().prepare(`SELECT * FROM generated_videos WHERE id = ?`).get(id) as VideoRow | undefined;
  return row ? toGeneratedVideo(row) : null;
}

export function deleteGeneratedVideo(id: string): void {
  getDatabase().prepare(`DELETE FROM generated_videos WHERE id = ?`).run(id);
}

export function deleteSessionVideos(sessionId: string): void {
  getDatabase().prepare(`DELETE FROM generated_videos WHERE session_id = ?`).run(sessionId);
}

export function deleteExpiredVideos(): number {
  const result = getDatabase()
    .prepare(`DELETE FROM generated_videos WHERE datetime(created_at) < datetime('now', ?)`)
    .run(ACTIVE_WINDOW);
  return result.changes;
}
