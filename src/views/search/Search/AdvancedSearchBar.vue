<template>
  <div class="search-input-container">
    <AdvancedSearchFrame
        v-model="searchValue"
        @search="handleSearch"
        @clear="handleClear"
    >
      <template #dropdown>
        <AdvancedSearchHint
            v-show="searchValue"
            :search-text="searchValue"
            @select="handleSearch"
        />
      </template>
    </AdvancedSearchFrame>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchFrame from "@/components/Search/SearchFrame.vue";
import SearchHistory from "@/components/Search/SearchHistory.vue";
import SearchHint from "@/components/Search/SearchHint.vue";
import Search from "@/api/search.js"
import {useSearchStore} from "@/stores/search.js";
import {getToken} from "@/utils/token.js";
import router from "@/router/index.js";
import Swal from "sweetalert2";
import AdvancedSearchFrame from "@/components/Search/AdvancedSearchFrame.vue";
import AdvancedSearchHint from "@/components/Search/AdvancedSearchHint.vue";

const searchStore = useSearchStore();
const searchValue = ref(searchStore.searchInput);
async function handleSearch(InputValue){
  searchValue.value = InputValue;
  if (InputValue)
  {
    const result = await Search.search(InputValue);
    searchStore.addHistory(InputValue);
    // searchStore.setSearchInput(InputValue)
  }
}
const handleClear = () => {
  searchValue.value = '';
  searchStore.setSearchInput("");
}
const handleRemoveHistory = (history) =>{
  searchStore.deleteHistory(history);
}
const handleClearHistory = async () => {

}

</script>

<style scoped>
.search-input-container {
  z-index: 999;
  width: 100%;
  box-sizing: border-box;
}
</style>
