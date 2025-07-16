import "./globals.css";

import { Inter } from "next/font/google";
import { themeEffect } from "./theme-effect";
import { Analytics } from "./analytics";
import { Header } from "./header";
import { Footer } from "./footer";
import { doge } from "./doge";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Raihan Yudo Saputra",
  description:
    "Raihan Yudo Saputra is a passionate software engineer with a strong focus on building scalable and efficient systems.",
  openGraph: {
    title: "Raihan Yudo Saputra",
    description:
      "Raihan Yudo Saputra is a passionate software engineer with a strong focus on building scalable and efficient systems.",
    url: "https://byraihan.com",
    siteName: "Raihan Yudo Saputra",
    images: ["/opengraph-image"],
  },
  metadataBase: new URL("https://byraihan.com"),
};

export const viewport = {
  themeColor: "transparent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.className} antialiased`}
      suppressHydrationWarning={true}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})();(${doge.toString()})();`,
          }}
        />
      </head>

      <body className="dark:text-gray-100 max-w-2xl m-auto">
        <main className="p-6 pt-3 md:pt-6 min-h-screen">
          <Header />
          {children}
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
