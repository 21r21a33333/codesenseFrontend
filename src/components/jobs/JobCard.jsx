import React from "react";
import { Link } from "react-router-dom";
import "./jobCardStyle.css";

const JobCard = (props) => {
  const { jobDetails } = props;
  const { position, company, location, agoTime, jobUrl, companyLogo } =
    jobDetails;

  return (
    <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 hover:scale-105 transition duration-500">
  <div className="relative  mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40 ">
    <img
      src={companyLogo}
      alt="card-image"
    />
  </div>
  <div className="p-6">
    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
    position :{" "+position}
    </h5>
    <h5 className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
      Company: {company}
    </h5>
    <h5 className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
      location: {location}
    </h5>
    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
    {(agoTime)?`Posted ${agoTime} `:"-"}
    </h5>
  </div>
  <div className="p-6 pt-0">
    <button
      className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
      type="button"
    >
    <Link to={jobUrl} target="_blank" rel="noopener noreferrer">Read More</Link>
      
    </button>
  </div>
</div>

  );
};

export default JobCard;
