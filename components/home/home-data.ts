export const homeNavItems = [
  { href: "#about", label: "About" },
  { href: "#stack", label: "Tech Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

export const techStackRows = [
  {
    category: "Frontend",
    items: ["React.js", "TypeScript", "Next.js", "Tailwind CSS", "WebGPU"],
  },
  {
    category: "Backend",
    items: ["Node.js", "GoLang", "GraphQL", "Python"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "Redis", "Prisma"],
  },
  {
    category: "Cloud & Tools",
    items: ["AWS", "Docker", "Terraform", "Kubernetes"],
  },
];

export const experiences = [
  {
    company: "Stripe",
    role: "Staff Software Engineer",
    period: "2021 — PRESENT",
  },
  {
    company: "Vercel",
    role: "Senior Product Engineer",
    period: "2018 — 2021",
  },
  {
    company: "Airbnb",
    role: "Software Engineer II",
    period: "2015 — 2018",
  },
  {
    company: "Intercom",
    role: "Junior Full Stack Developer",
    period: "2012 — 2015",
  },
];

export const portfolioProjects = [
  {
    slug: "neural-sync-interface",
    imageAlt: "Nexus Dashboard",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAWa1TxYRSPcki7t69z6RiqTm-XbPgbA5lYyVRKFeyayJEvVPEJHrKBdP7OM-UMGHtZtTUSC7Q0wHbqOc40WHyj9GhmQ_ZGmWIyPU121tZJmeBpRabhme9GWiVaG51rB2GZZbGE208wlL12yKZxS2nvWHXSAv4OhGf7wOHDajSOZ5xSxN_ZxwqGWDe6df2-gl46oa4eLBgOz8XPXG9jo3lj7WSeKcZ3Xk3aD0XuIWEWOmRFpq2tAG5ahwR9JDDPaFNFKoZUhQcvbK0V",
    tags: ["React", "WebGPU", "Node"],
    title: "Nexus Analytics Platform",
    description:
      "A real-time data visualization engine processing billions of events daily with sub-millisecond latency.",
  },
  {
    slug: "vanguard-identity",
    imageAlt: "Vanguard App",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDp5x-eD4haEU2vKqH5IlaYe0guSI27Jc7kktmpdFG1LQkmXumAvluBq8KWl82hVBre8JmgjJH2yx5z9pOc14bK5Vp1kJkZm6fAibAZ5XiKFGk3Md6EG6Kq1HV12kpxN02DPAyGf9_iBw5zd2EBxjuSY6-ezdc3HCMLs8bu0svmkOkRDT-w_pYYQhuiVLA2qZuAqs8HoffJiZRUrTzXMl3F1PYDLXGzpvdQZdYT_uQY6-_rxWsQ3x__NLMDfGEUMyyq92wg8OB6vkWt",
    tags: ["Next.js", "Postgres", "Tailwind"],
    title: "Vanguard Identity",
    description:
      "Redefining digital security with a zero-trust authentication framework designed for enterprise scale.",
  },
];
