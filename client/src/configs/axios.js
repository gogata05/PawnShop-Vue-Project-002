// client\src\configs\axios.js
import axios from "axios";

const axiosInstance = axios.create({
  // Заменяме process.env с директен достъп до VUE_APP променливата
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000",
  withCredentials: true
});

export default axiosInstance;
