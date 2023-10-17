<template>
  <div ref="searchContainerTarget" class="search-container">
    <select class="search-type">
      <option>论文</option>
      <option>作者</option>
      <option>期刊会议</option>
      <option>摘要</option>
      <option>关键词</option>
      <option>学术领域</option>
      <option>名称</option>
    </select>
    <div class="search-divider"></div>
    <input v-model="searchValue" @focus="onFocusHandler" class="search-input" type="text" placeholder="搜索一下...">
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
const searchValue = ref('');
const isFocused = ref(false);
const searchContainerTarget = ref(null);
onClickOutside(searchContainerTarget, () => {
  isFocused.value = false;
});
const onFocusHandler = () => {
  isFocused.value = true;
  emits(FOCUS);
};
const CLEAR = 'clear';
const FOCUS = 'focus'
const SEARCH = 'search';
// 用常量定义、符合规范
const emits = defineEmits([SEARCH,CLEAR,FOCUS])
const props = defineProps({modelValue:{type:String,required:true}})
// emits与props进行父子组件通信，保持searchValue一致
const clearSearchValue = () =>{
  searchValue.value = '';
  emits(CLEAR,'')
}
const search = () =>{
  emits(SEARCH,searchValue.value)
}

</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  background-color: #f4f4f5;
  padding: 5px;
  border-radius: 30px;
  border: 2px solid #ccc;
  transition:all 0.2s linear 0s;
}

.search-container:hover{
  box-shadow: 10px 10px #4B70E2;
}

.search-type {
  text-align: center;
  flex: 1;
  width: 10px;;
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
