<template>
  <div ref="searchContainerTarget" class="search-container">
    <a-space class="search-type">
      <a-select
          ref="select"
          v-model:value="value1"
          :bordered=false
          style="width: 100px;"
          :options="options1"
          @change="handleChange"
      >
      </a-select>
    </a-space>
    <div class="search-divider"></div>
    <input @keyup.enter="search" v-model="searchValue" @focus="onFocusHandler" class="search-input" type="text" placeholder="搜索一下...">
    <button class="delete-btn" @click="clearSearchValue"><keep-alive> <el-icon v-show="searchValue"><Close /></el-icon></keep-alive></button>
    <button class="search-btn" @click="search">
      <el-icon class="search-icon"><Search /></el-icon>
    </button>
  </div>
  <transition name="slide">
    <div
        v-if="$slots.dropdown"
        v-show="isFocused"
        class="search-dropdown search-scrollbar"
    >
      <!-- scrollbar- 开头的是滚动条样式，要装插件 tailwind-scrollbar 详见tailwind.config.cjs -->
      <slot name="dropdown"/>
    </div>
  </transition>
</template>

<script setup>
import {Close, Search} from "@element-plus/icons-vue";
import { useVModel, onClickOutside } from '@vueuse/core';
import {useSearchStore} from "@/stores/search.js";
const value1 = ref(useSearchStore().searchType)
const options1 = ref([
  {
    value: '论文',
    label: '论文',
  },
  {
    value: '科研人员',
    label: '科研人员',
  },
  {
    value: '来源',
    label: '来源',
  },
  {
    value: '机构',
    label: '机构',
  },
  {
    value: '领域',
    label: '领域',
  },
  {
    value: '出版社',
    label: '出版社',
  },
  {
    value: '基金',
    label: '基金',
  },
]);
const isFocused = ref(false);
const searchContainerTarget = ref(null);
const AdvSearch = ref(true)
const CLEAR = 'clear';
const FOCUS = 'focus'
const SEARCH = 'search';
const INPUT = 'input';
const EMIT_UPDATE_MODEL_VALUE = 'update:modelValue';
// emits与props进行父子组件通信，保持searchValue一致
const emits = defineEmits([SEARCH, CLEAR, FOCUS, INPUT,EMIT_UPDATE_MODEL_VALUE,"SearchType"]);
const props = defineProps(
    {modelValue:{type:String,required:true}}
)
const searchValue = useVModel(props);
onClickOutside(searchContainerTarget, () => {
  isFocused.value = false;
});
const onFocusHandler = () => {
  isFocused.value = true;
};
// 监听输入框的变化

// 用常量定义、符合规范
const clearSearchValue = () =>{
  searchValue.value = '';
  emits(CLEAR,'')
}
const search = () =>{
  emits(SEARCH,searchValue.value,value1.value)
}
const handleChange = value => {
  useSearchStore().setSearchType(value)
  emits("SearchType",value)
};
</script>

<style scoped>
.search-container {
  display: flex;
  min-width: 400px;
  align-items: center;
  background-color: #f4f4f5;
  padding: 5px;
  border-radius: 30px;
  border: 2px solid #ccc;
  transition:all 0.2s linear 0s;
}

.search-container:hover{
  box-shadow: 2px 2px #5a5a5a;
}

.search-type {
  text-align: center;
  flex: 1;
  width: 100px;;
  border: none;
  border-radius: 16px 0 0 16px;
  background-color: #f4f4f5;
  font-size: 14px;
  color: #808080;
  outline: none;
}

.search-divider {
  width: 1px;
  height: 3vh;
  background-color: #e4e4e7;
}

.search-input {
  flex: 6;
  border: none;
  border-radius: 0;
  background-color: #f4f4f5;
  font-size: 14px;
  color: #18181b;
  outline: none;
}

.search-btn {
  color: black;
  background-color: #f4f4f5;
  border: none;
  border-radius: 0 16px 16px 0;
  cursor: pointer;
}
.delete-btn{
  border: none;
  background-color: #f4f4f5;
  color: black;
}
.search-icon{
  transition:all 0.2s linear 0s;
  font-size: 16px;
}
.search-icon:hover{
  font-size: 25px;
}
/* 去掉按钮的焦点样式 */
button:focus {
  outline: none;
  /* 可以将outline设置为none来去掉焦点时的边框 */
}
button{
  line-height: 0;
}
.slide-enter-active,
.slide-leave-active{
  transition: all .5s;
}
.slide-enter-from,
.slide-leave-to{
  opacity: 0;
  transform: translateY(40px);
}
</style>
