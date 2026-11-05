"use client";
import { useCallback, useRef, useState, type DragEvent } from "react";

interface FileDropZoneOptions {
  isEnabled: boolean;
  onDropFiles: (files: File[]) => void;
  onDropUrl?: (url: string) => void;
}

function hasFiles(event: DragEvent<HTMLElement>): boolean {
  const dt = event.dataTransfer;
  if (!dt) return false;
  if (dt.files && dt.files.length > 0) return true;
  if (!dt.types) return false;
  const types = Array.from(dt.types).map((t) => t.toLowerCase());
  return types.some(
    (t) =>
      t === "files" ||
      t === "text/uri-list" ||
      t === "text/plain" ||
      t === "text/html" ||
      t.includes("file")
  );
}

export function useFileDropZone({ isEnabled, onDropFiles, onDropUrl }: FileDropZoneOptions) {
  const [isDragging, setIsDragging] = useState(false);
  const dragDepthRef = useRef(0);

  const resetDrag = useCallback(() => {
    dragDepthRef.current = 0;
    setIsDragging(false);
  }, []);

  const onDragEnter = useCallback(
    (event: DragEvent<HTMLElement>) => {
      if (!hasFiles(event)) return;
      event.preventDefault();
      event.stopPropagation();
      dragDepthRef.current += 1;
      if (isEnabled) setIsDragging(true);
    },
    [isEnabled]
  );

  const onDragOver = useCallback(
    (event: DragEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = isEnabled ? "copy" : "none";
      }
    },
    [isEnabled]
  );

  const onDragLeave = useCallback((event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dragDepthRef.current = Math.max(dragDepthRef.current - 1, 0);
    if (dragDepthRef.current === 0) setIsDragging(false);
  }, []);

  const onDrop = useCallback(
    (event: DragEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      resetDrag();
      if (!isEnabled) return;

      const files = event.dataTransfer?.files ? Array.from(event.dataTransfer.files) : [];
      if (files.length > 0) {
        onDropFiles(files);
        return;
      }

      let uri =
        event.dataTransfer.getData("text/uri-list") ||
        event.dataTransfer.getData("URL") ||
        event.dataTransfer.getData("text/plain");

      if (!uri) {
        const html = event.dataTransfer.getData("text/html");
        if (html) {
          const match = html.match(/src=["']([^"']+)["']/i);
          if (match) uri = match[1];
        }
      }

      if (
        uri &&
        (uri.startsWith("http://") ||
          uri.startsWith("https://") ||
          uri.startsWith("/uploads/") ||
          uri.startsWith("data:image/"))
      ) {
        onDropUrl?.(uri.trim());
      }
    },
    [isEnabled, onDropFiles, onDropUrl, resetDrag]
  );

  return { isDragging: isDragging && isEnabled, dropHandlers: { onDragEnter, onDragOver, onDragLeave, onDrop } };
}
