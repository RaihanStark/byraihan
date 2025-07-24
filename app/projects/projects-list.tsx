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

  const sortedProjects = useMemo(() => {
    const [, sortDirection] = sort;
    return [...projects].sort((a, b) => {
      return sortDirection === "desc"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }, [projects, sort]);

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

      <div className="space-y-4">
        {sortedProjects.map((project) => (
          <Link
            key={project.id}
            href={`/project/${project.id}`}
            className="group block"
          >
            <article className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
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
                <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 dark:text-gray-100">
                  {project.title}
                </h2>
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
        ))}
      </div>
    </>
  );
}