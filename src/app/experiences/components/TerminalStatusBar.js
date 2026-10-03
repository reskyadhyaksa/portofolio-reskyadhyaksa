import { Terminal as TerminalIcon } from "lucide-react";

export default function TerminalStatusBar({ activeTab }) {
  const languageModes = {
    console: "Shell Script (Bash)",
    experience: "Log File",
    projects: "JSON",
    skills: "YAML",
    certs: "Markdown",
  };

  return (
    <div className="h-7 px-3 sm:px-4 bg-[#04080e] border-t border-white/[0.08] flex items-center justify-between text-[10px] text-slate-400 font-mono select-none shrink-0">
      <div className="flex items-center gap-3 sm:gap-4 truncate">
        <span className="flex items-center gap-1.5 text-slate-300">
          <TerminalIcon className="w-2.5 h-2.5 text-blue-400" />
          <span>RESKY-SHELL</span>
        </span>
        <span className="hidden sm:inline-block h-3 w-px bg-white/10"></span>
        <span className="hidden sm:inline">UTF-8</span>
        <span className="hidden md:inline">LF</span>
        <span>{languageModes[activeTab] || "Text"}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden sm:inline">AWS EC2 (ap-southeast-1)</span>
        <span className="text-slate-500 hidden xs:inline">Port 3000</span>
      </div>
    </div>
  );
}
