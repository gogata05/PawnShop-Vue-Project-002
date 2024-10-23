<!-- client\src\components\SearchBar.vue -->
<template>
  <div class="search-bar">
    <input type="text" v-model="query" @keyup.enter="handleSearch" placeholder="Search for products..." />
    <button @click="handleSearch">Search</button>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      query: ""
    };
  },
  methods: {
    handleSearch() {
      if (this.query.trim() !== "") {
        // Emit the search query to the parent component
        this.$emit("search", this.query);
      }
    }
  }
};
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-bar input {
  width: 300px;
  padding: 10px;
  border: 2px solid #1f872d;
  border-radius: 4px 0 0 4px;
  outline: none;
}

.search-bar button {
  padding: 10px 20px;
  border: 2px solid #1f872d;
  background-color: #1f872d;
  color: #fff;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-bar button:hover {
  background-color: #166d23;
}
</style>
