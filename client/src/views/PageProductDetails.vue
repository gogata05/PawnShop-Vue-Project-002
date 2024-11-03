<!-- client\src\views\PageProductDetails.vue -->
<script>
import { getProduct, deleteProduct, likeProduct, dislikeProduct, toggleFavorite, comment } from "../dataProviders/products";
import { getProfile } from "../dataProviders/auth";
import Loader from "../components/Loader.vue";
import starsGenerator from "../helpers/starsGenerator";
import { useUserStore } from "../store/userStore";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";
import { useCartStore } from "../store/cartStore"; // Добавено импортиране
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart);

export default {
  components: { Loader },
  setup() {
    const userStore = useUserStore();
    const toast = useToast();
    return { userStore, toast };
  },
  data() {
    return {
      productData: {},
      isLoading: true,
      userData: { comment: "" },
      quantity: 1,
      isFavorite: false // Добавяме ново поле
    };
  },
  async created() {
    await this.loadData();
  },
  watch: {
    $route() {
      this.loadData();
    }
  },
  methods: {
    async loadData() {
      this.isLoading = true;
      
      // Зареждаме запазения статус от localStorage
      const favoriteProducts = JSON.parse(localStorage.getItem("favoriteProducts") || "{}");
      const savedStatus = favoriteProducts[this.$route.params.id];
      
      this.productData = await getProduct(this.$route.params.id);
      
      // Използваме запазения статус или статуса от сървъра
      this.productData.isInFavorites = savedStatus !== undefined 
        ? savedStatus 
        : this.productData.isInFavorites;
      
      this.isLoading = false;
    },
    async deleteProduct() {
      const isConfirmed = confirm("Are you sure you want to delete this product?");

      if (isConfirmed) {
        this.isLoading = true;
        await deleteProduct(this.productData.product._id);
        this.isLoading = false;
        this.toast.success("Product deleted successfully!");
        this.$router.push("/all-products");
      }
    },
    async likeProduct() {
      await likeProduct(this.productData.product._id);
      this.productData.product.rating++;
      this.productData.voted = true;
    },
    async dislikeProduct() {
      await dislikeProduct(this.productData.product._id);
      this.productData.product.rating--;
      this.productData.voted = true;
    },
    async toggleFavoriteStatus() {
      try {
        console.log("Toggling favorite status for product:", this.productData.product._id);
        const response = await toggleFavorite(this.productData.product._id);
        
        if (response) {
          // Обръщаме статуса локално
          this.productData.isInFavorites = !this.productData.isInFavorites;
          
          // Актуализираме localStorage
          const favoriteProducts = JSON.parse(localStorage.getItem("favoriteProducts") || "{}");
          favoriteProducts[this.productData.product._id] = this.productData.isInFavorites;
          localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
          
          // Актуализираме брояча в store
          this.userStore.favoritesCount = response.newCount;
          
          const message = this.productData.isInFavorites 
            ? "Product added to favorites!" 
            : "Product removed from favorites!";
          this.toast.success(message);
        }
      } catch (error) {
        console.error("Error toggling favorite:", error);
        this.toast.error("Failed to update favorites");
      }
    },
    async comment() {
      await comment(this.productData.product._id, this.userData);
      let user = await getProfile();
      this.productData.product.comments.unshift(`${user.firstName} ${user.lastName}: ${this.userData.comment}`);
      this.userData.comment = "";
    },
    addToCart() {
      const cartStore = useCartStore();
      cartStore.addToCart(this.productData.product, this.quantity);
    }
  },
  computed: {
    ...mapState(useUserStore, ["isAuthenticated"]),
    calculateStars() {
      return starsGenerator(this.productData.product.rating);
    },
    generateColor() {
      return {
        color: this.productData.product["rating"] === 0 ? "black" : this.productData.product["rating"] > 0 ? "orange" : "red"
      };
    }
  },
  // Добавяме cleanup при унищожаване на компонента
  beforeUnmount() {
    // Опционално: Изчистваме localStorage ако е необходимо
    // localStorage.removeItem("favoriteProducts");
  }
};
</script>

<template>
  <Loader v-if="isLoading"></Loader>
  <body v-else>
    <router-view></router-view>
    <div class="container">
      <div class="row-container">
        <div class="row">
          <div class="flex-container">
            <div class="project-info-box">
              <h2><b>Product Details</b></h2>
              <p id="productDescription">
                {{ productData.product.description }}
              </p>
            </div>
            <div class="project-info-box" id="productInfo">
              <p><b>Brand:</b> {{ productData.product.brand }}</p>
              <p><b>Model:</b> {{ productData.product.model }}</p>
              <p><b>Year:</b> {{ productData.product.year }}</p>
              <p><b>Product Type:</b> {{ productData.product.productType }}</p>
              <p><b>Condition:</b> {{ productData.product.condition }}</p>
              <p><b>Added by:</b> {{ productData.product.creator.firstName }} {{ productData.product.creator.lastName }} (contact for a deal)</p>
              <p><b>Price:</b> {{ productData.product.price }} EURO</p>
              <p>
                <b>Current product rating: </b><b :style="generateColor">{{ productData.product.rating }} {{ calculateStars }} </b>
              </p>
            </div>

            <!-- Новата част за количката и количеството -->
            <div class="project-info-box mybuttons" v-if="!productData.isOwnedBy && isAuthenticated">
              <div class="add-to-cart-container">
                <button class="cart-btn" @click="addToCart">Add to Cart</button>
                <input type="number" v-model.number="quantity" min="1" />
              </div>
            </div>

            <div v-if="isAuthenticated">
              <div class="project-info-box mybuttons" v-if="!productData.isOwnedBy">
                <button class="success-btn" @click="likeProduct" v-if="!productData.voted">Like</button>
                <button class="warning-btn" @click="dislikeProduct" v-if="!productData.voted">Dislike</button>
                <h3 v-if="productData.voted">Thank you for voting on this product!</h3>
              </div>
            </div>
            <div v-else class="project-info-box">
              <p>
                <b>
                  <router-link class="linktext" to="/user/login">Log-in</router-link>
                  or
                  <router-link class="linktext" to="/user/register">register</router-link>
                  to edit, rate or comment this product!
                </b>
              </p>
            </div>
          </div>
        </div>
        <div class="row img">
          <div class="flex-container">
            <div class="image-container">
              <div class="favorite-icon" v-if="isAuthenticated" @click="toggleFavoriteStatus">
                <font-awesome-icon :icon="['fas', 'heart']" :class="{ 'favorited': productData.isInFavorites }" />
              </div>
              <img :src="productData.product.imgUrl" alt="project-pic" class="rounded" />
            </div>
            <div id="wrapper" v-if="isAuthenticated">
              <form id="commentForm" @submit.prevent="comment">
                <textarea id="comment" rows="3" placeholder="Write a comment..." v-model="userData.comment" required></textarea>
                <input class="comment-btn" type="submit" value="Add Comment" />
              </form>
            </div>
            <div class="project-comment-box" id="commentsSection" v-if="productData.product.comments.length > 0">
              <h2 class="commentTitle">Comments:</h2>
              <p class="comment" v-for="comment of productData.product.comments">
                {{ comment }}
              </p>
            </div>
            <div v-if="productData.product.comments.length == 0" class="project-comment-box">
              <h3>Be the first to comment this product!</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<style scoped>
body {
  font-family: "Barlow", sans-serif;
  font-weight: 300;
  font-size: 1rem;
  color: #686c6d;
  letter-spacing: 0.03rem;
  margin: 0;
  padding: 0;
}
h2 {
  color: #000;
  margin-bottom: 0.5rem;
  margin-top: -0.5rem;
}

.container {
  padding-top: 100px;
  padding-bottom: 100px;
  margin: auto;
}

.row-container {
  display: flex;
  justify-content: center;
  gap: 26px;
}

.row {
  display: flex;
}

.img {
  padding-top: 0.65rem;
}

.flex-container {
  display: flex;
  flex-direction: column;
}

.project-info-box {
  margin: 10px 0;
  background-color: #fff;
  padding: 30px 40px;
  border-radius: 5px;
  max-width: 400px;
  word-wrap: break-word;
}
.linktext {
  color: black;
}
.project-comment-box {
  margin: 10px 0;
  background-color: #fff;
  padding: 30px 40px;
  border-radius: 5px;
  max-width: 1000px;
  word-wrap: break-word;
}

.project-info-box p,
.project-comment-box p {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #d5dadb;
}

.project-info-box p:last-child,
.project-comment-box p:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.rounded {
  border-radius: 5px;
}
.comment {
  font-weight: bold;
}
.comment:not(:last-child) {
  margin-bottom: 1rem;
}

.commentTitle {
  margin-bottom: 1.75rem;
  margin-top: -1rem;
}

#commentForm {
  margin-top: 20px;
}

.image-container {
  position: relative;
  width: 100%;
}

.favorite-icon {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 1;
  cursor: pointer;
  font-size: 24px;
  background: rgba(255, 255, 255, 0.7);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.favorite-icon:hover {
  transform: scale(1.1);
}

.favorite-icon svg {
  color: #ccc;
  transition: color 0.3s ease;
}

.favorite-icon svg.favorited {
  color: #ff4136;
}

.favorite-icon:hover svg {
  color: #ff4136;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

textarea {
  border-radius: 5px;
  padding: 0.4rem 0.8rem;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
  font-size: 1.15rem;
  border: none;
}

textarea:focus {
  outline: none;
  box-shadow: 0 0 14px #3590f1;
}
button,
.dark-btn {
  margin: 6px;
  width: 100%;
  text-align: center;
}
.mybuttons,
.dark-btn {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.comment-btn {
  padding: 10px 20px;
  background-color: #201f1f;
  color: #fff;
  float: right;
  font-size: large;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  margin-bottom: 26px;
}

.success-btn {
  background-color: #138e30;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.warning-btn {
  background-color: #ffc107;
  color: #000;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.fav-btn {
  background: linear-gradient(90deg, rgb(23, 0, 153) 0%, rgb(81, 53, 0) 50%, rgba(23, 0, 153) 100%);
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.dark-btn {
  background-color: #343a40;
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.danger-btn {
  background-color: #dc3545;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.add-to-cart-container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-right: 46px;
}

.add-to-cart-container input[type="number"] {
  width: 76px;
  padding: 5px;
}

.cart-btn {
  background-color: #007bff;
  color: #fff;
  padding: 10px 28px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Max width 1200px */
@media only screen and (max-width: 1200px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px 30px;
  }

  .row-container {
    gap: 20px;
    justify-content: space-between;
  }

  .project-info-box {
    max-width: 100%;
  }

  .image-container {
    max-width: 0%;
  }

  .image-container img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 5px;
  }

  .project-comment-box {
    max-width: 60%;
    padding: 20px 25px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  textarea {
    font-size: 1.1rem;
    padding: 10px;
    width: 100%;
  }

  .comment-btn,
  .success-btn,
  .warning-btn,
  .fav-btn,
  .dark-btn,
  .danger-btn,
  cart-btn {
    font-size: 1rem;
    padding: 10px 20px;
  }
}

@media only screen and (max-width: 768px) {
  .container {
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .row-container {
    flex-direction: column;
    gap: 10px;
  }

  .project-info-box,
  .project-comment-box {
    padding: 20px;
    max-width: 100%;
  }

  .image-container {
    min-width: 100%;
    height: auto;
  }

  .image-container img {
    width: 100%;
    height: auto;
  }

  textarea {
    font-size: 1rem;
  }

  .comment-btn,
  .success-btn,
  .warning-btn,
  .fav-btn,
  .dark-btn,
  .danger-btn,
  cart-btn {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
}

@media only screen and (max-width: 576px) {
  .container {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .project-info-box,
  .project-comment-box {
    padding: 15px;
  }

  .comment-btn,
  .success-btn,
  .warning-btn,
  .fav-btn,
  .dark-btn,
  .danger-btn,
  .cart-btn {
    font-size: 0.8rem;
    padding: 6px 12px;
  }

  textarea {
    font-size: 0.9rem;
  }
}

.mybuttons button,
.mybuttons .cart-btn {
  width: auto;
  flex: 1;
}
</style>
