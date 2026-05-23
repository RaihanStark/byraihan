import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPosts } from "./get-posts";
import { getProjects } from "./get-projects";
import { getCertifications } from "./get-certifications";
import { getExperience } from "./get-experience";

export const metadata: Metadata = {
  title: "Raihan Yudo Saputra",
  description:
    "Raihan Yudo Saputra is a passionate software engineer with a strong focus on building scalable and efficient systems.",
};

export const revalidate = 60;

export default async function Home() {
  const [posts, projects, certifications, experience] = await Promise.all([
    getPosts(),
    getProjects(),
    getCertifications(),
    getExperience(),
  ]);

  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const recentExperience = [...experience]
    .sort((a, b) => {
      const aTime = a.endDate ? new Date(a.endDate).getTime() : Infinity;
      const bTime = b.endDate ? new Date(b.endDate).getTime() : Infinity;
      if (aTime !== bTime) return bTime - aTime;
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    })
    .slice(0, 3);

  const recentCertifications = [...certifications]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <>
      <section className="mb-10">
        <Image
          src="/images/avatar.png"
          alt="Raihan Yudo Saputra"
          className="rounded-full block mt-2 mb-5 mx-auto sm:float-right sm:ml-5 sm:mb-5"
          unoptimized
          width={160}
          height={160}
          priority
        />

        <h1 className="text-2xl font-bold mb-3 dark:text-gray-100">
          Hey, I&apos;m Raihan 👋
        </h1>

        <p className="mb-4">
          I&apos;m a passionate software engineer with many years of curiosity
          about programming and developing useful things. My interest in
          programming began back in 2010 when I was 9 years old.
        </p>

        <Link
          href="/about"
          className="text-sm underline text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        >
          Read more →
        </Link>

        <div className="clear-both" />
      </section>

      <section className="mb-8">
        <div className="flex items-baseline justify-between mb-2">
          <h2 className="font-bold dark:text-gray-100">Recent blogs</h2>
          <Link
            href="/blogs"
            className="text-xs font-mono text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
          >
            all →
          </Link>
        </div>
        <ul>
          {recentPosts.map(post => (
            <li key={post.id}>
              <Link
                href={`/post/${new Date(post.date).getFullYear()}/${post.id}`}
                className="flex justify-between gap-4 py-1.5 hover:underline"
              >
                <span className="text-sm dark:text-gray-100">{post.title}</span>
                <time className="text-xs font-mono text-gray-500 shrink-0">
                  {post.date}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <div className="flex items-baseline justify-between mb-2">
          <h2 className="font-bold dark:text-gray-100">Recent projects</h2>
          <Link
            href="/projects"
            className="text-xs font-mono text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
          >
            all →
          </Link>
        </div>
        <ul>
          {recentProjects.map(project => (
            <li key={project.id}>
              <Link
                href={`/project/${project.id}`}
                className="flex items-start gap-4 py-2 group"
              >
                <div className="relative w-32 aspect-video shrink-0 rounded-md bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  {project.thumbnail ? (
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  ) : null}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium dark:text-gray-100 group-hover:underline truncate">
                      {project.title}
                    </span>
                    <time className="text-xs font-mono text-gray-500 shrink-0">
                      {new Date(project.date).getFullYear()}
                    </time>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <div className="flex items-baseline justify-between mb-2">
          <h2 className="font-bold dark:text-gray-100">Recent work experience</h2>
          <Link
            href="/experience"
            className="text-xs font-mono text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
          >
            all →
          </Link>
        </div>
        <ul className="space-y-4">
          {recentExperience.map(item => (
            <li key={item.id} className="flex items-start gap-3">
              <div className="relative w-10 h-10 shrink-0 rounded-md bg-gray-100 dark:bg-gray-800 overflow-hidden flex items-center justify-center">
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt={`${item.company} logo`}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                ) : (
                  <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                    {item.company.charAt(0)}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm dark:text-gray-100">
                    {item.role}{" "}
                    <span className="text-gray-500">@ {item.company}</span>
                  </span>
                  <span className="text-xs font-mono text-gray-500 shrink-0">
                    {new Date(item.startDate).getFullYear()} —{" "}
                    {item.endDate ? new Date(item.endDate).getFullYear() : "now"}
                  </span>
                </div>
                {(item.location || item.type) && (
                  <p className="text-xs font-mono text-gray-500 mt-0.5">
                    {[item.location, item.type].filter(Boolean).join(" · ")}
                  </p>
                )}
                {item.description && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <div className="flex items-baseline justify-between mb-2">
          <h2 className="font-bold dark:text-gray-100">Recent certifications</h2>
          <Link
            href="/certifications"
            className="text-xs font-mono text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
          >
            all →
          </Link>
        </div>
        <ul>
          {recentCertifications.map(cert => (
            <li
              key={cert.id}
              className="flex justify-between gap-4 py-1.5"
            >
              <span className="text-sm dark:text-gray-100">
                {cert.title}{" "}
                <span className="text-gray-500">— {cert.issuer}</span>
              </span>
              <time className="text-xs font-mono text-gray-500 shrink-0">
                {cert.year}
              </time>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
