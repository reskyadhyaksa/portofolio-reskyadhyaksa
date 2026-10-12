import { AlertCircle, X } from "lucide-react";

interface ChatErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export default function ChatErrorBanner({ message, onDismiss }: ChatErrorBannerProps) {
  return (
    <div role="alert" className="mb-2 flex items-center gap-2 rounded-xl border border-[#f28b82]/30 bg-[#f28b82]/[0.08] px-3 py-1.5 text-[12px] text-[#f6aea9] animate-fade-in-soft">
      <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
      <p className="flex-1">{message}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss error"
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors duration-150 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8]"
      >
        <X aria-hidden="true" className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
