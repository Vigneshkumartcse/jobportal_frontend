import React from 'react';
import JobCard from './JobCard';

function JobList({ jobs = [] }) {
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <JobCard key={job.job_id} job={job} />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500 py-10">
          No jobs found for the selected filters.
        </div>
      )}
    </div>
  );
}

export default JobList;
