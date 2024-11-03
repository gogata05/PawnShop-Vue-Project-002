<!-- client\src\components\PageFooter.vue -->
<template>
  <footer :class="footerClasses">
    <div class="container">
      <section class="footer-section">
        <ul class="footer-links">
          <li>
            <i :class="['fas', 'fa-phone', iconColors]" aria-hidden="true"></i>
            <p>Call +359 899 999 999</p>
          </li>
          <li>
            <i :class="['fas', 'fa-envelope', iconColors]" aria-hidden="true"></i>
            <p>support@pawnshop.com</p>
          </li>
          <li>
            <router-link to="/help" class="router-link-custom">
              <i :class="['fas', 'fa-question-circle', iconColors]" aria-hidden="true"></i>
              <p>Help</p>
            </router-link>
          </li>
          <li>
            <router-link to="/find-us" class="router-link-custom">
              <i :class="['fas', 'fa-map-marker-alt', iconColors]" aria-hidden="true"></i>
              <p>Find Us</p>
            </router-link>
          </li>
        </ul>

        <div class="combined-links">
          <router-link to="/all-products" class="hover-underline">All Products</router-link>
          <router-link to="/top-10" class="hover-underline">Top 10 Products</router-link>
          <router-link to="/favorites" class="hover-underline">My Favourites</router-link>
          <router-link to="/add" class="hover-underline">Add Product</router-link>
        </div>
        <div class="combined-links">
          <router-link to="/all-products" class="hover-underline">All Products</router-link>
          <router-link to="/top-10" class="hover-underline">Top 10 Products</router-link>
          <router-link to="/favorites" class="hover-underline">My Favourites</router-link>
          <router-link to="/add" class="hover-underline">Add Product</router-link>
        </div>

        <div class="social-links">
          <p>Stay in Touch</p>
          <div class="social-icons">
            <a href="https://www.instagram.com" class="social-icon"><i :class="['fab', 'fa-instagram', iconColors]" aria-hidden="true"></i></a>
            <a href="https://www.facebook.com" class="social-icon"><i :class="['fab', 'fa-facebook', iconColors]" aria-hidden="true"></i></a>
            <a href="https://www.linkedin.com" class="social-icon"><i :class="['fab', 'fa-linkedin', iconColors]" aria-hidden="true"></i></a>
          </div>
        </div>
      </section>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      pathname: this.$route.path,
      specialPages: ["/sign-in", "/create-account", "/add", "/admin", "/forgot-password", "/reset-password", "/help"]
    };
  },
  computed: {
    isSpecialPage() {
      return this.specialPages.some(page => this.pathname.startsWith(page));
    },
    footerClasses() {
      return {
        "footer-hidden": this.isSpecialPage,
        "footer-visible": !this.isSpecialPage
      };
    },
    iconColors() {
      return "text-white";
    }
  }
};
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.hover-underline:hover {
  text-decoration: underline;
}

footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #13294b;
  color: white;
  width: 100%;
}

.footer-visible {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.footer-section {
  display: flex;
  gap: 200px;
  align-items: flex-start;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
  margin-top: 0px;
}

.footer-links li {
  display: flex;
  align-items: center;
  gap: 10px;
}

.combined-links {
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: center; /* or flex-start */
}

.social-links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.social-links a {
  margin-right: 15px;
  color: white;
}

.social-links p {
  margin-bottom: 10px;
}

.social-icon {
  font-size: 1.5em;
  display: flex;
  align-items: center;
}

.router-link-custom {
  display: flex;
  align-items: center;
  gap: 10px;
}

.router-link-custom p {
  margin: 0;
  display: inline;
}

.router-link-custom i {
  margin-right: 10px;
}
.social-icons {
  display: flex;
  gap: 10px;
}
</style>
