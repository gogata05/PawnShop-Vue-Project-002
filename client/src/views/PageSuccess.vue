<!-- client/src/views/PageSuccess.vue (нов файл) -->
<template>
  <div class="success-container">
    <h1>You have successfully purchased!</h1>
    <button @click="goHome">Go to Home Page</button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const goHome = () => {
      router.push({ name: "Home" });
    };

    return {
      goHome
    };
  }
};
</script>

<style scoped>
.success-container {
  text-align: center;
  padding: 100px 20px;
}

.success-container button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
