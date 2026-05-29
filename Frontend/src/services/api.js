import axios from "axios";

export const getStoredToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return "";
  }

  return token.replace(/^Bearer\s+/i, "").trim();
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
