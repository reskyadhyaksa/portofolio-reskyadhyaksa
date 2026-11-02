"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Download, ExternalLink, FileCode, FileText, Loader2, X } from "lucide-react";

export interface DocumentPreviewItem {
  url: string;
  name: string;
  mimeType?: string;
  size?: number;
}

interface DocumentPreviewModalProps {
  document: DocumentPreviewItem;
  onClose: () => void;
}

const TEXT_LIKE_EXTENSIONS = new Set([
  "txt", "md", "csv", "json", "ts", "tsx", "js", "jsx", "mjs", "cjs", "py",
  "html", "css", "scss", "xml", "yaml", "yml", "toml", "ini", "log", "sql",
  "sh", "env", "java", "c", "cpp", "h", "hpp", "rs", "go", "php", "rb", "swift", "kt", "dart",
]);

function getFileExtension(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? (parts.pop() ?? "").toLowerCase() : "";
}

function formatFileSize(bytes?: number): string | null {
  if (!bytes || bytes <= 0) return null;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DocumentPreviewModal({ document: doc, onClose }: DocumentPreviewModalProps) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [textContent, setTextContent] = useState<string | null>(null);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const extension = getFileExtension(doc.name);
  const isPdf = extension === "pdf" || doc.mimeType === "application/pdf";
  const isDocx = extension === "docx";
  const isTextLike = TEXT_LIKE_EXTENSIONS.has(extension) || doc.mimeType?.startsWith("text/");

  useEffect(() => {
    setMounted(true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setErrorMessage(null);
    setTextContent(null);
    setHtmlContent(null);

    if (isPdf) {
      setLoading(false);
      return;
    }

    if (isDocx) {
      fetch(doc.url)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load document");
          return res.arrayBuffer();
        })
        .then(async (arrayBuffer) => {
          if (isCancelled) return;
          const mammoth = await import("mammoth/mammoth.browser");
          const { value } = await mammoth.convertToHtml({ arrayBuffer });
          if (!isCancelled) {
            setHtmlContent(value || "<p>The document is empty.</p>");
          }
        })
        .catch((err: Error) => {
          if (!isCancelled) setErrorMessage(err.message || "Failed to render document");
        })
        .finally(() => {
          if (!isCancelled) setLoading(false);
        });
      return;
    }

    if (isTextLike) {
      fetch(doc.url)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load text file");
          return res.text();
        })
        .then((text) => {
          if (!isCancelled) setTextContent(text);
        })
        .catch((err: Error) => {
          if (!isCancelled) setErrorMessage(err.message || "Failed to read file");
        })
        .finally(() => {
          if (!isCancelled) setLoading(false);
        });
      return;
    }

    setLoading(false);
    return () => {
      isCancelled = true;
    };
  }, [doc.url, isPdf, isDocx, isTextLike]);

  if (!mounted) return null;

  const sizeLabel = formatFileSize(doc.size);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-2 sm:p-6 backdrop-blur-md animate-fade-in-soft"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto my-auto flex h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/[0.12] bg-[#18191b] shadow-[0_24px_80px_rgba(0,0,0,0.85)]"
      >
        <header className="flex shrink-0 items-center justify-between border-b border-white/[0.08] bg-[#1e1f20] px-3.5 py-2.5 sm:px-4 sm:py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#8ab4f8]/15 text-[#8ab4f8]">
              {isTextLike ? <FileCode className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
            </span>
            <div className="min-w-0">
              <h2 className="truncate text-xs font-semibold text-white sm:text-sm">{doc.name}</h2>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="uppercase">{extension || "file"}</span>
                {sizeLabel && (
                  <>
                    <span>·</span>
                    <span>{sizeLabel}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              title="Open in new tab"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-slate-300 transition-colors hover:bg-white/[0.1] hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href={doc.url}
              download={doc.name}
              title="Download file"
              className="flex h-8 items-center gap-1.5 rounded-lg bg-[#8ab4f8]/20 px-2.5 text-xs font-medium text-[#8ab4f8] border border-[#8ab4f8]/30 transition-colors hover:bg-[#8ab4f8]/30 hover:text-white"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-slate-300 transition-colors hover:bg-white/[0.1] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="relative flex flex-1 min-h-0 flex-col overflow-hidden p-2 sm:p-4">
          {loading ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="h-8 w-8 animate-spin text-[#8ab4f8]" />
              <p className="text-xs">Loading document preview…</p>
            </div>
          ) : errorMessage ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
              <p className="text-xs text-rose-300">{errorMessage}</p>
              <a
                href={doc.url}
                download={doc.name}
                className="inline-flex items-center gap-2 rounded-xl bg-white/[0.08] px-4 py-2 text-xs font-semibold text-white hover:bg-white/[0.16] transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download File Directly</span>
              </a>
            </div>
          ) : isPdf ? (
            <iframe
              src={`${doc.url}#view=FitH`}
              title={doc.name}
              className="h-full w-full rounded-xl border border-white/[0.06] bg-[#202124]"
            />
          ) : isDocx && htmlContent ? (
            <div
              className="custom-scrollbar h-full overflow-y-auto rounded-xl border border-white/[0.06] bg-[#1e1f20] p-6 text-sm leading-relaxed text-[#e3e3e3] select-text"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ) : isTextLike && textContent !== null ? (
            <div className="custom-scrollbar h-full overflow-y-auto rounded-xl border border-white/[0.06] bg-[#141517] p-4 font-mono text-xs leading-relaxed text-[#e3e3e3] select-text whitespace-pre-wrap break-words">
              {textContent}
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
              <FileText className="h-12 w-12 text-slate-500" />
              <p className="text-xs text-slate-300">Preview is not available for this file type.</p>
              <a
                href={doc.url}
                download={doc.name}
                className="inline-flex items-center gap-2 rounded-xl bg-[#8ab4f8]/20 px-4 py-2 text-xs font-semibold text-[#8ab4f8] border border-[#8ab4f8]/30 hover:bg-[#8ab4f8]/30 hover:text-white transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download to View</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
