import { MAX_SUMMARY_CHARS, RECENT_CONTEXT_MESSAGES, SUMMARY_TRIGGER_MESSAGES } from "./chat-config";
import type { ChatMessage } from "./chat-types";
import { requestChatCompletion } from "./llm-client";
import { buildUpstreamMessages, type UpstreamMessage } from "./llm-payload";
import { readSummary, saveSummary, type StoredSummary } from "./summary-repository";

const SUMMARIZER_INSTRUCTION = [
  "You compress chat transcripts into a running memory for another assistant.",
  "Merge the previous summary with the new messages into one concise summary.",
  "Keep topics discussed, decisions, facts about the user, code/file names, and open questions.",
  "Use short bullet points in the same language as the conversation.",
  `Stay under ${MAX_SUMMARY_CHARS} characters. Output only the summary.`,
].join(" ");

function describeAttachmentNames(message: ChatMessage): string {
  if (message.attachments.length === 0) return "";
  return ` [attachments: ${message.attachments.map((attachment) => attachment.name).join(", ")}]`;
}

function toTranscriptLine(message: ChatMessage): string {
  return `${message.role.toUpperCase()}: ${message.content}${describeAttachmentNames(message)}`;
}

function buildSummarizerPrompt(previousSummary: string, newMessages: ChatMessage[]): UpstreamMessage[] {
  const transcript = newMessages.map(toTranscriptLine).join("\n\n");
  return [
    { role: "system", content: SUMMARIZER_INSTRUCTION },
    {
      role: "user",
      content: `Previous summary:\n${previousSummary || "(none)"}\n\nNew messages:\n${transcript}`,
    },
  ];
}

async function refreshSummary(
  sessionId: string,
  model: string,
  olderMessages: ChatMessage[],
  cached: StoredSummary | null
): Promise<string> {
  const isCacheUsable = cached !== null && cached.summarizedCount <= olderMessages.length;
  const baseline = isCacheUsable ? cached : { summary: "", summarizedCount: 0 };
  const unsummarized = olderMessages.slice(baseline.summarizedCount);
  if (unsummarized.length === 0) return baseline.summary;

  const merged = await requestChatCompletion(model, buildSummarizerPrompt(baseline.summary, unsummarized));
  const summary = merged.slice(0, MAX_SUMMARY_CHARS);
  saveSummary(sessionId, { summary, summarizedCount: olderMessages.length });
  return summary;
}

function toSummaryMessage(summary: string): UpstreamMessage {
  return {
    role: "system",
    content: `Summary of the earlier part of this conversation. Use it as context for the next replies:\n${summary}`,
  };
}

export async function buildConversationContext(
  sessionId: string,
  model: string,
  history: ChatMessage[]
): Promise<UpstreamMessage[]> {
  if (history.length <= SUMMARY_TRIGGER_MESSAGES) return buildUpstreamMessages(history);

  const olderMessages = history.slice(0, -RECENT_CONTEXT_MESSAGES);
  const recentMessages = history.slice(-RECENT_CONTEXT_MESSAGES);
  const recentUpstream = await buildUpstreamMessages(recentMessages);

  try {
    const summary = await refreshSummary(sessionId, model, olderMessages, readSummary(sessionId));
    return summary ? [toSummaryMessage(summary), ...recentUpstream] : recentUpstream;
  } catch (error) {
    console.warn("Conversation summary failed, falling back to recent history", error);
    return buildUpstreamMessages(history.slice(-SUMMARY_TRIGGER_MESSAGES));
  }
}
