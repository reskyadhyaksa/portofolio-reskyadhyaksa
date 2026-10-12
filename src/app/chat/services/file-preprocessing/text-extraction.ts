import { MAX_DOCUMENT_CONTEXT_CHARS } from "@/lib/chat-config";

function clampDocumentText(text: string): string {
  return text.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim().slice(0, MAX_DOCUMENT_CONTEXT_CHARS);
}

export async function extractDocxText(file: File): Promise<string> {
  const mammoth = await import("mammoth/mammoth.browser");
  const { value } = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
  return clampDocumentText(value);
}

export async function extractPdfText(file: File): Promise<string> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

  const loadingTask = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
  const pageTexts: string[] = [];
  let collectedLength = 0;

  try {
    const document = await loadingTask.promise;
    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => ("str" in item ? item.str : "")).join(" ");
      pageTexts.push(pageText);
      collectedLength += pageText.length;
      if (collectedLength >= MAX_DOCUMENT_CONTEXT_CHARS) break;
    }
  } finally {
    await loadingTask.destroy();
  }

  return clampDocumentText(pageTexts.join("\n\n"));
}
