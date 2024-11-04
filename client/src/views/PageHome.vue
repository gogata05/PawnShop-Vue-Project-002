<!-- client\src\views\PageHome.vue -->
<template>
  <div>
    <!-- Search Bar -->
    <section id="search-section">
      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Search for products..." @keyup.enter="performSearch" />
        <button @click="performSearch">Search</button>
      </div>
    </section>

    <!-- Home Section -->
    <section id="home">
      <div class="home-container">
        <h1>Welcome to Our PawnShop</h1>
        <h2>Buy and Sell PawnShop's items all over the world!</h2>

        <!-- Latest Products Slider Section -->
        <section id="latest-products">
          <div class="latest-products-container">
            <h2>Recently Added Products</h2>
            <LatestProductsSlider v-if="latestProducts.length" :products="latestProducts" />
            <p v-else-if="!isLoading">No recent products available.</p>
            <p v-else>Loading latest products...</p>
          </div>
        </section>
      </div>
      <!-- User Type Selection -->
      <div class="user-type-selection">
        <h3>Select your user type:</h3>
        <label> <input type="radio" value="buyer" v-model="userType" /> Buyer </label>
        <label> <input type="radio" value="pawnshop" v-model="userType" /> Pawn Shop </label>
      </div>
    </section>

    <!-- Conditional Rendering based on userType -->
    <section v-if="userType === 'buyer'" id="how-it-works-buyer">
      <div class="how-it-works-container">
        <h2>How to Purchase from Our Pawn Shop</h2>
        <div class="steps">
          <article class="step" aria-label="Step 1: Browse Items">
            <span class="step-number">1</span>
            <h3>Browse Our Inventory</h3>
            <p>Explore a wide selection of items available for sale, ranging from electronics to jewelry and more.</p>
          </article>

          <article class="step" aria-label="Step 2: Make a Purchase">
            <span class="step-number">2</span>
            <h3>Select and Purchase</h3>
            <p>Choose the item you want to buy, add it to your cart, and complete the checkout process securely online.</p>
          </article>

          <article class="step" aria-label="Step 3: Pickup or Delivery">
            <span class="step-number">3</span>
            <h3>Pickup or Delivery</h3>
            <p>Opt for in-store pickup or schedule a convenient delivery to your home. We ensure a safe and fast process.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- How It Works for Pawn Shops Section -->
    <section v-if="userType === 'pawnshop'" id="how-it-works-pawnshops">
      <div class="how-it-works-container">
        <h2>How to Sell Your Items as a Pawn Shop</h2>
        <div class="steps">
          <article class="step" aria-label="Step 1: Register Your Shop">
            <span class="step-number">1</span>
            <h3>Create an Account for Your Pawn Shop</h3>
            <p>Register your pawn shop with our platform to start selling your inventory to a wider audience. Provide all the necessary details to verify your shop.</p>
          </article>

          <article class="step" aria-label="Step 2: Add Items for Sale">
            <span class="step-number">2</span>
            <h3>Add Your Items</h3>
            <p>Upload the items you want to sell, including detailed descriptions, photos, and pricing. Our platform supports various item types, including electronics, jewelry, and more.</p>
          </article>

          <article class="step" aria-label="Step 3: Get Paid Quickly">
            <span class="step-number">3</span>
            <h3>Receive Payment</h3>
            <p>Once a customer purchases an item, you will receive the payment quickly through our secure payment system. You can also track your sales and manage your inventory easily.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Customer Reviews Section -->
    <section id="customer-reviews">
      <div class="customer-reviews-container">
        <h2>What Our Customers Say</h2>
        <div class="reviews">
          <!-- Review from John Smith -->
          <div class="review">
            <div class="reviewer">
              <img src="https://i.pinimg.com/564x/cf/2e/68/cf2e68c7ad5591e86809e6c21183c913.jpg" alt="John Smith" />
              <h5>John Smith</h5>
            </div>
            <p>"Excellent service and fair loan offers. I was able to get the funds I needed quickly without any hassle."</p>
          </div>
          <!-- Review from Sofia Rodriguez -->
          <div class="review">
            <div class="reviewer">
              <img src="https://i.pinimg.com/originals/57/f5/05/57f505024590eef73d60c22b90203be8.jpg" alt="Sofia Rodriguez" />
              <h5>Sofia Rodriguez</h5>
            </div>
            <p>"The team was professional and respectful. They made the entire process seamless and stress-free."</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../store/userStore";
import { getLatestProducts } from "../dataProviders/products";
import LatestProductsSlider from "../components/LatestProductsSlider.vue"; // Import the slider component

export default {
  components: { LatestProductsSlider },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  computed: {
    ...mapState(useUserStore, ["isAuthenticated"])
  },
  data() {
    return {
      userType: "buyer",
      latestProducts: [], 
      isLoading: true,
      searchQuery: ""
    };
  },
  async created() {
    await this.loadLatestProducts(); 
  },
  methods: {
    async loadLatestProducts() {
      const data = await getLatestProducts();
      if (data && data.products) {
        this.latestProducts = data.products.map(product => ({
          ...product,
          description: product.description.length > 100 ? product.description.substring(0, 100) + "..." : product.description
        }));
      }
      this.isLoading = false;
    },

    performSearch() {
      this.$router.push({ name: "Search", query: { q: this.searchQuery.trim() } });
    }
  }
};
</script>

<style scoped>
/* Search Section Styles */
#search-section {
  padding: 20px 0;
  margin-bottom: 30px;
  margin-top: 64px;
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

/* Home Container Styles */
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: #fff;
}

.home-container h1 {
  font-family: Arial, Helvetica, sans-serif;
  margin: 30px 0 10px 0;
  font-size: 48px;
  font-weight: 700;
  text-transform: uppercase;
}

.home-container h2 {
  font-family: Arial, Helvetica, sans-serif;
  color: #eee;
  margin-bottom: 30px;
  font-size: 24px;
}

/* User Type Selection */
.user-type-selection {
  margin-top: 30px;
  color: #fff;
  margin-bottom: 30px;
  text-align: center; /* Centers the content horizontally */
}

.user-type-selection h3 {
  margin-bottom: 10px;
  font-size: 20px;
}

.user-type-selection label {
  margin: 0 15px;
  font-size: 16px;
  cursor: pointer;
}

/* Latest Products Section */
#latest-products {
  background-color: #f5f5f5;
}

.latest-products-container {
  background-color: rgba(0, 0, 0, 0.25);
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
}

.latest-products-container h2 {
  font-size: 36px;
  margin-bottom: 40px;
  color: #333;
}

/* How It Works Sections */
#how-it-works-buyer,
#how-it-works-pawnshops {
  background-color: #f5f5f5;
  padding: 60px 20px;
}

.how-it-works-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 50px;
}

.how-it-works-container h2 {
  font-size: 36px;
  margin-bottom: 40px;
  color: #333;
}

.steps {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}

.step {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 30%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.step span {
  display: inline-block;
  background: #1f872d;
  color: #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  margin-bottom: 15px;
}

.step h3 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.step p {
  font-size: 16px;
  color: #666;
}

/* Customer Reviews Section */
#customer-reviews {
  background-color: #fff;
  padding: 60px 20px;
}

.customer-reviews-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.customer-reviews-container h2 {
  font-size: 36px;
  margin-bottom: 40px;
  color: #333;
}

.reviews {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.review {
  background: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
  width: 45%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.reviewer {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  margin-left: 0px;
}

.reviewer img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.reviewer h5 {
  font-size: 20px;
  color: #333;
}

.review p {
  font-size: 16px;
  color: #555;
  margin-left: -10px;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .how-it-works-container h2,
  .customer-reviews-container h2,
  .latest-products-container h2 {
    font-size: 28px;
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
