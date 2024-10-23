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
  </header>
</template>

<script>
import { useUserStore } from "../store/userStore";
import { logoutUser } from "../dataProviders/auth";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const userStore = useUserStore();
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
    const isCartPage = computed(() => route.name === "Cart");

    const redirectToHome = () => {
      router.push({ name: "Home" });
    };

    const handleLogout = async () => {
      userStore.logout();
      await logoutUser();
      router.push("/user/login");
    };

    return {
      showDropdown,
      toggleDropdown,
      container,
      isAuthenticated,
      email,
      redirectToHome,
      handleLogout,
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
</style>
