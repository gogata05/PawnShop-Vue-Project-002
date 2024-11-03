<!-- client\src\views\PageFavorites.vue -->
<template>
  <div class="favorites-container">
    <h1>My Favorites</h1>
    <div v-if="isLoading">
      <Loader />
    </div>
    <div v-else-if="favorites.length === 0" class="no-favorites">
      <h2>You haven't added any products to favorites yet.</h2>
    </div>
    <div v-else class="favorites-grid">
      <div v-for="product in favorites" :key="product._id" class="favorite-item">
        <div class="product-image">
          <img :src="product.imgUrl" :alt="product.brand + ' ' + product.model" />
        </div>
        <div class="product-info">
          <h3>{{ product.brand }} {{ product.model }}</h3>
          <p class="price">{{ product.price }} EURO</p>
          <div class="action-buttons">
            <button class="cart-btn" @click="addToCart(product)"><font-awesome-icon icon="shopping-cart" /> Add to Cart</button>
            <button class="delete-btn" @click="removeFromFavorites(product._id)"><font-awesome-icon icon="trash" /> Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useUserStore } from "../store/userStore";
import { useCartStore } from "../store/cartStore";
import { useToast } from "vue-toastification";
import Loader from "../components/Loader.vue";
import { getProfile } from "../dataProviders/auth";
import axiosInstance from "../configs/axios";

export default {
  name: "PageFavorites",
  components: { Loader },
  setup() {
    const favorites = ref([]);
    const isLoading = ref(true);
    const userStore = useUserStore();
    const cartStore = useCartStore();
    const toast = useToast();

    const loadFavorites = async () => {
      try {
        console.log("Loading favorites...");
        isLoading.value = true;
        const profile = await getProfile();
        console.log("Profile loaded:", profile);
        
        if (profile) {
          favorites.value = profile.favorites || [];
          userStore.favoritesCount = favorites.value.length;
          console.log("Updated favorites:", favorites.value);
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const addToCart = product => {
      cartStore.addToCart(product, 1);
    };

    const removeFromFavorites = async productId => {
      try {
        console.log("Starting removal process for product:", productId);
        const response = await axiosInstance.delete(`/products/favorites/${productId}`);
        console.log("Server response:", response.data);
        
        // Презареждаме favorites
        await loadFavorites();
        console.log("Favorites reloaded after removal");
      } catch (error) {
        console.error("Error in removeFromFavorites:", error);
        console.error("Error details:", error.response?.data);
      }
    };

    onMounted(loadFavorites);

    return {
      favorites,
      isLoading,
      addToCart,
      removeFromFavorites
    };
  }
};
</script>

<style scoped>
.favorites-container {
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.favorite-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.product-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 15px;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.cart-btn,
.delete-btn {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.cart-btn {
  background-color: #28a745;
  color: white;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.no-favorites {
  text-align: center;
  padding: 40px;
}
</style>
