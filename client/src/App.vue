<!-- client\src\App.vue -->
<script>
import PageFooter from "./components/PageFooter.vue";
import PageHeader from "./components/PageHeader.vue";
import { useUserStore } from "./store/userStore";

export default {
  components: {
    PageFooter,
    PageHeader
  },
  async created() {
    if (window.location.pathname !== "/server-error") {
      const userStore = useUserStore();
      
      // Check if we have a token first
      const token = localStorage.getItem("token");
      if (token) {
        console.log("Token found, initializing user state");
        // Set initial state from localStorage
        userStore.isAuthenticated = true;
        userStore.email = localStorage.getItem("userEmail") || "";
        
        // Then fetch fresh data
        await userStore.getPersistedProfile();
      }
    }
  }
};
</script>

<template>
  <div id="app">
    <PageHeader />
    <main class="content">
      <router-view />
    </main>
    <PageFooter />
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}
</style>
