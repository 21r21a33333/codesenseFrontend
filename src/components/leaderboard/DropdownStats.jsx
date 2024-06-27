import React from "react";
import { useEffect,useState } from "react";
import Piechart from "../dashboard/Piechart";
import TotalScoreGraph from "../dashboard/TotalScoreGraph";
;import axios from "axios";
import env from "../../../env";
import jwtToken from "../../helper/jwtToken";
function DropdownStats(props) {
    let {rollno}=props;
  const [HeatMapData, SetHeatMapData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getHeatData = async () => {
      try {
        const response = await axios.get(`${env.SERVER_URL}/heatmap/${rollno}`, {
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
  }, []);
  return (
    <div className="h-full w-full">
      {loading ? (
        <p>laoding</p>
      ) : (
        <div className="grid grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4 ">
          <div className="bg-white shadow rounded-lg p-1 sm:p-2 xl:p-2 ">
            <Piechart data={HeatMapData} />
          </div>

          <div className="bg-white shadow rounded-lg p-1 sm:p-2 xl:p-2 ">
            <TotalScoreGraph data={HeatMapData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownStats;
