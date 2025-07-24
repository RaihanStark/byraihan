"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { type Project } from "../get-projects";

type SortSetting = ["date", "desc" | "asc"];

export function ProjectsList({ projects }: { projects: Project[] }) {
  const [sort, setSort] = useState<SortSetting>(["date", "desc"]);

  function toggleSort() {
    setSort(sort => ["date", sort[1] === "asc" ? "desc" : "asc"]);
  }

  const { featuredProjects, regularProjects } = useMemo(() => {
    const [, sortDirection] = sort;
    const featured = projects.filter(p => p.featured);
    const regular = projects.filter(p => !p.featured);
    
    const sortFn = (a: Project, b: Project) => {
      return sortDirection === "desc"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime();
    };
    
    return {
      featuredProjects: featured.sort(sortFn),
      regularProjects: regular.sort(sortFn)
    };
  }, [projects, sort]);

  const ProjectCard = ({ project }: { project: Project }) => (
    <Link
      key={project.id}
      href={`/project/${project.id}`}
      className="group block"
    >
      <article className={`flex flex-col sm:flex-row gap-3 sm:gap-4 p-4 border rounded-lg transition-colors ${
        project.featured 
          ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 hover:border-blue-300 dark:hover:border-blue-700' 
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      }`}>
        <div className="w-full sm:w-32 h-48 sm:h-24 relative bg-gray-100 dark:bg-gray-800 rounded overflow-hidden flex-shrink-0">
          {project.thumbnail && project.thumbnail !== "" ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 128px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-16 sm:w-12 h-16 sm:h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h2 className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 dark:text-gray-100">
              {project.title}
            </h2>
            {project.featured && (
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded text-xs font-medium flex-shrink-0">
                Featured
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-gray-500 dark:text-gray-500">
            <time dateTime={project.date}>
              {new Date(project.date).toLocaleDateString()}
            </time>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );

  return (
    <>
      <div className="mb-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>Showing {projects.length} projects</span>
        <button
          onClick={toggleSort}
          className="hover:text-gray-700 dark:hover:text-gray-300"
        >
          Sort by date {sort[1] === "asc" ? "↑" : "↓"}
        </button>
      </div>

      {featuredProjects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Featured Projects</h2>
          <div className="space-y-4">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {regularProjects.length > 0 && (
        <div>
          {featuredProjects.length > 0 && (
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">All Projects</h2>
          )}
          <div className="space-y-4">
            {regularProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}