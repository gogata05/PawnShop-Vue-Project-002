// client/src/store/cartStore.js (нов файл)
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("cart")) || []
  }),
  getters: {
    itemCount: state => state.items.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: state => state.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  },
  actions: {
    addToCart(product, quantity) {
      const existingItem = this.items.find(item => item.product._id === product._id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({ product, quantity });
      }
      this.saveToLocalStorage();
    },
    removeFromCart(productId) {
      this.items = this.items.filter(item => item.product._id !== productId);
      this.saveToLocalStorage();
    },
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.product._id === productId);
      if (item) {
        item.quantity = quantity;
      }
      this.saveToLocalStorage();
    },
    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.items));
    }
  }
});
