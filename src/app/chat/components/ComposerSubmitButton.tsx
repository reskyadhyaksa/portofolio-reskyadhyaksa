import { ArrowUp, Square } from "lucide-react";

interface ComposerSubmitButtonProps {
  canSubmit: boolean;
  isSending: boolean;
  onStop: () => void;
}

const BASE_CLASS =
  "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1f20]";
const ACTIVE_CLASS = "cursor-pointer bg-[#e3e3e3] text-[#131314] hover:bg-white active:scale-95";
const INACTIVE_CLASS = "cursor-not-allowed bg-white/[0.06] text-[#5f6368]";

export default function ComposerSubmitButton({ canSubmit, isSending, onStop }: ComposerSubmitButtonProps) {
  if (isSending) {
    return (
      <button type="button" onClick={onStop} aria-label="Stop generating" title="Stop generating" className={`${BASE_CLASS} ${ACTIVE_CLASS}`}>
        <Square aria-hidden="true" className="h-3 w-3 fill-current" />
      </button>
    );
  }

  return (
    <button type="submit" disabled={!canSubmit} aria-label="Send message" className={`${BASE_CLASS} ${canSubmit ? ACTIVE_CLASS : INACTIVE_CLASS}`}>
      <ArrowUp aria-hidden="true" className="h-4 w-4" />
    </button>
  );
}
