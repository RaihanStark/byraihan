"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Certification } from "../get-certifications";

const sortCertifications = (
  certifications: Certification[],
  ascending: boolean
) => {
  return certifications.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

type CertificationsListProps = {
  certifications: Certification[];
};

export function CertificationsList({ certifications }: CertificationsListProps) {
  const [isAscending, setIsAscending] = useState(false);

  const sortedCertifications = useMemo(
    () => sortCertifications([...certifications], isAscending),
    [certifications, isAscending]
  );

  const toggleSort = () => {
    setIsAscending((prev) => !prev);
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {certifications.length} certification{certifications.length !== 1 ? "s" : ""}
        </span>
        <button
          onClick={toggleSort}
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          Sort by date {isAscending ? "↑" : "↓"}
        </button>
      </div>

      <div className="space-y-3">
        {sortedCertifications.map((cert) => (
          <Link
            key={cert.id}
            href={`/certification/${cert.year}/${cert.id}`}
            className="block group"
          >
            <div className="flex items-start gap-4 p-4 -mx-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 rounded-lg transition-colors">
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