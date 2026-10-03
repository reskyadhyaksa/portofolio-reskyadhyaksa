"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import TileGrid from "../../component/tilegrid";
import { useTerminalCommands } from "./hooks/useTerminalCommands";
import TerminalWindowHeader from "./components/TerminalWindowHeader";
import TerminalFileTabs, { TAB_CONFIG } from "./components/TerminalFileTabs";
import TerminalStatusBar from "./components/TerminalStatusBar";
import ConsoleTab from "./components/ConsoleTab";
import ExperienceTab from "./components/ExperienceTab";
import ProjectsTab from "./components/ProjectsTab";
import SkillsTab from "./components/SkillsTab";
import CertsTab from "./components/CertsTab";

const VALID_TAB_IDS = TAB_CONFIG.map((t) => t.id);

function ExperienceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get("tab");
  const skillParam = searchParams.get("skill");
  const projectParam = searchParams.get("project");
  const categoryParam = searchParams.get("category");

  const activeTab =
    tabParam && VALID_TAB_IDS.includes(tabParam) ? tabParam : "console";

  const [skillSearch, setSkillSearch] = useState("");
  const [certSearch, setCertSearch] = useState("");
  const [projectSearch, setProjectSearch] = useState("");

  const {
    terminalLogs,
    terminalInput,
    setTerminalInput,
    handleTerminalSubmit,
    executeShortcutCmd,
    clearTerminal,
    terminalEndRef,
  } = useTerminalCommands();

  const updateUrl = (updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val === null || val === undefined || val === "" || val === "all") {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });
    const queryString = params.toString();
    const target = queryString ? `/experiences?${queryString}` : "/experiences";
    router.replace(target, { scroll: false });
  };

  const handleTabChange = (newTab) => {
    if (!VALID_TAB_IDS.includes(newTab)) return;
    updateUrl({ tab: newTab });
  };

  const handleSkillChange = (newSkill) => {
    updateUrl({ skill: newSkill });
  };

  const handleProjectChange = (projectId) => {
    updateUrl({ project: projectId });
  };

  const handleCategoryChange = (newCategory) => {
    updateUrl({ category: newCategory });
  };

  const handleSelectSkillFromSkillsTab = (skillName) => {
    updateUrl({ tab: "projects", skill: skillName });
  };

  const currentTabObject =
    TAB_CONFIG.find((t) => t.id === activeTab) || TAB_CONFIG[0];

  return (
    <div className="bg-primary relative h-dvh h-screen w-full overflow-hidden font-mono flex flex-col justify-between">
      <main className="animate-fade-in-up pointer-events-none relative z-10 flex-1 flex flex-col items-center justify-center text-white pt-16 sm:pt-20 pb-2 px-2 sm:px-4 md:px-6 min-h-0 overflow-hidden">
        <div className="pointer-events-auto w-full md:w-[90%] lg:w-[88%] xl:w-[86%] md:max-w-5xl lg:max-w-6xl xl:max-w-7xl flex-1 md:flex-initial md:h-[calc(100dvh-9rem)] md:max-h-[640px] lg:max-h-[680px] flex flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#06101c]/95 via-[#030a14]/95 to-[#02060b]/98 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-blue-950/40 min-h-0">
          <TerminalWindowHeader activeFileName={currentTabObject.fileName} />

          <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
            <TerminalFileTabs
              activeTab={activeTab}
              onSelectTab={handleTabChange}
            />

            <div className="flex-1 bg-black/40 flex flex-col min-h-0 overflow-hidden">
              <div className="flex-1 p-3 sm:p-5 md:p-6 overflow-y-auto min-h-0 custom-scrollbar">
                {activeTab === "console" && (
                  <ConsoleTab
                    terminalLogs={terminalLogs}
                    terminalInput={terminalInput}
                    setTerminalInput={setTerminalInput}
                    handleTerminalSubmit={handleTerminalSubmit}
                    executeShortcutCmd={executeShortcutCmd}
                    clearTerminal={clearTerminal}
                    terminalEndRef={terminalEndRef}
                  />
                )}

                {activeTab === "experience" && <ExperienceTab />}

                {activeTab === "projects" && (
                  <ProjectsTab
                    selectedSkill={skillParam}
                    onSkillChange={handleSkillChange}
                    selectedProjectId={projectParam}
                    onProjectChange={handleProjectChange}
                    selectedCategory={categoryParam || "all"}
                    onCategoryChange={handleCategoryChange}
                    searchQuery={projectSearch}
                    onSearchChange={setProjectSearch}
                  />
                )}

                {activeTab === "skills" && (
                  <SkillsTab
                    skillSearch={skillSearch}
                    setSkillSearch={setSkillSearch}
                    onSelectSkill={handleSelectSkillFromSkillsTab}
                  />
                )}

                {activeTab === "certs" && (
                  <CertsTab
                    certSearch={certSearch}
                    setCertSearch={setCertSearch}
                  />
                )}
              </div>

              <TerminalStatusBar activeTab={activeTab} />
            </div>
          </div>
        </div>
      </main>

      <TileGrid />

      <div className="relative flex justify-center pb-3 sm:pb-4 z-10 shrink-0">
        <Link
          href="/"
          className="animate-blink cursor-pointer text-white/50 text-xs sm:text-sm hover:text-white transition-colors"
        >
          Back to Command Center...
        </Link>
        <span className="animate-blink absolute bottom-3 sm:bottom-4 w-10 translate-y-1 border-b border-white/20"></span>
      </div>
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <Suspense
      fallback={
        <div className="bg-primary h-screen w-full flex items-center justify-center font-mono text-xs text-slate-500">
          Loading Environment...
        </div>
      }
    >
      <ExperienceContent />
    </Suspense>
  );
}
