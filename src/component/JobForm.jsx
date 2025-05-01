import React, { useState } from 'react';

function JobForm({ onJobCreated }) {
  const [formData, setFormData] = useState({
    job_title: '',
    company_name: '',
    location: '',
    job_type: 'Full-time',
    salary_range_from: '',
    salary_range_to: '',
    application_deadline: '',
    job_desc: '',
    created_time: new Date().toISOString(), 
    experience: '',
    work_mode: 'Onsite'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const locations = ["Chennai", "Bangalore", "Hyderabad", "Mumbai", "Delhi", "Pune", "Coimbatore"];
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
  const workModes = ["Onsite", "Remote", "Hybrid"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to: ${value}`); 
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    console.log("Submitting form data:", formData);

    try {
      const response = await fetch('http://localhost:3000/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit job posting');
      }

      const data = await response.json();
      setSuccess(true);
      if (onJobCreated) onJobCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Create Job Opening</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
          <div>
            <label className="block text-sm text-gray-400 font-medium mb-1" htmlFor="job_title">Job Title</label>
            <input
              type="text"
              id="job_title"
              name="job_title"
              placeholder="Full Stack Developer"
              value={formData.job_title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

    
          <div>
            <label className="block text-sm text-gray-400 font-medium mb-1" htmlFor="company_name">Company Name</label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              placeholder="Amazon, Microsoft, Swiggy"
              value={formData.company_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

     
          <div>
            <label className="block text-sm text-gray-400 font-medium mb-1" htmlFor="location">Location</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose Preferred Location</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

  
          <div>
            <label className="block text-sm text-gray-400 font-medium mb-1" htmlFor="job_type">Job Type</label>
            <select
              id="job_type"
              name="job_type"
              value={formData.job_type}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {jobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>


          <div>
            <label className="block text-sm text-gray-400 font-medium mb-1" htmlFor="salary_range_from">Salary Range</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                id="salary_range_from"
                name="salary_range_from"
                placeholder="₹"
                value={formData.salary_range_from}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                id="salary_range_to"
                name="salary_range_to"
                placeholder="₹12,00,000"
                value={formData.salary_range_to}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>


          <div>
            <label className="block text-sm text-gray-400 font-medium mb-1" htmlFor="application_deadline">Application Deadline</label>
            <input
              type="date"
              id="application_deadline"
              name="application_deadline"
              value={formData.application_deadline}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

 
          <div>
            <label className="block text-sm text-gray-400 font-medium mb-1" htmlFor="experience">Experience Required</label>
            <input
              type="text"
              id="experience"
              name="experience"
              placeholder="2 years"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 font-medium mb-1" htmlFor="work_mode">Work Mode</label>
            <select
              id="work_mode"
              name="work_mode"
              value={formData.work_mode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {workModes.map(mode => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </div>
        </div>


        <div className="mb-6">
          <label className="block text-sm text-gray-400 font-medium mb-1" htmlFor="job_desc">Job Description</label>
          <textarea
            id="job_desc"
            name="job_desc"
            placeholder="Please share a description to let the candidate know more about the job role"
            value={formData.job_desc}
            onChange={handleChange}
            rows="6"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>


        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">Job posted successfully!</div>}


        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-200"
          >
            {loading ? 'Publishing...' : 'Publish →'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default JobForm;
