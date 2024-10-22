<!-- client\src\views\PageRegister.vue -->
<script>
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength, sameAs, helpers } from "@vuelidate/validators";
import { mapActions } from "pinia";
import { loginUser } from "../dataProviders/auth";
import { useUserStore } from "../store/userStore";
import Alert from "../components/Alert.vue";

export default {
  components: { Alert },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      userData: {
        firstName: "",
        lastName: "",
        password: "",
        rePassword: "",
        email: ""
      },
      isLoading: false,
      backendError: null,
      errorNotification: false
    };
  },
  methods: {
    ...mapActions(useUserStore, ["login"]), // Променено от 'setProfile' на 'login'

    async onSubmit() {
      this.errorNotification = false;
      const isValid = await this.v$.$validate();
      if (isValid) {
        this.isLoading = true;
        const userData = await loginUser(this.userData, "register");
        if (userData.error) {
          this.backendError = userData.error;
          this.errorNotification = true;
        } else {
          this.login(userData); // Променено от 'setProfile' на 'login'
          this.$router.push("/all-products");
        }
        this.isLoading = false;
      }
    }
  },
  validations() {
    return {
      userData: {
        firstName: { required, minLength: minLength(2) },
        lastName: { required, minLength: minLength(2) },
        email: { required, email },
        password: { required, minLength: minLength(6) },
        rePassword: {
          required,
          minLength: minLength(6),
          sameAsPassword: helpers.withMessage("Both passwords must match!", sameAs(this.userData.password))
        }
      }
    };
  }
};
</script>

<template>
  <div class="registerContainer">
    <Alert v-if="errorNotification" :alert="backendError"></Alert>
    <div class="registerWrapper">
      <div class="registerText">
        <h2>REGISTER</h2>
        <p>Let's get you on board!</p>
      </div>
      <form @submit.prevent="onSubmit">
        <input v-model="v$.userData.firstName.$model" type="text" name="firstName" placeholder="First Name" :disabled="isLoading" :class="{ error: v$.userData.firstName.$errors.length > 0 }" />
        <div v-for="error of v$.userData.firstName.$errors" :key="error.$uid" class="input-errors">
          <div class="error-msg">
            {{ error.$message }}
          </div>
        </div>
        <input v-model="v$.userData.lastName.$model" type="text" name="lastName" placeholder="Last Name" :disabled="isLoading" :class="{ error: v$.userData.lastName.$errors.length > 0 }" />
        <div v-for="error of v$.userData.lastName.$errors" :key="error.$uid" class="input-errors">
          <div class="error-msg">
            {{ error.$message }}
          </div>
        </div>
        <input v-model="v$.userData.email.$model" text="email" name="email" placeholder="Email Address" :disabled="isLoading" :class="{ error: v$.userData.lastName.$errors.length > 0 }" />
        <div v-for="error of v$.userData.email.$errors" :key="error.$uid" class="input-errors">
          <div class="error-msg">
            {{ error.$message }}
          </div>
        </div>
        <input v-model="v$.userData.password.$model" type="password" name="password" placeholder="Password" :disabled="isLoading" :class="{ error: v$.userData.lastName.$errors.length > 0 }" />
        <div v-for="error of v$.userData.password.$errors" :key="error.$uid" class="input-errors">
          <div class="error-msg">
            {{ error.$message }}
          </div>
        </div>
        <input v-model="v$.userData.rePassword.$model" type="password" name="rePassword" placeholder="Repeat Password" :disabled="isLoading" :class="{ error: v$.userData.lastName.$errors.length > 0 }" />
        <div v-for="error of v$.userData.rePassword.$errors" :key="error.$uid" class="input-errors">
          <div class="error-msg">
            {{ error.$message }}
          </div>
        </div>
        <button :disabled="isLoading">Register</button>
      </form>
      <div class="formLink">
        <span>Already have an account?</span>
        <span><router-link to="/user/login">Sign In</router-link></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-msg {
  color: #dc3545;
  font-size: 16px;
}

.registerWrapper form input.error {
  border: 2px solid #dc3545;
}
.registerContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100vw;
  height: calc(100vh - (53px + 38px));
  margin-top: 53px;
  margin-bottom: 38px;
}

.registerContainer form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.registerContainer a,
.registerContainer span {
  color: #fff;
  padding-inline: 0.25rem;
}

.registerContainer button {
  margin: 1rem;
}

.registerWrapper {
  border: #212529da solid 1px;
  border-radius: 5%;
  -webkit-box-shadow: 0px 10px 1000px -7px #000000, 0px 3px 12px 6px rgba(224, 224, 224, 0.2);
  box-shadow: 0px 10px 1000px -7px #000000, 0px 3px 12px 6px rgba(224, 224, 224, 0.2);
  background-color: #212529da;
  padding: 1rem;
  width: 450px;
  min-width: 200px;
  min-height: 620px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.registerText {
  text-align: center;
  color: #fff;
  padding-bottom: 1.5rem;
}

.registerText p {
  padding: 0 3rem;
  color: hsla(0, 0%, 100%, 0.815);
}
.registerText h2 {
  font-size: 30px;
}

.registerWrapper form input {
  padding: 0.75rem;
  width: 20rem;
  border: unset;
  border-radius: 4px;
  margin: 0.2rem;
  font-size: 18px;
}
.registerWrapper button {
  background-color: #212529da;
  border: 1px solid #fff;
  border-radius: 4px;
  color: #fff;
  padding: 0.75rem;
  font-size: 18px;
  margin-bottom: 2rem;
}

.registerWrapper button:hover {
  color: #212529da;
  background-color: #fff;
  transition: all 0.45s ease;
}

.formLink span:last-child {
  font-weight: bold;
}

.formLink,
.registerText p {
  font-size: large;
}

.formLink span:first-child {
  color: hsla(0, 0%, 100%, 0.815);
}
</style>
