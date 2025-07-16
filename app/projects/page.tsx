import { Metadata } from "next";
import { getProjects } from "../get-projects";
import { ProjectsList } from "./projects-list";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of my projects and work",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="max-w-4xl font-mono m-auto mb-10">
      <h1 className="text-3xl font-bold mb-8 dark:text-gray-100">Projects</h1>
      <ProjectsList projects={projects} />
    </main>
  );
}