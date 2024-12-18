// client\src\router\index.js
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../store/userStore";
import PageHome from "../views/PageHome.vue";
import PageLogin from "../views/PageLogin.vue";
import PageRegister from "../views/PageRegister.vue";
import PageNotFound from "../views/PageNotFound.vue";
import PageAddProduct from "../views/PageAddProduct.vue";
import PageEditProduct from "../views/PageEditProduct.vue";
import PageFindUs from "../views/PageFindUs.vue";
import PageTop10 from "../views/PageTop10.vue";
import PageProductDetails from "../views/PageProductDetails.vue";
import PageHelp from "../views/PageHelp.vue";
import PageSearch from "../views/PageAllProducts.vue";
import PageManageAccount from "../views/PageManageAccount.vue";
import PageCart from "../views/PageCart.vue";
import PageSuccess from "../views/PageSuccess.vue";
import PageOrders from "../views/PageOrders.vue";
import PageFavorites from "../views/PageFavorites.vue";
import PageOrderSummary from "../views/PageOrderSummary.vue";
// import PageServerError from "../views/PageServerError.vue";

function validateUser() {
  const userStore = useUserStore();
  const userId = localStorage.getItem("id");
  return userId ? true : { path: "/user/login" };
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
    component: PageSearch,
    name: "AllProducts"
  },
  {
    path: "/top-10",
    component: PageTop10,
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
  {
    path: "/favorites",
    name: "Favorites",
    component: PageFavorites,
    meta: { requiresAuth: true }
  },
  {
    path: "/order-summary",
    name: "OrderSummary",
    component: () => import("../views/PageOrderSummary.vue"),
    meta: { requiresAuth: true }
  },
  // {
  //   path: "/server-error",
  //   component: PageServerError,
  //   name: "ServerError"
  // },
  { path: "/:pathMatch(.*)*", component: PageNotFound, name: "404" }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  // Skip authentication checks if going to server error page
  // if (to.name === "ServerError") {
  //   next();
  //   return;
  // }

  const userStore = useUserStore();

  if (to.meta.requiresAuth) {
    if (!userStore.isAuthenticated) {
      await userStore.getPersistedProfile();
      if (!userStore.isAuthenticated) {
        next({ name: "Login" });
        return;
      }
    }
  }
  next();
});

export default router;
