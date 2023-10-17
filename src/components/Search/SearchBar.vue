<template>
  <div class="search-input-container">
    <SearchFrame
        v-model="searchValue"
        @search="handleSearch"
        @clear="handleClear"
    >
      <template #dropdown>
        <SearchHistory
            :history="searchHistory"
            @select="handleSearch"
            @remove="removeHistoryItem"
        />
      </template>
    </SearchFrame>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchFrame from "@/components/Search/SearchFrame.vue";
import SearchHistory from "@/components/Search/SearchHistory.vue";

const searchValue = ref('');
const searchHistory = ref([]);
searchHistory.value = ["hhhh"]

const handleSearch = (searchValue) => {
  if (searchValue) {
    searchHistory.value.unshift(searchValue);
    if (searchHistory.value.length > 10) { // Limit to last 10 searches for example
      searchHistory.value.pop();
    }
  }
};

const handleClear = () => {
  searchValue.value = '';
}


const removeHistoryItem = (item) => {
  const index = searchHistory.value.indexOf(item);
  if (index !== -1) {
    searchHistory.value.splice(index, 1);
  }
};
</script>

<style scoped>
.search-input-container {
  z-index: 999;
  width: 45%;
  box-sizing: border-box;
}
</style>
