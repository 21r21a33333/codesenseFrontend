import React, { useState, useEffect } from "react";
import axios from "axios";
import env from "../../../env";
import Cookies from "js-cookie";
import AvailaleCourseCard from "./AvailableCourseCard";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const YourComponent = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const jwtToken = Cookies.get("jwtToken");
      try {
        const config = {
          method: "get",
          url: env.SERVER_URL + "/available/courses",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        };

        const response = await axios(config);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching available courses:", error);
        alert("Error fetching available courses");
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
          <h2 className="mb-4 mt-2 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Available Courses
          </h2>

          {courses.length === 0 ? (
            <p className="text-xl text-gray-600 mt-4">
              You are enrolled in all available courses.
            </p>
          ) : (
            <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
              {courses.map((course) => (
                <AvailaleCourseCard key={course.courseid} course={course} />
              ))}
            </div>
          )}
        
          <Link
        to="/courses"
        className="inline-block px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 mt-6"
      >
        Back to Courses
      </Link>

        </>
      )}
    </div>
  );
};

export default YourComponent;
