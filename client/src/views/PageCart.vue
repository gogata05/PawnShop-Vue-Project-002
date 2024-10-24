<!-- client/src/views/PageCart.vue (нов файл) -->
<template>
  <div class="cart-container">
    <h1>Your Cart</h1>
    <div v-if="cartItems.length > 0">
      <div class="cart-item" v-for="item in cartItems" :key="item.product._id">
        <img :src="item.product.imgUrl" alt="Product Image" />
        <div class="item-details">
          <h3>{{ item.product.brand }} {{ item.product.model }}</h3>
          <p>Price: {{ item.product.price }} EURO</p>
          <div class="quantity-controls">
            <font-awesome-icon icon="minus" @click="decreaseQuantity(item.product._id)" />
            <span>{{ item.quantity }}</span>
            <font-awesome-icon icon="plus" @click="increaseQuantity(item.product._id)" />
          </div>
          <button @click="removeItem(item.product._id)">Remove</button>
        </div>
      </div>
      <div class="order-summary">
        <h2>Order Summary</h2>
        <p>Total Items: {{ totalItems }}</p>
        <p>Total Price: {{ totalPrice }} EURO</p>
        <button @click="checkout">Checkout</button>
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
  padding: 100px 20px;
}

.cart-item {
  display: flex;
  margin-bottom: 20px;
}

.cart-item img {
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.item-details {
  margin-left: 20px;
}

.quantity-controls {
  display: flex;
  align-items: center;
}

.quantity-controls font-awesome-icon {
  cursor: pointer;
  margin: 0 10px;
}

.order-summary {
  margin-top: 40px;
}

.order-summary button {
  padding: 10px 20px;
  background-color: #28a745;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
