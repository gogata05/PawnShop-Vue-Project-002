<!-- client\src\components\LatestProductsSlider.vue -->
<template>
  <div class="slider-container" @mouseenter="pauseSlider" @mouseleave="startSlider">
    <div class="slider" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
      <div v-for="product in latestProducts" :key="product._id" class="slide">
        <div class="product-image">
          <img :src="product.imgUrl" :alt="`${product.brand} ${product.model}`" loading="lazy" />
        </div>
        <div class="slide-content">
          <h3>{{ product.brand }} {{ product.model }}</h3>
          <p>{{ product.description }}</p>
          <router-link :to="`/details/${product._id}`" class="details-link">View Details</router-link>
        </div>
      </div>
    </div>
    <!-- Navigation Buttons -->
    <button class="nav-button prev" @click="prevSlide" aria-label="Previous Slide">‹</button>
    <button class="nav-button next" @click="nextSlide" aria-label="Next Slide">›</button>
    <!-- Indicators -->
    <div class="indicators">
      <span v-for="(product, index) in latestProducts" :key="index" :class="['indicator', { active: index === currentSlide }]" @click="goToSlide(index)"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "LatestProductsSlider",
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentSlide: 0,
      intervalId: null,
      slideInterval: 5000 // 5 seconds
    };
  },
  computed: {
    latestProducts() {
      return this.products;
    }
  },
  methods: {
    nextSlide() {
      if (this.latestProducts.length === 0) return;
      this.currentSlide = (this.currentSlide + 1) % this.latestProducts.length;
    },
    prevSlide() {
      if (this.latestProducts.length === 0) return;
      this.currentSlide = (this.currentSlide - 1 + this.latestProducts.length) % this.latestProducts.length;
    },
    goToSlide(index) {
      this.currentSlide = index;
    },
    startSlider() {
      this.intervalId = setInterval(this.nextSlide, this.slideInterval);
    },
    pauseSlider() {
      clearInterval(this.intervalId);
    },
    truncatedDescription(description) {
      return description.length > 100 ? description.substring(0, 100) + "..." : description;
    }
  },
  mounted() {
    this.startSlider();
  },
  beforeUnmount() {
    this.pauseSlider();
  }
};
</script>

<style scoped>
.slider-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  overflow: hidden;
  border: 2px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
}

.slider {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slide {
  min-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.product-image img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 10px;
}

.slide-content {
  text-align: center;
  margin-top: 15px;
}

.slide-content h3 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.slide-content p {
  font-size: 16px;
  color: #555;
}

.details-link {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 16px;
  background: #1f872d;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s;
}

.details-link:hover {
  background: #166e20;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(31, 135, 45, 0.7);
  border: none;
  color: #fff;
  font-size: 24px;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.3s;
  z-index: 10;
}

.nav-button:hover {
  background: rgba(31, 135, 45, 1);
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.indicators {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.indicator {
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s;
}

.indicator.active {
  background: #1f872d;
}

@media (max-width: 768px) {
  .slider-container {
    max-width: 100%;
    margin: 20px auto;
  }

  .product-image img {
    max-height: 200px;
  }

  .slide-content h3 {
    font-size: 20px;
  }

  .slide-content p {
    font-size: 14px;
  }

  .details-link {
    padding: 6px 12px;
    font-size: 14px;
  }
}
</style>
