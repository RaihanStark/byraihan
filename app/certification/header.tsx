import Image from "next/image";
import certifications from "../certifications.json";

interface CertificationHeaderProps {
  certificationId: string;
}

export function CertificationHeader({ certificationId }: CertificationHeaderProps) {
  const certification = certifications.find(cert => cert.id === certificationId);

  if (!certification) {
    return null;
  }

  return (
    <>
      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
        <span>{certification.issuer}</span>
        <span>•</span>
        <span>
          {new Date(certification.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      <div className="relative w-full mb-8">
        <Image
          src={certification.image}
          alt="Certification Badge"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 mb-8">
        <h2 className="font-medium text-lg mb-4">Certification Details</h2>
        <dl className="space-y-3">
          <div>
            <dt className="text-sm text-gray-600 dark:text-gray-400">
              Credential ID
            </dt>
            <dd className="font-mono text-sm">{certification.credentialId}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-600 dark:text-gray-400">
              Verification
            </dt>
            <dd>
              <a
                href={certification.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Verify credential →
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <div className="mb-8">
        <h2 className="font-medium text-lg mb-4">Skills Covered</h2>
        <div className="flex flex-wrap gap-2">
          {certification.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}