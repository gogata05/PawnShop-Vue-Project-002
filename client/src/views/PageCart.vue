<!-- client/src/views/PageCart.vue (нов файл) -->
<template>
  <div class="cart-container">
    <div v-if="cartItems.length > 0" class="cart-layout">
      <div class="cart-items-section">
        <div class="cart-item" v-for="item in cartItems" :key="item.product._id">
          <img :src="item.product.imgUrl" alt="Product Image" />
          <div class="item-details">
            <h3>{{ item.product.brand }} {{ item.product.model }}</h3>
            <p class="price">€{{ item.product.price }}</p>
            <div class="quantity-controls">
              <button class="quantity-btn" @click="decreaseQuantity(item.product._id)">
                <font-awesome-icon icon="minus" />
              </button>
              <span>{{ item.quantity }}</span>
              <button class="quantity-btn" @click="increaseQuantity(item.product._id)">
                <font-awesome-icon icon="plus" />
              </button>
            </div>
            <button class="remove-btn" @click="removeItem(item.product._id)"><font-awesome-icon icon="trash" /> Remove</button>
          </div>
        </div>
      </div>

      <div class="order-summary">
        <div class="summary-sticky">
          <h2>Order Summary</h2>
          <div class="summary-details">
            <div class="summary-row">
              <span>Total Items:</span>
              <span>{{ totalItems }}</span>
            </div>
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>€{{ totalPrice }}</span>
            </div>
            <div class="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div class="summary-row total">
              <span>Total:</span>
              <span class="total-price">€{{ totalPrice }}</span>
            </div>
          </div>
          <button class="checkout-btn" @click="checkout"><font-awesome-icon icon="shopping-cart" /> Proceed to Checkout</button>
          <div class="secure-checkout"><font-awesome-icon icon="lock" /> Secure Checkout</div>
        </div>
      </div>
    </div>

    <div v-else class="empty-cart">
      <div class="empty-cart-content">
        <div class="empty-cart-icon">
          <font-awesome-icon icon="shopping-cart" />
        </div>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet</p>
        <router-link to="/all-products" class="start-shopping-btn">
          <font-awesome-icon icon="arrow-left" />
          Start Shopping
        </router-link>

        <!-- <div class="suggestions">
          <h3>You might be interested in</h3>
          <div class="suggestion-links">
            <router-link to="/top-10">Top 10</router-link>
            <router-link to="/all-products">All Products</router-link>
            <router-link to="/all-products">New Arrivals</router-link>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "../store/cartStore";
import { computed } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "../configs/axios";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const cartStore = useCartStore();
    const router = useRouter();
    const toast = useToast();

    const cartItems = computed(() => cartStore.items);
    const totalItems = computed(() => cartStore.itemCount);
    const totalPrice = computed(() => cartStore.totalPrice);

    const removeItem = productId => {
      cartStore.removeFromCart(productId);
      toast.success("Product removed from cart!", { timeout: 1000 });
    };

    const increaseQuantity = productId => {
      const item = cartStore.items.find(item => item.product._id === productId);
      cartStore.updateQuantity(productId, item.quantity + 1);
      // toast.info("Quantity increased!", { timeout: 1000 });
    };

    const decreaseQuantity = productId => {
      const item = cartStore.items.find(item => item.product._id === productId);
      if (item.quantity > 1) {
        cartStore.updateQuantity(productId, item.quantity - 1);
        // toast.info("Quantity decreased!", { timeout: 1000 });
      }
    };

    const checkout = () => {
      console.log("Redirecting to order summary");
      router.push("/order-summary");
    };

    return {
      cartItems,
      totalItems,
      totalPrice,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
      checkout
    };
  }
};
</script>

<style scoped>
.cart-container {
  max-width: 1400px;
  margin: 100px auto 40px auto;
  padding: 40px 20px;
  background-color: #f8f9fa;
  min-height: 80vh;
  /* zoom in the page */
  transform: scale(1.01);
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 30px;
  align-items: start;
}

.cart-items-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.cart-item {
  display: flex;
  margin-bottom: 30px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.cart-item:hover {
  transform: translateY(-2px);
}

.cart-item img {
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  margin-left: 30px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-details h3 {
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.price {
  font-size: 1.2rem;
  color: #2c3e50;
  font-weight: bold;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin: 15px 0;
}

.quantity-btn {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.quantity-btn:hover {
  background: #e9ecef;
}

.quantity-controls span {
  margin: 0 15px;
  font-size: 1.1rem;
  font-weight: 600;
}

.remove-btn {
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.remove-btn:hover {
  color: #c82333;
}

.order-summary {
  position: relative;
  height: 100%;
}

.summary-sticky {
  /* position: sticky; */
  top: 20px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
}

.summary-sticky h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.summary-details {
  margin: 25px 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
  font-size: 1rem;
  color: #4a5568;
}

.summary-row.total {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #eee;
  font-weight: 600;
  font-size: 1.2rem;
}

.total-price {
  font-size: 1.4rem;
  font-weight: bold;
  color: #2c3e50;
}

.checkout-btn {
  width: 100%;
  padding: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.checkout-btn:hover {
  background-color: #45a049;
  transform: translateY(-1px);
}

.secure-checkout {
  text-align: center;
  margin-top: 15px;
  color: #718096;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.empty-cart {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 40px 20px;
}

.empty-cart-content {
  text-align: center;
  max-width: 500px;
  padding: 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.empty-cart-icon {
  font-size: 5rem;
  color: #e2e8f0;
  margin-bottom: 24px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.empty-cart h2 {
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 12px;
}

.empty-cart p {
  color: #718096;
  font-size: 1.1rem;
  margin-bottom: 32px;
}

.start-shopping-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background-color: #4caf50;
  color: white;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

.start-shopping-btn:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

.suggestions {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #e2e8f0;
}

.suggestions h3 {
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 16px;
}

.suggestion-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.suggestion-links a {
  color: #4a5568;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 20px;
  background: #f7fafc;
  transition: all 0.2s;
}

.suggestion-links a:hover {
  background: #edf2f7;
  color: #2d3748;
  transform: translateY(-1px);
}

@media (max-width: 1024px) {
  .cart-layout {
    grid-template-columns: 1fr 320px;
  }
}

@media (max-width: 768px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }

  .summary-sticky {
    position: static;
    margin-top: 30px;
  }
}

@media (max-width: 480px) {
  .empty-cart-content {
    padding: 30px 20px;
  }

  .empty-cart-icon {
    font-size: 4rem;
  }

  .empty-cart h2 {
    font-size: 1.5rem;
  }

  .suggestion-links {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
