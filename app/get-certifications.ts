import certifications from "./certifications.json";

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  year: string;
  credentialId: string;
  verificationUrl: string;
  description?: string;
  skills: string[];
  image: string;
  importance: number;
};

export async function getCertifications() {
  return certifications as Certification[];
}