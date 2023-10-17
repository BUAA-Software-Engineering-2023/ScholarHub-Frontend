<template>
  <div class="search-container">
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
    <input class="search-input" type="text" placeholder="搜索一下...">
    <button class="search-btn">
      <el-icon><Search /></el-icon>
    </button>
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  background-color: #f4f4f5;
  padding: 5px;
  border-radius: 30px;
  border: 1px solid #ccc;
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
</style>
