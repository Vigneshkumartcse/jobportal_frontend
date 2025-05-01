import React from "react";
import CompanyAvatar from "./ComapanyAvator"; 
import { timeAgo } from "@/utils"; 
import person from "../assets/person.svg"; 
import company from "../assets/com.svg"; 
import  Layers  from "../assets/layers.svg";

const getCompanyLogo = (companyName) => {
  return companyName === "Amazon"
    ? (
      <img
        src="https://logo.clearbit.com/amazon.com"
        alt={companyName}
        className="w-12 h-12 rounded-full object-cover"
        onError={e => e.target.style.display = 'none'}
      />
    )
    : <CompanyAvatar companyName={companyName} />;
};

const JobCard = ({ job }) => {
  const salaryFrom = (Number(job.salary_range_from) + Number(job.salary_range_to)) / 2 || 200000;
  const salaryLPA = Math.round(salaryFrom / 100000);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          {getCompanyLogo(job.company_name)}
        </div>
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
          {timeAgo(job.created_time)}
        </span>
      </div>

      <h3 className="font-bold text-lg mb-2">{job.job_title.substring(0,20)}</h3>

      <div className="flex flex-wrap gap-4 text-sm mb-3 mt-5 justify-between">
        <div className="flex">
        <img src={person } alt="experience" className="w-4 h-5" />
          <span> {job.experience} yr Exp</span>
        </div>
        <div className="flex">
        <img src={company } alt="experience" className="w-4 h-5" />
          <span>{job.work_mode}</span>
        </div>
        <div className="flex">
        <img src={Layers } alt="experience" className="w-4 h-5"/>
          <span>{salaryLPA} LPA</span>
        </div>
      </div>

      <p className="text-gray-600 mt-6 h-15 text-sm mb-4">
        {job.job_desc
          ? `${job.job_desc.substring(0, 60)}...`
          : "No description provided."}
      </p>

      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition duration-200">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
