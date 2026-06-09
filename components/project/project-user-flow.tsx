import type { UserFlowStep } from "@/lib/content-types";

type ProjectUserFlowProps = {
  userFlow: UserFlowStep[];
};

export function ProjectUserFlow({ userFlow }: ProjectUserFlowProps) {
  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto mb-section-gap">
      <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-12">
        User Flow
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        {userFlow.map((flow) => (
          <article key={flow.step} className="flex flex-col gap-4">
            <div className="text-display-xl-mobile md:text-display-xl font-bold text-surface-container-highest opacity-50">
              {flow.step}
            </div>
            <h4 className="font-label-bold text-label-bold uppercase">{flow.title}</h4>
            <p className="text-secondary font-body-md">{flow.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
