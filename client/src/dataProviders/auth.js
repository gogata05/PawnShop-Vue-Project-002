// client\src\dataProviders\auth.js
import axiosInstance from "../configs/axios";

export async function loginUser(userData, type) {
  try {
    const res = await axiosInstance.post(`/users/${type}`, userData);
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      console.log("Token saved:", res.data.token);
    }
    return res.data;
  } catch (error) {
    let backendError = error.response.data.error;
    return { error: backendError };
  }
}

export async function logoutUser() {
  try {
    localStorage.removeItem("token");
    const res = await axiosInstance.get("/users/logout");
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProfile() {
  try {
    const id = localStorage.getItem("id");
    console.log("Getting profile for ID:", id);
    const res = await axiosInstance.get(`/users/profile/${id}`);
    console.log("Profile response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error getting profile:", error);
    return null;
  }
}
