import type { ConversationSummary } from "./chat-types";

export interface GroupedConversations {
  today: ConversationSummary[];
  yesterday: ConversationSummary[];
  lastWeek: ConversationSummary[];
  older: ConversationSummary[];
}

export function groupConversationsByDate(
  conversations: readonly ConversationSummary[]
): GroupedConversations {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfYesterday = startOfToday - 24 * 60 * 60 * 1000;
  const startOfLast7Days = startOfToday - 7 * 24 * 60 * 60 * 1000;

  const today: ConversationSummary[] = [];
  const yesterday: ConversationSummary[] = [];
  const lastWeek: ConversationSummary[] = [];
  const older: ConversationSummary[] = [];

  for (const conv of conversations) {
    const time = new Date(conv.updatedAt).getTime();
    if (isNaN(time) || time >= startOfToday) {
      today.push(conv);
    } else if (time >= startOfYesterday) {
      yesterday.push(conv);
    } else if (time >= startOfLast7Days) {
      lastWeek.push(conv);
    } else {
      older.push(conv);
    }
  }

  return { today, yesterday, lastWeek, older };
}
