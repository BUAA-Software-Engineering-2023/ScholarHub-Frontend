<template>
  <div>
    <NavBar/>
    <div class="nav_outer">
      <div class="search-bar">
        <searchBar ref="searchRef"/>
      </div>
    </div>
    <div class="paper-list-wrap">
      <a-tabs style="margin-left:10px" v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="论文">
          <a-layout>
            <a-layout-sider :style="siderStyle">
              <div class = "slideSearch">
                <a-menu
                    v-model:selectedKeys="state.selectedKeys"
                    style="width: 212px"
                    mode="inline"
                    :open-keys="state.openKeys"
                    :items="ArticleItems"
                    @openChange="onOpenChange"
                >
                </a-menu>
              </div>
            </a-layout-sider>
            <a-layout>
              <a-layout-header :style="headerStyle">
                  <el-menu :default-active="activeIndex" class="result-item_1" mode="horizontal">
                    <el-menu-item index="1">最新</el-menu-item>
                    <el-menu-item index="2">综合</el-menu-item>
                    <el-menu-item index="3">引用数</el-menu-item>
                  </el-menu>
              </a-layout-header>
              <a-layout-content :style="contentStyle">
                <ul class="search-result__list">
                  <li class="result-item" v-for="(item, index) in paperList">
                    <a-card hoverable>
                      <ArticleCard :paper="item"/>
                    </a-card>
                  </li>
                </ul>
              </a-layout-content>
            </a-layout>
            <a-layout-sider :style="siderStyle">
              To be added:ECharts
            </a-layout-sider>
          </a-layout>
        </a-tab-pane>
        <a-tab-pane key="2" tab="专家" force-render>
	        <a-layout>
		        
		        <a-layout-sider :style="siderStyle" width="500" >
			        <div class = "slideSearch">
				        <a-menu
					        v-model:selectedKeys="state.selectedKeys"
					        style="width: 212px"
					        mode="inline"
					        :open-keys="state.openKeys"
					        :items="items"
					        @openChange="onOpenChange"
					        @click="ExFilterClick"
				        >
				        </a-menu>
			        </div>
		        </a-layout-sider>
		        <a-layout-content :style="contentStyle" v-if="update">
				        <a-menu :default-active="activeIndex" :items="ExpertSortitems" class="result-item_1" mode="horizontal" @click="ExSortClick">
					        <a-menu-item index="1" icon="DownOutlined">姓名</a-menu-item>
					        <a-menu-item index="2">引用量</a-menu-item>
					        <a-menu-item index="3">论文数量</a-menu-item>
				        </a-menu>
			        <li class = "ExpertRes" v-for="item in expertListPerPage" v-bind:key="item.id">
				        <a-card hoverable style="width: 80%;">
					        <ExpertCard :paper="item"/>
				        </a-card>
				    </li>
			        <a-pagination
				        v-model:current="current"
				        :total="25"
				        show-less-items />
		        </a-layout-content>
		        
	        </a-layout>
        </a-tab-pane>
		
      </a-tabs>
	    

    </div>
    <a-float-button-group shape="circle" :style="{ right: '24px' }">

      <a-back-top :visibility-height="0" />
    </a-float-button-group>
  </div>
</template>

<script setup>
import SearchBar from "@/views/search/Search/SearchBar.vue";
import NavBar from "@/views/search/NavBar/NavBar.vue";
import ArticleCard from "@/views/search/ArticleCard.vue";
import SearchAPI from "@/api/search.js"
const current = ref(1);
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
const result = ref();
const exResult = ref();
const searchRef = ref(null);
const activeKey = ref('1');
const emit = defineEmits(["changePage"]);
const pageCurrent = ref(1);
const paperList = ref();
const expertList = ref();
const expertListPerPage = ref();
const update = ref(true);
let LastKeyPath = null;


watch (current, async (newValue, oldValue) => {
	const tmp = expertList.value.slice((current.value-1)*10,current.value*10);
	expertListPerPage.value = tmp;
})
const ExFilterClick = async menuInfo => {
	if(LastKeyPath === menuInfo.keyPath){
		state.selectedKeys = [];
		await getExperts();
		LastKeyPath = null;
	}else {
		if (menuInfo.keyPath[0] == "region") {
			const filter = {
				'concepts.display_name': menuInfo.keyPath[1]
			}
			await getExpertsFiltered(filter);
		} else if (menuInfo.keyPath[0] == "country") {
			const filter = {
				'last_known_institution.country_code': menuInfo.keyPath[1]
			}
			await getExpertsFiltered(filter);
		}
		LastKeyPath = menuInfo.keyPath;
	}
}
const ExSortClick = async menuInfo => {
	let key = menuInfo.key;
	if(key === "name"){
		const sorted = {
			'display_name' : 'name'
		}
	}
	console.log(menuInfo);
	console.log("heiheihei");
}
async function getPapers(){
  result.value = await SearchAPI.search(searchRef.value.ifSearch)
  paperList.value = result.value.data.data.result;

}
async function getExperts(){
	exResult.value = await SearchAPI.searchExpert(searchRef.value.ifSearch)
	expertList.value = exResult.value.data.data.result;
	setFilterContent();
	//cut
	initExpertPage();
}
function initExpertPage(){
	const slice = expertList.value.slice(1, 10);
	expertListPerPage.value = slice;
	current.value = 1;
}
async function getExpertsFiltered(Region){
	exResult.value = await SearchAPI.searchExpertFiltered(searchRef.value.ifSearch,Region)
	expertList.value = exResult.value.data.data.result;
	setFilterContent();
	initExpertPage();
}
function setFilterContent(){
	let ExpertInstitution = [];
	let ExpertArea = [];
	for(let i=0;i<expertList.value.length;i++){
		const expert = expertList.value[i];
		if(expert.last_known_institution !=null) {
			if (!ExpertInstitution.includes(expert.last_known_institution.country_code)) {
				ExpertInstitution.push(expert.last_known_institution.country_code);
			}
		}
		if(expert.x_concepts !=null) {
			for(let j=0;j<expert.x_concepts.length;j++) {
				if (!ExpertArea.includes(expert.x_concepts[j].display_name)) {
					ExpertArea.push(expert.x_concepts[j].display_name);
				}
			}
		}
	}
	const titleItem = items.find(item => item.label === '国家');
	const institutionItem = items.find(item => item.label === '领域');
	// 将ExpertInstitution和ExpertArea添加到相应项的children属性中
	if (titleItem) {
		titleItem.children = ExpertInstitution.slice(0, 10).map(name => getItem(name, name,() => h(ExperimentOutlined)));
	}
	if (institutionItem) {
		institutionItem.children = ExpertArea.slice(0, 10).map(type => getItem(type, type,() => h(ExperimentOutlined)));
	}
}
onMounted(async ()=>{
  await getPapers()
  await getExperts()
})

onUpdated(async () => {
	await getPapers()
	await getExperts()
})

watch(
    () => searchRef.value && searchRef.value.ifSearch,
    async (value) => {
        await getPapers();
		await getExperts();
    }
);


import { MailOutlined, AppstoreOutlined, BankOutlined,ExperimentOutlined,PieChartOutlined,DownOutlined } from '@ant-design/icons-vue';
import ExpertCard from "@/views/search/ExpertCard.vue";
function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	};
}
const items = reactive([
	getItem('领域', 'region', () => h(PieChartOutlined), [
	]),
	getItem('国家', 'country', () => h(BankOutlined), [
	]),
]);
const ExpertSortitems = reactive([
	getItem('姓名', 'name',  ),
	getItem('引用量', 'cite',),
	getItem('论文数量', 'number',),
]);
const state = reactive({
	rootSubmenuKeys: ['region', 'country'],
	openKeys: ['region'],
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
}
.search-bar{
  width: 80%;
  margin: auto;
}

.filterBar{
	width: 80%;
	margin: auto;
}
.ExpertRes{
	margin-top: 20px;
}
.filter{
	font-family:"楷体";
	font-weight: bold;
	color: #1a1a1a;
}
.slideSearch{
	margin-top: 20px;
	margin-left: 35%;
}

</style>