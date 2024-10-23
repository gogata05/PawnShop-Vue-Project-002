// client\src\configs\axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || "http://localhost:5000", // Use the environment variable for the base URL
  withCredentials: true // Added for sending cookies
});

export default axiosInstance;
