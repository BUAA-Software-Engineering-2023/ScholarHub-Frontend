<template>
  <div>
    <NavBar/>
    <div class="nav_outer">
      <div class="search-bar">
        <searchBar/>
      </div>
    </div>
    <div class="paper-list-wrap">
      <el-tabs class="tab-position" type="border-card">
        <el-tab-pane label="论文">
          <ul class="search-result__list">
            <div>
              <el-menu :default-active="activeIndex" class="result-item_1" mode="horizontal">
                <el-menu-item index="1">最新</el-menu-item>
                <el-menu-item index="2">综合</el-menu-item>
                <el-menu-item index="3">引用数</el-menu-item>
              </el-menu>
            </div>
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
        </el-tab-pane>
        <el-tab-pane label="专家">
          牛逼wok
        </el-tab-pane>

      </el-tabs>


<!--      <ul class="search-result__list">-->
<!--        <div>-->
<!--          <el-menu :default-active="activeIndex" class="result-item_1" mode="horizontal">-->
<!--            <el-menu-item index="1">最新</el-menu-item>-->
<!--            <el-menu-item index="2">综合</el-menu-item>-->
<!--            <el-menu-item index="3">引用数</el-menu-item>-->
<!--          </el-menu>-->
<!--        </div>-->
<!--&lt;!&ndash;          <div class="hint">&ndash;&gt;-->
<!--&lt;!&ndash;            *由于结果数量超过10,000，出于实用性考虑，列表只会展示相关度排序的前10,000条&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--        &lt;!&ndash; 单个搜索结果卡片 &ndash;&gt;-->
<!--        <li class="result-item" v-for="(item, index) in paperList">-->
<!--          <el-card shadow = "hover">-->
<!--            <test2 :item="item"/>-->
<!--          </el-card>-->
<!--        </li>-->
<!--      </ul>-->
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
import NavBar from "@/views/search/NavBar/NavBar.vue";

const emit = defineEmits(["changePage"]);
const pageCurrent = ref(1);
// const props = defineProps({
//   paperList: Object,
//   pageTotalSize: Number,
// });
const paperList = ref([
  {id:'01',title:'a'},
  {id:'02',title:'b'},
  {id:'03',title:'c'},
  {id:'04',title:'c'},
  {id:'05',title:'c'},
])

const changePage = () => {
  emit("changePage", pageCurrent.value);
};
</script>

<style scoped>
body{
  padding: 0 !important;
  margin: 0 !important;
  align-items: center;
}
.nav_outer{
  width: 100%;
  min-width: 1280px;
  background-color: black;
  padding: 30px;
  margin: 0;
  left: 0 !important;
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
.search-result__list .result-item_1 {
  width: 100%;
  padding-right:1025px;
  display: inline-block;
  font-size: 0.875rem;
}
.search-result__list .result-item {
  width: 80%;
  display: inline-block;
  font-size: 0.875rem;
}
.search-bar{
  width: 80%;
  margin: auto;
}
.hint {
  margin: 20px;
  font-style: italic;
}
#app{
  margin: 0;
  padding: 0;
}
</style>