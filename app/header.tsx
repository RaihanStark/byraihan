import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex mb-5 md:mb-10 items-center">
      <Logo />

      <nav className="font-mono text-xs grow justify-end items-center flex gap-1 md:gap-3">
        <ThemeToggle />
        <Link
          href="/blogs"
          className="inline-flex hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] rounded-sm p-2 transition-[background-color]"
        >
          Blogs
        </Link>
        <Link
          href="/projects"
          className="inline-flex hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] rounded-sm p-2 transition-[background-color]"
        >
          Projects
        </Link>
        <Link
          href="/certifications"
          className="inline-flex hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] rounded-sm p-2 transition-[background-color]"
        >
          Certifications
        </Link>
      </nav>
    </header>
  );
}
