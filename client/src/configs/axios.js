// client\src\configs\axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Заменете PORT с вашия порт
  withCredentials: true // Добавено за изпращане на бисквитките
});

export default axiosInstance;
