import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const DATA_DIRECTORY = path.join(process.cwd(), ".data");
const DATABASE_FILE = path.join(DATA_DIRECTORY, "chat.sqlite");

const SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    role TEXT CHECK(role IN ('user', 'assistant')) NOT NULL,
    content TEXT NOT NULL,
    model TEXT,
    attachments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_session_created ON messages(session_id, created_at);
  CREATE TABLE IF NOT EXISTS conversation_summaries (
    session_id TEXT PRIMARY KEY,
    summary TEXT NOT NULL,
    summarized_count INTEGER NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS generated_images (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    prompt TEXT NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_images_created ON generated_images(created_at);
`;

const SCHEMA_VERSION = 2;

const globalForDatabase = globalThis as typeof globalThis & {
  chatDatabase?: Database.Database;
  chatDatabaseSchemaVersion?: number;
};

function createDatabase(): Database.Database {
  fs.mkdirSync(DATA_DIRECTORY, { recursive: true });
  const database = new Database(DATABASE_FILE);
  database.pragma("journal_mode = WAL");
  database.pragma("busy_timeout = 5000");
  return database;
}

function ensureSchema(database: Database.Database): void {
  if (globalForDatabase.chatDatabaseSchemaVersion === SCHEMA_VERSION) return;
  database.exec(SCHEMA_SQL);
  globalForDatabase.chatDatabaseSchemaVersion = SCHEMA_VERSION;
}

export function getDatabase(): Database.Database {
  if (!globalForDatabase.chatDatabase?.open) {
    globalForDatabase.chatDatabase = createDatabase();
    globalForDatabase.chatDatabaseSchemaVersion = undefined;
  }
  ensureSchema(globalForDatabase.chatDatabase);
  return globalForDatabase.chatDatabase;
}
