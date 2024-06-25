import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CourseHome() {
  let course = useSelector((state) => state.course.course);
  // console.log(course);
  return (
    <>
    <div>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        { course.modules &&
          course.modules.map((module) => (
            <div key={module._id}className=" rounded-lg bg-gray-200">
          <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
            <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-blue-500 transition-all duration-300 group-hover:scale-[10]" />
            <div className="relative z-10 mx-auto max-w-md">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-blue-500 transition-all duration-300 group-hover:bg-blue-400">
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
                    d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
                  />
                </svg>
              </span>
              <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                <p>
                  {module.module_title}
                </p>
              </div>
              <div className="pt-5 text-base font-semibold leading-7">
                <p>
                  <Link
                    to={`${module._id}`}
                    className="text-blue-500 transition-all duration-300 group-hover:text-white"
                  >
                    Start Learning →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
          ))
        }
      </div>

    </div>
      
    </>
  );
}

export default CourseHome;
