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
      
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Note:</strong> You can find more of my projects on my{" "}
          <a 
            href="https://github.com/RaihanStark" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            GitHub profile
          </a>
          . Some projects may not be listed here due to copyright restrictions or client confidentiality agreements.
        </p>
      </div>
    </main>
  );
}