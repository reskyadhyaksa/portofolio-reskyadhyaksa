"use client";

import { useState, useEffect, useRef } from "react";
import TileGrid from "../../component/tilegrid";
import Link from "next/link";
import { 
  Terminal, 
  Briefcase, 
  FolderGit2, 
  Wrench, 
  Award, 
  Code2,
  MapPin,
  Mail,
  Phone,
  Link2,
  Sparkles
} from "lucide-react";
import { personalInfo } from "./personalInfo";
import { education } from "./education";
import { workExperiences, organizational } from "./experience";
import { skills } from "./skills";
import { certifications } from "./certifications";
import { projects } from "./project";

import ConsoleTab from "./components/ConsoleTab";
import ExperienceTab from "./components/ExperienceTab";
import ProjectsTab from "./components/ProjectsTab";
import SkillsTab from "./components/SkillsTab";
import CertsTab from "./components/CertsTab";

export default function ExperiencePages() {
  const [activeTab, setActiveTab] = useState("console");
  const [terminalLogs, setTerminalLogs] = useState([
    { type: "output", text: "Welcome to RESKY-OS v1.0.0 (AWS EC2 t3.micro Cloud Instance)" },
    { type: "output", text: "Retrieving server info... OK" },
    { type: "output", text: "Nginx reverse proxy initialized... Forwarding to localhost:3000" },
    { type: "output", text: "Type 'help' to see list of available commands, or click the shortcuts below." }
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalEndRef = useRef(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [skillSearch, setSkillSearch] = useState("");
  const [certSearch, setCertSearch] = useState("");

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs]);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...terminalLogs, { type: "input", text: `resky@portfolio:~$ ${terminalInput}` }];
    
    switch (cmd) {
      case "help":
        newLogs.push({ 
          type: "output", 
          text: "Available commands:\n  help         - Display this menu\n  about        - Show summary & contact details\n  experience   - Print career & education history\n  projects     - List projects built\n  skills       - Print the skills matrix\n  certs        - List certifications\n  clear        - Clear the screen" 
        });
        break;
      case "about":
        newLogs.push({
          type: "output",
          text: `RESKY ADHYAKSA\nRole: ${personalInfo.title}\nLocation: ${personalInfo.location}\nEmail: ${personalInfo.email}\nPhone: ${personalInfo.phone}\n\nSummary:\n${personalInfo.summary}`
        });
        break;
      case "experience":
        const workText = workExperiences.map(w => `- [${w.period}] ${w.role} at ${w.company} (${w.location})`).join("\n");
        const eduText = education.map(e => `- [${e.period}] ${e.degree} at ${e.institution}`).join("\n");
        newLogs.push({
          type: "output",
          text: `--- EDUCATION ---\n${eduText}\n\n--- WORK EXPERIENCE ---\n${workText}`
        });
        break;
      case "projects":
        const projText = projects.map((p, idx) => `${idx + 1}. [${p.period}] ${p.title} (${p.role})`).join("\n");
        newLogs.push({
          type: "output",
          text: `--- PROJECTS BUILT ---\n${projText}\n\nType of projects: Next.js Web Apps, Python SVM Machine Learning classifiers, Lexicon text classifications, Google Looker Studio analytics.`
        });
        break;
      case "skills":
        newLogs.push({
          type: "output",
          text: `--- SKILLS MATRIX ---\nProficient: ${skills.proficient.join(", ")}\n\nExperienced: ${skills.experienced.join(", ")}\n\nLanguages: ${skills.languages.join(", ")}`
        });
        break;
      case "certs":
        newLogs.push({
          type: "output",
          text: `--- CERTIFICATIONS ---\n${certifications.map(c => `[✓] ${c}`).join("\n")}`
        });
        break;
      case "clear":
        setTerminalLogs([]);
        setTerminalInput("");
        return;
      default:
        newLogs.push({ 
          type: "output", 
          text: `sh: command not found: ${cmd}. Type 'help' for available commands.` 
        });
    }

    setTerminalLogs(newLogs);
    setTerminalInput("");
  };

  const executeShortcutCmd = (cmd) => {
    setTerminalInput(cmd);
    setTimeout(() => {
      const newLogs = [...terminalLogs, { type: "input", text: `resky@portfolio:~$ ${cmd}` }];
      switch (cmd) {
        case "help":
          newLogs.push({ 
            type: "output", 
            text: "Available commands:\n  help         - Display this menu\n  about        - Show summary & contact details\n  experience   - Print career & education history\n  projects     - List projects built\n  skills       - Print the skills matrix\n  certs        - List certifications\n  clear        - Clear the screen" 
          });
          break;
        case "about":
          newLogs.push({
            type: "output",
            text: `RESKY ADHYAKSA\nRole: ${personalInfo.title}\nLocation: ${personalInfo.location}\nEmail: ${personalInfo.email}\nPhone: ${personalInfo.phone}\n\nSummary:\n${personalInfo.summary}`
          });
          break;
        case "experience":
          const workText = workExperiences.map(w => `- [${w.period}] ${w.role} at ${w.company} (${w.location})`).join("\n");
          const eduText = education.map(e => `- [${e.period}] ${e.degree} at ${e.institution}`).join("\n");
          newLogs.push({
            type: "output",
            text: `--- EDUCATION ---\n${eduText}\n\n--- WORK EXPERIENCE ---\n${workText}`
          });
          break;
        case "projects":
          const projText = projects.map((p, idx) => `${idx + 1}. [${p.period}] ${p.title} (${p.role})`).join("\n");
          newLogs.push({
            type: "output",
            text: `--- PROJECTS BUILT ---\n${projText}\n\nType of projects: Next.js Web Apps, Python SVM Machine Learning classifiers, Lexicon text classifications, Google Looker Studio analytics.`
          });
          break;
        case "skills":
          newLogs.push({
            type: "output",
            text: `--- SKILLS MATRIX ---\nProficient: ${skills.proficient.join(", ")}\n\nExperienced: ${skills.experienced.join(", ")}\n\nLanguages: ${skills.languages.join(", ")}`
          });
          break;
        case "certs":
          newLogs.push({
            type: "output",
            text: `--- CERTIFICATIONS ---\n${certifications.map(c => `[✓] ${c}`).join("\n")}`
          });
          break;
        default:
          break;
      }
      setTerminalLogs(newLogs);
      setTerminalInput("");
    }, 100);
  };

  return (
    <div className="bg-primary relative min-h-screen w-full overflow-hidden font-mono">
      <main className="animate-fade-in-up pointer-events-none relative z-10 flex w-full flex-col text-white pt-28 pb-16 px-4 md:px-10 lg:px-24">
        
        <div className="pointer-events-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
              {personalInfo.name}
            </h1>
            <p className="text-sm md:text-base text-white/70 mt-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              {personalInfo.title}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/50">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <MapPin className="w-3.5 h-3.5 text-blue-400" /> {personalInfo.location}
            </span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-emerald-400" /> {personalInfo.email}
            </span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-purple-400" /> {personalInfo.phone}
            </span>
            <a 
              href={personalInfo.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 hover:text-white text-blue-400 transition-colors"
            >
              <Link2 className="w-3.5 h-3.5" /> LinkedIn
            </a>
            <a 
              href={personalInfo.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 hover:text-white text-emerald-400 transition-colors"
            >
              <Link2 className="w-3.5 h-3.5" /> GitHub
            </a>
          </div>
        </div>

        <div className="pointer-events-auto flex flex-col lg:flex-row rounded-2xl border border-white/10 bg-[#03182b]/95 backdrop-blur-xl min-h-[580px] overflow-hidden shadow-2xl shadow-blue-950/40">
          
          <div className="w-full lg:w-64 border-r border-white/10 bg-black/20 flex flex-col shrink-0">
            
            <div className="h-12 px-4 bg-black/40 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/40 uppercase font-bold tracking-widest flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-blue-400" /> Workspace
              </span>
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/60 border border-red-500/20"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/60 border border-yellow-500/20"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/60 border border-green-500/20"></span>
              </div>
            </div>

            <div className="p-3 space-y-1">
              <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider px-2 mb-2">resky-adhyaksa-cv</p>
              
              <button
                onClick={() => setActiveTab("console")}
                className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  activeTab === "console" 
                    ? "bg-blue-500/20 text-blue-300 border-l-2 border-blue-400 shadow-inner" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  console.sh
                </span>
                {activeTab === "console" && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>}
              </button>

              <button
                onClick={() => setActiveTab("experience")}
                className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  activeTab === "experience" 
                    ? "bg-emerald-500/20 text-emerald-300 border-l-2 border-emerald-400 shadow-inner" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  experience.log
                </span>
                {activeTab === "experience" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>}
              </button>

              <button
                onClick={() => setActiveTab("projects")}
                className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  activeTab === "projects" 
                    ? "bg-purple-500/20 text-purple-300 border-l-2 border-purple-400 shadow-inner" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-purple-400" />
                  projects.json
                </span>
                {activeTab === "projects" && <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>}
              </button>

              <button
                onClick={() => setActiveTab("skills")}
                className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  activeTab === "skills" 
                    ? "bg-yellow-500/20 text-yellow-300 border-l-2 border-yellow-400 shadow-inner" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-yellow-400" />
                  skills.yml
                </span>
                {activeTab === "skills" && <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>}
              </button>

              <button
                onClick={() => setActiveTab("certs")}
                className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  activeTab === "certs" 
                    ? "bg-rose-500/20 text-rose-300 border-l-2 border-rose-400 shadow-inner" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-rose-400" />
                  credentials.md
                </span>
                {activeTab === "certs" && <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>}
              </button>

            </div>
          </div>

          <div className="flex-1 bg-black/40 flex flex-col min-h-0">
            
            <div className="h-12 px-4 bg-black/60 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/50 font-bold flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-blue-500"></span>
                ACTIVE FILE: <span className="text-white/80 select-all">~/resky-os/{
                  activeTab === "console" ? "console.sh" :
                  activeTab === "experience" ? "experience.log" :
                  activeTab === "projects" ? "projects.json" :
                  activeTab === "skills" ? "skills.yml" : "credentials.md"
                }</span>
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-widest font-bold">
                Status: Connected
              </span>
            </div>

            <div className="flex-1 p-4 md:p-6 overflow-y-auto min-h-0">
              
              {activeTab === "console" && (
                <ConsoleTab
                  terminalLogs={terminalLogs}
                  terminalInput={terminalInput}
                  setTerminalInput={setTerminalInput}
                  handleTerminalSubmit={handleTerminalSubmit}
                  executeShortcutCmd={executeShortcutCmd}
                  setTerminalLogs={setTerminalLogs}
                  terminalEndRef={terminalEndRef}
                />
              )}

              {activeTab === "experience" && <ExperienceTab />}

              {activeTab === "projects" && (
                <ProjectsTab
                  selectedSkill={selectedSkill}
                  setSelectedSkill={setSelectedSkill}
                />
              )}

              {activeTab === "skills" && (
                <SkillsTab
                  skillSearch={skillSearch}
                  setSkillSearch={setSkillSearch}
                  setSelectedSkill={setSelectedSkill}
                  setActiveTab={setActiveTab}
                />
              )}

              {activeTab === "certs" && (
                <CertsTab
                  certSearch={certSearch}
                  setCertSearch={setCertSearch}
                />
              )}

            </div>
            
            <div className="px-4 py-2.5 bg-black/60 border-t border-white/10 flex flex-wrap justify-between items-center text-[10px] text-white/40 gap-2">
              <div className="flex items-center gap-4">
                <span>UTF-8</span>
                <span>Port: 3000</span>
                <span>Host: AWS t3.micro</span>
              </div>
              <div>
                <span>Developed by Resky Adhyaksa &copy; 2026</span>
              </div>
            </div>

          </div>
        </div>

        <div className="pointer-events-auto mt-8 flex justify-center">
          <Link href="/" className="cursor-pointer text-white/50 text-xs sm:text-sm hover:text-white transition-colors border-b border-dashed border-white/20 pb-0.5 hover:border-white/50">
            &larr; Back to Command Center
          </Link>
        </div>

      </main>
      <TileGrid />
    </div>
  );
}
