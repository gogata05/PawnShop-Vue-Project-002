<!-- client\src\components\PageHeader.vue -->
<template>
  <header>
    <div class="navbar-brand" @click="redirectToHome">PawnShop</div>
    <nav>
      <ul>
        <li>
          <router-link :to="{ name: 'Home' }"> Home </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'AllProducts' }"> All Products </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Top10' }"> Top 10 Products </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Search' }"> Search </router-link>
        </li>
        <!-- Authenticated User Links Removed from Nav -->
        <li class="auth" v-if="!isAuthenticated">
          <router-link :to="{ name: 'Login' }"> Login </router-link>
        </li>
        <li v-if="!isAuthenticated">
          <router-link :to="{ name: 'Register' }"> Register </router-link>
        </li>
      </ul>
    </nav>

    <!-- Profile Dropdown -->
    <div class="welcome" v-if="isAuthenticated" ref="container" @click="toggleDropdown" tabindex="0">
      <span>Welcome, </span>
      <span class="email">{{ email }}</span>
      <svg class="dropdown-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </svg>

      <!-- Dropdown Menu -->
      <ul v-if="showDropdown" class="dropdown-menu" @click.stop>
        <li>
          <router-link :to="{ name: 'Profile' }">My Favourites</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Orders' }">My Orders</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Cart' }">My Cart</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'AddProduct' }">Add a Product</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ManageAccount' }">Manage Account</router-link>
        </li>
        <li>
          <a @click.prevent="handleLogout" href="javascript:void(0);">Logout</a>
        </li>
      </ul>
    </div>
    <div class="cart-icon" @click="goToCart">
      <font-awesome-icon :icon="['fas', 'shopping-cart']" :style="{ color: isCartPage ? 'purple' : 'white' }" />
      <span v-if="itemCount > 0" class="item-count">{{ itemCount }}</span>
    </div>
  </header>
</template>

<script>
import { useUserStore } from "../store/userStore";
import { useCartStore } from "../store/cartStore";
import { logoutUser } from "../dataProviders/auth";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const userStore = useUserStore();
    const cartStore = useCartStore();
    const router = useRouter();
    const route = useRoute();
    const showDropdown = ref(false);
    const container = ref(null);

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    const closeDropdown = () => {
      showDropdown.value = false;
    };

    const handleClickOutside = event => {
      if (container.value && !container.value.contains(event.target)) {
        closeDropdown();
      }
    };

    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    const isAuthenticated = computed(() => userStore.isAuthenticated);
    const email = computed(() => userStore.email);
    const itemCount = computed(() => cartStore.itemCount);
    const isCartPage = computed(() => route.name === "Cart");

    const redirectToHome = () => {
      router.push({ name: "Home" });
    };

    const handleLogout = async () => {
      userStore.logout();
      await logoutUser();
      router.push("/user/login");
    };

    const goToCart = () => {
      router.push({ name: "Cart" });
    };

    return {
      showDropdown,
      toggleDropdown,
      container,
      isAuthenticated,
      email,
      redirectToHome,
      handleLogout,
      cartStore,
      itemCount,
      goToCart,
      isCartPage
    };
  }
};
</script>

<style scoped>
.auth {
  margin-left: 26rem;
}
header {
  display: flex;
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  gap: 2rem;
  align-items: center;
  justify-content: space-around;
  background: #212529;
}
header nav ul li a,
header a,
.welcome span {
  text-decoration: none;
  color: hsla(0, 0%, 100%, 0.815);
}
.welcome {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #fff;
}
.welcome .email {
  margin-left: 0.5rem;
  font-weight: bold;
}
.welcome .dropdown-icon {
  margin-left: 0.5rem;
  width: 1em;
  height: 1em;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: #343a40;
  border: 1px solid #495057;
  border-radius: 4px;
  margin-top: 0.5rem;
  list-style: none;
  padding: 0.5rem 0;
  min-width: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
.dropdown-menu li {
  padding: 0;
}
.dropdown-menu li a {
  display: block;
  padding: 0.5rem 1rem;
  color: #fff;
  text-decoration: none;
}
.dropdown-menu li a:hover {
  background-color: #495057;
}
header nav ul li {
  list-style: none;
}
header nav ul li a:hover,
.welcome a:hover {
  color: #fff;
  border-bottom: 1px solid #fff;
  padding-bottom: 8px;
  transition: all 0.2s ease;
}
header nav ul {
  display: flex;
  gap: 1.75rem;
}
.navbar-brand {
  color: #fff;
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 2.5px;
  cursor: pointer;
}
.cart-icon {
  position: relative;
  cursor: pointer;
  margin-left: 1rem;
}

.item-count {
  position: absolute;
  top: -8px;
  right: -12px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0 6px;
  font-size: 0.8rem;
}
</style>
