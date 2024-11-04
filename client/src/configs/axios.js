// client\src\configs\axios.js
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.log("Axios error:", error);
    if (error.response?.status === 500 || !error.response) {
      console.log("Server error detected");
      if (window.location.pathname !== "/server-error") {
        console.log("Redirecting to server error page...");
        // window.location.href = "/server-error";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
