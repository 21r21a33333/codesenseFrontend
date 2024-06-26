import React, { useState, useEffect } from "react";
import axios from "axios";
import env from "../../../env";
import Cookies from "js-cookie";
import CourseCard from "./CourseCard";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

const YourComponent = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const jwtToken = Cookies.get("jwtToken");
      try {
        const config = {
          method: "get",
          url: env.SERVER_URL + "/user/courses",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        };

        const response = await axios(config);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        alert("Error fetching courses");
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  return (
    <div className="px-16 flex flex-col items-center justify-center h-screen">
      {loading ? (
        <div className="loading-container">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <>
        <div className="justify-between w-full ">
        <div className="text-right">
              <Link
                to="availablecourses"
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Enroll in a course
              </Link>
            </div>
          </div>
          <div className=" justify-between items-center w-full">
            <div className="text-center">
              <h2 className="mb-4 mt-2 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Courses
              </h2>
            </div>
            
          </div>

          {courses.length === 0 ? (
            <p className="text-xl text-gray-600 mt-4">
              You are not enrolled in any course.
            </p>
          ) : (
            <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
              {courses.map((course) => (
                <CourseCard key={course.courseid} course={course} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default YourComponent;
