import Link from "next/link";
import Image from "next/image";

export default function CertificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="max-w-2xl mx-auto">
      <Link
        href="/certifications"
        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-4 inline-block"
      >
        ← Back to certifications
      </Link>

      {children}
    </article>
  );
}