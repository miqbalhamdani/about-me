import type { HomeAbout } from "@/lib/content-types";

type AboutSectionProps = {
  about: HomeAbout;
};

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <section className="px-margin-mobile md:px-margin-desktop py-section-gap max-w-max-width mx-auto" id="about">
      <h2 className="font-headline-lg text-headline-lg mb-12 uppercase tracking-tighter">{about.heading}</h2>
      <div className="mb-16">
        <p className="font-display-xl text-[40px] md:text-[56px] leading-tight tracking-tight max-w-4xl">
          {about.description}
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-12 border-t border-outline-variant pt-12">
        {about.highlights.map((item) => (
          <div key={item.label} className="flex flex-col gap-2">
            <span className="font-headline-lg text-[32px] font-bold leading-none">{item.value}</span>
            <span className="font-label-sm text-secondary uppercase tracking-widest">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
