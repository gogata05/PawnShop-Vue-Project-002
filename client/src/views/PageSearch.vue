<!-- client\src\views\PageSearch.vue -->
<template>
  <div class="searchContainer">
    <!-- Search Bar -->
    <section id="search-section">
      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Search for products..." @keyup.enter="performSearch" />
        <button @click="performSearch">Search</button>
      </div>
    </section>

    <!-- Filters and Sort Options -->
    <section id="filters-sort">
      <div class="filters">
        <label>
          Brand:
          <select v-model="filters.brand">
            <option value="">All</option>
            <option v-for="brand in availableBrands" :key="brand" :value="brand">{{ brand }}</option>
          </select>
        </label>
        <label>
          Product Type:
          <select v-model="filters.productType">
            <option value="">All</option>
            <option v-for="type in availableProductTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </label>
        <label>
          Condition:
          <select v-model="filters.condition">
            <option value="">All</option>
            <option value="New">New</option>
            <option value="Like new">Like new</option>
            <option value="Used">Used</option>
          </select>
        </label>
        <label>
          Price:
          <input type="number" v-model.number="filters.priceMin" placeholder="Min" />
          -
          <input type="number" v-model.number="filters.priceMax" placeholder="Max" />
        </label>
      </div>
      <button @click="resetFilters">Reset Filters</button>
    </section>

    <!-- Search Results Header -->
    <h1 v-if="query">Search Results for "{{ query }}"</h1>
    <h1 v-else>All Available Products</h1>

    <!-- Loader -->
    <Loader v-if="isLoading" />

    <!-- Search Results -->
    <div v-else>
      <div v-if="searchResults.length === 0">
        <h2>No products found.</h2>
      </div>
      <div v-else class="productContainer">
        <div v-for="product in searchResults" :key="product._id" class="productd">
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

      <!-- Pagination Controls -->
      <div class="pagination">
        <button @click="changePage(page - 1)" :disabled="page === 1">Previous</button>
        <span>Page {{ page }} of {{ pages }}</span>
        <button @click="changePage(page + 1)" :disabled="page === pages">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import { searchProducts, getProducts } from "../dataProviders/products"; // Import getProducts
import Loader from "../components/Loader.vue";
import starsGenerator from "../helpers/starsGenerator";

export default {
  components: { Loader },
  data() {
    return {
      query: "",
      searchQuery: "",
      searchResults: [],
      isLoading: true,
      page: 1,
      pages: 1,
      total: 0,
      limit: 8,
      sortBy: "createdAt",
      order: "desc",
      filters: {
        brand: "",
        productType: "",
        condition: "",
        priceMin: null,
        priceMax: null
      },
      availableBrands: [], // Може да се попълни с наличните марки
      availableProductTypes: ["Jewelry", "Electronics", "Watches", "Art", "Collectibles", "Coins & Currency", "Other"] // Можете да динамично заредите тези стойности
    };
  },
  async created() {
    // Retrieve the 'q' query parameter from the URL
    this.query = this.$route.query.q || "";
    this.searchQuery = this.query;
    await this.performSearch();
    this.fetchAvailableBrands();
  },
  watch: {
    // Watch for changes in the route's query parameter 'q'
    "$route.query.q"(newQuery) {
      this.query = newQuery || "";
      this.searchQuery = this.query;
      this.page = 1; // Reset to first page при промяна на търсене
      this.performSearch();
    }
  },
  methods: {
    /**
     * Извлича наличните марки за филтриране
     */
    async fetchAvailableBrands() {
      const data = await getProducts("all-products");
      if (data && data.products) {
        const brandsSet = new Set(data.products.map(product => product.brand));
        this.availableBrands = Array.from(brandsSet);
      }
    },
    /**
     * Изпълнява търсенето с текущите параметри
     */
    async performSearch() {
      const trimmedQuery = this.searchQuery.trim();

      if (trimmedQuery === "") {
        // Ако търсенето е празно, не обновяваме 'q' в URL
        this.query = "";
      } else {
        // Обновява URL с новите параметри
        this.$router.push({ name: "Search", query: { q: trimmedQuery } });
      }

      this.isLoading = true;

      const data = await searchProducts({
        query: trimmedQuery,
        page: this.page,
        limit: this.limit,
        sortBy: this.sortBy,
        order: this.order,
        filters: this.filters
      });

      if (data && data.products) {
        this.searchResults = data.products.map(product => ({
          ...product,
          stars: starsGenerator(product.rating),
          description: product.description.length > 160 ? product.description.substring(0, 160) + "..." : product.description
        }));
        this.total = data.total;
        this.pages = data.pages;
      } else {
        this.searchResults = [];
        this.total = 0;
        this.pages = 1;
      }

      this.isLoading = false;
    },
    /**
     * Промяна на текущата страница
     */
    async changePage(newPage) {
      if (newPage < 1 || newPage > this.pages) return;
      this.page = newPage;
      await this.performSearch();
    },
    /**
     * Ресетиране на всички филтри
     */
    async resetFilters() {
      this.filters = {
        brand: "",
        productType: "",
        condition: "",
        priceMin: null,
        priceMax: null
      };
      this.page = 1;
      await this.performSearch();
    }
  }
};
</script>

<style scoped>
#filters-sort {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filters,
.sort {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.filters label,
.sort label {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
}

.pagination button {
  padding: 8px 16px;
  background-color: #1f872d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  font-size: 16px;
}
/* Search Section Styles */
#search-section {
  padding: 20px 0;
  margin-bottom: 30px;
}

.search-container {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.search-container input {
  width: 70%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #1f872d;
  border-radius: 4px 0 0 4px;
  outline: none;
}

.search-container button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #1f872d;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
  transition: background-color 0.3s;
}

.search-container button:hover {
  background-color: #166a20;
}

/* Search Container Styles */
.searchContainer {
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 1rem;
  text-align: center;
}

.searchContainer h1 {
  margin-bottom: 20px;
  font-size: 2rem;
}

.searchContainer h2 {
  margin-top: 20px;
  font-size: 1.5rem;
}

/* Product Container Styles */
.productContainer {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 колони */
  gap: 1rem;
  justify-items: center;
}

/* Премахнете фиксираната ширина, за да позволите на Grid да контролира размера */
.productd {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  border: 1px solid #fff;
  background-color: rgb(233, 233, 233);
  border-radius: 10px;
  margin: 1rem 0; /* Премахнете страничните маргини */
  width: 100%; /* Пълна ширина на клетката */
  max-width: 250px; /* Максимална ширина за по-добро разпределение */
  height: 100%; /* Автоматична височина */
}

.productImage {
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  height: 40%;
  margin: 0 0 1.5rem;
}

.productText {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-top: 1px solid black;
  width: 90%; /* Намалете ширината за по-добро подравняване */
  height: 50%;
  padding: 1rem 0.25rem;
  position: relative;
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
  margin: 3rem 0 0;
  background: rgb(145, 203, 236);
  color: rgb(0, 0, 0);
  bottom: 12px;
}

.productd a:hover {
  background: rgb(31, 135, 45);
  color: #fff;
  cursor: pointer;
}

.stars {
  margin-bottom: 0.25rem;
  margin-top: -0.25rem;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .searchContainer h1 {
    font-size: 1.5rem;
  }

  .searchContainer h2 {
    font-size: 1.25rem;
  }

  .steps {
    flex-direction: column;
    align-items: center;
  }

  .step {
    width: 80%;
  }

  .reviews {
    flex-direction: column;
    align-items: center;
  }

  .review {
    width: 80%;
  }

  .productd {
    width: 90%;
    height: auto;
  }

  .productImage {
    height: 200px;
  }
}
</style>
