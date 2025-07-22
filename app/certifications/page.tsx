import { getCertifications } from "../get-certifications";
import { CertificationsList } from "./certifications-list";

export const metadata = {
  title: "Certifications",
  description: "Professional certifications and credentials earned by Raihan Yudo Saputra",
};

export const revalidate = 60;

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <>
      <h1 className="font-medium text-2xl mb-8 tracking-tight">
        Certifications
      </h1>
      <CertificationsList certifications={certifications} />
    </>
  );
}