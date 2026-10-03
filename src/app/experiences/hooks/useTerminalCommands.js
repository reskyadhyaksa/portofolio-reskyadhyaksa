"use client";
import { useEffect, useRef, useState } from "react";
import { personalInfo } from "@/data/personalInfo";
import { education } from "@/data/education";
import { workExperiences } from "@/data/experiences";
import { skills } from "@/data/skills";
import { certifications } from "@/data/certifications";
import { projects } from "@/data/projects";

const INITIAL_LOGS = [
  {
    type: "output",
    text: "Welcome to RESKY-OS v1.0.0 (AWS EC2 Cloud Instance)",
  },
  { type: "output", text: "Retrieving server info... OK" },
  {
    type: "output",
    text: "Nginx reverse proxy initialized... Forwarding to localhost:3000\n",
  },
  {
    type: "output",
    text: `[SYSTEM USER INFO]\nName     : ${personalInfo.name}\nRole     : ${personalInfo.title}\nLocation : ${personalInfo.location}\nEmail    : ${personalInfo.email} | Phone: ${personalInfo.phone}\nLinks    : LinkedIn (${personalInfo.linkedin}) | GitHub (${personalInfo.github})\n`,
  },
  {
    type: "output",
    text: "Type 'help' to see list of available commands, or click the shortcuts below.",
  },
];

export function useTerminalCommands() {
  const [terminalLogs, setTerminalLogs] = useState(INITIAL_LOGS);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs]);

  const executeCommandLogic = (command) => {
    const trimmed = command.trim().toLowerCase();
    if (!trimmed) return;

    const updatedLogs = [
      ...terminalLogs,
      { type: "input", text: `resky@portfolio:~$ ${command}` },
    ];

    switch (trimmed) {
      case "help":
        updatedLogs.push({
          type: "output",
          text: "Available commands:\n  help         - Display this menu\n  about        - Show summary & contact details\n  experience   - Print career & education history\n  projects     - List projects built\n  skills       - Print the skills matrix\n  certs        - List certifications\n  clear        - Clear the screen",
        });
        break;
      case "about":
        updatedLogs.push({
          type: "output",
          text: `RESKY ADHYAKSA\nRole: ${personalInfo.title}\nLocation: ${personalInfo.location}\nEmail: ${personalInfo.email}\nPhone: ${personalInfo.phone}\n\nSummary:\n${personalInfo.summary}`,
        });
        break;
      case "experience": {
        const workText = workExperiences
          .map(
            (w) =>
              `- [${w.period}] ${w.role} at ${w.company} (${w.location})`
          )
          .join("\n");
        const eduText = education
          .map((e) => `- [${e.period}] ${e.degree} at ${e.institution}`)
          .join("\n");
        updatedLogs.push({
          type: "output",
          text: `--- EDUCATION ---\n${eduText}\n\n--- WORK EXPERIENCE ---\n${workText}`,
        });
        break;
      }
      case "projects": {
        const projText = projects
          .map(
            (p, idx) => `${idx + 1}. [${p.period}] ${p.title} (${p.role})`
          )
          .join("\n");
        updatedLogs.push({
          type: "output",
          text: `--- PROJECTS BUILT ---\n${projText}\n\nTotal Projects: ${projects.length} repository entries.`,
        });
        break;
      }
      case "skills":
        updatedLogs.push({
          type: "output",
          text: `--- SKILLS MATRIX ---\nProficient: ${skills.proficient.join(", ")}\n\nExperienced: ${skills.experienced.join(", ")}\n\nLanguages: ${skills.languages.join(", ")}`,
        });
        break;
      case "certs":
        updatedLogs.push({
          type: "output",
          text: `--- CERTIFICATIONS ---\n${certifications.map((c) => `[✓] ${c}`).join("\n")}`,
        });
        break;
      case "clear":
        setTerminalLogs([]);
        setTerminalInput("");
        return;
      default:
        updatedLogs.push({
          type: "output",
          text: `sh: command not found: ${trimmed}. Type 'help' for available commands.`,
        });
    }

    setTerminalLogs(updatedLogs);
    setTerminalInput("");
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    executeCommandLogic(terminalInput);
  };

  const executeShortcutCmd = (command) => {
    executeCommandLogic(command);
  };

  const clearTerminal = () => {
    setTerminalLogs([]);
  };

  return {
    terminalLogs,
    terminalInput,
    setTerminalInput,
    handleTerminalSubmit,
    executeShortcutCmd,
    clearTerminal,
    terminalEndRef,
  };
}
