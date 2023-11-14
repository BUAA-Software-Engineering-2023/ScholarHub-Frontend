<template>
  <div class="outer">
    <div>
      <searchBar/>
    </div>
    <div class="paper-list-wrap">
      <div>
        <span>
          搜索论文列表示例
        </span>
      </div>
      <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">最新</el-menu-item>
          <el-menu-item index="2">综合</el-menu-item>
          <el-menu-item index="3">引用数</el-menu-item>
        </el-menu>
      </div>
      <ul class="search-result__list">
<!--          <div class="hint">-->
<!--            *由于结果数量超过10,000，出于实用性考虑，列表只会展示相关度排序的前10,000条-->
<!--          </div>-->
        <!-- 单个搜索结果卡片 -->
        <li class="result-item" v-for="(item, index) in paperList">
          <el-card shadow = "hover">
            <test2 :item="item"/>
          </el-card>
        </li>
      </ul>
      <div class="pagination-wrap">
        <el-pagination
            layout="prev, pager, next"
            :total="pageTotalSize <= 10000 ? pageTotalSize : 10000"
            @current-change="changePage"
            v-model:current-page="pageCurrent"
            hide-on-single-page
            :page-sizes="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
        />
      </div>
    </div>
  </div>>
</template>

<script setup>
import test2 from "@/components/Test/test2.vue";
import SearchBar from "@/components/Search/SearchBar.vue";

const emit = defineEmits(["changePage"]);
const pageCurrent = ref(1);
// const props = defineProps({
//   paperList: Object,
//   pageTotalSize: Number,
// });
const paperList = ref([
  {id:'01',title:'a'},
  {id:'02',title:'b'},
  {id:'03',title:'c'}
])

const changePage = () => {
  emit("changePage", pageCurrent.value);
};
</script>

<style scoped>
.outer {
  width: 100% !important;
}
.paper-list-wrap {
  width: 100%;
  position: relative;
  margin: 0 auto;
}

.pagination-wrap {
  margin-top: 5%;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 36px;
}

.search-result__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.search-result__list .result-item {
  width: 100%;
  display: inline-block;
  font-size: 0.875rem;
}

.hint {
  margin: 20px;
  font-style: italic;
}
</style>