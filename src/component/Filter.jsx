import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { MapPin, Search, User } from "lucide-react";

function Filter({ jobs, onFilter }) {
  const [salary, setSalary] = useState([0, 3000000]);
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Start filtering from the full jobs list every time
    let filtered = [...jobs];

    // Filter by salary average
    if (salary[0] !== 0 || salary[1] !== 3000000) {
      filtered = filtered.filter((job) => {
        const from = Number(job.salary_range_from);
        const to = Number(job.salary_range_to);
        const average = (from + to) / 2;
        return average >= salary[0] && average <= salary[1];
      });
    }

    // Filter by job type
    if (jobType) {
      filtered = filtered.filter(
        (job) => job.job_type.toLowerCase() === jobType.toLowerCase()
      );
    }

    // Filter by location
    if (location) {
      filtered = filtered.filter(
        (job) => job.location.toLowerCase() === location.toLowerCase()
      );
    }

    // Filter by job title search
    if (search) {
      filtered = filtered.filter((job) =>
        job.job_title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply the filtered data
    onFilter(filtered);
  }, [salary, jobType, location, search, jobs, onFilter]);

  const formatSalary = (value) => `₹${Math.round(value / 1000)}k`;

  return (
    <div className="bg-white p-6 w-full mb-8 border-b border-gray-200 shadow-[0px_10px_5px_-8px_rgba(198,191,191,0.25)] rounded-[20px]">
      <div className="flex flex-wrap gap-20 justify-between items-start w-full">
        
        {/* Search Input */}
        <div className="flex-1 pl-5 pr-6 border-r border-gray-200 relative">
          <Input
            icon={<Search className="w-5 h-4 text-gray-400" />}
            placeholder="Search By Job Title, Role"
            className="w-full text-[16px] text-[#686868]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Location Select with toggle */}
        <div className="flex-1 pr-6 border-r border-gray-200 relative">
          <MapPin className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500 w-[18px] h-[18px]" />
          <Select
            value={location}
            onValueChange={(value) => {
              if (value === location) {
                setLocation("");
                console.log("Cleared location");
              } else {
                setLocation(value);
                console.log(`Selected location: ${value}`);
              }
            }}
          >
            <SelectTrigger className="w-full pl-8 text-[16px] text-[#686868]">
              <SelectValue placeholder="Preferred Location" />
            </SelectTrigger>
            <SelectContent>
              {[
                "Chennai",
                "Hyderabad",
                "Coimbatore",
                "Bangalore",
                "Delhi",
                "Mumbai",
                "Pune",
              ].map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Job Type Select with toggle */}
        <div className="flex-1 pr-15 border-r border-gray-200 relative">
          <User className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500 w-[18px] h-[18px]" />
          <Select
            value={jobType}
            onValueChange={(value) => {
              if (value === jobType) {
                setJobType("");
                console.log("Cleared job type");
              } else {
                setJobType(value);
                console.log(`Selected job type: ${value}`);
              }
            }}
          >
            <SelectTrigger className="w-full pl-8 text-[16px] text-[#686868]">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              {["Full-time", "Part-time", "Contract"].map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Salary Slider */}
        <div className="flex-1 pr-5">
          <div className="flex justify-between mb-2">
            <span className="text-[16px] font-medium text-black">
              Salary Per Month
            </span>
            <span className="text-[16px] font-medium text-black">
              {formatSalary(salary[0])} - {formatSalary(salary[1])}
            </span>
          </div>
          <Slider
            min={0}
            max={3000000}
            step={10000}
            value={salary}
            onValueChange={setSalary}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Filter;
