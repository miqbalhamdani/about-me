import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCta } from "@/components/project/project-cta";
import { ProjectFeatures } from "@/components/project/project-features";
import { ProjectAboutSidebar } from "@/components/project/project-about-sidebar";
import { ProjectUserFlow } from "@/components/project/project-user-flow";
import { ProjectOverviewImage } from "@/components/project/project-overview-image";
import { ProjectHero } from "@/components/project/project-hero";
import { ProjectTechnicalDetails } from "@/components/project/project-technical-details";
import { ProjectGallery } from "@/components/project/project-gallery";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export const revalidate = 86400;

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjects().then((allProjects) => allProjects.map((project) => ({ slug: project.slug })));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const projectPath = `/projects/${project.slug}`;
  const image = {
    url: project.coverImage,
    width: 3158,
    height: 1942,
    alt: project.coverAlt,
  };

  return {
    title: project.title,
    description: project.subtitle,
    alternates: {
      canonical: projectPath,
    },
    openGraph: {
      type: "website",
      url: projectPath,
      siteName: siteConfig.name,
      title: `${project.title} | ${siteConfig.name}`,
      description: project.subtitle,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${siteConfig.name}`,
      description: project.subtitle,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mt-32 font-body-md text-body-md antialiased">
      <ProjectHero title={project.title} subtitle={project.subtitle} />
      <ProjectOverviewImage heroAlt={project.coverAlt} heroImage={project.heroImage} />
      <ProjectAboutSidebar about={project.about} stack={project.stack} demoUrl={project.demoUrl} repoUrl={project.repoUrl} />
      <ProjectFeatures featureCards={project.detail.featureCards} />
      <ProjectUserFlow userFlow={project.detail.userFlow} />
      <ProjectTechnicalDetails decisions={project.detail.decisions} challenges={project.detail.challenges} />
      <ProjectGallery galleryImages={project.detail.galleryImages} />
      <ProjectCta />
    </main>
  );
}
