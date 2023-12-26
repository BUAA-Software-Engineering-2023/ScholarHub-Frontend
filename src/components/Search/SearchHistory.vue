<template>
  <div v-if="searchStore.historyList.length" class="history-dropdown">
    <div class="history-header">
      <div class="history-left">
        <span class="history-record">历史记录</span>
      </div>
      <div class="history-right">
        <div v-if="searchStore.historyList.length" class="clear-all-btn" @click="clearAll">
          <span>一键清除所有</span>
        </div>
      </div>
    </div>
    <div
        v-for="item in searchStore.historyList"
        :key="item"
        class="history-item"
        @click="selectItem(item)"
    >
      <span >{{ item }}</span>
      <div class="delete-btn" @click.stop="removeItem(item)"><el-icon class="icon-hover"><DeleteFilled /></el-icon></div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import {Delete, DeleteFilled} from "@element-plus/icons-vue";
import {useSearchStore} from "@/stores/search.js";
import Swal from "sweetalert2";
const searchStore = useSearchStore();
const emits = defineEmits(['select']);

const selectItem = (item) => {
  emits('select', item,"论文");
};

const removeItem = (item) => {
  searchStore.deleteHistory(item)
};
const clearAll = () => {
  Swal.fire({
    title: '你确定要删除所有历史记录吗？',
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      searchStore.deleteAllHistory();
      Swal.fire('删除成功', '', 'success')
    }
  })
}
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
  text-align: left;
}
.history-record{
  font-weight: bold;
  font-size: 15px;
  line-height: 14px;
  color: #a1a1a8;
  background-color: #fff;
}
.history-item:hover {
  background-color: #ececec;
}

.delete-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-right: 12px;
  margin-top: auto;
  margin-bottom: auto;
}
button::after {
  border: none;
}
.icon-hover:hover {
   color: red;
 }
.clear-all-btn {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  z-index: 999;
  color: #18181b;
  background-color: #fff;
  text-align: right;
}

.clear-all-btn:hover {
  text-decoration: underline;
}
.history-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 5px 10px;
}


.history-right {
  flex-shrink: 0;
}

</style>
