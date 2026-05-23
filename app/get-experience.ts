import experienceData from "./experience.json";

export type Experience = {
  id: string;
  role: string;
  company: string;
  logo?: string;
  location?: string;
  type?: string;
  startDate: string;
  endDate: string | null;
  description: string;
  highlights?: string[];
  technologies?: string[];
};

export const getExperience = async (): Promise<Experience[]> => {
  return experienceData.experience as Experience[];
};
