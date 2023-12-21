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
import Search from "@/api/search.js"
import {useSearchStore} from "@/stores/search.js";
import {getToken} from "@/utils/token.js";
// import router from "@/router/index.js";
import Swal from "sweetalert2";
import {useRouter} from "vue-router"
import {defineEmits} from 'vue'

const searchStore = useSearchStore();
const searchValue = ref(searchStore.searchInput);
const router = useRouter();

const ifSearch = ref();
defineExpose({ifSearch})
const emit = defineEmits(["getInput"])

async function handleSearch(InputValue){
    searchValue.value = InputValue;
    console.log("input:"+searchValue.value)

    if (InputValue)
    {
      // const result = await Search.search(InputValue);
      ifSearch.value = InputValue;
      emit('getInput', ifSearch.value);
      console.log("!!!!!");
      searchStore.addHistory(InputValue);
      searchStore.setSearchInput(InputValue)
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

// const emit = defineEmits(['inputSearch'])
// const inputSearch = () =>{
//   let param = {
//     content:'x'
//   }
//   emit('inputSearch', param)
// }

</script>

<style scoped>
.search-input-container {
  z-index: 999;
  width: 100%;
  box-sizing: border-box;
}
</style>
