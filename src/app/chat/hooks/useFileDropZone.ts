"use client";
import { useCallback, useRef, useState, type DragEvent } from "react";

interface FileDropZoneOptions {
  isEnabled: boolean;
  onDropFiles: (files: File[]) => void;
  onDropUrl?: (url: string) => void;
}

function hasFiles(event: DragEvent<HTMLElement>): boolean {
  if (!event.dataTransfer?.types) return false;
  const types = Array.from(event.dataTransfer.types);
  return types.some((t) => t.toLowerCase() === "files" || t === "text/uri-list" || t === "text/plain");
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
      if (!hasFiles(event)) return;
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = isEnabled ? "copy" : "none";
    },
    [isEnabled]
  );

  const onDragLeave = useCallback(
    (event: DragEvent<HTMLElement>) => {
      if (!hasFiles(event)) return;
      event.preventDefault();
      event.stopPropagation();
      dragDepthRef.current = Math.max(dragDepthRef.current - 1, 0);
      if (dragDepthRef.current === 0) setIsDragging(false);
    },
    []
  );

  const onDrop = useCallback(
    (event: DragEvent<HTMLElement>) => {
      if (!hasFiles(event)) return;
      event.preventDefault();
      event.stopPropagation();
      resetDrag();
      if (!isEnabled) return;

      const files = Array.from(event.dataTransfer.files);
      if (files.length > 0) {
        onDropFiles(files);
        return;
      }

      const uri = event.dataTransfer.getData("text/uri-list") || event.dataTransfer.getData("URL") || event.dataTransfer.getData("text/plain");
      if (uri && (uri.startsWith("http://") || uri.startsWith("https://") || uri.startsWith("/uploads/"))) {
        onDropUrl?.(uri.trim());
      }
    },
    [isEnabled, onDropFiles, onDropUrl, resetDrag]
  );

  return { isDragging: isDragging && isEnabled, dropHandlers: { onDragEnter, onDragOver, onDragLeave, onDrop } };
}
