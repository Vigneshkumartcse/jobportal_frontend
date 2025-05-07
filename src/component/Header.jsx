import React from "react";
import logo from "../assets/cyber.png";


const Header = ({ onCreateJob }) => (
  <header className="flex items-center justify-between bg-white px-8 py-4 rounded-[30px] h-[80px] shadow-[0px_0px_20px_0px_#7F7F7F26] gap-10">
    {/* Logo */}
    <div className="flex-shrink-0">
      <img
        src={logo}
        alt="Logo"
        className="w-10 h-10 rounded"
      />
    </div>

    {/* Navigation */}
    <nav className="flex flex-grow justify-center items-center gap-10">
      <a href="#" className="py-1 rounded font-medium text-gray-700">Home</a>
      <a href="#" className="text-gray-700 font-medium hover:text-blue-600">Find Jobs</a>
      <a href="#" className="text-gray-700 font-medium hover:text-blue-600">Find Talents</a>
      <a href="#" className="text-gray-700 font-medium hover:text-blue-600">About us</a>
      <a href="#" className="text-gray-700 font-medium hover:text-blue-600">Testimonials</a>
    </nav>

    {/* Button */}
    <div className="flex-shrink-0">
      <button
        className="bg-gradient-to-b from-purple-400 to-purple-800 hover:from-purple-500 hover:to-purple-900 text-white font-semibold px-5 py-2 rounded-full shadow"
        onClick={onCreateJob}
      >
        Create Job
      </button>
    </div>
  </header>
);

export default Header;
