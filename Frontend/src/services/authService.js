import api from "./api";

export const registerUser = async (payload) => {
  const response = await api.post("/api/auth/register", payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await api.post("/api/auth/login", payload);
  return response.data;
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("/api/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateProfile = async (payload) => {
  const token = localStorage.getItem("token");
  const response = await api.put("/api/auth/profile", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
