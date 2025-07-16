"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Suspense } from "react";

type SortSetting = ["date", "desc" | "asc"];

export function Posts({ posts: initialPosts }) {
  const [sort, setSort] = useState<SortSetting>(["date", "desc"]);
  const posts = initialPosts;

  function sortDate() {
    setSort(sort => [
      "date",
      sort[1] === "asc" ? "desc" : "asc",
    ]);
  }

  return (
    <Suspense fallback={null}>
      <main className="max-w-2xl font-mono m-auto mb-10 text-sm">
        <header className="text-gray-500 dark:text-gray-600 flex items-center text-xs">
          <button
            onClick={sortDate}
            className={`w-24 h-9 text-left  ${
              sort[1] !== "desc"
                ? "text-gray-700 dark:text-gray-400"
                : ""
            }`}
          >
            date
            {sort[1] === "asc" && "↑"}
          </button>
          <span className="grow pl-2">title</span>
        </header>

        <List posts={posts} sort={sort} />
      </main>
    </Suspense>
  );
}

function List({ posts, sort }) {
  const sortedPosts = useMemo(() => {
    const [, sortDirection] = sort;
    return [...posts].sort((a, b) => {
      return sortDirection === "desc"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }, [posts, sort]);

  return (
    <ul>
      {sortedPosts.map((post, i: number) => {
        const date = getDate(post.date);
        const firstOfDate =
          !sortedPosts[i - 1] || getDate(sortedPosts[i - 1].date) !== date;
        const lastOfDate =
          !sortedPosts[i + 1] || getDate(sortedPosts[i + 1].date) !== date;

        return (
          <li key={post.id}>
            <Link href={`/post/${new Date(post.date).getFullYear()}/${post.id}`}>
              <span
                className={`flex transition-[background-color] hover:bg-gray-100 dark:hover:bg-[#242424] active:bg-gray-200 dark:active:bg-[#222] border-y border-gray-200 dark:border-[#313131]
                ${!firstOfDate ? "border-t-0" : ""}
                ${lastOfDate ? "border-b-0" : ""}
              `}
              >
                <span
                  className={`py-3 flex grow items-center ${
                    !firstOfDate ? "ml-20" : ""
                  }`}
                >
                  {firstOfDate && (
                    <span className="pr-5 inline-block self-start shrink-0 text-gray-500 dark:text-gray-500">
                      {date}
                    </span>
                  )}

                  <span className="grow dark:text-gray-100">{post.title}</span>
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function getDate(date: string) {
  return new Date(date).toISOString().split('T')[0];
}
