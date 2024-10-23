<!-- client\src\views\PageProducts.vue -->
<script>
import { getProducts } from "../dataProviders/products";
import Loader from "../components/Loader.vue";

export default {
  components: { Loader },
  data() {
    return {
      allProducts: {},
      isLoading: true
    };
  },
  async created() {
    await this.loadData();
  },
  watch: {
    $route() {
      this.loadData();
    }
  },
  methods: {
    async loadData() {
      this.isLoading = true;
      this.allProducts = await getProducts(window.location.href.split("/").pop());
      this.allProducts.products.forEach(e => (e.description = e["description"].length > 160 ? e["description"].substring(0, 160) + "..." : e["description"]));
      this.isLoading = false;
    }
  }
};
</script>

<template>
  <div class="productContainer">
    <div v-if="allProducts.products?.length == 0">
      <h1>There are no products in the database!</h1>
    </div>
    <Loader v-if="isLoading" />

    <div v-else v-for="product of allProducts.products" :key="product._id" class="productd">
      <div class="productText">
        <h3>{{ product["brand"] }} {{ product["model"] }}</h3>
        <span
          ><b>{{ product["year"] }}, {{ product["productType"] }}, {{ product["condition"] }}, {{ product["price"] }} EURO</b></span
        >
        <p>
          {{ product["description"] }}
        </p>
        <router-link :to="`/details/${product['_id']}`">Details</router-link>
      </div>
      <div class="productImage">
        <img :src="product['imgUrl']" alt="product-image" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.productContainer {
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
  margin: 4rem auto;
  gap: 1rem;
}

.productd {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  border: 1px solid #fff;
  background-color: rgb(233, 233, 233);
  border-radius: 10px;
  margin: 1rem;
  width: 360px;
  height: 540px;
}

.productd img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.productImage {
  border-radius: 10px;
  overflow: hidden;
  width: 96%;
  height: 40%;
  margin: 0rem 0rem 1.5rem;
}

.productText {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-top: 1px solid black;
  width: 88%;
  height: 50%;
  padding: 1rem 0.25rem;
  position: relative;
}

.productText h3 {
  margin: 0.25rem 0;
}

.productd a {
  position: absolute;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  font-weight: 700;
  font-size: 16px;
  padding: 10px 28px;
  border-radius: 10px;
  transition: 0.5s;
  border: unset;
  margin: 3rem 0rem 0rem;
  background: rgb(145, 203, 236);
  color: rgb(0, 0, 0);
  bottom: 12px;
}

.productd a:hover {
  background: rgb(31, 135, 45);
  color: #fff;
  cursor: pointer;
}
</style>
