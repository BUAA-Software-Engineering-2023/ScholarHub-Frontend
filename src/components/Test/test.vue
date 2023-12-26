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
  width: 90%; /* 调整外层宽度，留出边距 */
  margin: 20px auto; /* 居中并添加上下边距 */
}

.paper-list-wrap {
  position: relative;
  margin-top: 20px; /* 添加顶部边距 */
}

.search-result__list {
  list-style: none;
  padding: 0;
  margin-top: 20px; /* 添加列表顶部边距 */
}

.result-item {
  margin-bottom: 15px; /* 每个项目之间的间距 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加轻微的阴影效果 */
  transition: box-shadow 0.3s; /* 平滑过渡效果 */
}

.result-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 鼠标悬停时的阴影效果 */
}

.el-menu-demo {
  background-color: #f2f2f2; /* 菜单背景色 */
  border-radius: 5px; /* 边框圆角 */
  margin-bottom: 20px; /* 菜单与列表之间的间距 */
}

.el-menu-item {
  color: #333; /* 菜单项字体颜色 */
  font-weight: bold; /* 字体加粗 */
}

.pagination-wrap {
  margin-top: 20px; /* 分页组件顶部边距 */
  padding-bottom: 20px; /* 分页组件底部边距 */
}

.el-pagination {
  font-size: 14px; /* 分页组件字体大小 */
}
</style>
