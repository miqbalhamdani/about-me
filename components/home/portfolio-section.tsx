import Image from "next/image";
import Link from "next/link";
import type { ProjectSummary } from "@/lib/content-types";

type PortfolioSectionProps = {
  projects: ProjectSummary[];
};

export function PortfolioSection({ projects }: PortfolioSectionProps) {
  return (
    <section className="px-margin-mobile md:px-margin-desktop py-section-gap max-w-max-width mx-auto" id="portfolio">
      <h2 className="font-headline-lg text-headline-lg mb-section-gap uppercase tracking-tighter">Selected Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {projects.map((project) => (
          <article key={project.slug} className="group">
            <div className="relative aspect-video bg-surface-container-highest mb-8 overflow-hidden">
              <Image
                alt={project.imageAlt}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                src={project.imageSrc}
              />
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span key={tag} className="bg-primary text-on-primary px-2 py-0.5 font-label-bold text-[10px] uppercase">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="font-headline-lg text-[28px] mb-2">{project.title}</h3>
            <p className="font-body-md text-secondary mb-6">{project.description}</p>
            <Link
              className="inline-block border border-primary px-6 py-3 font-label-bold text-label-sm uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300"
              href={`/projects/${project.slug}`}
            >
              View Detail
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
