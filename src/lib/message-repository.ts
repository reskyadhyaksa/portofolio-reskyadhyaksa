import { randomUUID } from "node:crypto";
import { getDatabase } from "./db";
import { MAX_CONVERSATION_TITLE_CHARS, MAX_HISTORY_MESSAGES, MESSAGE_TTL_HOURS } from "./chat-config";
import type { Attachment, ChatMessage, ChatRole, ConversationSummary } from "./chat-types";

interface MessageRow {
  id: string;
  session_id: string;
  role: ChatRole;
  content: string;
  model: string | null;
  attachments: string | null;
  created_at: string;
}

interface NewMessage {
  sessionId: string;
  role: ChatRole;
  content: string;
  model: string | null;
  attachments?: Attachment[];
}

export const ACTIVE_WINDOW = `-${MESSAGE_TTL_HOURS} hours`;

export function toIsoTimestamp(sqliteTimestamp: string): string {
  return `${sqliteTimestamp.replace(" ", "T")}Z`;
}

function parseAttachments(serialized: string | null): Attachment[] {
  if (!serialized) return [];
  try {
    const parsed: unknown = JSON.parse(serialized);
    return Array.isArray(parsed) ? (parsed as Attachment[]) : [];
  } catch {
    return [];
  }
}

function toChatMessage(row: MessageRow): ChatMessage {
  return {
    id: row.id,
    sessionId: row.session_id,
    role: row.role,
    content: row.content,
    model: row.model,
    attachments: parseAttachments(row.attachments),
    createdAt: toIsoTimestamp(row.created_at),
  };
}

export function insertMessage(message: NewMessage): ChatMessage {
  const id = randomUUID();
  const attachments = message.attachments ?? [];
  const row = getDatabase()
    .prepare(
      `INSERT INTO messages (id, session_id, role, content, model, attachments)
       VALUES (?, ?, ?, ?, ?, ?)
       RETURNING *`
    )
    .get(
      id,
      message.sessionId,
      message.role,
      message.content,
      message.model,
      attachments.length > 0 ? JSON.stringify(attachments) : null
    ) as MessageRow;
  return toChatMessage(row);
}

export function listActiveMessages(sessionId: string): ChatMessage[] {
  const rows = getDatabase()
    .prepare(
      `SELECT * FROM messages
       WHERE session_id = ? AND datetime(created_at) >= datetime('now', ?)
       ORDER BY created_at ASC, rowid ASC`
    )
    .all(sessionId, ACTIVE_WINDOW) as MessageRow[];
  return rows.map(toChatMessage);
}

export function listRecentHistory(sessionId: string): ChatMessage[] {
  return listActiveMessages(sessionId).slice(-MAX_HISTORY_MESSAGES);
}

export function deleteExpiredMessages(): number {
  const result = getDatabase()
    .prepare(`DELETE FROM messages WHERE datetime(created_at) < datetime('now', ?)`)
    .run(ACTIVE_WINDOW);
  return result.changes;
}

export function deleteMessageById(messageId: string): void {
  getDatabase().prepare(`DELETE FROM messages WHERE id = ?`).run(messageId);
}

export function deleteSessionMessages(sessionId: string): number {
  const result = getDatabase()
    .prepare(`DELETE FROM messages WHERE session_id = ?`)
    .run(sessionId);
  return result.changes;
}

interface ConversationRow {
  session_id: string;
  first_content: string;
  message_count: number;
  updated_at: string;
}

function toConversationTitle(firstContent: string): string {
  const singleLine = firstContent.replace(/\s+/g, " ").trim();
  if (singleLine.length <= MAX_CONVERSATION_TITLE_CHARS) return singleLine || "Untitled chat";
  return `${singleLine.slice(0, MAX_CONVERSATION_TITLE_CHARS).trimEnd()}…`;
}

export function listConversations(sessionIds: string[]): ConversationSummary[] {
  if (sessionIds.length === 0) return [];
  const placeholders = sessionIds.map(() => "?").join(", ");
  const rows = getDatabase()
    .prepare(
      `SELECT
         session_id,
         (SELECT content FROM messages first
          WHERE first.session_id = m.session_id AND first.role = 'user'
          ORDER BY first.created_at ASC, first.rowid ASC LIMIT 1) AS first_content,
         COUNT(*) AS message_count,
         MAX(created_at) AS updated_at
       FROM messages m
       WHERE session_id IN (${placeholders}) AND datetime(created_at) >= datetime('now', ?)
       GROUP BY session_id
       ORDER BY updated_at DESC`
    )
    .all(...sessionIds, ACTIVE_WINDOW) as ConversationRow[];

  return rows.map((row) => ({
    id: row.session_id,
    title: toConversationTitle(row.first_content ?? ""),
    messageCount: row.message_count,
    updatedAt: toIsoTimestamp(row.updated_at),
  }));
}

export function collectSessionAttachmentUrls(sessionId: string): string[] {
  return listActiveMessages(sessionId).flatMap((message) => message.attachments.map((attachment) => attachment.url));
}
