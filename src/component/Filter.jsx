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

function Filter({ jobs, onFilter }) {
  const [salary, setSalary] = useState([0, 3000000]); 
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let filtered = [...jobs];


    if (salary[0] !== 0 || salary[1] !== 3000000) {
      filtered = filtered.filter(
        (job) =>
          Number(job.salary_range_from) >= salary[0] &&
          Number(job.salary_range_to) <= salary[1]
      );
    }


    if (jobType) {
      filtered = filtered.filter(
        (job) => job.job_type.toLowerCase() === jobType.toLowerCase()
      );
    }


    if (location) {
      filtered = filtered.filter(
        (job) => job.location.toLowerCase() === location.toLowerCase()
      );
    }

    if (search) {
      filtered = filtered.filter((job) =>
        job.job_title.toLowerCase().includes(search.toLowerCase())
      );
    }

    onFilter(filtered);
  }, [salary, jobType, location, search, jobs, onFilter]);

  return (
    <div className="bg-white p-6 rounded-lg  shadow  mb-8">
      <div className="flex  gap-6 justify-between items-center">
        <Input
          placeholder="Search By Job Title, Role"
          className="w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select value={jobType} onValueChange={setJobType}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Job type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Part-time">Part-time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
          </SelectContent>
        </Select>

        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Chennai">Chennai</SelectItem>
            <SelectItem value="Hyderabad">Hyderabad</SelectItem>
            <SelectItem value="Coimbatore">Coimbatore</SelectItem>
            <SelectItem value="Bangalore">Bangalore</SelectItem>
            <SelectItem value="Delhi">Delhi</SelectItem>
            <SelectItem value="Mumbai">Mumbai</SelectItem>
            <SelectItem value="Pune">Pune</SelectItem>
          </SelectContent>
        </Select>

        <div className="w-64 space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            Salary Range: ₹{Math.round(salary[0]/100000)}LPA - ₹{Math.round(salary[1]/100000)}LPA
          </div>
          <Slider
            min={0}
            max={3000000}
            step={100000}
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
