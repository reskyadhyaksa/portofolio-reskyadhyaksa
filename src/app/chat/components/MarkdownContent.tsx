import { isValidElement, type ReactNode } from "react";
import Markdown, { type Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

const LANGUAGE_CLASS_PATTERN = /language-([\w+#-]+)/;

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return extractText(node.props.children);
  return "";
}

function readCodeLanguage(preChildren: ReactNode): string {
  if (!isValidElement<{ className?: string }>(preChildren)) return "text";
  return LANGUAGE_CLASS_PATTERN.exec(preChildren.props.className ?? "")?.[1] ?? "text";
}

const MARKDOWN_COMPONENTS: Components = {
  p: ({ children }) => <p className="mb-2.5 leading-[1.6] last:mb-0">{children}</p>,
  h1: ({ children }) => <h1 className="mb-1.5 mt-3.5 text-[14px] font-semibold text-white first:mt-0">{children}</h1>,
  h2: ({ children }) => <h2 className="mb-1.5 mt-3.5 text-[13.5px] font-semibold text-white first:mt-0">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-1 mt-3 text-[13px] font-semibold text-white first:mt-0">{children}</h3>,
  ul: ({ children }) => <ul className="mb-2.5 ml-5 list-disc space-y-0.5 marker:text-[#9aa0a6]">{children}</ul>,
  ol: ({ children }) => <ol className="mb-2.5 ml-5 list-decimal space-y-0.5 marker:text-[#9aa0a6]">{children}</ol>,
  li: ({ children }) => <li className="pl-1 leading-[1.6]">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  del: ({ children }) => <del className="text-[#9aa0a6]">{children}</del>,
  a: ({ children, href }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#8ab4f8] underline underline-offset-2 hover:text-[#aecbfa]">
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mb-3 border-l-2 border-[#8ab4f8]/50 pl-3 text-[#c4c7c5] italic">{children}</blockquote>
  ),
  pre: ({ children }) => (
    <CodeBlock language={readCodeLanguage(children)} rawCode={extractText(children).replace(/\n$/, "")}>
      {children}
    </CodeBlock>
  ),
  code: ({ className, children }) => {
    const isBlock = typeof className === "string" && className.includes("hljs");
    if (isBlock) return <code className={`${className} font-mono !bg-transparent !p-0`}>{children}</code>;
    return <code className="rounded-md bg-white/[0.08] px-1.5 py-0.5 font-mono text-[0.85em] text-[#f28b82]">{children}</code>;
  },
  table: ({ children }) => (
    <div className="custom-scrollbar mb-3 overflow-x-auto rounded-xl border border-white/[0.08]">
      <table className="w-full border-collapse text-left text-[11.5px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[#1e1f20] text-white">{children}</thead>,
  tr: ({ children }) => <tr className="border-b border-white/[0.06] last:border-b-0">{children}</tr>,
  th: ({ children, style }) => (
    <th style={style} className="px-3 py-1.5 font-semibold">
      {children}
    </th>
  ),
  td: ({ children, style }) => (
    <td style={style} className="px-3 py-1.5 align-top text-[#e3e3e3]">
      {children}
    </td>
  ),
  input: ({ checked, type }) =>
    type === "checkbox" ? <input type="checkbox" checked={checked} readOnly className="mr-2 accent-[#8ab4f8]" /> : null,
  hr: () => <hr className="my-4 border-white/[0.08]" />,
};

const REMARK_PLUGINS = [remarkGfm];
const REHYPE_PLUGINS = [[rehypeHighlight, { detect: true, ignoreMissing: true }]] as Parameters<typeof Markdown>[0]["rehypePlugins"];

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="break-words text-[12.5px] text-[#e3e3e3]">
      <Markdown remarkPlugins={REMARK_PLUGINS} rehypePlugins={REHYPE_PLUGINS} components={MARKDOWN_COMPONENTS}>
        {content}
      </Markdown>
    </div>
  );
}
