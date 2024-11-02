<!-- client\src\views\PageProducts.vue -->
<script>
import { ref, reactive, watch, computed, onMounted } from "vue";
import { getProducts } from "../dataProviders/products";
import Loader from "../components/Loader.vue";
import starsGenerator from "../helpers/starsGenerator";

export default {
  components: { Loader },
  setup() {
    const isLoading = ref(true);
    const products = ref([]);
    const totalProducts = ref(0);
    const currentPage = ref(1);
    const itemsPerPage = 12;

    const filters = reactive({
      brand: "",
      productType: "",
      condition: "",
      priceMin: "",
      priceMax: ""
    });

    const sortBy = ref("createdAt");
    const order = ref("desc");

    const availableBrands = ref([]);
    const availableProductTypes = ref([]);

    const totalPages = computed(() => Math.ceil(totalProducts.value / itemsPerPage));

    const loadData = async () => {
      console.log("Loading products with filters:", filters);
      isLoading.value = true;
      try {
        const queryParams = {
          page: currentPage.value,
          limit: itemsPerPage,
          sortBy: sortBy.value,
          order: order.value,
          ...filters
        };

        const response = await getProducts(queryParams);
        console.log("Products response:", response);

        if (response) {
          products.value = response.products.map(product => ({
            ...product,
            stars: starsGenerator(product.rating),
            description: product.description.length > 160 ? product.description.substring(0, 160) + "..." : product.description
          }));
          totalProducts.value = response.total;

          // Събиране на уникални брандове и типове продукти
          availableBrands.value = [...new Set(response.products.map(p => p.brand))];
          availableProductTypes.value = [...new Set(response.products.map(p => p.productType))];
        }
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const changePage = newPage => {
      currentPage.value = newPage;
    };

    const resetFilters = () => {
      Object.keys(filters).forEach(key => (filters[key] = ""));
      sortBy.value = "createdAt";
      order.value = "desc";
      currentPage.value = 1;
    };

    // Наблюдаване за промени във филтрите и сортирането
    watch([filters, sortBy, order], () => {
      currentPage.value = 1; // Връщане на първа страница при промяна на филтрите
      loadData();
    });

    // Наблюдаване за промени в страницата
    watch(currentPage, () => {
      loadData();
    });

    // Първоначално зареждане
    onMounted(() => {
      loadData();
    });

    return {
      isLoading,
      products,
      filters,
      sortBy,
      order,
      currentPage,
      totalPages,
      availableBrands,
      availableProductTypes,
      changePage,
      resetFilters
    };
  }
};
</script>

<template>
  <div class="products-container">
    <!-- Filters Section -->
    <section class="filters-section">
      <div class="filters">
        <label>
          Brand:
          <select v-model="filters.brand">
            <option value="">All</option>
            <option v-for="brand in availableBrands" :key="brand" :value="brand">
              {{ brand }}
            </option>
          </select>
        </label>

        <label>
          Product Type:
          <select v-model="filters.productType">
            <option value="">All</option>
            <option v-for="type in availableProductTypes" :key="type" :value="type">
              {{ type }}
            </option>
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

      <div class="sort">
        <label>
          Sort By:
          <select v-model="sortBy">
            <option value="createdAt">Newest</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </label>
        <label>
          Order:
          <select v-model="order">
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </div>
    </section>

    <!-- Products Grid -->
    <div class="products-grid">
      <Loader v-if="isLoading" />
      <div v-else-if="products.length === 0" class="no-products">
        <h2>No products found</h2>
      </div>
      <div v-else class="product-list">
        <!-- Existing product cards code -->
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
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

.stars {
  margin-bottom: 0.25rem;
  margin-top: -0.25rem;
}

.filters-section {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  flex: 3;
}

.sort {
  display: flex;
  gap: 15px;
  flex: 1;
}

.filters label,
.sort label {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.filters select,
.sort select,
.filters input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 150px;
}

.filters input[type="number"] {
  width: 100px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  padding: 20px;
}

.pagination button {
  padding: 8px 16px;
  border: none;
  background: #1f872d;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.pagination span {
  font-size: 1.1em;
}

@media (max-width: 768px) {
  .filters-section {
    flex-direction: column;
  }

  .filters,
  .sort {
    flex-direction: column;
  }

  .filters label,
  .sort label {
    width: 100%;
  }
}
</style>
