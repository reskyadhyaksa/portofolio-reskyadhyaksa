import TileGrid from "@/component/tilegrid";
import AboutHero from "./components/AboutHero";
import AboutExperienceTimeline from "./components/AboutExperienceTimeline";
import AboutEducationPublications from "./components/AboutEducationPublications";
import AboutSkillMatrix from "./components/AboutSkillMatrix";
import AboutCertifications from "./components/AboutCertifications";
import AboutContactFooter from "./components/AboutContactFooter";

export const metadata = {
  title: "About Me - Resky Adhyaksa | Full Stack Developer & DevOps",
  description:
    "Enterprise Full Stack Developer and DevOps Engineer with hands-on experience in Java Spring Boot, Next.js, AWS, RabbitMQ, and Machine Learning systems.",
};

export default function AboutMePage() {
  return (
    <div className="bg-primary relative min-h-screen w-full overflow-hidden">
      <main className="pointer-events-none relative z-10 flex w-full flex-col text-white pt-24 sm:pt-28 pb-20 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 max-w-[1560px] 2xl:max-w-[1720px] mx-auto animate-fade-in-up">
        <div className="pointer-events-none space-y-12 sm:space-y-16">
          <AboutHero />
          <AboutExperienceTimeline />
          <AboutEducationPublications />
          <AboutSkillMatrix />
          <AboutCertifications />
          <AboutContactFooter />
        </div>
      </main>
      <TileGrid />
    </div>
  );
}