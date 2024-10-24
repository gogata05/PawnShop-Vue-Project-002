<!-- client\src\views\PageEditProduct.vue -->
<script>
import { editProduct, getProduct } from "../dataProviders/products";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, minValue, helpers } from "@vuelidate/validators";
import Alert from "../components/Alert.vue";
import { useToast } from "vue-toastification";

const validateLink = value => /^https?:\/\//i.test(value);

export default {
  components: { Alert },
  setup() {
    const toast = useToast();
    return { toast, v$: useVuelidate() };
  },
  data() {
    return {
      productData: {
        product: {
          brand: "",
          model: "",
          imgUrl: "",
          productType: "",
          year: "",
          description: "",
          condition: "",
          price: "",
          creator: ""
        }
      },
      isLoading: false,
      backendError: null,
      errorNotification: false
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
      this.productData = await getProduct(this.$route.params.id);
      this.isLoading = false;
    },
    async onSubmit() {
      this.errorNotification = false;
      const isValid = await this.v$.$validate();

      if (isValid) {
        this.isLoading = true;
        let productData = await editProduct(this.productData.product, this.productData.product._id);

        if (productData.error) {
          this.backendError = productData.error;
          this.errorNotification = true;
          this.isLoading = false;
          this.toast.error("Failed to edit product!");
        } else {
          this.isLoading = false;
          this.toast.success("Product edited successfully!");
          this.$router.push(`/details/${this.productData.product._id}`);
        }
      }
    }
  },
  validations() {
    return {
      productData: {
        product: {
          brand: { required, minLength: minLength(3) },
          model: { required, minLength: minLength(2) },
          imgUrl: {
            required,
            validateLink: helpers.withMessage("Please provide a valid link!", validateLink)
          },
          productType: { required, minLength: minLength(3) },
          year: { required, minValue: minValue(0) },
          description: { required, minLength: minLength(8) },
          condition: { required },
          price: { required, minminValue: minValue(0) }
        }
      }
    };
  }
};
</script>

<template>
  <section id="editProduct" class="fix">
    <Alert v-if="errorNotification" :alert="backendError"></Alert>
    <form @submit.prevent="onSubmit" class="container">
      <h3>Edit a Product</h3>

      <div class="brand-model">
        <div class="form-group">
          <label for="brand"> Brand </label>
          <input type="text" v-model="v$.productData.product.brand.$model" id="brand" class="form-control" name="brand" placeholder="Example: Rolex, Apple, etc." :disabled="isLoading" :class="{ error: v$.productData.product.brand.$errors.length > 0 }" />
          <div v-for="error of v$.productData.product.brand.$errors" :key="error.$uid">
            <div class="error-msg">
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="model"> Model </label>
          <input v-model="v$.productData.product.model.$model" type="text" id="model" name="model" class="form-control" placeholder="Example: Product Model Name/Number" :disabled="isLoading" :class="{ error: v$.productData.product.model.$errors.length > 0 }" />
          <div v-for="error of v$.productData.product.model.$errors" :key="error.$uid">
            <div class="error-msg">
              {{ error.$message }}
            </div>
          </div>
        </div>
      </div>

      <label for="imgUrl"> Product Image </label>
      <input v-model="v$.productData.product.imgUrl.$model" type="text" class="form-control" id="imgUrl" name="imgUrl" placeholder="https://..." :disabled="isLoading" :class="{ error: v$.productData.product.imgUrl.$errors.length > 0 }" />
      <div v-for="error of v$.productData.product.imgUrl.$errors" :key="error.$uid">
        <div class="error-msg">
          {{ error.$message }}
        </div>
      </div>

      <label for="productType"> Product Type </label>
      <select v-model="v$.productData.product.productType.$model" class="form-control" id="productType" name="productType" :disabled="isLoading" :class="{ error: v$.productData.product.productType.$errors.length > 0 }">
        <option disabled value="">Please select a product type</option>
        <option value="Jewelry">Jewelry</option>
        <option value="Electronics">Electronics</option>
        <option value="Watches">Watches</option>
        <option value="Art">Art</option>
        <option value="Collectibles">Collectibles</option>
        <option value="Coins & Currency">Coins & Currency</option>
        <option value="Other">Other</option>
      </select>
      <div v-for="error of v$.productData.product.productType.$errors" :key="error.$uid">
        <div class="error-msg">
          {{ error.$message }}
        </div>
      </div>

      <label for="year"> Year </label>
      <input v-model="v$.productData.product.year.$model" type="number" max="2024" step="1" id="year" name="year" class="form-control" placeholder="Example: 2014" :disabled="isLoading" :class="{ error: v$.productData.product.year.$errors.length > 0 }" />
      <div v-for="error of v$.productData.product.year.$errors" :key="error.$uid">
        <div class="error-msg">
          {{ error.$message }}
        </div>
      </div>
      <label for="description"> Description </label>
      <textarea
        v-model="v$.productData.product.description.$model"
        class="form-control"
        id="description"
        rows="3"
        name="description"
        placeholder="Enter a detailed description of the product..."
        :disabled="isLoading"
        :class="{
          error: v$.productData.product.description.$errors.length > 0
        }"
      ></textarea>
      <div v-for="error of v$.productData.product.description.$errors" :key="error.$uid">
        <div class="error-msg">
          {{ error.$message }}
        </div>
      </div>

      <label for="condition"> Condition</label>
      <select v-model="v$.productData.product.condition.$model" class="form-control" id="condition" name="condition" :disabled="isLoading" :class="{ error: v$.productData.product.condition.$errors.length > 0 }">
        <option disabled value="">Please select a condition</option>
        <option value="New">New</option>
        <option value="Like new">Like new</option>
        <option value="Used">Used</option>
      </select>
      <div v-for="error of v$.productData.product.condition.$errors" :key="error.$uid">
        <div class="error-msg">
          {{ error.$message }}
        </div>
      </div>

      <label for="price"> Price (in EURO) </label>
      <input v-model="v$.productData.product.price.$model" type="number" step="1" min="0" max="999999999999" class="form-control" id="price" name="price" placeholder="Example: 500" :disabled="isLoading" :class="{ error: v$.productData.product.price.$errors.length > 0 }" />
      <div v-for="error of v$.productData.product.price.$errors" :key="error.$uid">
        <div class="error-msg">
          {{ error.$message }}
        </div>
      </div>

      <input class="btn" type="submit" :disabled="isLoading" defaultValue="Edit" />
    </form>
  </section>
</template>

<style scoped>
.error-msg {
  color: #dc3545;
  font-size: 16px;
}

form .error {
  border: 2px solid #dc3545;
}
h3 {
  font-size: xx-large;
  padding-bottom: 2%;
  margin-top: -2%;
}
.container {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.brand-model {
  display: flex;
  justify-content: space-between;
}

label {
  display: block;
  margin-bottom: 4px;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  background-color: rgb(7, 74, 198);
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 2%;
}

.btn:hover {
  background-color: rgb(49, 98, 189);
}
.brand-model {
  display: flex;
  justify-content: space-between;
}

.brand-model .form-group {
  flex: 0 0 48%;
  margin-bottom: 10px;
}
.fix {
  padding-top: 70px;
  padding-bottom: 70px;
  margin: auto;
  display: block;
  align-items: center;
  justify-content: center;
  width: 100vh;
}

.fix::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.3;
  z-index: -1;
}
</style>
