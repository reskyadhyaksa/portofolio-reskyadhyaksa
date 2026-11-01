import type { StudioViewMode } from "../components/ChatToolbar";

const CHAT_BASE_PATH = "/chat";

export function resolveStudioTab(tab?: string | null): StudioViewMode {
  if (tab === "image") return "image";
  if (tab === "video") return "video";
  return "chat";
}

export function buildChatUrl(sessionId: string | null, tab: StudioViewMode): string {
  const path = sessionId ? `${CHAT_BASE_PATH}/${sessionId}` : CHAT_BASE_PATH;
  return `${path}?tab=${tab}`;
}

export function extractChatRouteState(pathname: string, search: string): { sessionId: string | null; tab: StudioViewMode } {
  const params = new URLSearchParams(search);
  const tab = resolveStudioTab(params.get("tab"));

  if (!pathname.startsWith(CHAT_BASE_PATH)) {
    return { sessionId: null, tab };
  }

  const remainder = pathname.slice(CHAT_BASE_PATH.length).replace(/^\/+/, "");
  const segment = remainder.split("/")[0]?.trim();
  const sessionId = segment && segment.length > 0 ? segment : null;

  return { sessionId, tab };
}
