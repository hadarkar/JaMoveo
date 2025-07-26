import { useState, useCallback } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useSongSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (q) => {
    setLoading(true);
    setError(null);
    try {
      const resp = await axios.get(`${API_URL}/api/search/tracks`, {
        params: { q },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      let data = resp.data;

      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch (e) {
          console.warn("Could not JSON-parse response, using raw data", e);
        }
      }

      if (!Array.isArray(data)) {
        throw new Error("Invalid response format: expected an array");
      }

      setResults(data);
    } catch (err) {
      console.error("❌ useSongSearch error:", err);
      setError(err.response?.data?.message || err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, error, search };
};
