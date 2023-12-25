<template>
  <div class="search-input-container">
    <AdvancedSearchFrame
        v-model="searchValue"
        @search="handleSearch"
        @clear="handleClear"
        @get-adv="getAdv"
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
import {defineEmits, ref} from 'vue';
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
import {useRouter} from "vue-router";

const searchStore = useSearchStore();
const searchValue = ref(searchStore.searchInput);
const advContent = ref([])

const ifSearch = ref();
defineExpose({ifSearch})
const emit = defineEmits(["getInput", "getAdv"])
const props = defineProps(['inputStr'])
async function handleSearch(InputValue){
  searchValue.value = InputValue;
  console.log("input:"+searchValue.value)

  if (InputValue)
  {
    ifSearch.value = InputValue;
    emit('getInput', ifSearch.value);
    console.log("!!!!!");
    const result = await Search.search(InputValue);
    searchStore.addHistory(InputValue);
    searchStore.setSearchInput(InputValue)
    await router.push({
      path:"/search/article/",
      query:{
        content:InputValue
      }
    });
  }
}

const getAdv = (value) =>{
  advContent.value = value;
  console.log("advContent",advContent.value);
  emit("getAdv", advContent.value);
}

watch(advContent, ()=>{
  console.log("advContent",advContent.value);
  emit("getAdv", advContent.value);
})

const handleClear = () => {
  searchValue.value = '';
  searchStore.setSearchInput("");
}
const handleRemoveHistory = (history) =>{
  searchStore.deleteHistory(history);
}
const handleClearHistory = async () => {

}
onMounted(()=>{
  searchValue.value = props.inputStr;
})

watch(props, ()=>{
  searchValue.value = props.inputStr;
})

</script>

<style scoped>
.search-input-container {
  z-index: 999;
  width: 100%;
  box-sizing: border-box;
}
</style>
