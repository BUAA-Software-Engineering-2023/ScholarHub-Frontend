<template>
  <div>
    <NavBar/>
    <div class="nav_outer">
      <div class="search-bar">
        <searchBar :ifFirst="ifFirst" @getInput="getInput"/>
      </div>
    </div>
    <div class="paper-list-wrap">
      <a-tabs style="margin-left:10px" v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="论文">
          <a-layout>
            <a-layout-sider :style="siderStyle" width="330" >
              <div class = "slideSearch">
                <a-menu
                    v-model:selectedKeys="state.selectedKeys"
                    style="width: 212px"
                    mode="inline"
                    :open-keys="state.openKeys"
                    :items="items"
                    @openChange="onOpenChange"
                >
                </a-menu>
              </div>
            </a-layout-sider>
            <a-layout>
              <a-layout-header :style="headerStyle">
                  <el-menu :default-active="activeIndex" class="result-item_1" mode="horizontal">
                    <el-menu-item index="1" @click="sortArticleByField">最新</el-menu-item>
                    <el-menu-item index="2">综合</el-menu-item>
                    <el-menu-item index="3">引用数</el-menu-item>
                  </el-menu>
              </a-layout-header>
              <a-layout-content :style="contentStyle">
                <ul class="search-result__list">
                  <div v-if="paperList">
                    <li class="result-item" v-for="(item, index) in paperList">
                      <a-card hoverable @click="getFullPaper(item)">
                        <ArticleCard :paper="item"/>
                      </a-card>
                    </li>
                  </div>
                  <div v-else>
                    <span >
                      No results !
                    </span>
                  </div>
                </ul>
              </a-layout-content>
            </a-layout>
            <a-layout-sider :style="siderStyle">
              To be added:ECharts
            </a-layout-sider>
          </a-layout>
        </a-tab-pane>
        <a-tab-pane key="2" tab="专家" force-render>
	        <a-table :columns="columns" :data-source="data" size="small" :pagination="false" class="filterBar" bordered>
		        <template #headerCell="{ column }">
			        <template v-if="column.key === 'name'" >
				        <span>
					        <a class="filter">
					            筛选项
				            </a>
				        </span>
			        </template>
		        </template>
		        <template #bodyCell="{ column, record }">
			        <template v-if="column.key === 'tags'">
				        <span>
				          <a-checkable-tag
					          v-for="tag in record.tags"
					          :key="tag"
					          @click=""
					          class="filter"
				          >
				            {{ tag }}
				          </a-checkable-tag>
				        </span>
			        </template>
		        </template>
	        </a-table>
	        <a-layout>
		        <a-layout-sider :style="siderStyle" width="330" >
			        <div class = "slideSearch">
				        <a-menu
					        v-model:selectedKeys="state.selectedKeys"
					        style="width: 212px"
					        mode="inline"
					        :open-keys="state.openKeys"
					        :items="items"
					        @openChange="onOpenChange"
				        >
				        </a-menu>
			        </div>
		        </a-layout-sider>
		        <a-layout-content :style="contentStyle">
			        <a-card hoverable style="margin-top: 20px;width: 93%" v-for="person in people">
				        <template #actions>
					        <setting-outlined key="setting" />
					        <edit-outlined key="edit" />
					        <ellipsis-outlined key="ellipsis" />
				        </template>
				        <a-card-meta :title=person.title :description=person.description>
					        <template #avatar>
						        <a-avatar src="https://joeschmoe.io/api/v1/random" />
					        </template>
				        </a-card-meta>
			        </a-card>
		        </a-layout-content>
	        </a-layout>
        </a-tab-pane>
		
      </a-tabs>
	    
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
  </div>
</template>

<script setup>
import SearchBar from "@/components/Search/SearchBar.vue";
import NavBar from "@/views/search/NavBar/NavBar.vue";
import ArticleCard from "@/views/search/ArticleCard.vue";
import SearchAPI from "@/api/search.js"

const contentStyle = {
  paddingleft:'200px',
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',

  backgroundColor: '#fff',
};
const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  backgroundColor: '#fff',
};
const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#fff',
};
const searchRef = ref(null);
import { AntDesignOutlined } from '@ant-design/icons-vue';
const activeKey = ref('1');
const emit = defineEmits(["changePage"]);
const pageCurrent = ref(1);
const paperList = ref([]);
const sortKey = ref(['1'])
const ifFirst = ref(true);
const firstInput = ref();
const searchContent = ref();
const getInput = (value) => {//获取输入框的输入
  searchContent.value = value;
  console.log("searchContent:::",searchContent.value);
}
async function getPapers(){//获取论文列表
  console.log("searchContent:"+searchContent.value)
  const result = await SearchAPI.search(searchContent.value)
  console.log("result:", result)
  paperList.value = result.data.data.result;
  console.log("paperlist:", paperList.value);
}


onMounted(async ()=>{//初始渲染论文列表
  const route = useRoute();
  console.log(route.query.content);
  const result = await SearchAPI.search(route.query.content)
  console.log("result:", result)
  paperList.value = result.data.data.result;
  console.log("paperlist:", paperList.value);
})

watch(searchContent, async (newVal, oldVal) => {
  console.log("newVal:",newVal);
  console.log("oldVal:",oldVal);
  await getPapers();
})

function getFullPaper(item){
  const url = item.id;
  const parts = url.split('/');
  const paperId = parts[parts.length - 1]; // 获取最后一个部分
  console.log(paperId);
  router.push({
    path:`/client/paper/${paperId}`
  })
}

const changePage = () => {
  emit("changePage", pageCurrent.value);
};


import { MailOutlined, AppstoreOutlined, BankOutlined,ExperimentOutlined,PieChartOutlined } from '@ant-design/icons-vue';
import {useRoute} from "vue-router";
import router from "@/router/index.js";
function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	};
}
const filter = ref({"publication_year": ">2020"})
function setFilter(){

}
async function sortArticleByField(){
  const result = await SearchAPI.searchWithFilter(searchRef.value.ifSearch,filter.value)
  paperList.value = result.data.data.result;
  console.log("paperlist111:",paperList.value)
}

const items = reactive([
	getItem('职称', 'sub1', () => h(PieChartOutlined), [
		getItem('生命科学', '1', () => h(ExperimentOutlined)),
		getItem('数学', '2', () => h(ExperimentOutlined)),
		getItem('计算机科学', '3', () => h(ExperimentOutlined)),
		getItem('人工智能', '4', () => h(ExperimentOutlined)),
	]),
	getItem('机构', 'sub2', () => h(BankOutlined), [
		getItem('清华大学', '5'),
		getItem('北京航空航天大学', '6'),
		getItem('北京大学', '6'),
		getItem('南京大学', '6'),
	]),

]);
const state = reactive({
	rootSubmenuKeys: ['sub1', 'sub2'],
	openKeys: ['sub1'],
	selectedKeys: [],
});
const onOpenChange = openKeys => {
	const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);
	if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
		state.openKeys = openKeys;
	} else {
		state.openKeys = latestOpenKey ? [latestOpenKey] : [];
	}
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
  //font-size: 0.875rem;
}
.search-bar{
  width: 80%;
  margin: auto;
}

.filterBar{
	width: 90%;
	margin: auto;
}

.filter{
	font-family:"楷体";
	font-weight: bold;
	color: #1a1a1a;
}
.slideSearch{
	margin-top: 20px;
	margin-left:72px;
}

</style>