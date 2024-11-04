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
    token: localStorage.getItem("token") || null,
    isLoading: false
  }),
  actions: {
    async getPersistedProfile() {
      console.log("Getting persisted profile");
      if (this.token) {
        this.isLoading = true;
        try {
          const profile = await getProfile();
          if (profile) {
            console.log("Retrieved profile:", profile);
            this.isAuthenticated = true;
            this.id = profile.id;
            this.email = profile.email;
            this.firstName = profile.firstName;
            this.lastName = profile.lastName;
            this.favoritesCount = profile.favorites?.length || 0;
          }
        } catch (error) {
          console.error("Error getting persisted profile:", error);
        } finally {
          this.isLoading = false;
        }
      }
    },
    async login(userData) {
      console.log("Starting login process with data:", userData);
      this.isLoading = true;
      
      try {
        this.isAuthenticated = true;
        this.id = userData.id;
        this.email = userData.email;
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        this.token = userData.token;
        
        localStorage.setItem("token", userData.token);
        localStorage.setItem("id", userData.id);

        // Immediately fetch fresh profile data
        const profile = await getProfile();
        console.log("Fresh profile data after login:", profile);
        
        if (profile) {
          this.email = profile.email;
          this.firstName = profile.firstName;
          this.lastName = profile.lastName;
          this.favoritesCount = profile.favorites?.length || 0;
        }
        
        console.log("Final user state after login:", this.$state);
      } catch (error) {
        console.error("Error during login process:", error);
      } finally {
        this.isLoading = false;
      }
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
