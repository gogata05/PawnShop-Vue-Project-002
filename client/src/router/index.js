// client\src\router\index.js
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../store/userStore";
const PageHome = () => import("../views/PageHome.vue");
const PageLogin = () => import("../views/PageLogin.vue");
const PageRegister = () => import("../views/PageRegister.vue");
const PageNotFound = () => import("../views/PageNotFound.vue");
const PageAddProduct = () => import("../views/PageAddProduct.vue");
const PageFindUs = () => import("../views/PageFindUs.vue");
const PageProducts = () => import("../views/PageProducts.vue");
const PageHelp = () => import("../views/PageHelp.vue");
const PageSearch = () => import("../views/PageSearch.vue");
const PageProductDetails = () => import("../views/PageProductDetails.vue");
const PageEditProduct = () => import("../views/PageEditProduct.vue");

function validateUser() {
  const userStore = useUserStore();
  return userStore.isAuthenticated ? userStore.isAuthenticated : { path: "/user/login" };
}

const routes = [
  {
    path: "/",
    component: PageHome,
    name: "Home"
  },
  {
    path: "/all-products",
    component: PageProducts,
    name: "AllProducts"
  },
  {
    path: "/top-10",
    component: PageProducts,
    name: "Top10"
  },
  {
    path: "/add",
    component: PageAddProduct,
    name: "AddProduct",
    beforeEnter: validateUser
  },
  {
    path: "/find-us",
    name: "FindUs",
    component: PageFindUs
  },
  {
    path: "/user/login",
    component: PageLogin,
    name: "Login",
    beforeEnter: isLoggedIn
  },
  {
    path: "/user/register",
    component: PageRegister,
    name: "Register",
    beforeEnter: isLoggedIn
  },
  {
    path: "/help",
    component: PageHelp,
    name: "Help"
  },
  {
    path: "/search",
    component: PageSearch,
    name: "Search"
  },
  {
    path: "/product/:id",
    component: PageProductDetails,
    name: "ProductDetails"
  },
  {
    path: "/edit/:id",
    component: PageEditProduct,
    name: "EditProduct",
    beforeEnter: validateUser
  },
  { path: "/:pathMatch(.*)*", component: PageNotFound, name: "404" }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
