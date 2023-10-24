<template>
  <div class="search-input-container">
    <SearchFrame
        v-model="searchValue"
        @search="handleSearch"
        @clear="handleClear"
    >
      <template #dropdown>
        <SearchHistory
            v-show="!searchValue"
            @select="handleSearch"
        />
        <SearchHint
            v-show="searchValue"
            :search-text="searchValue"/>
      </template>
    </SearchFrame>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchFrame from "@/components/Search/SearchFrame.vue";
import SearchHistory from "@/components/Search/SearchHistory.vue";
import SearchHint from "@/components/Search/SearchHint.vue";

const searchValue = ref('');


const handleSearch = (searchValue) => {
  console.log(searchValue)
};

const handleClear = () => {
  searchValue.value = '';
}


</script>

<style scoped>
.search-input-container {
  z-index: 999;
  width: 45%;
  box-sizing: border-box;
}
</style>
