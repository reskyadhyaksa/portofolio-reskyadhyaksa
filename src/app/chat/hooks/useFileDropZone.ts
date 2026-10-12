"use client";
import { useCallback, useRef, useState, type DragEvent } from "react";

interface FileDropZoneOptions {
  isEnabled: boolean;
  onDropFiles: (files: File[]) => void;
}

function hasFiles(event: DragEvent<HTMLElement>): boolean {
  return Array.from(event.dataTransfer.types).includes("Files");
}

export function useFileDropZone({ isEnabled, onDropFiles }: FileDropZoneOptions) {
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
      dragDepthRef.current += 1;
      if (isEnabled) setIsDragging(true);
    },
    [isEnabled]
  );

  const onDragOver = useCallback(
    (event: DragEvent<HTMLElement>) => {
      if (!hasFiles(event)) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = isEnabled ? "copy" : "none";
    },
    [isEnabled]
  );

  const onDragLeave = useCallback(
    (event: DragEvent<HTMLElement>) => {
      if (!hasFiles(event)) return;
      dragDepthRef.current = Math.max(dragDepthRef.current - 1, 0);
      if (dragDepthRef.current === 0) setIsDragging(false);
    },
    []
  );

  const onDrop = useCallback(
    (event: DragEvent<HTMLElement>) => {
      if (!hasFiles(event)) return;
      event.preventDefault();
      resetDrag();
      if (!isEnabled) return;
      onDropFiles(Array.from(event.dataTransfer.files));
    },
    [isEnabled, onDropFiles, resetDrag]
  );

  return { isDragging: isDragging && isEnabled, dropHandlers: { onDragEnter, onDragOver, onDragLeave, onDrop } };
}
