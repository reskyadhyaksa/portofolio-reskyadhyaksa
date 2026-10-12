import { getDatabase } from "./db";
import { ACTIVE_WINDOW } from "./message-repository";

export interface StoredSummary {
  summary: string;
  summarizedCount: number;
}

interface SummaryRow {
  summary: string;
  summarized_count: number;
}

export function readSummary(sessionId: string): StoredSummary | null {
  const row = getDatabase()
    .prepare(`SELECT summary, summarized_count FROM conversation_summaries WHERE session_id = ?`)
    .get(sessionId) as SummaryRow | undefined;
  return row ? { summary: row.summary, summarizedCount: row.summarized_count } : null;
}

export function saveSummary(sessionId: string, stored: StoredSummary): void {
  getDatabase()
    .prepare(
      `INSERT INTO conversation_summaries (session_id, summary, summarized_count, updated_at)
       VALUES (?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(session_id) DO UPDATE SET
         summary = excluded.summary,
         summarized_count = excluded.summarized_count,
         updated_at = CURRENT_TIMESTAMP`
    )
    .run(sessionId, stored.summary, stored.summarizedCount);
}

export function deleteSummary(sessionId: string): void {
  getDatabase().prepare(`DELETE FROM conversation_summaries WHERE session_id = ?`).run(sessionId);
}

export function deleteExpiredSummaries(): number {
  const result = getDatabase()
    .prepare(`DELETE FROM conversation_summaries WHERE datetime(updated_at) < datetime('now', ?)`)
    .run(ACTIVE_WINDOW);
  return result.changes;
}
