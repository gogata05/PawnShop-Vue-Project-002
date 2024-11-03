<script>
import { ref, onMounted } from "vue";
import { getTop10Products } from "../dataProviders/products";
import Loader from "../components/Loader.vue";
import starsGenerator from "../helpers/starsGenerator";

export default {
  name: "PageTop10",
  components: { Loader },
  setup() {
    const products = ref([]);
    const isLoading = ref(true);
    const error = ref(null);

    onMounted(async () => {
      try {
        console.log("Mounting Top 10 component");
        const response = await getTop10Products();
        if (response && response.products) {
          products.value = response.products.map(product => ({
            ...product,
            stars: starsGenerator(product.rating)
          }));
          console.log("Loaded products:", products.value);
        }
      } catch (err) {
        console.error("Error loading top 10:", err);
        error.value = "Failed to load top products";
      } finally {
        isLoading.value = false;
      }
    });

    return {
      products,
      isLoading,
      error
    };
  }
};
</script>

<template>
  <div class="top10-container">
    <h1>Top 10 Products</h1>
    
    <Loader v-if="isLoading" />
    
    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>
    
    <div v-else-if="products.length === 0" class="no-products">
      <h2>No products found</h2>
    </div>
    
    <div v-else class="productContainer">
      <div v-for="product in products" :key="product._id" class="productd">
        <div class="productText">
          <h3>{{ product.brand }} {{ product.model }}</h3>
          <span class="stars">{{ product.stars }}</span>
          <span>
            <b>{{ product.year }}, {{ product.productType }}, {{ product.condition }}, {{ product.price }} EURO</b>
          </span>
          <p>
            {{ product.description }}
          </p>
          <router-link :to="`/details/${product._id}`">Details</router-link>
        </div>
        <div class="productImage">
          <img :src="product.imgUrl" alt="product-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top10-container {
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 1rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.error-message {
  color: red;
  text-align: center;
  margin: 2rem 0;
}

.no-products {
  text-align: center;
  margin: 2rem 0;
}

.productContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.productd {
  display: flex;
  flex-direction: column-reverse;
  background-color: rgb(233, 233, 233);
  border-radius: 10px;
  overflow: hidden;
  height: 100%;
}

.productImage {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.productImage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.productText {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  padding-bottom: 4rem;
}

.productText h3 {
  margin: 0;
}

.productd a {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  text-decoration: none;
  font-weight: 700;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  background: rgb(145, 203, 236);
  color: rgb(0, 0, 0);
  transition: all 0.3s ease;
}

.productd a:hover {
  background: rgb(31, 135, 45);
  color: #fff;
}

.stars {
  color: gold;
}

@media (max-width: 768px) {
  .productContainer {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style> 