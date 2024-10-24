<!-- client\src\views\PageManageAccount.vue -->
<template>
  <div class="manage-account">
    <h2>Manage Account</h2>
    <form @submit.prevent="updateAccount">
      <div>
        <label for="firstName">First Name</label>
        <input v-model="form.firstName" id="firstName" type="text" required />
      </div>
      <div>
        <label for="lastName">Last Name</label>
        <input v-model="form.lastName" id="lastName" type="text" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input v-model="form.email" id="email" type="email" required />
      </div>
      <!-- Добавено Current Password -->
      <div>
        <label for="currentPassword">Current Password</label>
        <input v-model="form.currentPassword" id="currentPassword" type="password" required />
      </div>
      <!-- Променено New Password -->
      <div>
        <label for="newPassword">New Password</label>
        <input v-model="form.newPassword" id="newPassword" type="password" />
      </div>
      <div>
        <label for="confirmPassword">Confirm New Password</label>
        <input v-model="form.confirmPassword" id="confirmPassword" type="password" />
      </div>
      <button type="submit">Update Account</button>
    </form>
    <div class="message" v-if="message">{{ message }}</div>
    <div class="error" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getProfile, logoutUser } from "../dataProviders/auth";
import { useUserStore } from "../store/userStore";
import axiosInstance from "../configs/axios";
import { useRouter } from "vue-router"; // Импортирайте useRouter

export default {
  name: "PageManageAccount",
  setup() {
    const userStore = useUserStore();
    const router = useRouter(); // Дефинирайте router
    const form = ref({
      firstName: "",
      lastName: "",
      email: "",
      currentPassword: "", // Добавено за текуща парола
      newPassword: "",
      confirmPassword: ""
    });
    const originalEmail = ref(""); // Добавено за съхранение на оригиналния имейл
    const message = ref("");
    const error = ref("");

    onMounted(async () => {
      // Заредете текущите данни на потребителя
      const profile = await getProfile();
      if (profile) {
        form.value.firstName = profile.firstName;
        form.value.lastName = profile.lastName;
        form.value.email = profile.email;
        originalEmail.value = profile.email; // Съхранете оригиналния имейл
      }
    });

    const updateAccount = async () => {
      // Проверка на текущата парола
      if (!form.value.currentPassword) {
        error.value = "Current password is required!";
        return;
      }

      // Проверка на новата парола и потвърждение
      if (form.value.newPassword || form.value.confirmPassword) {
        if (form.value.newPassword !== form.value.confirmPassword) {
          error.value = "Passwords do not match!";
          return;
        }
      }

      try {
        const response = await axiosInstance.put(`/users/profile/${userStore.id}`, {
          firstName: form.value.firstName,
          lastName: form.value.lastName,
          email: form.value.email,
          currentPassword: form.value.currentPassword, // Изпращане на текущата парола
          ...(form.value.newPassword && { password: form.value.newPassword }) // Опционално нова парола
        });
        message.value = response.data.message;
        error.value = "";

        // Проверете дали имейлът или паролата са променени
        const isEmailChanged = form.value.email !== originalEmail.value;
        const isPasswordChanged = !!form.value.newPassword;

        if (isEmailChanged || isPasswordChanged) {
          userStore.logout();
          await logoutUser(); // Изчистете токена от сървъра
          router.push("/user/login"); // Използвайте router вместо this.$router
        }
      } catch (err) {
        error.value = err.response.data.error || "An error occurred.";
        message.value = "";
      }
    };

    return {
      form,
      updateAccount,
      message,
      error
    };
  }
};
</script>

<style scoped>
.manage-account {
  max-width: 500px;
  margin: 2rem auto;
  margin-top: 70px;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}
.manage-account h2 {
  text-align: center;
  margin-bottom: 1rem;
}
.manage-account form div {
  margin-bottom: 1rem;
}
.manage-account label {
  display: block;
  margin-bottom: 0.5rem;
}
.manage-account input {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}
.manage-account button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
}
.message {
  margin-top: 1rem;
  color: green;
  text-align: center;
}
.error {
  margin-top: 1rem;
  color: red;
  text-align: center;
}
</style>
