import Link from "next/link";
import { MaterialIcon } from "@/components/shared/material-icon";

export function ProjectCta() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto mb-section-gap py-section-gap border-t border-outline-variant text-center">
      <h2 className="font-headline-lg text-headline-lg text-primary mb-8">Ready to see more?</h2>
      <Link
        className="inline-flex items-center gap-4 bg-primary text-on-primary px-12 py-6 font-label-bold text-label-bold uppercase tracking-widest hover:bg-secondary transition-colors duration-300"
        href="/#portfolio"
      >
        Back to Portfolio
        <MaterialIcon icon="arrow_forward" />
      </Link>
    </section>
  );
}
