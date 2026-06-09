export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
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

export const detailNavItems = [
  { href: "/#about", label: "About" },
  { href: "/#stack", label: "Tech Stack" },
  { href: "/#experience", label: "Experience" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#contact", label: "Contact" },
];

const featureCards: FeatureCard[] = [
  {
    icon: "analytics",
    title: "Predictive Analysis",
    text: "Advanced ML models predicting system bottlenecks before they occur.",
  },
  {
    icon: "bolt",
    title: "Instant Sync",
    text: "Real-time collaboration with sub-50ms latency across global nodes.",
  },
  {
    icon: "security",
    title: "Encryption",
    text: "Military-grade protection.",
  },
  {
    icon: "hub",
    title: "API Mesh",
    text: "Modular integration system.",
  },
];

const userFlow: UserFlowStep[] = [
  {
    step: "01",
    title: "Authentication",
    description: "Secure biometric or cryptographic handshake to establish neural link.",
  },
  {
    step: "02",
    title: "Sync Initialization",
    description: "Calibration of local nodes with the global distributed ledger.",
  },
  {
    step: "03",
    title: "Data Stream",
    description: "Real-time visualization of cognitive load and data throughput.",
  },
  {
    step: "04",
    title: "Optimization",
    description: "Automated heuristic adjustments based on active user context.",
  },
];

const decisions: TextBlock[] = [
  {
    title: "Rust Core Engine",
    description:
      "The architecture is anchored by a high-performance Rust core, selected for its uncompromising memory safety and zero-cost abstractions. This foundation allows for the processing of high-frequency data streams with surgical precision, ensuring system stability under extreme cognitive loads.",
  },
  {
    title: "GraphQL Subscriptions",
    description:
      "To achieve true real-time synchronization, we implemented a robust GraphQL subscription layer. This enables low-latency, bi-directional updates across the entire distributed ecosystem, maintaining a seamless state of flow between the interface and the underlying data architecture.",
  },
];

const challenges: TextBlock[] = [
  {
    title: "Latency Jitter",
    description:
      "Navigating the complexities of inconsistent network speeds across global nodes required a sophisticated jitter-buffer strategy to maintain a sub-50ms synchronization threshold.",
  },
  {
    title: "Cognitive Load",
    description:
      "The primary design challenge was distilling complex data into an intuitive narrative, ensuring the operator remains informed without being overwhelmed by the sheer volume of real-time insights.",
  },
];

const galleryImages: GalleryImage[] = [
  {
    alt: "Detail 1",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD59J6-IH-lceGfWy6-KYmgAPGhvgsWczF2cNW9Lg2USbQ8HmxE8Vd5rP6CXRol4Q6smDDXtGpO28L9OR8vFxOb0ZYVmvVdQje3oVpHIWxGZa6C2nDYNwMMVKPzdFGXrzkw5GrUKN3j0E-VBD49ifGWWSyzyeHeKMUyIkn2FhqcKCX1Leb86lEOURJP-rQM1idYKxAOWhszGlyswX6u4ghc6A37oWbq1D22WASNRdNEn-Dw_19ZRoWhu09ICCX75WFFeRUJHsb1Vs3f",
  },
  {
    alt: "Detail 2",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2RCxGABbxcCXkXkLvF_KdNN-7nBv227AafyMY4381f6AULSMpJHPicSfbfUosuae8tnkWwtzh4lKHO1IlkwpIgEXvkrHpaO9K_fUsTa8iZuqROeJZ_5_3uy5zSNH87aTbseURoiMb_DeljOpGUS7QcLr5VHDlFbUJtA56aPDsz-A3c5_vrBKJkJ8yURA2jUFBGbt1TBDSYA0nFVUz6ecZgCR9Qw69dTahsG4SAxk9Ct_EJbt94b-XIzm28ZgGf3x8wXCLPdTtFeWd",
  },
  {
    alt: "Wide View",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIzBWD6trdZ9RwJkcmPdz_3eg7p81uz6KHjSJUkQxI0QeNJYCvi4giPSZ-U3sKVV83XPjNcHL752za5eW5LUMhgwy5X22Am99BQ82HPQ-KF61Hu2jbR1Q1_3oSBMZeq5vJZm1Wlb3FpoljGsm4151M6M2knrOk0Tg0yzR2hL_RcHTEJSoQhTzVAddqPNf5A3wuRhwVaibUZs4w_ZVYw7QtxrTYmK4olkCenwvnWAx9LhpezEwzpmOyGwVoriZV0n8Pe4QcN_1BGpsZ",
  },
];

export const projects: Record<string, Project> = {
  "neural-sync-interface": {
    slug: "neural-sync-interface",
    title: "NEURAL SYNC INTERFACE",
    subtitle:
      "A distributed ecosystem for real-time cognitive synchronization and collaborative data architecture.",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9OPh8Q5Z4NonzxI8QEOayvmDawlb7JTeLPBvT8s9cxhIOzyCWDcCfR7rDIo5zb4JNfqyQqM35TT3lqklEnv0cVfE2TOXhA55YTJ-84s_7W-UpS7I6_Snyto29c_9zsKlXACqepWHf9uWqcUBRU-pFYrcb-GQy3NnmrY8wFCp-9n1xozYOQ78vSHI8r8HIVDsruTNF2-e0flkT06XugyTpiHg3oMUZ-XgmNLM3WHGJghD-NEqhR9bznnjqLi-kOGaqDTJnbkhBrIMg",
    about: [
      "Neural Sync Interface was developed as a solution for high-frequency data environments where cognitive load management is critical. By utilizing advanced heuristics, the platform prioritizes information flows based on user behavior and current operational contexts.",
      "The core philosophy was to create an invisible UI-one that recedes into the background until specifically required by the user. This approach ensures that the content remains the primary focus, supported by a framework of uncompromising reliability and speed.",
    ],
    stack: ["React", "TypeScript", "Rust", "Tailwind", "GraphQL"],
    detail: {
      featureCards,
      userFlow,
      decisions,
      challenges,
      galleryImages,
    },
  },
  "vanguard-identity": {
    slug: "vanguard-identity",
    title: "VANGUARD IDENTITY",
    subtitle:
      "A distributed ecosystem for real-time cognitive synchronization and collaborative data architecture.",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9OPh8Q5Z4NonzxI8QEOayvmDawlb7JTeLPBvT8s9cxhIOzyCWDcCfR7rDIo5zb4JNfqyQqM35TT3lqklEnv0cVfE2TOXhA55YTJ-84s_7W-UpS7I6_Snyto29c_9zsKlXACqepWHf9uWqcUBRU-pFYrcb-GQy3NnmrY8wFCp-9n1xozYOQ78vSHI8r8HIVDsruTNF2-e0flkT06XugyTpiHg3oMUZ-XgmNLM3WHGJghD-NEqhR9bznnjqLi-kOGaqDTJnbkhBrIMg",
    about: [
      "Neural Sync Interface was developed as a solution for high-frequency data environments where cognitive load management is critical. By utilizing advanced heuristics, the platform prioritizes information flows based on user behavior and current operational contexts.",
      "The core philosophy was to create an invisible UI-one that recedes into the background until specifically required by the user. This approach ensures that the content remains the primary focus, supported by a framework of uncompromising reliability and speed.",
    ],
    stack: ["React", "TypeScript", "Rust", "Tailwind", "GraphQL"],
    detail: {
      featureCards,
      userFlow,
      decisions,
      challenges,
      galleryImages,
    },
  },
};
