import { experiences } from "@/components/home/home-data";

export function ExperienceSection() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop py-section-gap max-w-max-width mx-auto" id="experience">
      <h2 className="font-headline-lg text-headline-lg mb-section-gap uppercase tracking-tighter">Experience</h2>
      <div className="space-y-0">
        {experiences.map((experience) => (
          <article
            key={experience.company}
            className="group flex flex-col md:flex-row justify-between py-12 border-b border-outline-variant hover:bg-surface-container-low transition-colors px-4 -mx-4"
          >
            <div className="flex flex-col">
              <h3 className="font-headline-lg text-[24px] font-bold group-hover:translate-x-2 transition-transform duration-300">
                {experience.company}
              </h3>
              <p className="font-body-md text-secondary">{experience.role}</p>
            </div>
            <span className="font-label-bold text-label-bold uppercase tracking-widest text-secondary mt-4 md:mt-0">
              {experience.period}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
