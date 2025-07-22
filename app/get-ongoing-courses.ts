import ongoingCourses from "./ongoing-courses.json";

export type OngoingCourse = {
  id: string;
  title: string;
  instructor: string;
  platform: string;
  progress: number;
  topics: string[];
};

export async function getOngoingCourses() {
  return ongoingCourses as OngoingCourse[];
}