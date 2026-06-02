"use client";

import { Terminal } from "lucide-react";

export default function ConsoleTab({
  terminalLogs,
  terminalInput,
  setTerminalInput,
  handleTerminalSubmit,
  executeShortcutCmd,
  setTerminalLogs,
  terminalEndRef
}) {
  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex-1 bg-black/50 p-4 rounded-xl border border-white/5 font-mono text-xs md:text-sm h-72 overflow-y-auto space-y-2 max-h-[350px] shadow-inner custom-scrollbar">
        {terminalLogs.map((log, index) => (
          <div key={index} className="whitespace-pre-wrap leading-relaxed">
            {log.type === "input" ? (
              <span className="text-blue-300 font-bold">{log.text}</span>
            ) : (
              <span className="text-white/85">{log.text}</span>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      <form onSubmit={handleTerminalSubmit} className="flex gap-2">
        <div className="flex-1 bg-black/60 border border-white/10 rounded-lg flex items-center px-3 gap-2 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <span className="text-blue-400 text-xs md:text-sm font-bold select-none">resky@portfolio:~$</span>
          <input
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            placeholder="Try 'help', 'about', 'experience', 'projects', 'skills', or 'certs'..."
            className="bg-transparent border-none outline-none text-white text-xs md:text-sm flex-1 py-3 font-mono"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs md:text-sm transition-all"
        >
          EXECUTE
        </button>
      </form>

      <div className="flex flex-col gap-2">
        <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Quick Command Shortcuts:</p>
        <div className="flex flex-wrap gap-2">
          {["about", "experience", "projects", "skills", "certs"].map(cmd => (
            <button
              key={cmd}
              type="button"
              onClick={() => executeShortcutCmd(cmd)}
              className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs text-white/70 hover:bg-white/10 hover:text-white hover:border-blue-400/50 transition-all font-mono"
            >
              ./run {cmd}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setTerminalLogs([])}
            className="px-3 py-1.5 rounded-md bg-red-500/10 border border-red-500/20 text-xs text-red-400 hover:bg-red-500/20 transition-all font-mono"
          >
            clear
          </button>
        </div>
      </div>
    </div>
  );
}
