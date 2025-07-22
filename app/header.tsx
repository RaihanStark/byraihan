"use client";

import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="flex mb-5 md:mb-10 items-center">
        <Logo />

        <nav className="font-mono text-xs grow justify-end items-center flex gap-1 md:gap-3">
          <ThemeToggle />

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-1 md:gap-3">
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
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] rounded-sm p-2 transition-[background-color]"
            aria-label="Toggle menu"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden font-mono text-xs mb-5 -mt-2">
          <div className="flex flex-col gap-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
            <Link
              href="/blogs"
              onClick={closeMenu}
              className="hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] rounded-sm p-2 transition-[background-color]"
            >
              Blogs
            </Link>
            <Link
              href="/projects"
              onClick={closeMenu}
              className="hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] rounded-sm p-2 transition-[background-color]"
            >
              Projects
            </Link>
            <Link
              href="/certifications"
              onClick={closeMenu}
              className="hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] rounded-sm p-2 transition-[background-color]"
            >
              Certifications
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}