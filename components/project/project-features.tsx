import type { FeatureCard } from "@/components/project/project-data";
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
    textWrapClassName: "",
    textClassName: "text-secondary font-body-md",
  },
  {
    iconClassName: "text-4xl text-on-primary",
    textWrapClassName: "text-on-primary",
    textClassName: "font-body-md opacity-80",
  },
  {
    iconClassName: "text-4xl text-primary",
    textWrapClassName: "",
    textClassName: "text-secondary text-sm",
  },
  {
    iconClassName: "text-4xl text-primary",
    textWrapClassName: "",
    textClassName: "text-secondary text-sm",
  },
] as const;

const FEATURE_CARD_PLACEHOLDERS: FeatureCard[] = [
  {
    icon: "auto_awesome",
    title: "Feature Slot",
    text: "Additional detail will appear here soon.",
  },
  {
    icon: "auto_awesome",
    title: "Feature Slot",
    text: "Additional detail will appear here soon.",
  },
  {
    icon: "auto_awesome",
    title: "Feature Slot",
    text: "Additional detail will appear here soon.",
  },
  {
    icon: "auto_awesome",
    title: "Feature Slot",
    text: "Additional detail will appear here soon.",
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

  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto mb-section-gap">
      <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-12">
        Main Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[600px]">
        {normalizedCards.map((feature, index) => {
          const contentClasses = FEATURE_CARD_CONTENT_CLASSES[index];

          return (
            <article
              key={`${feature.title}-${index}`}
              className={`${FEATURE_CARD_LAYOUT_CLASSES[index]} p-10 flex flex-col justify-between`}
            >
              <MaterialIcon icon={feature.icon} className={contentClasses.iconClassName} />
              <div className={contentClasses.textWrapClassName}>
              <h4 className="font-label-bold text-label-bold uppercase mb-2">{feature.title}</h4>
                <p className={contentClasses.textClassName}>{feature.text}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
