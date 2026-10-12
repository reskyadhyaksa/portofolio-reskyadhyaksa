import { Code2, Server, Layout, Cloud, Database, Cpu, Wrench, Languages } from "lucide-react";

const SKILL_DOMAINS = [
  {
    title: "Programming Languages",
    icon: Code2,
    color: "text-blue-400",
    skills: ["Python", "Java", "JavaScript", "TypeScript", "PHP", "SQL", "Kotlin"],
  },
  {
    title: "Backend & APIs",
    icon: Server,
    color: "text-cyan-400",
    skills: ["Java Spring Boot", "Node.js", "Express.js", "PHP CodeIgniter 4", "RESTful API Design", "Salesforce Integration"],
  },
  {
    title: "Frontend & Mobile",
    icon: Layout,
    color: "text-purple-400",
    skills: ["Next.js", "React.js", "Vue.js", "AngularJS", "Tailwind CSS", "Android Mobile (Kotlin)"],
  },
  {
    title: "Cloud, DevOps & Infra",
    icon: Cloud,
    color: "text-emerald-400",
    skills: ["AWS (EC2, Glue, Athena, S3, Secrets Manager)", "Linux & Windows Administration", "Apache Domains", "PM2 Process Manager", "Vercel", "BiznetGio VPS"],
  },
  {
    title: "Databases & Messaging",
    icon: Database,
    color: "text-amber-400",
    skills: ["PostgreSQL", "MySQL", "SQLite", "RabbitMQ Message Broker", "Connection Pooling (mysql2)", "Schema Migrations"],
  },
  {
    title: "Automation & Architecture",
    icon: Wrench,
    color: "text-rose-400",
    skills: ["CRON Scheduling", "Windows Task Scheduler", "Git & GitHub CI/CD", "SNMPv3 Protocol", "RBAC & JWT Auth", "JasperReports"],
  },
  {
    title: "Machine Learning & AI",
    icon: Cpu,
    color: "text-indigo-400",
    skills: ["Deep Learning CNN (VGG16)", "DCGANs Augmentation", "Genetic Algorithms (GA)", "Support Vector Machines (SVM)", "NLP Pipelines", "Naïve Bayes", "HOG Extraction"],
  },
  {
    title: "Languages & Soft Skills",
    icon: Languages,
    color: "text-teal-400",
    skills: ["English (Conversational)", "Bahasa Indonesia (Native)", "Rapid SLA Problem Solving", "Root Cause Analysis", "Agile & Kanban Collaboration"],
  },
];

export default function AboutSkillMatrix() {
  return (
    <section className="space-y-6 pointer-events-none">
      <div className="flex items-center gap-3 pointer-events-none">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
          <Code2 className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Technical Skills &amp; Stack Matrix
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Core proficiencies, architecture patterns, and toolchains
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pointer-events-none">
        {SKILL_DOMAINS.map((domain, idx) => {
          const IconComponent = domain.icon;
          return (
            <div
              key={idx}
              className="rounded-3xl border border-slate-700/80 bg-[#091224] p-5 shadow-lg relative overflow-hidden pointer-events-auto flex flex-col justify-between hover:border-cyan-500/50 hover:bg-[#0c1830] transition-all group"
            >
              <div>
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#040914] border border-slate-800">
                    <IconComponent className={`w-4 h-4 ${domain.color}`} />
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {domain.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3.5">
                  {domain.skills.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className="rounded-lg border border-slate-700 bg-[#040914] px-2.5 py-1 font-mono text-[11px] text-slate-200 group-hover:border-slate-600 transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
