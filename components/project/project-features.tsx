"use client";

import { useState } from "react";
import Image from "next/image";
import type { FeatureCard } from "@/lib/content-types";
import { MaterialIcon } from "@/components/shared/material-icon";

type ProjectFeaturesProps = {
  featureCards: FeatureCard[];
};

const FEATURE_CARD_LAYOUT_CLASSES = [
  "md:col-span-2 md:row-span-2 bg-surface-container-low border border-outline-variant",
  "md:col-span-2 md:row-span-1 bg-primary",
  "md:col-span-1 md:row-span-1 bg-surface-container-highest border border-outline-variant",
  "md:col-span-1 md:row-span-1 bg-surface-bright border border-outline-variant",
] as const;

const FEATURE_CARD_CONTENT_CLASSES = [
  {
    iconClassName: "text-4xl text-primary",
  },
  {
    iconClassName: "text-4xl text-on-primary",
  },
  {
    iconClassName: "text-4xl text-primary",
  },
  {
    iconClassName: "text-4xl text-primary",
  },
] as const;

const FEATURE_CARD_IMAGE_CONTENT_CLASSES = {
  iconClassName: "text-4xl text-white",
} as const;

const FEATURE_CARD_PLACEHOLDERS: FeatureCard[] = [
  {
    icon: "auto_awesome",
  },
  {
    icon: "auto_awesome",
  },
  {
    icon: "auto_awesome",
  },
  {
    icon: "auto_awesome",
  },
];

function normalizeFeatureCards(featureCards: FeatureCard[]): FeatureCard[] {
  const firstFourCards = featureCards.slice(0, 4);
  const missingCount = 4 - firstFourCards.length;

  if (missingCount <= 0) {
    return firstFourCards;
  }

  return [...firstFourCards, ...FEATURE_CARD_PLACEHOLDERS.slice(0, missingCount)];
}

export function ProjectFeatures({ featureCards }: ProjectFeaturesProps) {
  const normalizedCards = normalizeFeatureCards(featureCards);
  const [selectedImage, setSelectedImage] = useState<FeatureCard | null>(null);

  return (
    <>
      <section className="px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto mb-section-gap">
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-12">
          Main Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[600px]">
          {normalizedCards.map((feature, index) => {
            const contentClasses = feature.backgroundImage
              ? FEATURE_CARD_IMAGE_CONTENT_CLASSES
              : FEATURE_CARD_CONTENT_CLASSES[index];

            if (feature.backgroundImage) {
              return (
                <button
                  key={`${feature.icon}-${index}`}
                  type="button"
                  className={`${FEATURE_CARD_LAYOUT_CLASSES[index]} group relative overflow-hidden p-10 flex flex-col justify-between text-left cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-container-low transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl`}
                  onClick={() => setSelectedImage(feature)}
                >
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 ease-in-out group-hover:grayscale-0 group-hover:scale-105"
                    loading="eager"
                    src={feature.backgroundImage}
                    fill
                    sizes="(min-width: 768px) 25vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-black/55 transition-colors duration-500 group-hover:bg-black/35" />

                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <MaterialIcon icon={feature.icon} className={contentClasses.iconClassName} />
                    <span className="sr-only">Open feature image preview</span>
                  </div>
                </button>
              );
            }

            return (
              <article
                key={`${feature.icon}-${index}`}
                className={`${FEATURE_CARD_LAYOUT_CLASSES[index]} relative overflow-hidden p-10 flex flex-col justify-between`}
              >
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <MaterialIcon icon={feature.icon} className={contentClasses.iconClassName} />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {selectedImage?.backgroundImage ? (
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

            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl" onClick={(event) => event.stopPropagation()}>
              <Image
                alt="Project feature image preview"
                className="object-contain"
                fill
                sizes="100vw"
                src={selectedImage.backgroundImage}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
