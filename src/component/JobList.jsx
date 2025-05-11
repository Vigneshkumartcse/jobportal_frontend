import React from 'react';
import JobCard from './JobCard';

function JobList({ jobs = [] }) {
  return (
    <div className="container mx-auto px-15 py-6">
      <div className="flex flex-wrap justify-start ps-8 gap-x-5 gap-6">
    {jobs.length > 0 ? (
      jobs.map((job) => (
        <JobCard key={job.job_id} job={job} />
      ))
    ) : (
      <div className="col-span-full mx-auto text-center text-gray-500 py-10">
        No jobs found for the selected filters.
      </div>
    )}
  </div>
  </div>
  
  );
}

export default JobList;
