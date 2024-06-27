import React from "react";
import Piechart from "./Piechart";
import TotalScoreGraph from "./TotalScoreGraph";
import Profile from "./Profile";
import Heatmap from "./Heatmap";
import jwtToken from "../../helper/jwtToken";
import { ClipLoader } from "react-spinners";
import env from "../../../env";
import axios from "axios";
import  { useEffect, useState } from "react";

 function Dashboard() {

  const [DashboardData, setData] = useState({});
  const [HeatMapData, SetHeatMapData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${env.SERVER_URL}/dashboard`, {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + jwtToken(),
          },
        });
        const sortedData = response.data;
        setData(sortedData);
        
      } catch (error) {
        console.log(error);
      }
    };
    const getHeatData = async () => {
      try {
        const response = await axios.get(`${env.SERVER_URL}/heatmap`, {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + jwtToken(),
          },
        });
        const sortedData = response.data.data;
        SetHeatMapData(sortedData);
        
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getHeatData();
    getData();
   
    
  }, []);


  // console.log(DashboardData);
  // console.log(HeatMapData);

  
  return (
    <>
    {loading ? (
      <div className="loading-container">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    ) : (
      <>
    <div className="my-4 px-16 ">
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 shadow">
        <div className="col-span-3">
          <Profile data={DashboardData}/>
        </div>

        <div className="bg-white  rounded-lg p-2 sm:p-2 xl:p-2  2xl:col-span-3 ">
          <h1 className="px-4 mb-2 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Performance Analysis
          </h1>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-4">
            <div className="bg-white shadow rounded-lg p-1 sm:p-2 xl:p-2 ">
              <Piechart data={HeatMapData}/>
            </div>

            <div className="bg-white shadow rounded-lg p-1 sm:p-2 xl:p-2 ">
              <TotalScoreGraph data={HeatMapData}/>
            </div>
          </div>
        </div>
      </div>
      <h1 className="px-4 mb-2 my-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Exercise</h1>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="my-4 bg-white shadow rounded-lg w-full flex justify-center ">
        <Heatmap data={HeatMapData}/>
      </div>
    </div>
</>)}
    </>
  );
}

export default Dashboard;
