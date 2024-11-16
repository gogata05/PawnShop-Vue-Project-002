<!-- client/src/views/PageSuccess.vue (нов файл) -->
<template>
  <div class="success-container">
    <div class="success-content">
      <i class="fas fa-check-circle success-icon"></i>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <button @click="goHome" class="home-button">
        <i class="fas fa-home"></i>
        Return to Home
      </button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useCartStore } from "../store/cartStore";
import { onMounted } from "vue";

export default {
  setup() {
    const router = useRouter();
    const cartStore = useCartStore();

    onMounted(() => {
      console.log("Clearing cart after successful payment");
      cartStore.clearCart();
    });

    const goHome = () => {
      console.log("Navigating to home page");
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
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.success-content {
  text-align: center;
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.success-icon {
  font-size: 4rem;
  color: #4CAF50;
  margin-bottom: 20px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 2rem;
}

p {
  color: #666;
  margin-bottom: 30px;
  font-size: 1.1rem;
}

.home-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s;
}

.home-button:hover {
  background-color: #45a049;
}

@media (max-width: 480px) {
  .success-content {
    padding: 30px 20px;
  }

  .success-icon {
    font-size: 3rem;
  }

  h1 {
    font-size: 1.5rem;
  }
}
</style>
