import { Fragment } from "react";
import { homepageContent } from "@/lib/site-content";

export function HeroSection() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center px-margin-mobile md:px-margin-desktop py-section-gap max-w-max-width mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-30 items-center w-full">
        <div className="flex flex-col">
          <h1 className="font-display-xl text-[80px] md:text-[120px] leading-[0.9] tracking-tighter uppercase font-bold text-primary">
            {homepageContent.hero.h1.map((line, index) => (
              <Fragment key={`h1-${line}-${index}`}>
                {index > 0 ? <br /> : null}
                {line}
              </Fragment>
            ))}
          </h1>
        </div>
        <div className="flex flex-col items-start gap-8 md:ml-12">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg leading-tight uppercase tracking-tighter text-primary">
            {homepageContent.hero.h2.map((line, index) => (
              <Fragment key={`h2-${line}-${index}`}>
                {index > 0 ? <br /> : null}
                {line}
              </Fragment>
            ))}
          </h2>
          <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
            <a
              className="bg-primary text-on-primary px-10 py-5 font-label-bold text-label-bold uppercase tracking-widest hover:opacity-80 transition-opacity duration-150"
              href="#portfolio"
            >
              View Portfolio
            </a>
            <a
              className="text-primary font-label-bold text-label-bold uppercase tracking-widest hover:underline transition-all duration-200"
              href={homepageContent.hero.contact.href}
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
