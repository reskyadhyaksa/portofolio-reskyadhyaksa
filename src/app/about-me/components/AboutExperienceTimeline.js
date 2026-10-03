"use client";
import { useState } from "react";
import { Briefcase, CheckCircle2, Calendar, MapPin, Building2, ChevronDown, ChevronUp } from "lucide-react";

const WORK_EXPERIENCES = [
  {
    company: "PT. Mandiri Tunas Finance",
    location: "Jakarta Pusat, Indonesia",
    role: "HCIS & Full Stack Web Developer",
    period: "Mar 2026 – Present",
    type: "Enterprise Financial Services",
    badgeColor: "border-blue-500/40 bg-blue-950/60 text-blue-300",
    summary: "Spearheaded enterprise Human Capital Information System (HC Eazy) backend services, Salesforce bridge integrations, and cloud infrastructure pipelines.",
    highlights: [
      "Designed RESTful APIs (Java Spring Boot) to bridge HC Eazy with Salesforce, resolving critical data synchronization bugs by reconfiguring RabbitMQ message listeners and fixing relational mismatches.",
      "Managed end-to-end deployment pipelines by compiling JAR/Angular artifacts post-QA for production releases, and administered AWS environments (Linux & Windows) configuring Apache domains, PM2 logs, and server performance.",
      "Managed high-priority technical tickets (Urgent SLA < 4 hours) involving complex SQL data extractions, bulk data uploads, and real-time bug fixes supporting Performance Appraisals.",
      "Resolved frontend routing bottlenecks by optimizing module preloading in AngularJS, and engineered a dynamic CRUD audit logging engine using custom Spring Boot annotations for enterprise traceability.",
      "Developed a full-stack HC Helpdesk platform (PHP CodeIgniter 4) featuring Role-Based Access Control (RBAC), automated SLA priority assignment, and an interactive Kanban board.",
      "Configured secure Salesforce backup pipelines using AWS Glue, OAuth2, and AWS Secrets Manager, verifying data integrity across AWS Athena and S3.",
      "Built automated Warning Letter (SP) distribution via CRON and Windows Task Scheduler with multi-tier productivity formulas, and integrated RabbitMQ with Jasper for asynchronous reporting.",
    ],
    tech: ["Java Spring Boot", "Next.js", "AngularJS", "PHP CodeIgniter 4", "Salesforce API", "AWS (EC2, S3, Glue, Athena)", "RabbitMQ", "SQL", "PM2", "Apache"],
  },
  {
    company: "CV. Suhuf Kertaseni Nusantara",
    location: "Bandung, Indonesia",
    role: "Software Developer",
    period: "July – Sept 2023",
    type: "Digital Commerce & Publishing",
    badgeColor: "border-purple-500/40 bg-purple-950/60 text-purple-300",
    summary: "Engineered web applications and responsive administrative management systems for digital publishing and e-commerce.",
    highlights: [
      "Developed an Admin Page Management System, implementing a responsive and intuitive dashboard using Next.js for efficient product and content management.",
      "Integrated dynamic data management features, allowing administrators to update, edit, and track product inventory seamlessly in real-time.",
      "Implemented modern UI/UX designs for the main Suhuf Kertaseni website, enhancing visual appeal, accessibility, and user engagement.",
      "Optimized website performance using server-side rendering (SSR) and static site generation (SSG) for faster load times and improved SEO rankings.",
      "Collaborated with backend developers and designers to align the UI with business requirements and user needs.",
    ],
    tech: ["Next.js", "React.js", "JavaScript", "Tailwind CSS", "SSR/SSG", "RESTful APIs"],
  },
];

export default function AboutExperienceTimeline() {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (idx) => {
    setExpanded((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <section className="space-y-4 sm:space-y-6 pointer-events-none">
      <div className="flex items-center gap-3 pointer-events-none">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-300">
          <Briefcase className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Work Experience
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Enterprise backend, cloud systems, and production engineering
          </p>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6 pointer-events-none">
        {WORK_EXPERIENCES.map((exp, idx) => {
          const isExpanded = Boolean(expanded[idx]);
          const visibleHighlights = isExpanded ? exp.highlights : exp.highlights.slice(0, 2);
          const hiddenCount = exp.highlights.length - 2;

          return (
            <div
              key={idx}
              className="rounded-2xl sm:rounded-3xl border border-slate-700/80 bg-[#091224] p-4 sm:p-6 md:p-8 shadow-xl relative overflow-hidden pointer-events-auto group hover:border-cyan-500/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 sm:pb-4 border-b border-slate-800">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold border ${exp.badgeColor}`}>
                      {exp.type}
                    </span>
                    <span className="text-[11px] sm:text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {exp.period}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-white mt-1.5 sm:mt-2 group-hover:text-cyan-300 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-cyan-400 mt-0.5 font-semibold">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 shrink-0" />
                      {exp.company}
                    </span>
                    <span className="text-slate-600">|</span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      {exp.location}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mt-3 sm:mt-4 leading-relaxed font-normal">
                {exp.summary}
              </p>

              <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-2.5">
                {visibleHighlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {hiddenCount > 0 && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => toggleExpand(idx)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors py-1 active:scale-95"
                  >
                    <span>{isExpanded ? "Show Less" : `View ${hiddenCount} More Key Deliverables`}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 pt-4 sm:pt-6 border-t border-slate-800/80 mt-4 sm:mt-6">
                {exp.tech.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className={`rounded-lg border border-slate-700 bg-[#040914] px-2 py-0.5 sm:px-2.5 sm:py-1 font-mono text-[10px] sm:text-[11px] text-slate-300 group-hover:border-slate-600 transition-colors ${
                      tIdx >= 5 ? "hidden sm:inline-flex" : "inline-flex"
                    }`}
                  >
                    {t}
                  </span>
                ))}
                {exp.tech.length > 5 && (
                  <span className="sm:hidden inline-flex items-center rounded-lg border border-slate-700 bg-[#040914] px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
                    +{exp.tech.length - 5}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
