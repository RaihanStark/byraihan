"use client";

import type { OngoingCourse } from "../get-ongoing-courses";

type OngoingCoursesProps = {
  courses: OngoingCourse[];
};

export function OngoingCourses({ courses }: OngoingCoursesProps) {
  if (courses.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="font-medium text-xl mb-6 flex items-center gap-2">
        <span className="animate-pulse">📚</span>
        Ongoing Courses
      </h2>
      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {course.instructor} on {course.platform}
                </p>
              </div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {course.progress}%
              </span>
            </div>
            
            <div className="mb-3">
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                <div
                  className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {course.topics.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                >
                  {topic}
                </span>
              ))}
              {course.topics.length > 3 && (
                <span className="text-xs px-2 py-1 text-gray-500 dark:text-gray-500">
                  +{course.topics.length - 3} more
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}