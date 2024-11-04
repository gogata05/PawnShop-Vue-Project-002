// client\src\dataProviders\auth.js
import axiosInstance from "../configs/axios";

export async function loginUser(userData, type) {
  try {
    console.log("Attempting login with:", type);
    const res = await axiosInstance.post(`/users/${type}`, userData);
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      console.log("Token saved:", res.data.token);
      
      // Immediately fetch profile after login
      const profile = await getProfile();
      console.log("Profile fetched after login:", profile);
      return { ...res.data, profile };
    }
    return res.data;
  } catch (error) {
    console.log("Login error:", error);
    if (error.response?.status === 500 || !error.response) {
      // window.location.href = "/server-error";
      return;
    }
    let backendError = error.response?.data?.error;
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
    
    if (!id) {
      console.log("No ID found in localStorage");
      return null;
    }

    const res = await axiosInstance.get(`/users/profile/${id}`);
    console.log("Profile response:", res.data);
    
    if (!res.data) {
      console.log("No profile data received");
      return null;
    }

    return res.data;
  } catch (error) {
    console.error("Error getting profile:", error);
    return null;
  }
}
