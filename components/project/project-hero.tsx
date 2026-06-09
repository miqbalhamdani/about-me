import Link from "next/link";
import { MaterialIcon } from "@/components/shared/material-icon";

type ProjectHeroProps = {
  title: string;
  subtitle: string;
};

export function ProjectHero({ title, subtitle }: ProjectHeroProps) {
  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto mb-section-gap">
      <div className="flex flex-col gap-6">
        <Link
          className="flex items-center gap-2 font-label-bold text-label-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors group"
          href="/#portfolio"
        >
          <MaterialIcon icon="arrow_back" className="transition-transform group-hover:-translate-x-1" />
          Back to Portfolio
        </Link>
        <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-primary max-w-4xl">
          {title}
        </h1>
        <p className="font-body-lg text-body-lg text-secondary max-w-2xl mt-4">{subtitle}</p>
      </div>
    </section>
  );
}
