import { techStackRows } from "@/components/home/home-data";

export function TechStackSection() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop py-section-gap max-w-max-width mx-auto" id="stack">
      <h2 className="font-headline-lg text-headline-lg mb-section-gap uppercase tracking-tighter">Tech Stack</h2>
      <div className="space-y-16">
        {techStackRows.map((row) => (
          <div key={row.category} className="flex flex-col md:flex-row md:items-center border-b border-outline-variant pb-8">
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
              <span className="font-label-bold text-label-bold uppercase tracking-widest text-secondary">
                {row.category}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 w-full md:w-3/4">
              {row.items.map((item) => (
                <span key={item} className="bg-primary text-on-primary px-4 py-1 font-label-bold text-label-sm uppercase">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
