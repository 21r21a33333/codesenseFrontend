import React from "react";
import Piechart from "./Piechart";
import TotalScoreGraph from "./TotalScoreGraph";
import Profile from "./Profile";
import Heatmap from "./Heatmap";

function Dashboard() {
  return (
    <div className="my-4 px-16 ">
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 shadow">
        <div className="col-span-3">
          <Profile />
        </div>

        <div className="bg-white  rounded-lg p-2 sm:p-2 xl:p-2  2xl:col-span-3 ">
          <h1 className="px-4 mb-2 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Performance Analysis
          </h1>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-4">
            <div className="bg-white shadow rounded-lg p-1 sm:p-2 xl:p-2 ">
              <Piechart />
            </div>

            <div className="bg-white shadow rounded-lg p-1 sm:p-2 xl:p-2 ">
              <TotalScoreGraph />
            </div>
          </div>
        </div>
      </div>
      <h1 className="px-4 mb-2 my-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Exercise</h1>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="my-4 bg-white shadow rounded-lg w-full flex justify-center ">
        <Heatmap />
      </div>
    </div>
  );
}

export default Dashboard;
