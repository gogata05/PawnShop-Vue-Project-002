// client\src\router\index.js
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../store/userStore";
const PageHome = () => import("../views/PageHome.vue");
const PageLogin = () => import("../views/PageLogin.vue");
const PageRegister = () => import("../views/PageRegister.vue");
const PageNotFound = () => import("../views/PageNotFound.vue");

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
  { path: "/:pathMatch(.*)*", component: PageNotFound, name: "404" }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
