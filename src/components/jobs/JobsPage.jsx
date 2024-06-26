import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import "./jobpage.css"; 
import jwtToken from "../../helper/jwtToken";
import { ClipLoader } from "react-spinners";
import env from "../../../env";
import axios from "axios";

const Jobs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`${env.SERVER_URL}/jobs`, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + jwtToken(),
        },
      });
    //   console.log(response.data);
      const sortedData = response.data;
      setData(sortedData.jobs);
      
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="jobs-container">
    {loading ? (
        <div className="loading-container">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <>
      <div className="jobs-content">
        <h1 className="jobs-heading">Apply for Jobs</h1>
        <hr className="divider" />
        {data && data.length === 0 ? (
          <p className="no-jobs-text">No jobs available</p>
        ) : (
          <div className="jobs-list">
            {data.map((job) => (
              <JobCard key={job.jobUrl} jobDetails={job} />
            ))}
          </div>
        )}
      </div>
      </>
      )}
    </div>
  );
};

export default Jobs;