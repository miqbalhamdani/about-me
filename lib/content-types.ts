export type NavItem = {
  href: string;
  label: string;
};

export type LinkItem = {
  href: string;
  label: string;
};

export type AboutHighlight = {
  value: string;
  label: string;
};

export type HomeAbout = {
  heading: string;
  description: string;
  highlights: AboutHighlight[];
};

export type TechStackRow = {
  category: string;
  items: string[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
};

export type FooterContent = {
  brand: string;
  copyright: string;
  links: LinkItem[];
};

export type HomepageContent = {
  navItems: NavItem[];
  navCta: LinkItem;
  about: HomeAbout;
  techStackRows: TechStackRow[];
  experiences: Experience[];
  portfolioOrder: string[];
  footer: FooterContent;
};

export type FeatureCard = {
  icon: string;
  title: string;
  text: string;
};

export type UserFlowStep = {
  step: string;
  title: string;
  description: string;
};

export type TextBlock = {
  title: string;
  description: string;
};

export type GalleryImage = {
  alt: string;
  src: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  coverImage: string;
  coverAlt: string;
  summaryTags: string[];
  summaryTitle: string;
  summaryDescription: string;
  heroImage: string;
  demoUrl: string;
  repoUrl: string;
  about: string[];
  stack: string[];
  detail: {
    featureCards: FeatureCard[];
    userFlow: UserFlowStep[];
    decisions: TextBlock[];
    challenges: TextBlock[];
    galleryImages: GalleryImage[];
  };
};

export type ProjectSummary = {
  slug: string;
  imageAlt: string;
  imageSrc: string;
  tags: string[];
  title: string;
  description: string;
};
