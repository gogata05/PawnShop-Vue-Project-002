<template>
  <div class="order-summary-container">
    <div class="summary-layout">
      <div class="shipping-section">
        <h2>Shipping Details</h2>
        <form @submit.prevent="proceedToPayment" class="shipping-form">
          <div class="form-group">
            <label for="buyerName">Full Name</label>
            <input type="text" id="buyerName" v-model="shippingDetails.buyerName" required />
          </div>

          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" v-model="shippingDetails.phone" required />
          </div>

          <div class="form-group">
            <label for="streetAddress">Street Address</label>
            <input type="text" id="streetAddress" v-model="shippingDetails.streetAddress" required />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="city">City</label>
              <input type="text" id="city" v-model="shippingDetails.city" required />
            </div>
            <div class="form-group">
              <label for="state">State</label>
              <input type="text" id="state" v-model="shippingDetails.state" required />
            </div>
          </div>

          <div class="form-group">
            <label for="postalCode">Postal Code</label>
            <input type="text" id="postalCode" v-model="shippingDetails.postalCode" required />
          </div>
        </form>
      </div>

      <div class="order-details">
        <div class="details-sticky">
          <h2>Order Details</h2>
          <div class="items-list">
            <div v-for="item in orderSummary.items" :key="item.productName" class="item">
              <span>{{ item.productName }} (x{{ item.quantity }})</span>
              <span>€{{ item.price * item.quantity }}</span>
            </div>
          </div>

          <div class="delivery-info">
            <h3>Estimated Delivery</h3>
            <p>{{ formatDate(orderSummary.estimatedDeliveryStart) }} - {{ formatDate(orderSummary.estimatedDeliveryEnd) }}</p>
          </div>

          <div class="total-section">
            <div class="subtotal">
              <span>Subtotal</span>
              <span>€{{ orderSummary.total }}</span>
            </div>
            <div class="shipping">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div class="total">
              <span>Total</span>
              <span>€{{ orderSummary.total }}</span>
            </div>
          </div>

          <button @click="proceedToPayment" class="payment-btn" :disabled="!isFormValid"><i class="fas fa-lock"></i> Proceed to Payment</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "../store/cartStore";
import axiosInstance from "../configs/axios";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const router = useRouter();
    const cartStore = useCartStore();
    const toast = useToast();
    const orderSummary = ref({ items: [], total: 0 });

    const shippingDetails = ref({
      buyerName: "",
      phone: "",
      streetAddress: "",
      city: "",
      state: "",
      postalCode: ""
    });

    const isFormValid = computed(() => {
      return Object.values(shippingDetails.value).every(value => value.trim() !== "");
    });

    const formatDate = dateString => {
      return new Date(dateString).toLocaleDateString();
    };

    const fetchOrderSummary = async () => {
      try {
        console.log("Fetching order summary");
        const response = await axiosInstance.post("/orders/create-summary", {
          items: cartStore.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity
          }))
        });
        orderSummary.value = response.data;
      } catch (error) {
        console.error("Error fetching order summary:", error);
        toast.error("Failed to load order summary");
        router.push("/cart");
      }
    };

    const proceedToPayment = async () => {
      if (!isFormValid.value) {
        toast.error("Please fill in all shipping details");
        return;
      }

      try {
        console.log("Creating order");
        await axiosInstance.post("/orders/create", {
          shippingDetails: shippingDetails.value,
          items: cartStore.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity
          })),
          total: orderSummary.value.total
        });

        console.log("Creating Stripe session");
        const stripeResponse = await axiosInstance.post("/stripe/create-checkout-session", {
          items: cartStore.items
        });

        window.location.href = stripeResponse.data.url;
      } catch (error) {
        console.error("Error proceeding to payment:", error);
        toast.error("Failed to process order");
      }
    };

    onMounted(() => {
      if (cartStore.items.length === 0) {
        router.push("/cart");
        return;
      }
      fetchOrderSummary();
    });

    return {
      shippingDetails,
      orderSummary,
      isFormValid,
      formatDate,
      proceedToPayment
    };
  }
};
</script>

<style scoped>
.order-summary-container {
  max-width: 1400px;
  margin: 100px auto 40px auto;
  padding: 40px 20px;
}

.summary-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
}

.shipping-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
}

.shipping-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

label {
  font-weight: 500;
  color: #2d3748;
}

input {
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
}

.details-sticky {
  position: sticky;
  top: 20px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
}

.items-list {
  margin: 20px 0;
}

.item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #e2e8f0;
}

.delivery-info {
  margin: 20px 0;
  padding: 15px;
  background: #f7fafc;
  border-radius: 8px;
}

.total-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #e2e8f0;
}

.total-section > div {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.total {
  font-weight: 600;
  font-size: 1.2rem;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #e2e8f0;
}

.payment-btn {
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
  margin-top: 20px;
}

.payment-btn:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}

.payment-btn:not(:disabled):hover {
  background-color: #45a049;
  transform: translateY(-1px);
}

@media (max-width: 1024px) {
  .summary-layout {
    grid-template-columns: 1fr 350px;
  }
}

@media (max-width: 768px) {
  .summary-layout {
    grid-template-columns: 1fr;
  }

  .details-sticky {
    position: static;
  }
}
</style>
