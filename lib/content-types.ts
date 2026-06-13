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
  links: LinkItem[];
};

export type NavCta = {
  href: string;
};

export type HrefOnly = {
  href: string;
};

export type HeroContent = {
  h1: string[];
  h2: string[];
  contact: HrefOnly;
};

export type HomepageContent = {
  brand: string;
  navCta: NavCta;
  hero: HeroContent;
  about: HomeAbout;
  techStackRows: TechStackRow[];
  experiences: Experience[];
  portfolioOrder: string[];
  footer: FooterContent;
};

export type FeatureCard = {
  icon: string;
  backgroundImage?: string;
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
  heroImage: string;
  demoUrl: string | null;
  repoUrl: string | null;
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

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  coverImage: string;
  coverAlt: string;
  featured?: boolean;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

export type BlogPostSummary = BlogPostMeta;
