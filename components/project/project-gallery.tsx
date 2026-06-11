"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/content-types";
import { MaterialIcon } from "@/components/shared/material-icon";

type ProjectGalleryProps = {
  galleryImages: GalleryImage[];
};

export function ProjectGallery({ galleryImages }: ProjectGalleryProps) {
  const featuredWideImage = galleryImages[2];
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <>
      <section className="px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto mb-section-gap">
        <div className="flex flex-col gap-element-gap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {galleryImages.slice(0, 2).map((image) => (
              <button
                key={image.alt}
                type="button"
                className="relative aspect-square bg-surface-container overflow-hidden border border-outline-variant cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-container-low transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  alt={image.alt}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  src={image.src}
                />
              </button>
            ))}
          </div>
          {featuredWideImage ? (
            <button
              type="button"
              className="relative aspect-[21/9] bg-surface-container overflow-hidden border border-outline-variant cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-container-low transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
              onClick={() => setSelectedImage(featuredWideImage)}
            >
              <Image
                alt={featuredWideImage.alt}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                src={featuredWideImage.src}
              />
            </button>
          ) : null}
        </div>
      </section>

      {selectedImage ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          onClick={() => setSelectedImage(null)}
        >
          <div className="w-full max-w-[95vw]">
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
                onClick={() => setSelectedImage(null)}
              >
                <MaterialIcon icon="close" className="text-base" />
                Close
              </button>
            </div>

            <div
              className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                alt={selectedImage.alt}
                className="object-contain"
                fill
                sizes="100vw"
                src={selectedImage.src}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
