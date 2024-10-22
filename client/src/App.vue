<!-- client\src\App.vue -->
<script>
import PageFooter from "./components/PageFooter.vue";
import PageHeader from "./components/PageHeader.vue";

export default {
  components: {
    PageFooter,
    PageHeader
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
