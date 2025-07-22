"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Certification } from "../get-certifications";

const getImportanceBadge = (importance: number) => {
  switch (importance) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return "🏅";
  }
};

const sortCertifications = (
  certifications: Certification[],
  sortBy: "importance" | "date",
  ascending: boolean
) => {
  return certifications.sort((a, b) => {
    if (sortBy === "importance") {
      return ascending ? a.importance - b.importance : b.importance - a.importance;
    } else {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return ascending ? dateA - dateB : dateB - dateA;
    }
  });
};

type CertificationsListProps = {
  certifications: Certification[];
};

export function CertificationsList({ certifications }: CertificationsListProps) {
  const [sortBy, setSortBy] = useState<"importance" | "date">("importance");
  const [isAscending, setIsAscending] = useState(true);

  const sortedCertifications = useMemo(
    () => sortCertifications([...certifications], sortBy, isAscending),
    [certifications, sortBy, isAscending]
  );

  const toggleSort = () => {
    setIsAscending((prev) => !prev);
  };

  const changeSortBy = (newSortBy: "importance" | "date") => {
    if (newSortBy === sortBy) {
      toggleSort();
    } else {
      setSortBy(newSortBy);
      setIsAscending(newSortBy === "importance");
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {certifications.length} certification{certifications.length !== 1 ? "s" : ""}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => changeSortBy("importance")}
            className={`text-sm px-2 py-1 rounded transition-colors ${
              sortBy === "importance"
                ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            }`}
          >
            Importance {sortBy === "importance" && (isAscending ? "↑" : "↓")}
          </button>
          <button
            onClick={() => changeSortBy("date")}
            className={`text-sm px-2 py-1 rounded transition-colors ${
              sortBy === "date"
                ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            }`}
          >
            Date {sortBy === "date" && (isAscending ? "↑" : "↓")}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {sortedCertifications.map((cert) => (
          <Link
            key={cert.id}
            href={`/certification/${cert.year}/${cert.id}`}
            className="block group"
          >
            <div className="flex items-start gap-4 p-4 -mx-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 rounded-lg transition-colors">
              <div className="text-2xl" aria-label={`Importance rank ${cert.importance}`}>
                {getImportanceBadge(cert.importance)}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {cert.issuer}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="text-xs px-2 py-1 text-gray-500 dark:text-gray-500">
                      +{cert.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">
                {new Date(cert.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}