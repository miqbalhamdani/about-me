import type { TextBlock } from "@/components/project/project-data";

type ProjectTechnicalDetailsProps = {
  decisions: TextBlock[];
  challenges: TextBlock[];
};

function DetailList({ title, items }: { title: string; items: TextBlock[] }) {
  return (
    <div>
      <h3 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-6">
        {title}
      </h3>
      <ul className="list-disc list-outside ml-6 flex flex-col gap-6 text-body-lg text-secondary marker:text-primary">
        {items.map((item) => (
          <li key={item.title}>
            <strong className="text-primary font-bold">{item.title}:</strong>{" "}
            <span className="leading-relaxed">{item.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProjectTechnicalDetails({ decisions, challenges }: ProjectTechnicalDetailsProps) {
  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto mb-section-gap">
      <div className="flex flex-col gap-12">
        <DetailList title="Technical Decisions" items={decisions} />
        <DetailList title="Challenges" items={challenges} />
      </div>
    </section>
  );
}
