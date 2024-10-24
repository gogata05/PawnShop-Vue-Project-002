<!-- client\src\components\CollapsibleItem.vue -->
<template>
  <div class="collapsible-item">
    <div class="collapsible-header" @click="toggleOpen">
      <p class="collapsible-title">{{ title }}</p>
      <i :class="isOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
    </div>
    <transition name="slide">
      <div v-if="isOpen" class="collapsible-content">
        <p>{{ description }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
      console.log(this.isOpen ? "Dropdown opened" : "Dropdown closed");
    }
  }
};
</script>

<style scoped>
.collapsible-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  width: 36%;
}

.collapsible-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.collapsible-title {
  font-size: 20px;
  font-weight: bold;
}

i {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.collapsible-content {
  margin-top: 10px;
  font-size: 20px;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
