<!-- client/src/views/PageCart.vue (нов файл) -->
<template>
  <div class="cart-container">
    <h1>Your Cart</h1>
    <div v-if="cartItems.length > 0">
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
          <button class="remove-btn" @click="removeItem(item.product._id)">
            <font-awesome-icon icon="trash" /> Remove
          </button>
        </div>
      </div>
      <div class="order-summary">
        <h2>Order Summary</h2>
        <div class="summary-details">
          <div class="summary-row">
            <span>Total Items:</span>
            <span>{{ totalItems }}</span>
          </div>
          <div class="summary-row">
            <span>Total Price:</span>
            <span class="total-price">€{{ totalPrice }}</span>
          </div>
        </div>
        <button class="checkout-btn" @click="checkout">
          Proceed to Checkout
        </button>
      </div>
    </div>
    <div v-else>
      <p>Your cart is empty.</p>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "../store/cartStore";
import { computed } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "../configs/axios";

export default {
  setup() {
    const cartStore = useCartStore();
    const router = useRouter();

    const cartItems = computed(() => cartStore.items);
    const totalItems = computed(() => cartStore.itemCount);
    const totalPrice = computed(() => cartStore.totalPrice);

    const removeItem = productId => {
      cartStore.removeFromCart(productId);
    };

    const increaseQuantity = productId => {
      const item = cartStore.items.find(item => item.product._id === productId);
      cartStore.updateQuantity(productId, item.quantity + 1);
    };

    const decreaseQuantity = productId => {
      const item = cartStore.items.find(item => item.product._id === productId);
      if (item.quantity > 1) {
        cartStore.updateQuantity(productId, item.quantity - 1);
      }
    };

    const checkout = async () => {
      try {
        const orderData = {
          items: cartItems.value.map(item => ({
            product: item.product._id,
            quantity: item.quantity
          })),
          total: totalPrice.value
        };
        await axiosInstance.post("/orders/create", orderData);
        cartStore.clearCart();
        router.push({ name: "Success" });
      } catch (error) {
        console.error(error);
      }
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f8f9fa;
  min-height: 80vh;
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
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin-left: auto;
}

.summary-details {
  margin: 20px 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 1.1rem;
}

.total-price {
  font-size: 1.4rem;
  font-weight: bold;
  color: #2c3e50;
}

.checkout-btn {
  width: 100%;
  padding: 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.checkout-btn:hover {
  background-color: #45a049;
}

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
  }
  
  .cart-item img {
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
  }
  
  .item-details {
    margin-left: 0;
  }
  
  .order-summary {
    margin: 30px auto;
  }
}
</style>
