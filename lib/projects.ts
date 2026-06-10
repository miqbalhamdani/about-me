import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import type { Project, ProjectSummary } from "@/lib/content-types";

const projectsDirectory = path.join(process.cwd(), "data", "projects");

async function readProjectFile(fileName: string): Promise<Project> {
  const filePath = path.join(projectsDirectory, fileName);
  const raw = await fs.readFile(filePath, "utf-8");

  return JSON.parse(raw) as Project;
}

export async function getAllProjects(): Promise<Project[]> {
  const entries = await fs.readdir(projectsDirectory);
  const projectFiles = entries.filter((entry) => entry.endsWith(".json"));
  const projects = await Promise.all(projectFiles.map((fileName) => readProjectFile(fileName)));

  return projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    return await readProjectFile(`${slug}.json`);
  } catch {
    return null;
  }
}

export async function getProjectSummariesInOrder(order: string[]): Promise<ProjectSummary[]> {
  const projects = await getAllProjects();
  const bySlug = new Map(projects.map((project) => [project.slug, project]));

  return order
    .map((slug) => bySlug.get(slug))
    .filter((project): project is Project => Boolean(project))
    .map((project) => ({
      slug: project.slug,
      imageAlt: project.coverAlt,
      imageSrc: project.coverImage,
      tags: project.summaryTags,
      title: project.title,
      description: project.subtitle,
    }));
}
