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
    // Only try to get profile if we're not on the server error page
    if (window.location.pathname !== "/server-error") {
      const userStore = useUserStore();
      await userStore.getPersistedProfile();
      console.log("App initialized, user state:", userStore.$state);
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
