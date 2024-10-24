<!-- client\src\views\PageUserProfile.vue -->
<script>
import { getProfile } from "../dataProviders/auth";
import Loader from "../components/Loader.vue";
export default {
  components: { Loader },
  data() {
    return {
      profile: {},
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
      this.profile = await getProfile();
      this.isLoading = false;
    }
  }
};
</script>

<template>
  <Loader v-if="isLoading"></Loader>
  <div v-else class="allign">
    <div class="profile-container">
      <div class="profile-info">
        <strong
          ><h1>Hello, {{ profile.firstName }} {{ profile.lastName }}</h1>
        </strong>
      </div>
      <br />

      <div class="favorite-products" v-if="profile.favorites.length > 0">
        <h2>These are your favorite Products:</h2>
        <br />
        <ul>
          <li v-for="product in profile.favorites" :key="product._id">
            <h3>{{ product.brand }} {{ product.model }}</h3>
            <br />

            <router-link :to="`/details/${product._id}`"><img class="img" :src="product.imgUrl" alt="Product" /></router-link>
          </li>
        </ul>
      </div>
      <div v-else>
        <h2>You have no products in favorites yet.</h2>
        <br />
        <p>
          Feel free to visit
          <router-link to="/all-products">All Products</router-link> or
          <router-link to="/top-10">Top 10 Products</router-link>
          where you can choose a product that you can add your favorites.
        </p>
        <p>Please note that you cannot add the products added by yourself to your favorites.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.allign {
  padding-top: 100px;
  padding-bottom: 100px;
}
.profile-container {
  width: 80%;
  margin: 20px auto;
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.profile-container h2 {
  color: #343a40;
}

.profile-info {
  text-align: center;
}
.favorite-products {
  flex: 1;
  list-style-type: none;
  padding: 0;
}

.favorite-products ul {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  list-style-type: none;
}

.favorite-products li {
  margin-bottom: 15px;
  width: 18%;
}

.img {
  width: 600px;
  height: 200px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.favorite-products img:hover {
  transform: scale(1.1);
}
</style>
