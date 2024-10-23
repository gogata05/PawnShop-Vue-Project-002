<!-- client/src/components/Loader.vue -->
<template>
  <div class="standard-loader-container">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.standard-loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5; /* Light background for contrast */
}

.spinner {
  width: 60px;
  height: 60px;
  border: 8px solid #e0e0e0;
  border-top: 8px solid #3498db; /* Primary color */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Spinner Animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
