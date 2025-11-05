import React, { useState } from 'react';
import Navbar from './Nav';

import Display from './Display.jsx';
import axios from "axios";
import Usingapp from './Usingapp.jsx';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `https://job-service-backend.onrender.com/api/providers?search=${searchQuery}`
      );

      setProviders(res.data);
    } catch (err) {
      setError("Failed to fetch providers");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="w-full min-h-screen bg-[url('/assets/bg-clear.png')] bg-cover bg-center relative flex flex-col overflow-x-hidden"
     style={{ backgroundColor: "var(--color-green)" }}>
  
  
  <hr className="w-full border-t border-white/30" />

  <main className="flex flex-col lg:flex-row items-center justify-between w-full px-6 lg:px-20 mt-10 gap-10">
    <div className="flex-1 flex flex-col items-start gap-6 text-white">

      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
        Welcome to Job Service Provider!
      </h1>

      <p className="text-lg md:text-xl max-w-md">
        Work with talented people at the most affordable price.
      </p>

      <form className="w-full mt-6 max-w-3xl" onSubmit={handleSearchSubmit}>
        <div className="flex flex-col md:flex-row mb-5 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <input
            type="text"
            placeholder="Search for services (eg: electrician , plumber....."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-6 py-4 text-black placeholder-gray-400 focus:outline-none rounded-t-2xl md:rounded-none"
          />

          <button
            type="submit"
            className="px-6 py-4 bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors rounded-b-2xl md:rounded-none"
          >
            Search
          </button>
        </div>
      </form>

    </div>

    <div className="hidden lg:flex relative w-1/2 justify-end items-end gap-4">
      <img src="/assets/construction-field.webp" className="w-52 h-80 object-cover rounded-lg shadow-lg -translate-y-6 z-10" />
      <img src="/assets/woman-in-field.jpg" className="w-56 h-96 object-cover rounded-lg shadow-2xl" />
    </div>
  </main>

  {/* ✅ Display search result cards here */}
  <Display providers={providers} loading={loading} error={error} searchQuery={searchQuery} />

  {/* Work section stays below */}
  
</div>
  );
};

export default Header;
