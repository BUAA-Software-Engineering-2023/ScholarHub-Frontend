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
            @remove="handleRemove"
        />
        <SearchHint
            v-show="searchValue"
            :search-text="searchValue"
            @select="handleSearch"
        />
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


const handleSearch = (InputValue) => {
  searchValue.value = InputValue;
  console.log(InputValue)
};

const handleClear = () => {
  searchValue.value = '';
}
const handleRemove = () =>{

}

</script>

<style scoped>
.search-input-container {
  z-index: 999;
  width: 100%;
  box-sizing: border-box;
}
</style>
