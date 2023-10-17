<template>
  <div v-if="history.length" class="history-dropdown">
    <span class="history-record">历史记录</span>
    <div
        v-for="item in history"
        :key="item"
        class="history-item"
    >
      <span @click="selectItem(item)">{{ item }}</span>
      <button class="delete-btn" @click.stop="removeItem(item)"><el-icon style="color: red"><DeleteFilled /></el-icon></button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import {Delete, DeleteFilled} from "@element-plus/icons-vue";

const props = defineProps({
  history: {
    type: Array,
    default: () => [],
  }
});

const emits = defineEmits(['select', 'remove']);

const selectItem = (item) => {
  emits('select', item);
};

const removeItem = (item) => {
  emits('remove', item);
};
</script>

<style scoped>
.history-dropdown {
  background-color: #fff;
  border: 1px solid #ccc;
  max-height: 200px;
  margin-top: 3px;
  margin-left: 100px;
  margin-right: 30px;
  border-radius: 5px;
  overflow-y: auto;
  box-shadow: 2px 2px 2px #a0a5a8;
}

.history-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  cursor: pointer;
  z-index: 999;
  color: #18181b;;
  background-color: #fff;
}
.history-record{
  color: #5a5a5a;
  background-color: #fff;
}
.history-item:hover {
  background-color: #ececec;
}

.delete-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: red;
  padding: 0;
  margin-right: 12px;
}
</style>
