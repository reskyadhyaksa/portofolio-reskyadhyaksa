import type { ReactNode } from "react";
import { useFileDropZone } from "../hooks/useFileDropZone";
import FileDropOverlay from "./FileDropOverlay";

interface FileDropZoneProps {
  isEnabled: boolean;
  onDropFiles: (files: File[]) => void;
  className?: string;
  children: ReactNode;
}

export default function FileDropZone({ isEnabled, onDropFiles, className, children }: FileDropZoneProps) {
  const { isDragging, dropHandlers } = useFileDropZone({ isEnabled, onDropFiles });

  return (
    <div {...dropHandlers} className={className}>
      {children}
      <FileDropOverlay isVisible={isDragging} />
    </div>
  );
}
