import { getDatabase } from "./db";
import type { Attachment } from "./chat-types";

interface TruncatedRow {
  id: string;
  attachments: string | null;
}

interface AnchorRow {
  created_at: string;
  rowid: number;
}

export interface TruncationResult {
  deletedCount: number;
  attachmentUrls: string[];
  anchorAttachmentUrls: string[];
}

function parseAttachmentUrls(serialized: string | null): string[] {
  if (!serialized) return [];
  try {
    const parsed: unknown = JSON.parse(serialized);
    return Array.isArray(parsed) ? (parsed as Attachment[]).map((attachment) => attachment.url) : [];
  } catch {
    return [];
  }
}

export function truncateFromMessage(sessionId: string, messageId: string): TruncationResult | null {
  const database = getDatabase();

  const runTruncation = database.transaction((): TruncationResult | null => {
    const anchor = database
      .prepare(`SELECT created_at, rowid FROM messages WHERE id = ? AND session_id = ?`)
      .get(messageId, sessionId) as AnchorRow | undefined;
    if (!anchor) return null;

    const removedRows = database
      .prepare(
        `DELETE FROM messages
         WHERE session_id = ? AND (created_at > ? OR (created_at = ? AND rowid >= ?))
         RETURNING id, attachments`
      )
      .all(sessionId, anchor.created_at, anchor.created_at, anchor.rowid) as TruncatedRow[];

    const anchorRow = removedRows.find((row) => row.id === messageId);
    return {
      deletedCount: removedRows.length,
      attachmentUrls: removedRows.flatMap((row) => parseAttachmentUrls(row.attachments)),
      anchorAttachmentUrls: parseAttachmentUrls(anchorRow?.attachments ?? null),
    };
  });

  return runTruncation();
}
