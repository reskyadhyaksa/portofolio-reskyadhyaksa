import type { StudioViewMode } from "../components/ChatToolbar";
import {
  DEFAULT_IMAGE_MODEL_ID,
  DEFAULT_MODEL_ID,
  DEFAULT_VIDEO_MODEL_ID,
  isSupportedImageModel,
  isSupportedModel,
  isSupportedVideoModel,
} from "@/lib/chat-config";

const CHAT_BASE_PATH = "/chat";

export function resolveStudioTab(tab?: string | null): StudioViewMode {
  if (tab === "image") return "image";
  if (tab === "video") return "video";
  return "chat";
}

export function isDefaultModelForTab(model: string | null | undefined, tab: StudioViewMode): boolean {
  if (!model) return true;
  if (tab === "image") return model === DEFAULT_IMAGE_MODEL_ID;
  if (tab === "video") return model === DEFAULT_VIDEO_MODEL_ID;
  return model === DEFAULT_MODEL_ID;
}

export function buildChatUrl(sessionId: string | null, tab: StudioViewMode, model?: string | null): string {
  const path = sessionId ? `${CHAT_BASE_PATH}/${sessionId}` : CHAT_BASE_PATH;
  const params = new URLSearchParams();
  params.set("tab", tab);
  if (model && !isDefaultModelForTab(model, tab)) {
    params.set("model", model);
  }
  return `${path}?${params.toString()}`;
}

export function extractChatRouteState(
  pathname: string,
  search: string
): { sessionId: string | null; tab: StudioViewMode; model: string | null } {
  const params = new URLSearchParams(search);
  const tab = resolveStudioTab(params.get("tab"));
  const rawModel = params.get("model");
  let model: string | null = null;

  if (rawModel) {
    if (tab === "image" && isSupportedImageModel(rawModel)) {
      model = rawModel;
    } else if (tab === "video" && isSupportedVideoModel(rawModel)) {
      model = rawModel;
    } else if (tab === "chat" && isSupportedModel(rawModel)) {
      model = rawModel;
    }
  }

  if (!pathname.startsWith(CHAT_BASE_PATH)) {
    return { sessionId: null, tab, model };
  }

  const remainder = pathname.slice(CHAT_BASE_PATH.length).replace(/^\/+/, "");
  const segment = remainder.split("/")[0]?.trim();
  const sessionId = segment && segment.length > 0 ? segment : null;

  return { sessionId, tab, model };
}
