// client\src\store\userStore.js
import { defineStore } from "pinia";
import { getProfile } from "../dataProviders/auth";

export const useUserStore = defineStore("user", {
  state: () => {
    // Initialize state from localStorage immediately
    const token = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("userEmail") || "";
    const savedFirstName = localStorage.getItem("userFirstName") || "";
    const savedLastName = localStorage.getItem("userLastName") || "";
    
    return {
      isAuthenticated: !!token,
      id: localStorage.getItem("id") || null,
      email: savedEmail,
      firstName: savedFirstName,
      lastName: savedLastName,
      favoritesCount: parseInt(localStorage.getItem("favoritesCount") || "0"),
      token: token,
      isLoading: false
    };
  },
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
            
            // Save to localStorage
            localStorage.setItem("userEmail", profile.email);
            localStorage.setItem("userFirstName", profile.firstName);
            localStorage.setItem("userLastName", profile.lastName);
            localStorage.setItem("favoritesCount", profile.favorites?.length || 0);
          }
        } catch (error) {
          console.error("Error getting persisted profile:", error);
          this.logout(); // Logout on error
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
      
      // Clear all localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("favoriteProducts");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userFirstName");
      localStorage.removeItem("userLastName");
      localStorage.removeItem("favoritesCount");
    }
  }
});
