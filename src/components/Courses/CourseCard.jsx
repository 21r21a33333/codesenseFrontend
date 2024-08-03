import React from "react";
import { Link } from "react-router-dom";
function CourseCard(props) {
  let { course } = props;
  return (
    <Link to={`${course.courseid}`}>
      <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
        <div className="relative">
          <img
            className="w-full rounded-xl"
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Colors"
          />
          <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
            FREE
          </p>
        </div>
        <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer h-24">
          {course.title}
        </h1>

        <div className="my-4 flex justify-between">
          <div className="flex  ">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600 mb-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </span>
            <p>{course.modules_count + " Mobules"}</p>
          </div>
          <div className="flex  ">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600 mb-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </span>
            <p>{course.courseid}</p>
          </div>
        </div>
        {/* <div
          className="flex w-full h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700 mb-2"
          role="progressbar"
          aria-valuenow={100}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="flex flex-col justify-center rounded-full overflow-hidden bg-yellow-300 text-xs text-white text-center whitespace-nowrap dark:bg-yellow-500 transition duration-500"
            style={{ width: "75%" }}
          >
            75%
          </div>
        </div> */}

        <button className="mt-4 mb-2 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">
          Continue Course
        </button>
      </div>
    </Link>
  );
}

export default CourseCard;
