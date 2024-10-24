<!-- client\src\views\PageOrders.vue -->
<template>
  <div class="orders-container">
    <h1>My Orders</h1>
    <div v-if="orders.length > 0">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Name</th>
            <th>Total Amount</th>
            <th>Creation Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order._id">
            <td>{{ order._id }}</td>
            <td>{{ userName }}</td>
            <td>{{ order.total }} EURO</td>
            <td>{{ formatDate(order.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>You have no orders.</p>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { useUserStore } from "../store/userStore";
import axiosInstance from "../configs/axios";

export default {
  setup() {
    const orders = ref([]);
    const userStore = useUserStore();
    const userName = computed(() => `${userStore.firstName} ${userStore.lastName}`);

    const formatDate = dateStr => {
      const date = new Date(dateStr);
      return date.toLocaleString();
    };

    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/orders/my-orders");
        orders.value = res.data.orders;
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      fetchOrders();
    });

    return {
      orders,
      userName,
      formatDate
    };
  }
};
</script>

<style scoped>
.orders-container {
  padding: 100px 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
}
</style>
