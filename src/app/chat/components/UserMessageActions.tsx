import { Pencil, Undo2 } from "lucide-react";

interface UserMessageActionsProps {
  disabled: boolean;
  canEdit: boolean;
  onEdit: () => void;
  onRevert: () => void;
}

const ACTION_BUTTON_CLASS =
  "flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-[#9aa0a6] transition-colors duration-200 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8] disabled:cursor-not-allowed disabled:opacity-40";

export default function UserMessageActions({ disabled, canEdit, onEdit, onRevert }: UserMessageActionsProps) {
  return (
    <div className="mt-1 flex items-center gap-0.5">
      {canEdit && (
        <button type="button" onClick={onEdit} disabled={disabled} aria-label="Edit message" title="Edit message" className={ACTION_BUTTON_CLASS}>
          <Pencil aria-hidden="true" className="h-3.5 w-3.5" />
        </button>
      )}
      <button
        type="button"
        onClick={onRevert}
        disabled={disabled}
        aria-label="Revert chat to before this message"
        title="Revert to before this message"
        className={ACTION_BUTTON_CLASS}
      >
        <Undo2 aria-hidden="true" className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
