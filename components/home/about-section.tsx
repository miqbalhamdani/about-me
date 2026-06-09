const highlights = [
  { value: "12+ Years", label: "Professional Experience" },
  { value: "Staff Engineer", label: "Current Seniority" },
  { value: "Architecture", label: "Core Expertise" },
  { value: "San Francisco", label: "Current Location" },
];

export function AboutSection() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop py-section-gap max-w-max-width mx-auto" id="about">
      <h2 className="font-headline-lg text-headline-lg mb-12 uppercase tracking-tighter">About</h2>
      <div className="mb-16">
        <p className="font-display-xl text-[40px] md:text-[56px] leading-tight tracking-tight max-w-4xl">
          I am a product-minded engineer dedicated to the craft of building software that feels as good as it
          looks. My approach combines deep technical rigor with a relentless focus on user experience.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-12 border-t border-outline-variant pt-12">
        {highlights.map((item) => (
          <div key={item.label} className="flex flex-col gap-2">
            <span className="font-headline-lg text-[32px] font-bold leading-none">{item.value}</span>
            <span className="font-label-sm text-secondary uppercase tracking-widest">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
