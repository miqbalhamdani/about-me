import { AboutSection } from "@/components/home/about-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { HeroSection } from "@/components/home/hero-section";
import { PortfolioSection } from "@/components/home/portfolio-section";
import { TechStackSection } from "@/components/home/tech-stack-section";

export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <main className="mt-32">
        <HeroSection />
        <hr className="border-t border-primary w-full" />
        <AboutSection />
        <TechStackSection />
        <ExperienceSection />
        <PortfolioSection />
      </main>
    </>
  );
}
