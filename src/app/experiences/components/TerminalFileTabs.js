import {
  Terminal,
  Briefcase,
  FolderGit2,
  Wrench,
  Award,
  FolderOpen,
  ChevronDown,
} from "lucide-react";

export const TAB_CONFIG = [
  {
    id: "console",
    fileName: "console.sh",
    label: "Console",
    icon: Terminal,
    color: "text-blue-400",
    bgActive: "bg-blue-500/10 text-blue-300 border-blue-400/60",
    dot: "bg-blue-400",
  },
  {
    id: "experience",
    fileName: "experience.log",
    label: "Experience",
    icon: Briefcase,
    color: "text-emerald-400",
    bgActive: "bg-emerald-500/10 text-emerald-300 border-emerald-400/60",
    dot: "bg-emerald-400",
  },
  {
    id: "projects",
    fileName: "projects.json",
    label: "Projects",
    icon: FolderGit2,
    color: "text-purple-400",
    bgActive: "bg-purple-500/10 text-purple-300 border-purple-400/60",
    dot: "bg-purple-400",
  },
  {
    id: "skills",
    fileName: "skills.yaml",
    label: "Skills",
    icon: Wrench,
    color: "text-yellow-400",
    bgActive: "bg-yellow-500/10 text-yellow-300 border-yellow-400/60",
    dot: "bg-yellow-400",
  },
  {
    id: "certs",
    fileName: "credentials.md",
    label: "Credentials",
    icon: Award,
    color: "text-rose-400",
    bgActive: "bg-rose-500/10 text-rose-300 border-rose-400/60",
    dot: "bg-rose-400",
  },
];

export default function TerminalFileTabs({ activeTab, onSelectTab }) {
  const currentTab =
    TAB_CONFIG.find((t) => t.id === activeTab) || TAB_CONFIG[0];
  const CurrentIcon = currentTab.icon;

  return (
    <>
      <div className="flex lg:hidden bg-[#04080e] border-b border-white/[0.08] px-2.5 py-1.5 shrink-0 items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
          <CurrentIcon className={`w-3.5 h-3.5 ${currentTab.color}`} />
          <span className="text-slate-200 font-mono">{currentTab.fileName}</span>
        </div>

        <div className="relative">
          <select
            value={activeTab}
            onChange={(e) => onSelectTab(e.target.value)}
            className="bg-white/[0.05] border border-white/10 rounded-lg pl-2.5 pr-6 py-1 text-[11px] text-slate-300 font-medium font-mono focus:outline-none focus:border-blue-400/60 appearance-none cursor-pointer"
          >
            {TAB_CONFIG.map((tab) => (
              <option
                key={tab.id}
                value={tab.id}
                className="bg-[#050c14] text-slate-200"
              >
                {tab.fileName}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      <div className="hidden lg:flex w-56 border-r border-white/[0.08] bg-[#050c14] flex-col shrink-0">
        <div className="px-3 py-2 border-b border-white/[0.06] flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
          <span className="flex items-center gap-1.5">
            <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
            <span>Workspace</span>
          </span>
          <span className="text-slate-600 font-mono">5 files</span>
        </div>

        <div className="p-2 space-y-0.5 overflow-y-auto custom-scrollbar flex-1">
          <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider px-2 py-1">
            ~/portfolio
          </p>

          {TAB_CONFIG.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`w-full text-left flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 border ${
                  isActive
                    ? `${tab.bgActive} border-l-2 shadow-inner`
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon className={`w-3.5 h-3.5 ${tab.color}`} />
                  <span className="truncate">{tab.fileName}</span>
                </span>
                {isActive && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${tab.dot} animate-pulse`}
                  ></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
