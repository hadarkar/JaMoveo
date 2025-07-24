// src/hooks/useSongSearch.js

import { useState, useCallback } from "react";
import axios from "axios";

/**
 * Hook לחיפוש שירים דרך /api/search/tracks?q=
 * ממיר מחרוזת JSON לאובייקט במקרה הצורך
 */
export const useSongSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const search = useCallback(async (q) => {
    setLoading(true);
    setError(null);
    try {
      const resp = await axios.get("/api/search/tracks", { params: { q } });
      let data = resp.data;

      // אם במקרה קיבלנו מחרוזת, ננסה לפרסס אותה
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch (e) {
          console.warn("Could not JSON-parse response, using raw data", e);
        }
      }

      // אם זה לא מערך, נזריק שגיאה
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format: expected an array");
      }

      setResults(data);
    } catch (err) {
      console.error("❌ useSongSearch error:", err);
      setError(err.response?.data?.message || err.message);
      setResults([]);  // שומרים תמיד מערך
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, error, search };
};
