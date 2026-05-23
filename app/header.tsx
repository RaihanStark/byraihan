"use client";

import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/blogs", label: "Blogs" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Work Experience" },
  { href: "/certifications", label: "Certifications" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <header className="flex mb-5 md:mb-10 items-center">
      <Logo />

      <nav className="font-mono text-xs grow justify-end items-center flex gap-1 md:gap-3">
        <ThemeToggle />

        <div ref={menuRef} className="relative">
          <button
            onClick={toggleMenu}
            className="inline-flex items-center hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] rounded-sm p-2 transition-[background-color]"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
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

          {isMenuOpen && (
            <>
              {/* Mobile backdrop */}
              <div
                className="sm:hidden fixed inset-0 bg-black/30 dark:bg-black/60 z-40 animate-[fadeIn_120ms_ease-out]"
                onClick={closeMenu}
                aria-hidden="true"
              />

              <div
                role="menu"
                className="
                  z-50 overflow-hidden bg-white dark:bg-[#0a0a0a]
                  border border-gray-200 dark:border-gray-800
                  shadow-xl ring-1 ring-black/5 dark:ring-white/5
                  animate-[fadeIn_120ms_ease-out]
                  fixed inset-x-3 top-[64px] rounded-xl
                  sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2
                  sm:w-60 sm:rounded-lg sm:origin-top-right
                "
              >
                <ul className="py-1.5">
                  {NAV_LINKS.map(link => {
                    const isActive =
                      pathname === link.href ||
                      (link.href !== "/" && pathname?.startsWith(link.href));
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          role="menuitem"
                          className={`flex items-center justify-between px-4 py-3 sm:py-2 text-sm transition-colors ${
                            isActive
                              ? "text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-[#1a1a1a]"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] hover:text-gray-900 dark:hover:text-gray-100"
                          }`}
                        >
                          <span>{link.label}</span>
                          {isActive && (
                            <span className="text-gray-400 dark:text-gray-600">
                              •
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
