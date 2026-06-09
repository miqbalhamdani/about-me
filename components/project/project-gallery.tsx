import type { GalleryImage } from "@/components/project/project-data";

type ProjectGalleryProps = {
  galleryImages: GalleryImage[];
};

export function ProjectGallery({ galleryImages }: ProjectGalleryProps) {
  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto mb-section-gap">
      <div className="flex flex-col gap-element-gap">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {galleryImages.slice(0, 2).map((image) => (
            <div key={image.alt} className="aspect-square bg-surface-container overflow-hidden border border-outline-variant">
              <img
                alt={image.alt}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                src={image.src}
              />
            </div>
          ))}
        </div>
        <div className="aspect-[21/9] bg-surface-container overflow-hidden border border-outline-variant">
          <img
            alt={galleryImages[2]?.alt ?? "Project Gallery"}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            src={galleryImages[2]?.src}
          />
        </div>
      </div>
    </section>
  );
}
