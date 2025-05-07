import React, { useState, useEffect } from 'react';

function JobForm({ onJobCreated }) {
  const [formData, setFormData] = useState({
    job_title: '',
    company_name: '',
    location: '',
    job_type: '',
    salary_range_from: '',
    salary_range_to: '',
    application_deadline: '',
    job_desc: '',
    created_time: new Date().toISOString(),
    experience: '',      // Added
    work_mode: '',       // Added
   
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const locations = ["Chennai", "Bangalore", "Hyderabad", "Mumbai", "Delhi", "Pune", "Coimbatore"];
  const jobTypes = ["FullTime", "PartTime", "Contract", "Internship"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('https://jobportal-9fsf.onrender.com/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit job posting');
      }

      setSuccess(true);
      localStorage.removeItem('jobDraft');
      setFormData({
        job_title: '',
        company_name: '',
        location: '',
        job_type: '',
        salary_range_from: '',
        salary_range_to: '',
        application_deadline: '',
        job_desc: '',
        experience: '',      // Reset
        work_mode: '',       // Reset
        created_time: new Date().toISOString(),
      });
      if (onJobCreated) onJobCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem('jobDraft', JSON.stringify(formData));
    alert('Draft saved!');
  };

  useEffect(() => {
    const savedDraft = localStorage.getItem('jobDraft');
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow" style={{ borderRadius: 16 }}>
      <h2 className="text-2xl font-bold text-center mb-8">Create Job Opening</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Job Title */}
          <div>
            <label className="block text-sm text-left text-gray-400 font-medium mb-1" htmlFor="job_title">Job Title</label>
            <input
              type="text"
              id="job_title"
              name="job_title"
              placeholder="Full Stack Developer"
              value={formData.job_title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-black"
            />
          </div>
          {/* Company Name */}
          <div>
            <label className="block text-sm text-left text-gray-400 font-medium mb-1" htmlFor="company_name">Company Name</label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              placeholder="Amazon, Microsoft, Swiggy"
              value={formData.company_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-black"
            />
          </div>
          {/* Location */}
          <div>
            <label className="block text-sm text-left text-gray-400 font-medium mb-1" htmlFor="location">Location</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formData.location ? "text-black" : "text-gray-400"}`}
            >
              <option value="">Choose Preferred Location</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          {/* Job Type */}
          <div>
            <label className="block text-sm text-left text-gray-400 font-medium mb-1" htmlFor="job_type">Job Type</label>
            <select
              id="job_type"
              name="job_type"
              value={formData.job_type}
              onChange={handleChange}
              required
              className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formData.job_type ? "text-black" : "text-gray-400"}`}
            >
              <option value="">Job Type</option>
              {jobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          {/* Salary Range */}
          <div>
            <label className="block text-sm text-left text-gray-400 font-medium mb-1" htmlFor="salary_range_from">Salary Range</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                id="salary_range_from"
                name="salary_range_from"
                placeholder="₹ 0"
                value={formData.salary_range_from}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-black"
              />
              <input
                type="text"
                id="salary_range_to"
                name="salary_range_to"
                placeholder="₹ 12,00,000"
                value={formData.salary_range_to}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-black"
              />
            </div>
          </div>
          {/* Application Deadline */}
          <div>
            <label className="block text-sm text-left text-gray-400 font-medium mb-1" htmlFor="application_deadline">Application Deadline</label>
            <input
              type="date"
              id="application_deadline"
              name="application_deadline"
              value={formData.application_deadline}
              onChange={handleChange}
              required
              className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formData.application_deadline ? "text-black" : "text-gray-400"}`}
            />
          </div>
        </div>

        {/* Experience and Work Mode in a single line */}
        <div className="flex gap-6 mb-6">
          {/* Experience */}
          <div className="flex-1">
            <label className="block text-sm text-left text-gray-400 font-medium mb-1" htmlFor="experience">Experience (years)</label>
            <input
              type="number"
              id="experience"
              name="experience"
              placeholder="e.g. 2"
              value={formData.experience}
              onChange={handleChange}
              min="0"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-black"
            />
          </div>
          {/* Work Mode */}
          <div className="flex-1">
            <label className="block text-sm text-left text-gray-400 font-medium mb-1" htmlFor="work_mode">Work Mode</label>
            <select
              id="work_mode"
              name="work_mode"
              value={formData.work_mode}
              onChange={handleChange}
              required
              className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formData.work_mode ? "text-black" : "text-gray-400"}`}
            >
              <option value="">Select Work Mode</option>
              <option value="Onsite">Onsite</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* Job Description */}
        <div className="mb-6">
          <label className="block text-sm text-left text-gray-400 font-medium mb-1" htmlFor="job_desc">Job Description</label>
          <textarea
            id="job_desc"
            name="job_desc"
            placeholder="Please share a description to let the candidate know more about the job role"
            value={formData.job_desc}
            onChange={handleChange}
            rows="4"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-black"
          ></textarea>
        </div>
        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">Job posted successfully!</div>}
        {/* Buttons */}
        <div className="flex justify-between gap-4 mt-8">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="flex items-center bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-100 transition duration-200 font-medium"
          >
            Save Draft
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center bg-blue-500 text-white px-8 py-3 rounded hover:bg-blue-600 transition duration-200 font-medium"
          >
            {loading ? 'Publishing...' : (
              <>
                Publish
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default JobForm;
