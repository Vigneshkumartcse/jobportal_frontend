import React, { useState, useEffect } from "react";
import Header from "./component/Header";
import Filter from "./component/Filter";
import JobForm from "./component/JobForm";
import JobList from "./component/JobList";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await fetch("https://jobportal-9fsf.onrender.com/api/jobs");
      const data = await res.json();
      setJobs(data);
      setFilteredJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleJobCreated = () => {
    handleCloseForm();
    fetchJobs();
  };

  return (
    <div className="relative font-sans">
      <Header onCreateJob={handleOpenForm} />
      <div className="mt-10" />
      <Filter jobs={jobs} onFilter={setFilteredJobs} />
      <div className="mt-10" />
      {loading ? (
        <div className="text-center py-10">Loading jobs...</div>
      ) : (
        <JobList jobs={filteredJobs} />
      )}


      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)] backdrop-blur-sm">
          <div className="relative w-[90%] md:w-[60%] bg-white rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseForm}
              className="absolute top-4 right-5 text-2xl text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
            
            <JobForm onJobCreated={handleJobCreated} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
