<template>
  <div>
    <NavBar/>
    <div class="nav_outer">
      <div class="search-bar">
        <searchBar ref="searchRef" @getInput="getInput"/>
      </div>
    </div>
    <div class="paper-list-wrap">
      <a-tabs style="margin-left:10px" v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="论文">
          <a-layout>
            <a-layout-sider :style="siderStyle" width="500" >
              <div class = "slideSearch">
                <a-menu
                    v-model:selectedKeys="ArticleState.selectedKeys"
                    style="width: 212px"
                    mode="inline"
                    :open-keys="ArticleState.openKeys"
                    :items="ArticleItems"
                    @openChange="onOpenChange"
                    @click="handleClickArticle"
                >
                </a-menu>
              </div>
            </a-layout-sider>
            <a-layout>
              <a-layout-header :style="headerStyle">
                  <el-menu :default-active="activeIndex" class="result-item_1" mode="horizontal">
                    <el-menu-item index="1" class="parent-container" @click="switchOrder(1)">
                      <span class="left-span">标题</span>
                      <div class="right-icons">
                        <CaretUpOutlined v-show="arrow1 % 3 === 1" class="control-icon"/>
                        <CaretDownOutlined v-show="arrow1 % 3 === 2" class="control-icon"/>
                      </div>
                    </el-menu-item>
                    <el-menu-item index="2" class="parent-container" @click="switchOrder(2)">
                      <span class="left-span">引用量</span>
                      <div class="right-icons">
                        <CaretUpOutlined v-show="arrow2 % 3 === 1" class="control-icon"/>
                        <CaretDownOutlined v-show="arrow2 % 3 === 2" class="control-icon"/>
                      </div>
                    </el-menu-item>
                    <el-menu-item index="3" class="parent-container" @click="switchOrder(3)">
                      <span class="left-span">出版时间</span>
                      <div class="right-icons">
                        <CaretUpOutlined v-show="arrow3 % 3 === 1" class="control-icon"/>
                        <CaretDownOutlined v-show="arrow3 % 3 === 2" class="control-icon"/>
                      </div>
                    </el-menu-item>
                    <el-menu-item index="4" class="parent-container" @click="switchOrder(4)">
                      <span class="left-span">出版年份</span>
                      <div class="right-icons">
                        <CaretUpOutlined v-show="arrow4 % 3 === 1" class="control-icon"/>
                        <CaretDownOutlined v-show="arrow4 % 3 === 2" class="control-icon"/>
                      </div>
                    </el-menu-item>
                    <el-menu-item index="5" class="parent-container" @click="switchOrder(5)">
                      <span class="left-span">相关度</span>
                      <div class="right-icons">
<!--                        <CaretUpOutlined v-show="arrow5 % 3 === 1" class="control-icon"/>-->
<!--                        <CaretDownOutlined v-show="arrow5 % 3 === 2" class="control-icon" />-->
                      </div>
                    </el-menu-item>
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
              <EchartsArticle :field="tranEfield"/>
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
					        @click="handleClickExpert"
				        >
				        </a-menu>
			        </div>
		        </a-layout-sider>
		        <a-layout-content :style="contentStyle" v-if="update">
			        <li class = "ExpertRes" v-for="item in expertList" v-bind:key="item.id">
				        <a-card hoverable style="width: 80%;">
					        <ExpertCard :paper="item"/>
				        </a-card>
				    </li>
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
import { MailOutlined, AppstoreOutlined, BankOutlined,ExperimentOutlined,PieChartOutlined } from '@ant-design/icons-vue';
import {useRoute} from "vue-router";
import router from "@/router/index.js";
import ExpertCard from "@/views/search/ExpertCard.vue";
import * as echarts from "echarts";

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
import { AntDesignOutlined } from '@ant-design/icons-vue';
import EchartsArticle from "@/views/search/EchartsArticle.vue";
const activeKey = ref('1');
const emit = defineEmits(["changePage"]);
const pageCurrent = ref(1);
const paperList = ref();
const expertList = ref();
const update = ref(true);

const sortKey = ref(['1']);
const searchContent = ref();
const Efield = ref([]);
const tranEfield = ref([]);
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


const arrow1 = ref(0)
const arrow2 = ref(0)
const arrow3 = ref(0)
const arrow4 = ref(0)
// const arrow5 = ref(0)
const activeIndex = ref("1")
async function switchOrder(sortType){
  let order = "";
  if(sortType === 1){
    arrow1.value ++;
    if(arrow1.value % 3 === 1){//上
      order = "asc";
    }else if(arrow1.value % 3 === 2){//下
      order = "desc";
    }else if(arrow1.value % 3 === 3){
      order = "";
    }
  }else if(sortType === 2){
    arrow2.value ++;
    if(arrow2.value % 3 === 1){//上
      order = "asc";
    }else if(arrow2.value % 3 === 2){//下
      order = "desc";
    }else if(arrow2.value % 3 === 0){
      order = "";
    }
  }else if(sortType === 3){
    arrow3.value ++;
    if(arrow3.value % 3 === 1){//上
      order = "asc";
    }else if(arrow3.value % 3 === 2){//下
      order = "desc";
    }else if(arrow3.value % 3 === 0){
      order = "";
    }
  }else if(sortType === 4){
    arrow4.value ++;
    if(arrow4.value % 3 === 1){//上
      order = "asc";
    }else if(arrow4.value % 3 === 2){//下
      order = "desc";
    }else if(arrow4.value % 3 === 0){
      order = "";
    }
  }
  // else if(sortType === 5){
  //   arrow5.value ++;
  //   if(arrow5.value % 3 === 1){//上
  //     order = "asc";
  //   }else if(arrow5.value % 3 === 2){//下
  //     order = "desc";
  //   }else if(arrow5.value % 3 === 0){
  //     order = "";
  //   }
  // }
  await searchWithSort(sortType, order);
}
async function searchWithSort(sortType, order){
  if(sortType === 1){
    let sort = {"display_name": "asc"}
    if(order === ""){
      const result = await SearchAPI.search(searchContent.value)
      console.log("sortResult:",result);
      console.log("res",result.data);
      paperList.value = result.data.data.result;
    }else{
      sort.display_name = order;
      const result = await SearchAPI.searchWithSort(searchContent.value, sort)
      console.log("sortResult:",result);
      console.log("res",result.data);
      paperList.value = result.data.data.result;
    }

  }else if(sortType === 2){
    let sort = {"cited_by_count": "asc"}
    if(order === ""){
      const result = await SearchAPI.search(searchContent.value)
      console.log("sortResult:",result);
      console.log("res",result.data);
      paperList.value = result.data.data.result;
    }else{
      sort.cited_by_count = order;
      const result = await SearchAPI.searchWithSort(searchContent.value, sort)
      console.log("sortResult:",result);
      console.log("res",result.data);
      paperList.value = result.data.data.result;
    }
  }else if(sortType === 3){
    let sort = {"publication_date": "asc"}
    if(order === ""){
      const result = await SearchAPI.search(searchContent.value)
      console.log("sortResult:",result);
      console.log("res",result.data);
      paperList.value = result.data.data.result;
    }else{
      sort.publication_date = order;
      const result = await SearchAPI.searchWithSort(searchContent.value, sort)
      console.log("sortResult:",result);
      console.log("res",result.data);
      paperList.value = result.data.data.result;
    }
  }else if(sortType === 4){
    let sort = {"publication_year": "asc"}
    if(order === ""){
      const result = await SearchAPI.search(searchContent.value)
      console.log("sortResult:",result);
      console.log("res",result.data);
      paperList.value = result.data.data.result;
    }else{
      sort.publication_year = order;
      const result = await SearchAPI.searchWithSort(searchContent.value, sort)
      console.log("sortResult:",result);
      console.log("res",result.data);
      paperList.value = result.data.data.result;
    }
  }else if(sortType === 5){
    let sort = {"relevance_score": "12"}
    // if(order === ""){
    //   const result = await SearchAPI.search(searchContent.value)
    //   console.log("sortResult:",result);
    //   console.log("res",result.data);
    //   paperList.value = result.data.data.result;
    // }else{
      const result = await SearchAPI.search(searchContent.value)
      console.log("sortResult:",result);
      console.log("res",result.data);
      paperList.value = result.data.data.result;
    // }
  }


}

const handleClickArticle = async menuInfo => {
  console.log('click ');
  console.log('click ', menuInfo.keyPath[1]);

  if (menuInfo.keyPath[0] == "region") {
    const filter ={
      'concepts.display_name':menuInfo.keyPath[1]
    }
    await getArticlesFiltered(filter);
  } else if (menuInfo.keyPath[0] == "language") {
    const filter ={
      'language':menuInfo.keyPath[1]
    }
    await getArticlesFiltered(filter);
  }else if(menuInfo.keyPath[0] == "institution"){
    const filter ={
      'authorships.institutions.display_name':menuInfo.keyPath[1]
    }
    await getArticlesFiltered(filter);
  }else if(menuInfo.keyPath[0] == "type"){
    const filter ={
      'type':menuInfo.keyPath[1]
    }
    await getArticlesFiltered(filter);
  }
}

const handleClickExpert = async menuInfo => {
	console.log('click ', menuInfo.keyPath[0]);
	console.log('click ', menuInfo.keyPath[1]);
	
	if (menuInfo.keyPath[0] == "region") {
		const filter ={
			'concepts.display_name':menuInfo.keyPath[1]
		}
		await getExpertsFiltered(filter);
	} else if (menuInfo.keyPath[0] == "country") {
		const filter ={
			'last_known_institution.country_code':menuInfo.keyPath[1]
		}
		await getExpertsFiltered(filter);
	}
}
async function getExperts(){
	exResult.value = await SearchAPI.searchExpert(searchRef.value.ifSearch)
	expertList.value = exResult.value.data.data.result;
  console.log("expertList");
	console.log(exResult.value.data.data);
	setExpertFilterContent();
}
async function getExpertsFiltered(Region){
	exResult.value = await SearchAPI.searchExpertFiltered(searchRef.value.ifSearch,Region)
	console.log("exResult:", exResult)
	expertList.value = exResult.value.data.data.result;
	console.log("expertList:", expertList.value);
	setExpertFilterContent();
}
function setExpertFilterContent(){
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

async function getArticlesFiltered(filter){//获取带有筛选条件的论文
  const result = await SearchAPI.searchWithFilter(searchContent.value,filter)
  console.log("paper_result:", result)
  paperList.value = result.data.data.result;
  console.log("paperList:", paperList.value);
  setArticlesFilterContent();
}

const tranEfiledNum = ref([]);

function setArticlesFilterContent(){//设置论文过滤条件
  let ArticleField = [];
  let ArticleLanguage = [];
  let ArticleInstitution = [];
  let ArticleType = [];
  for(let i=0;i<paperList.value.length;i++){
    const paper = paperList.value[i];
    console.log("???")

    for(let j=0; j<paper.authorships.length; j++){//add institution
      console.log("@@@")
      if(paper.authorships[j].institutions != null){
        for(let k=0; k<paper.authorships[j].institutions.length; k++){
          let institution = paper.authorships[j].institutions[k].display_name;
          console.log("institution:",institution);
          if(!ArticleInstitution.includes(institution)){
            ArticleInstitution.push(institution);
          }
        }
      }
    }

    if(paper.language != null){//add language
      if(!ArticleLanguage.includes(paper.language)){
        ArticleLanguage.push(paper.language);
      }
    }

    if(paper.type != null){//add type
      if(!ArticleType.includes(paper.type)){
        ArticleType.push(paper.type)
      }
    }



    if(paper.concepts != null){
      for(let j=0; j<paper.concepts.length; j++){
        let Field = paper.concepts[j].display_name;
        if(!ArticleField.includes(Field)){
          ArticleField.push(Field);
          let time = 1;
          tranEfiledNum.value.push(time);
        }else{
          let num = ArticleField.indexOf(Field);
          let time = tranEfiledNum[num] ;
          console.log("time",time);
          tranEfiledNum[num] = time+1;
        }
      }
    }
  }

  const languageItem = ArticleItems.find(ArticleItem => ArticleItem.label === '语言');
  const fieldItem = ArticleItems.find(ArticleItem => ArticleItem.label === '领域');
  const institutionItem = ArticleItems.find(ArticleItem => ArticleItem.label === '机构');
  const typeItem = ArticleItems.find(ArticleItem => ArticleItem.label === '类型');

  Efield.value =  ArticleItems.find(ArticleItem => ArticleItem.label === '领域');

  console.log("Ariclearray1:",ArticleLanguage);
  console.log("Ariclearray2:",ArticleInstitution);
  console.log("Ariclearray3:",ArticleField);

  // 将ExpertInstitution和ExpertArea添加到相应项的children属性中
  if (languageItem){
    languageItem.children = ArticleLanguage.slice(0, 10).map(name => getItem(name, name,() => h(ExperimentOutlined)));
  }
  if (fieldItem) {
    fieldItem.children = ArticleField.slice(0, 10).map(name => getItem(name, name,() => h(ExperimentOutlined)));
  }
  if (institutionItem) {
    institutionItem.children = ArticleInstitution.slice(0, 10).map(name => getItem(name, name,() => h(ExperimentOutlined)));
  }
  if (typeItem) {
    typeItem.children = ArticleType.slice(0, 10).map(name => getItem(name, name,() => h(ExperimentOutlined)));
  }
}

const filedData = ref([]);
onMounted(async ()=>{//初始渲染论文列表
  const route = useRoute();
  console.log(route.query.content);
  const result = await SearchAPI.search(route.query.content)
  console.log("result:", result)
  paperList.value = result.data.data.result;
  console.log("paperlist:", paperList.value);
  setArticlesFilterContent();
  await getExperts();
  console.log("Efield",Efield.value.children);
  for(let i =0; i<Efield.value.children.length; i++){
    tranEfield.value.push(Efield.value.children[i].key);
  }
  console.log("tranEfield",tranEfield.value);
  console.log("trannum",tranEfiledNum);

})

watch(searchContent, async (newVal, oldVal) => {//监视输入框
  console.log("newVal:",newVal);
  console.log("oldVal:",oldVal);
  await getPapers();
})

function getFullPaper(item){//进入论文详情
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

const ArticleItems = reactive([
  getItem('领域', 'region', () => h(PieChartOutlined), [
  ]),
  getItem('语言', 'language', () => h(BankOutlined), [
  ]),
  getItem('机构', 'institution', () => h(ExperimentOutlined), [
  ]),
  getItem('类型', 'type', () => h(ExperimentOutlined), [
  ]),
])

const ArticleState = reactive({
  rootSubmenuKeys: ['region', 'country', 'institution'],
  openKeys: ['region'],
  selectedKeys: [],
});

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
.parent-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-span {
  width: 75%;
  margin-right: 5px;
  font-size: 17px;
}

.right-icons {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.control-icon {
  /* 初始大小 */
  font-size: 10px; /* 调整图标大小 */
  transition: filter 0.3s ease; /* 添加过渡效果 */
}

/* 当鼠标悬停在图标上时，缩小图标 */
.control-icon:hover {
  //transform: scale(0.8); /* 可根据需要调整缩放比例 */
  filter: brightness(1.5); /* 调整颜色亮度，1表示原始亮度，大于1表示增加亮度 */
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