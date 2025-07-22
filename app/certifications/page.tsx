import { getCertifications } from "../get-certifications";
import { getOngoingCourses } from "../get-ongoing-courses";
import { CertificationsList } from "./certifications-list";
import { OngoingCourses } from "./ongoing-courses";

export const metadata = {
  title: "Certifications",
  description: "Professional certifications and credentials earned by Raihan Yudo Saputra",
};

export const revalidate = 60;

export default async function CertificationsPage() {
  const [certifications, ongoingCourses] = await Promise.all([
    getCertifications(),
    getOngoingCourses(),
  ]);

  return (
    <>
      <h1 className="font-medium text-2xl mb-8 tracking-tight">
        Certifications
      </h1>
      <OngoingCourses courses={ongoingCourses} />
      <CertificationsList certifications={certifications} />
    </>
  );
}