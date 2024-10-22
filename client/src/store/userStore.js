// client\src\store\userStore.js
import { defineStore } from "pinia";
import { getProfile } from "../dataProviders/auth";

export const useUserStore = defineStore("user", {
  state: () => ({
    isAuthenticated: false,
    id: null,
    email: "",
    firstName: "",
    lastName: ""
  }),
  actions: {
    async getPersistedProfile() {
      const id = localStorage.getItem("id");
      if (id) {
        try {
          const profile = await getProfile();
          this.isAuthenticated = true;
          this.id = id;
          this.email = profile.email;
          this.firstName = profile.firstName;
          this.lastName = profile.lastName;
        } catch (error) {
          console.error("Failed to load persisted profile:", error);
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
      console.log("User logged in:", this.id, this.email, this.firstName, this.lastName);
      localStorage.setItem("id", userData.id);
    },
    logout() {
      this.isAuthenticated = false;
      this.id = null;
      this.email = "";
      this.firstName = "";
      this.lastName = "";
      localStorage.removeItem("id");
    }
  }
});
