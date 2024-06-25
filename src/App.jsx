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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />}>
            <Route index element={<LandingPage />} />
            <Route path="leaderboard" element={<p>leaderboard</p>} />
            <Route path="courses">
              <Route index element={<AllCourses />} />
              <Route
                path=":courseid"
                element={

                  <CourseLandingLayout/>
                }
              >
                <Route index element={<p>course details</p>} />
                <Route path=":lessonid" element={<p>lesson details</p>} />
              </Route>
            </Route>
            <Route path="jobs" element={<p>jobs</p>} />
            <Route path="contests" element={<p>contests</p>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
