import { Code2, FileSearch, Lightbulb, PenLine, type LucideIcon } from "lucide-react";
import { CHAT_COLUMN_CLASS, CHAT_GUTTER_CLASS } from "./chat-layout-tokens";

interface PromptSuggestion {
  icon: LucideIcon;
  label: string;
  prompt: string;
}

const PROMPT_SUGGESTIONS: PromptSuggestion[] = [
  { icon: Lightbulb, label: "Brainstorm ideas", prompt: "Brainstorm 5 side-project ideas that combine web development and machine learning." },
  { icon: Code2, label: "Review code", prompt: "Explain best practices for structuring a modular Next.js App Router project." },
  { icon: PenLine, label: "Help me write", prompt: "Write a concise professional summary for a software engineer portfolio." },
  { icon: FileSearch, label: "Summarize a file", prompt: "Summarize the key points of the attached document." },
];

interface EmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
}

export default function EmptyState({ onSelectPrompt }: EmptyStateProps) {
  return (
    <section className={`${CHAT_COLUMN_CLASS} ${CHAT_GUTTER_CLASS} flex flex-1 flex-col justify-center py-4 animate-fade-in-up sm:py-6`}>
      <h1 className="bg-gradient-to-r from-[#4285f4] via-[#9b72cb] to-[#d96570] bg-clip-text text-lg font-medium tracking-tight text-transparent sm:text-2xl">
        Hello there.
      </h1>
      <p className="mt-0.5 text-sm font-medium tracking-tight text-[#5f6368] sm:mt-1 sm:text-lg">How can I help you today?</p>

      <ul className="mt-4 grid grid-cols-2 gap-2 sm:mt-5">
        {PROMPT_SUGGESTIONS.map(({ icon: Icon, label, prompt }) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => onSelectPrompt(prompt)}
              title={prompt}
              className="group flex h-full min-h-11 w-full cursor-pointer flex-col justify-center gap-1.5 rounded-xl bg-[#1e1f20] p-2.5 text-left transition-colors duration-200 hover:bg-[#28292a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8] sm:justify-start sm:p-3"
            >
              <span className="flex items-center gap-2 text-[12px] font-medium text-[#e3e3e3] sm:text-[13px]">
                <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#8ab4f8]" />
                {label}
              </span>
              <span className="hidden text-[12px] text-[#9aa0a6] sm:line-clamp-2">{prompt}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
