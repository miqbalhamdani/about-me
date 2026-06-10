type ProjectOverviewImageProps = {
  heroImage: string;
};

export function ProjectOverviewImage({ heroImage }: ProjectOverviewImageProps) {
  return (
    <section className="w-full mb-section-gap bg-surface-container-low overflow-hidden">
      <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24">
        <div className="aspect-[16/10] bg-surface-container border border-outline-variant relative group overflow-hidden">
          <img
            alt="Project Overview"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
            src={heroImage}
          />
        </div>
      </div>
    </section>
  );
}
