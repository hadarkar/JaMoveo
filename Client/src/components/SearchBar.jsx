import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSessionsApi } from "../hooks/sessionHooks/useSessionApi";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    try {
      const sessions = await fetchSessionsApi();
      if (sessions.length === 0) {
        alert("⚠️ No active session found. Please create one.");
        return;
      }

      navigate(`/results?q=${encodeURIComponent(trimmed)}`);
      setQuery("");
    } catch (err) {
      console.error("Error checking sessions:", err);
      alert("🚨 Something went wrong while checking for sessions. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by song or artist..."
        className="flex-grow px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/90 backdrop-blur-sm placeholder-gray-500"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-6 py-2 rounded-xl hover:scale-105 transition-transform duration-300 shadow-md"
      >
        🔍 Search
      </button>
    </form>
  );
};

export default SearchBar;
