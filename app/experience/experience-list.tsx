"use client";

import { useMemo } from "react";
import Image from "next/image";
import type { Experience } from "../get-experience";

function formatMonthYear(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatDuration(start: string, end: string | null) {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();
  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) return `${remainingMonths} mo`;
  if (remainingMonths === 0) return `${years} yr`;
  return `${years} yr ${remainingMonths} mo`;
}

export function ExperienceList({ experience }: { experience: Experience[] }) {
  const sorted = useMemo(
    () =>
      [...experience].sort((a, b) => {
        const aTime = a.endDate ? new Date(a.endDate).getTime() : Infinity;
        const bTime = b.endDate ? new Date(b.endDate).getTime() : Infinity;
        if (aTime !== bTime) return bTime - aTime;
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      }),
    [experience]
  );

  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-800 ml-3 space-y-8">
      {sorted.map(item => {
        const isCurrent = item.endDate === null;
        return (
          <li key={item.id} className="ml-6">
            <span
              className={`absolute -left-1.5 flex h-3 w-3 items-center justify-center rounded-full ring-4 ring-white dark:ring-black ${
                isCurrent
                  ? "bg-green-500 animate-pulse"
                  : "bg-gray-400 dark:bg-gray-600"
              }`}
              aria-hidden="true"
            />
            <article className="p-4 border rounded-lg border-gray-200 dark:border-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="relative w-12 h-12 shrink-0 rounded-md bg-gray-100 dark:bg-gray-800 overflow-hidden flex items-center justify-center border border-gray-200 dark:border-gray-800">
                    {item.logo ? (
                      <Image
                        src={item.logo}
                        alt={`${item.company} logo`}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <span className="text-base font-bold text-gray-500 dark:text-gray-400">
                        {item.company.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold dark:text-gray-100">
                      {item.role}
                    </h2>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {item.company}
                      {item.type ? ` · ${item.type}` : ""}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 sm:text-right sm:shrink-0">
                  <div>
                    {formatMonthYear(item.startDate)} —{" "}
                    {isCurrent ? "Present" : formatMonthYear(item.endDate!)}
                  </div>
                  <div>
                    {formatDuration(item.startDate, item.endDate)}
                    {item.location ? ` · ${item.location}` : ""}
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {item.description}
              </p>

              {item.highlights && item.highlights.length > 0 && (
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-3 space-y-1">
                  {item.highlights.map(h => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}

              {item.technologies && item.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {item.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </li>
        );
      })}
    </ol>
  );
}
