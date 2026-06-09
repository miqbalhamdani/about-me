import { AboutSection } from "@/components/home/about-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { HeroSection } from "@/components/home/hero-section";
import { PortfolioSection } from "@/components/home/portfolio-section";
import { TechStackSection } from "@/components/home/tech-stack-section";
import { getProjectSummariesInOrder } from "@/lib/projects";
import { homepageContent } from "@/lib/site-content";

export const revalidate = 86400;

export default async function Home() {
  const portfolioProjects = await getProjectSummariesInOrder(homepageContent.portfolioOrder);

  return (
    <>
      <main className="mt-32">
        <HeroSection />
        <hr className="border-t border-primary w-full" />
        <AboutSection about={homepageContent.about} />
        <TechStackSection rows={homepageContent.techStackRows} />
        <ExperienceSection experiences={homepageContent.experiences} />
        <PortfolioSection projects={portfolioProjects} />
      </main>
    </>
  );
}
