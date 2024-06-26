import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import LandingPage from "./components/Homepage/LandingPage";
import AllCourses from "./components/Courses/AllCourses";
import { Outlet } from "react-router-dom";
import CourseLandingLayout from "./components/CourseLanding/courseLandingLayout";
import CourseHome from "./components/CourseLanding/CourseHome";
import ModuleHome from "./components/Lessons/ModuleHome";
import LessonPage from "./components/Lessons/LessonPage";
import LeaderBoard from "./components/leaderboard/LeaderBoard";
import ContestPage from "./components/Contest/ContestPage";
import Jobs from "./components/jobs/JobsPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />}>
            <Route index element={<LandingPage />} />
            <Route path="jobs" element={<Jobs/>} />
            <Route path="contests" element={<ContestPage/>} />
            <Route path="leaderboard" element={<LeaderBoard/>} />
            <Route path="courses">
              <Route index element={<AllCourses />} />
              <Route path=":courseid" element={<CourseLandingLayout />}>
                <Route index element={<CourseHome />} />
                <Route path=":moduleId"  >
                  <Route index element={<ModuleHome/>} />
                  <Route path=":lessonId" element={<LessonPage/>} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
