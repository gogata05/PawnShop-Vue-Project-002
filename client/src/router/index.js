// client\src\router\index.js
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../store/userStore";
const PageHome = () => import("../views/PageHome.vue");
const PageLogin = () => import("../views/PageLogin.vue");
const PageRegister = () => import("../views/PageRegister.vue");
const PageNotFound = () => import("../views/PageNotFound.vue");
const PageUserProfile = () => import("../views/PageUserProfile.vue");
const PageAddProduct = () => import("../views/PageAddProduct.vue");
const PageEditProduct = () => import("../views/PageEditProduct.vue");
const PageFindUs = () => import("../views/PageFindUs.vue");
const PageProducts = () => import("../views/PageProducts.vue");
const PageProductDetails = () => import("../views/PageProductDetails.vue");
const PageHelp = () => import("../views/PageHelp.vue");
const PageSearch = () => import("../views/PageSearch.vue");
const PageManageAccount = () => import("../views/PageManageAccount.vue");

const PageCart = () => import("../views/PageCart.vue");
const PageSuccess = () => import("../views/PageSuccess.vue");
const PageOrders = () => import("../views/PageOrders.vue");

function validateUser() {
  const userStore = useUserStore();
  return userStore.isAuthenticated ? userStore.isAuthenticated : { path: "/user/login" };
}

function isLoggedIn() {
  const userStore = useUserStore();
  return userStore.isAuthenticated ? { path: "/user/profile" } : true;
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
    path: "/details/:id",
    component: PageProductDetails,
    name: "ProductDetails",
    children: [
      {
        path: "edit",
        component: PageEditProduct,
        name: "EditProduct",
        beforeEnter: validateUser
      }
    ]
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
    path: "/user/profile",
    component: PageUserProfile,
    name: "Profile",
    beforeEnter: validateUser
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
    path: "/user/manage-account",
    component: PageManageAccount,
    name: "ManageAccount",
    beforeEnter: validateUser
  },
  {
    path: "/cart",
    component: PageCart,
    name: "Cart",
    beforeEnter: validateUser
  },
  {
    path: "/success",
    component: PageSuccess,
    name: "Success",
    beforeEnter: validateUser
  },
  {
    path: "/user/orders",
    component: PageOrders,
    name: "Orders",
    beforeEnter: validateUser
  },
  { path: "/:pathMatch(.*)*", component: PageNotFound, name: "404" }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
