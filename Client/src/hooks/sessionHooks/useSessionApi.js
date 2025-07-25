import axios from "axios";
const API = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// שליפת הסשנים
export const fetchSessionsApi = async () => {
  const res = await axios.get(`${API}/api/sessions`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

// יצירת סשן חדש
export const createSessionApi = async () => {
  const res = await axios.post(
    `${API}/api/sessions`,
    { name: "New Jam Session" },
    { headers: getAuthHeaders() }
  );
  return res.data;
};

// הצטרפות לסשן
export const joinSessionApi = async (sessionId) => {
  await axios.post(
    `${API}/api/sessions/${sessionId}/join`,
    {},
    { headers: getAuthHeaders() }
  );
};

// התחלת סשן (admin בלבד)
export const startSessionApi = async (sessionId) => {
  await axios.post(
    `${API}/api/sessions/${sessionId}/start`,
    {},
    { headers: getAuthHeaders() }
  );
};
