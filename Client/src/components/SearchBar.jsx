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
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type song or artist"
        className="border p-2 flex-grow"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
