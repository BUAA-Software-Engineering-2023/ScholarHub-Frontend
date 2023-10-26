<template>
  <div v-if="hints.length" class="history-dropdown">
    <div
        v-for="item in hints"
        :key="item"
        class="history-item"
        @click="selectItem(item)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import {Delete, DeleteFilled} from "@element-plus/icons-vue";
import {watchDebounced} from "@vueuse/core";
import Search from '@/api/search.js'
const props = defineProps({
  searchText: {
    type: String,
    required:true
  }
});
const hints = ref([])
const emits = defineEmits(['select', 'remove']);
const getHintData = async () => {
  if (!props.searchText) return;
  const result = await Search.autocomplete_source(props.searchText)
  console.log(props.searchText)
  console.log(result)
  let item;
  hints.value = []
  for (item in result.data.data)
  {
    hints.value.push(result.data.data[item].display_name)
    console.log(item)
  }
  // const result = await
}
watchDebounced(
    () => props.searchText,
    getHintData,
    {
      immediate: true,
      // 在 300 ms 内同一事件触发，不触发新的请求
      debounce : 300
    }
);
const selectItem = (item) => {
  emits('select', item);
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
  color: red;
  padding: 0;
  margin-right: 12px;
}
</style>
