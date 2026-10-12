"use client";
import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

const COPY_RESET_DELAY_MS = 2000;

interface CodeBlockProps {
  language: string;
  rawCode: string;
  children: ReactNode;
}

export default function CodeBlock({ language, rawCode, children }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), COPY_RESET_DELAY_MS);
    } catch (copyError) {
      console.warn("Unable to copy code", copyError);
    }
  };

  return (
    <div className="mb-3 overflow-hidden rounded-xl border border-white/[0.06] bg-[#0e0e0f]">
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#1e1f20] px-3 py-1">
        <span className="font-mono text-[11px] text-[#9aa0a6]">{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={isCopied ? "Code copied" : "Copy code"}
          className="flex cursor-pointer items-center gap-1 rounded-full px-2 py-0.5 text-[11px] text-[#c4c7c5] transition-colors duration-150 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8]"
        >
          {isCopied ? <Check aria-hidden="true" className="h-3 w-3" /> : <Copy aria-hidden="true" className="h-3 w-3" />}
          {isCopied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="custom-scrollbar overflow-x-auto p-3 text-[11.5px] leading-[1.55]">{children}</pre>
    </div>
  );
}
