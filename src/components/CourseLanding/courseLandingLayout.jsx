import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseData } from "../../redux/Courseslice";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";
import env from "../../../env";
import jwtToken from "../../helper/jwtToken";
import {addProgress} from "../../redux/Courseslice";

const CoursePage = () => {
  let { courseid: courseId } = useParams();
  const dispatch = useDispatch();
  // side bar and content data
  const course = useSelector((state) => state.course.course);
  const status = useSelector((state) => state.course.status);
  const error = useSelector((state) => state.course.error);

  useEffect(() => {
    dispatch(fetchCourseData(courseId));
    // console.log("token:", jwtToken());
  }, [courseId, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="m-4 min-h-[calc(100vh-64px)]">
      <div className="flex h-full ">
        <Sidebar />
        <div className="no-scrollbar grow overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
