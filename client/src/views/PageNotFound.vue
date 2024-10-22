<!-- client\src\views\PageNotFound.vue -->
<script>
export default {
  created() {
    this.$router.push("/404");
  }
};
</script>

<template>
  <div>
    <section id="fourOfour">
      <div class="fourOfour-container">
        <h1>404</h1>
        <h2>It seems that the page you are looking for doesn't exist!</h2>
        <router-link to="/" class="btn-get-home"> Back to the homepage </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
#fourOfour {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.65);
  position: relative;
}

#fourOfour .fourOfour-container {
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
#fourOfour h1 {
  font-family: Arial, Helvetica, sans-serif;
  margin: 30px 0 30px 0;
  font-size: 100px;
  font-weight: 700;
  line-height: 56px;
  text-transform: uppercase;
  color: #fff;
}

#fourOfour h2 {
  font-family: Arial, Helvetica, sans-serif;
  color: #eee;
  margin-bottom: 50px;
  font-size: 30px;
}

#fourOfour .btn-get-home {
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  padding: 8px 28px;
  border-radius: 50px;
  transition: 0.5s;
  margin: 10px;
  border: 2px solid #fff;
  color: rgb(255, 255, 255);
}
#fourOfour .btn-get-home:hover {
  background: #353caa;
  border: 2px solid #353caa;
}
</style>
