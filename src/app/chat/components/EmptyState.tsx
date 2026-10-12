import { Code2, FileSearch, Lightbulb, PenLine, type LucideIcon } from "lucide-react";

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
    <section className="mx-auto flex w-full max-w-[60rem] flex-1 flex-col justify-center px-4 py-6 sm:px-6 animate-fade-in-up">
      <h1 className="bg-gradient-to-r from-[#4285f4] via-[#9b72cb] to-[#d96570] bg-clip-text text-2xl font-medium tracking-tight text-transparent sm:text-3xl">
        Hello there.
      </h1>
      <p className="mt-1 text-lg font-medium tracking-tight text-[#5f6368] sm:text-2xl">How can I help you today?</p>

      <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {PROMPT_SUGGESTIONS.map(({ icon: Icon, label, prompt }) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => onSelectPrompt(prompt)}
              className="group flex h-full w-full cursor-pointer flex-col gap-1.5 rounded-xl bg-[#1e1f20] p-3 text-left transition-colors duration-200 hover:bg-[#28292a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8]"
            >
              <span className="flex items-center gap-2 text-[13px] font-medium text-[#e3e3e3]">
                <Icon aria-hidden="true" className="h-3.5 w-3.5 text-[#8ab4f8]" />
                {label}
              </span>
              <span className="line-clamp-2 text-[12px] text-[#9aa0a6]">{prompt}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
