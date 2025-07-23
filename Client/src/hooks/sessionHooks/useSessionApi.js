import axios from "axios";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// שליפת הסשנים
export const fetchSessionsApi = async () => {
  const res = await axios.get("http://localhost:3001/api/sessions", {
    headers: getAuthHeaders(),
  });
  return res.data;
};

// יצירת סשן חדש
export const createSessionApi = async () => {
  const res = await axios.post(
    "http://localhost:3001/api/sessions",
    { name: "New Jam Session" },
    { headers: getAuthHeaders() }
  );
  return res.data;
};

// הצטרפות לסשן
export const joinSessionApi = async (sessionId) => {
  await axios.post(
    `http://localhost:3001/api/sessions/${sessionId}/join`,
    {},
    { headers: getAuthHeaders() }
  );
};

// התחלת סשן (admin בלבד)
export const startSessionApi = async (sessionId) => {
  await axios.post(
    `http://localhost:3001/api/sessions/${sessionId}/start`,
    {},
    { headers: getAuthHeaders() }
  );
};
