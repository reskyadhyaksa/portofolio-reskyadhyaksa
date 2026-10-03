"use client";
import { CornerDownLeft, Sparkles, Trash2 } from "lucide-react";

export default function ConsoleTab({
  terminalLogs,
  terminalInput,
  setTerminalInput,
  handleTerminalSubmit,
  executeShortcutCmd,
  clearTerminal,
  terminalEndRef,
}) {
  const shortcutCommands = [
    "help",
    "about",
    "experience",
    "projects",
    "skills",
    "certs",
  ];

  return (
    <div className="flex flex-col h-full space-y-2.5 min-h-0">
      <div className="flex-1 bg-[#02070e] p-2.5 sm:p-4 rounded-xl border border-white/[0.08] font-mono text-xs sm:text-[13px] overflow-y-auto space-y-2 shadow-inner custom-scrollbar min-h-0">
        {terminalLogs.map((log, index) => (
          <div
            key={index}
            className="flex items-start gap-1.5 sm:gap-2 whitespace-pre-wrap leading-relaxed"
          >
            <span className="text-slate-600 text-[10px] select-none pt-0.5 w-4 sm:w-5 text-right shrink-0">
              {index + 1}
            </span>
            <div className="flex-1">
              {log.type === "input" ? (
                <span className="text-sky-300 font-semibold">{log.text}</span>
              ) : (
                <span className="text-slate-300 font-normal">{log.text}</span>
              )}
            </div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      <form onSubmit={handleTerminalSubmit} className="flex gap-2 shrink-0">
        <div className="flex-1 bg-black/60 border border-white/10 rounded-xl flex items-center px-2.5 sm:px-3 gap-1.5 sm:gap-2 focus-within:ring-1 focus-within:ring-blue-400 focus-within:border-blue-400/60 transition-all">
          <span className="text-blue-400 text-[11px] sm:text-xs font-bold font-mono select-none truncate shrink-0">
            resky:~$
          </span>
          <input
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            placeholder="Type 'help', 'projects'..."
            className="bg-transparent border-none outline-none text-slate-100 text-xs flex-1 py-2 sm:py-2.5 font-mono placeholder:text-slate-600 min-w-0"
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-sm active:scale-95 shrink-0"
        >
          <span>Run</span>
          <CornerDownLeft className="w-3 h-3 opacity-80" />
        </button>
      </form>

      <div className="flex items-center justify-between gap-2 shrink-0 pt-0.5">
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-0.5 flex-1 min-w-0">
          <Sparkles className="w-3 h-3 text-amber-400 shrink-0 hidden xs:inline" />
          {shortcutCommands.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => executeShortcutCmd(cmd)}
              className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-[10px] sm:text-[11px] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all font-mono whitespace-nowrap shrink-0"
            >
              {cmd}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={clearTerminal}
          className="flex items-center gap-1 text-[10px] text-rose-400/80 hover:text-rose-300 transition-colors shrink-0 pl-1"
        >
          <Trash2 className="w-2.5 h-2.5" />
          <span className="hidden xs:inline">Clear</span>
        </button>
      </div>
    </div>
  );
}
