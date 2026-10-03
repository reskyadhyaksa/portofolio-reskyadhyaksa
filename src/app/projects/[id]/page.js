import { notFound } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import TileGrid from "@/component/tilegrid";
import {
  getProjectDetail,
  getAllProjectDetailIds,
  getAdjacentProjects,
} from "@/data/projectDetails";
import DeckCommandBar from "./components/DeckCommandBar";
import DeckHeroSplit from "./components/DeckHeroSplit";
import DeckArchitecture from "./components/DeckArchitecture";
import CaseStudyFeatures from "./components/CaseStudyFeatures";
import CaseStudySidebar from "./components/CaseStudySidebar";
import DeckAdjacentNavigator from "./components/DeckAdjacentNavigator";

export async function generateStaticParams() {
  const ids = getAllProjectDetailIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = getProjectDetail(id);

  if (!project) {
    return {
      title: "Project Not Found - Resky Adhyaksa",
    };
  }

  return {
    title: `${project.title} Case Study - Resky Adhyaksa`,
    description: project.subtitle,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { id } = await params;
  const project = getProjectDetail(id);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(id);

  return (
    <div className="bg-primary relative min-h-screen w-full overflow-hidden">
      <main className="pointer-events-none relative z-10 flex w-full flex-col text-white pt-24 sm:pt-28 pb-20 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 max-w-[1560px] 2xl:max-w-[1720px] mx-auto animate-fade-in-up">
        <div className="pointer-events-none space-y-10 sm:space-y-14">
          <DeckCommandBar project={project} />

          <DeckHeroSplit project={project} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-8 space-y-10 sm:space-y-14">
              {project.about && project.about.length > 0 && (
                <section className="space-y-4 pointer-events-none">
                  <div className="flex items-center gap-3 pointer-events-none">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                      <LayoutDashboard className="h-4 w-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Executive Summary
                    </h2>
                  </div>
                  <div className="text-slate-200 space-y-4 text-base sm:text-lg leading-relaxed bg-[#091224] p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-xl pointer-events-auto">
                    {project.about.map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-slate-200 font-normal">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              )}

              <DeckArchitecture
                architecture={project.architecture}
                codeSnippet={project.codeSnippet}
              />

              <CaseStudyFeatures features={project.features} />
            </div>

            <div className="lg:col-span-4">
              <CaseStudySidebar project={project} />
            </div>
          </div>

          <DeckAdjacentNavigator prevProject={prev} nextProject={next} />
        </div>
      </main>
      <TileGrid />
    </div>
  );
}
