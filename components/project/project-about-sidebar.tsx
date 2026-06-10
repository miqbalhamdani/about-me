type ProjectAboutSidebarProps = {
  about: string[];
  stack: string[];
  demoUrl: string;
  repoUrl: string;
};

export function ProjectAboutSidebar({ about, stack, demoUrl, repoUrl }: ProjectAboutSidebarProps) {
  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto mb-section-gap">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <article className="md:col-span-8 flex flex-col gap-element-gap">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
            About the App
          </h2>
          <div className="flex flex-col gap-6 text-secondary font-body-md text-body-md">
            {about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>

        <aside className="md:col-span-4 flex flex-col gap-element-gap">
          <div className="flex flex-col gap-4 mb-4">
            <a
              className="w-full bg-primary text-on-primary py-4 px-6 text-center font-label-bold text-label-bold uppercase tracking-widest hover:bg-secondary transition-colors duration-300"
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Demo
            </a>
            <a
              className="w-full border border-primary text-primary py-4 px-6 text-center font-label-bold text-label-bold uppercase tracking-widest hover:bg-surface-container transition-colors duration-300"
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
          <div>
            <h3 className="font-label-bold text-label-bold uppercase tracking-widest text-primary mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {stack.map((item) => (
                <span key={item} className="bg-primary text-on-primary px-3 py-1 font-label-bold text-label-sm uppercase">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
