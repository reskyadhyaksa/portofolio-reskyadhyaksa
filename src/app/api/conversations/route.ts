import { describeError, jsonFailure, jsonSuccess, readSessionIdList } from "@/lib/api-response";
import { deleteExpiredMessages, listConversations } from "@/lib/message-repository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const sessionIds = readSessionIdList(request);
  if (!sessionIds) return jsonFailure("Invalid session id list", 400);

  try {
    deleteExpiredMessages();
    return jsonSuccess({ conversations: listConversations(sessionIds) });
  } catch (error) {
    return jsonFailure(describeError(error, "Failed to load conversations"), 500);
  }
}
