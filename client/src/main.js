// client\src\main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import "./styles/reset.css";
import "./styles/style.css";
import App from "./App.vue";
import router from "./router";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import { useUserStore } from "./store/userStore";
import "@fortawesome/fontawesome-free/css/all.css";
import CollapsibleItem from "../src/components/CollapsibleItem.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./configs/fontawesome";
import { faShoppingCart, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "./configs/axios";

const app = createApp(App);
const pinia = createPinia();

library.add(faShoppingCart, faPlus, faMinus);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.use(pinia);
app.use(Toast);
const userStore = useUserStore();
userStore.getPersistedProfile();

app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  }
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.log("Axios error:", error);
    if (error.response?.status === 500 || !error.response) {
      console.log("Server error detected, redirecting...");
      // window.location.href = "/server-error";
    }
    return Promise.reject(error);
  }
);

app.mount("#app");

console.log("FontAwesomeIcon component registered successfully");
