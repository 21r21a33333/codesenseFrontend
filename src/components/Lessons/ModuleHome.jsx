import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ModuleHome() {
  const { moduleId } = useParams();
  const courseData = useSelector((state) => state.course.course);
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
      {courseData.modules &&
        courseData.modules.map(
          (module) =>
            module._id === moduleId &&
            module.lessons.map((lesson) => (
              <div key={lesson._id} className="rounded-lg ">
                <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                  <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-blue-500 transition-all duration-300 group-hover:scale-[10]"></span>
                  <div className="relative z-10 mx-auto max-w-md">
                    <span className="grid h-20 w-20 place-items-center rounded-full bg-blue-500 transition-all duration-300 group-hover:bg-blue-400">
                      {lesson.problem_id ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="white"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="white"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                          />
                        </svg>
                      )}
                    </span>
                    <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                      <p>{lesson.lesson_title}</p>
                    </div>
                    <div className="pt-5 text-base font-semibold leading-7">
                      <p>
                        <Link
                          to={`${lesson._id}`}
                          className="text-blue-500 transition-all duration-300 group-hover:text-white"
                        >
                          Continue &rarr;
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
        )}
    </div>
  );
}

export default ModuleHome;
