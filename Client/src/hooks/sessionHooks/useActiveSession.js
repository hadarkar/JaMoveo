// src/hooks/useActiveSession.js

import { useState, useEffect } from "react";
import { fetchActiveSessionApi } from "./useSessionApi";

/**
 * Hook לטעינת הסשן היחיד (singleton), אם קיים
 */
export const useActiveSession = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    fetchActiveSessionApi()
      .then((data) => setSession(data))
      .catch((err) => {
        if (err.response?.status === 404) {
          setSession(null);
        } else {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { session, loading, error };
};
