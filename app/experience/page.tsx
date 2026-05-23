import { Metadata } from "next";
import { getExperience } from "../get-experience";
import { ExperienceList } from "./experience-list";

export const metadata: Metadata = {
  title: "Work Experience",
  description: "Work experience and roles held by Raihan Yudo Saputra",
};

export const revalidate = 60;

export default async function ExperiencePage() {
  const experience = await getExperience();

  return (
    <main className="max-w-4xl font-mono m-auto mb-10">
      <h1 className="text-3xl font-bold mb-8 dark:text-gray-100">
        Work Experience
      </h1>
      <ExperienceList experience={experience} />
    </main>
  );
}
