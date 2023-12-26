<template>
  <div class="search-input-container">
    <SearchFrame
        v-model="searchValue"
        @search="handleSearch"
        @clear="handleClear"
        @SearchType="handleSearchType"
    >
      <template #dropdown>
        <SearchHistory
            v-if="tmp === '论文' && !searchValue"
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
const SearchType = ref(searchStore.searchType)
const searchValue = ref(searchStore.searchInput);
const router = useRouter();
const tmp = ref()
const ifSearch = ref();
const is_works = ref()
defineExpose({ifSearch})
const emit = defineEmits(["getInput"])
onMounted(()=>{
  tmp.value = searchStore.searchType
})
async function handleSearch(InputValue,type){
  searchValue.value = InputValue;
  console.log("input:"+searchValue.value)
	if(type === "论文"){
		type = "article";
	}else if(type === "科研人员"){
		type = "expert"
	}else if(type === "机构"){
		type = "institution"
	}else if(type === "领域"){
		type = "field"
	}else if(type === "出版社"){
		type = "publisher"
	}else if(type === "基金"){
		type = "funder"
	}else if(type === "来源"){
		type = "source"
	}
  if (InputValue)
  {
    ifSearch.value = InputValue;
    emit('getInput', ifSearch.value);
    searchStore.addHistory(InputValue);
    await router.push({
      path:"/search/"+type+"/",
      query:{
        content:InputValue
      }
    });
  }
}
const handleClear = () => {
  searchValue.value = '';
  searchStore.setSearchInput("");
}
const handleSearchType = (searchType) => {
  console.log(searchStore.searchType)
  tmp.value =searchType
  console.log(tmp.value)
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
