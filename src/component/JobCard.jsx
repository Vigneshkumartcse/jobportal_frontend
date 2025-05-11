import React  from "react";
import { timeAgo } from "@/utils";
import person from "../assets/person.svg";
import company from "../assets/com.svg";
import Layers from "../assets/layers.svg";


const companyLogos = {
  // amazon: AmazonLogo,
  // tesla: TeslaLogo,
  // google: GoogleLogo,
  // swiggy: SwiggyLogo,
  // zoho: ZohoLogo,
  // tcs: TcsLogo,
  // ibm: IbmLogo,
};



const getCompanyLogo = (companyName) => {
  const key = companyName?.toLowerCase();
  const localLogo = companyLogos[key];
  const fallbackLogo = `https://logo.clearbit.com/${key}.com`;

  const isLocalSvg = Boolean(localLogo);

  return (
    <div
      className="relative"
      style={{
        width: '83.46428680419922px',
        height: '82px',
        borderRadius: '13.18px',
        borderWidth: '1px',
        position: 'relative',
      }}
    >
      {/* Gradient background with white border */}
      <div className="absolute inset-0 rounded-xl border border-white shadow z-0 bg-gradient-to-b from-white to-gray-100" />

      {/* Logo inside round circle */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center overflow-hidden ">
          <img
            src={isLocalSvg ? localLogo : fallbackLogo}
            alt={companyName}
            className="w-full h-full object-contain p-1 rounded-full"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
      </div>
    </div>
  );
};

const JobCard = ({ job }) => {





  const salaryFrom =
  (Number(job.salary_range_from) + Number(job.salary_range_to)) / 2 || 200000;
const salaryLPA = Math.ceil(salaryFrom / 100000);


  return (
    <div className="bg-white rounded-xl shadow-sm p-4 font-satoshi w-[316px] h-[360px]">
      <div className="flex justify-between items-start mb-5">
        <div>{getCompanyLogo(job.company_name)}</div>
        <div className="mt-1">
        <span className="bg-[#B0D9FF] text-black px-[10px] py-[7px] rounded-[10px] text-[14px] font-[500] leading-[100%] text-center w-[55px] h-[19px]">
          {timeAgo(job.created_time)}
        </span>

        </div>
       
      </div>

      <h3 className="font-bold text-[20px]  mb-3 text-left truncate">
        {job.job_title}
      </h3>

      <div className="flex items-center gap-7 text-[16px] mb-3 text-[#555555]">
        <div className="flex items-center gap-2">
          <img src={person} alt="experience" className="w-5 h-5 " />
          <span>{job.experience} yr Exp</span>
        </div>
        <div className="flex items-center gap-1">
          <img src={company} alt="work mode" className="w-4 h-4" />
          <span>{job.work_mode}</span>
        </div>
        <div className="flex items-center gap-1">
          <img src={Layers} alt="salary" className="w-4 h-4" />
          <span>{salaryLPA}LPA</span>
        </div>
      </div>

      <div className="text-gray-600 text-[14px] mb-4 h-20 text-start overflow-hidden">
  {job.job_desc ? (
    <>
      <div className="flex mb-1">
        <span className="mr-3">•</span>
        <p className="text-sm w-full overflow-hidden text-ellipsis max-h-[40px]">
          {job.job_desc.split(".")[0]}
        </p>
      </div>
      {job.job_desc.split(".")[1] && (
        <div className="flex">
          <span className="mr-3">•</span>
          <p className="text-sm w-full overflow-hidden text-ellipsis max-h-[40px]">
            {job.job_desc.split(".")[1]}
          </p>
        </div>
      )}
    </>
  ) : (
    <div className="flex">
      <span className="mr-2">•</span>
      <p className="text-sm w-full overflow-hidden text-ellipsis max-h-[40px]">
        No description provided.
      </p>
    </div>
  )}
</div>



      <button  className="w-full bg-[#00AAFF]  text-white py-2 rounded-lg font-medium transition duration-200">
        Apply Now
      </button>
     
    </div>
  );
};

export default JobCard;
