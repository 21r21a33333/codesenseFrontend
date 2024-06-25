import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure axios is imported
import env from "../../../env";
import Cookies from "js-cookie";
import CourseCard from "./CourseCard";

const YourComponent = () => {
  const [courses, setCourses] = useState([]);

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
        //   alert("Courses fetched successfully");
      } catch (error) {
        console.error("Error fetching courses:", error);
        alert("Error fetching courses");
      }
    };

    fetchCourses();
  }, []); // Empty dependency array means this effect runs only once after initial render
  //   alert(JSON.stringify(courses));
  console.log(courses);
  return (
    <div>
      <h2 className="mb-8 mt-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Courses
      </h2>
      <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
      {courses.map((course) => (
        <CourseCard key={course.courseid} course={course} />
      ))}
      </div>
    </div>
  );
};

export default YourComponent;
