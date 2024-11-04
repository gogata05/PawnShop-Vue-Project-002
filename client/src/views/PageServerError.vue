<template>
  <div>
    <section id="serverError">
      <div class="serverError-container">
        <h1>Error 500 No Server Connection</h1>
        <h2>Please check your internet connection and try again.</h2>
        <div class="button-container">
          <button @click="retryConnection" class="btn-retry">Try again</button>
          <router-link to="/" class="btn-home">Return home</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "PageServerError",
  // Prevent automatic API calls when mounted
  beforeCreate() {
    // Stop all Pinia store subscriptions and watchers
    if (this.$pinia) {
      this.$pinia.state.value = {};
    }
  },
  methods: {
    retryConnection() {
      console.log("Manual retry attempt");
      window.location.reload();
    }
  }
};
</script>

<style scoped>
#serverError {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.65);
  position: relative;
}

.serverError-container {
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

h1 {
  font-family: Arial, Helvetica, sans-serif;
  margin: 30px 0 30px 0;
  font-size: 48px;
  font-weight: 700;
  color: #fff;
}

h2 {
  font-family: Arial, Helvetica, sans-serif;
  color: #eee;
  margin-bottom: 50px;
  font-size: 24px;
}

.button-container {
  display: flex;
  gap: 20px;
}

.btn-retry,
.btn-home {
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  padding: 8px 28px;
  border-radius: 50px;
  transition: 0.5s;
  border: 2px solid #fff;
  color: #fff;
  background: transparent;
  cursor: pointer;
}

.btn-retry:hover,
.btn-home:hover {
  background: #353caa;
  border: 2px solid #353caa;
}
</style>
