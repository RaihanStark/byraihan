import projectsData from "./projects.json";

export type Project = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  image: string;
  date: string;
  tags: string[];
  link?: string;
  demo?: string;
  technologies?: string[];
  client?: string;
  hasCustomPage?: boolean;
  featured?: boolean;
};

export const getProjects = async () => {
  const projects = projectsData.projects;
  return projects;
};