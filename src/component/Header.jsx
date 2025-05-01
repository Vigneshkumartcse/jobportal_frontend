import React from "react";
import logosvg from "../assets/logosvg.svg";

const Header = ({ onCreateJob }) => (
  <header className="flex items-center justify-between bg-white px-8 py-4 shadow-md rounded-[30px] ">
    <div className="flex items-center ">
      <img
        src={logosvg}
        alt="Logo"
        className="w-10 h-10 rounded"
      />
    </div>
    <nav className="flex items-center gap-8">
      <a href="#" className=" py-1 rounded font-medium text-yellow-800">Home</a>
      <a href="#" className="text-gray-700 font-medium hover:text-blue-600">Find Jobs</a>
      <a href="#" className="text-gray-700 font-medium hover:text-blue-600">Find Talents</a>
      <a href="#" className="text-gray-700 font-medium hover:text-blue-600">About us</a>
      <a href="#" className="text-gray-700 font-medium hover:text-blue-600">Testimonials</a>
    </nav>
    <button
      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2 rounded-full shadow"
      onClick={onCreateJob}
    >
      Create Job
    </button>
  </header>
);

export default Header;
