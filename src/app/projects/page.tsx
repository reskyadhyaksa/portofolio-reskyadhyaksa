import TileGrid from "../../component/tilegrid";
import ProjectsShowcase from "./components/ProjectsShowcase";

export const metadata = {
  title: "Projects - Resky Adhyaksa",
  description: "Portfolio of software engineering, machine learning, and data analytics projects built by Resky Adhyaksa.",
};

export default function ProjectPage() {
  return (
    <div className="bg-primary relative min-h-screen w-full overflow-x-hidden">
      <main className="pointer-events-none relative z-10 flex w-full flex-col text-white pt-24 sm:pt-28 pb-20 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 max-w-[1560px] 2xl:max-w-[1720px] mx-auto">
        <ProjectsShowcase />
      </main>
      <TileGrid />
    </div>
  );
}