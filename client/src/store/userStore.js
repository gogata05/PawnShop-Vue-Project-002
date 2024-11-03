// client\src\store\userStore.js
import { defineStore } from "pinia";
import { getProfile } from "../dataProviders/auth";

export const useUserStore = defineStore("user", {
  state: () => ({
    isAuthenticated: false,
    id: null,
    email: "",
    firstName: "",
    lastName: "",
    favoritesCount: 0,
    token: localStorage.getItem("token") || null
  }),
  actions: {
    async getPersistedProfile() {
      console.log("Getting persisted profile...");
      const id = localStorage.getItem("id");
      if (id) {
        try {
          const profile = await getProfile();
          console.log("Profile loaded:", profile);
          if (profile) {
            this.isAuthenticated = true;
            this.id = id;
            this.email = profile.email;
            this.firstName = profile.firstName;
            this.lastName = profile.lastName;
            this.favoritesCount = profile.favorites?.length || 0;
          }
        } catch (error) {
          console.error("Failed to load profile:", error);
          this.logout();
        }
      }
    },
    login(userData) {
      this.isAuthenticated = true;
      this.id = userData.id;
      this.email = userData.email;
      this.firstName = userData.firstName;
      this.lastName = userData.lastName;
      this.token = userData.token;
      localStorage.setItem("token", userData.token);
      localStorage.setItem("id", userData.id);
    },
    logout() {
      this.isAuthenticated = false;
      this.id = null;
      this.email = "";
      this.firstName = "";
      this.lastName = "";
      this.favoritesCount = 0;
      this.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("favoriteProducts");
    }
  }
});
