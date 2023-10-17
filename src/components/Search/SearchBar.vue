<template>
  <div class="search-input-container">
      <SearchFrame></SearchFrame>
  </div>
</template>
<script setup>
import {Edit, Search} from "@element-plus/icons-vue";
import SearchFrame from "@/components/Search/SearchFrame.vue";

</script>
<style scoped>
.search-input-container {
  width: 45%;
  box-sizing: border-box;
}
</style>