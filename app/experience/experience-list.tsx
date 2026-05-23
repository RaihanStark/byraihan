"use client";

import { useMemo } from "react";
import Image from "next/image";
import type { Experience } from "../get-experience";

function formatMonthYear(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function formatDuration(start: string, end: string | null) {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();
  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (years === 0) return `${rem} mo`;
  if (rem === 0) return `${years} yr`;
  return `${years} yr ${rem} mo`;
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
    <ul className="divide-y divide-gray-200 dark:divide-gray-800">
      {sorted.map(item => {
        const isCurrent = item.endDate === null;
        return (
          <li key={item.id} className="py-6 first:pt-0 last:pb-0">
            <div className="flex items-start gap-4">
              <div className="relative w-11 h-11 shrink-0 rounded-md bg-gray-100 dark:bg-gray-800 overflow-hidden flex items-center justify-center">
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt={`${item.company} logo`}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                ) : (
                  <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                    {item.company.charAt(0)}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-base font-semibold dark:text-gray-100">
                  {item.role}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.company}
                  {item.type ? ` · ${item.type}` : ""}
                </p>

                <p className="mt-1 text-xs font-mono text-gray-500 dark:text-gray-500">
                  {formatMonthYear(item.startDate)} —{" "}
                  {isCurrent ? "Present" : formatMonthYear(item.endDate!)}
                  {"  ·  "}
                  {formatDuration(item.startDate, item.endDate)}
                  {item.location ? `  ·  ${item.location}` : ""}
                </p>

                {item.description && (
                  <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {item.technologies && item.technologies.length > 0 && (
                  <p className="mt-3 text-xs font-mono text-gray-500 dark:text-gray-500">
                    {item.technologies.join(" · ")}
                  </p>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
