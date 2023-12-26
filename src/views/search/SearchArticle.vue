<template>
  <div>
    <NavBar/>
    <div class="nav_outer">
      <div class="search-bar">
        <AdvancedSearchBar :inputStr="searchContent" ref="searchRef" @getInput="getInput" @getAdv="getAdv"/>
      </div>
    </div>
<!--      <a-skeleton active />-->
    <div class="paper-list-wrap">
      <a-tabs style="margin-left:10px" v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="论文">
          <div style="font-style: italic;margin-bottom: 10px">
            <span style="font-size: 15px;color:#505050;">查询结果包含&nbsp;"</span>
            <span style="color: red;font-size: 15px">{{searchContent}}</span>
            <span style="font-size: 15px;color:#505050;">"&nbsp;</span>（
            <span style="color: red;font-size: 15px">&nbsp;{{totalPaper}}&nbsp;</span>
            <span style="font-size: 15px;color:#505050;">结果</span>）
          </div>
          <a-layout class="a-layout-container">
            <a-layout-sider :style="siderStyle" width="210px">
              <div>
                <a-menu
                    v-model:selectedKeys="ArticleState.selectedKeys"
                    style="width: 212px"
                    mode="inline"
                    :open-keys="ArticleState.openKeys"
                    :items="ArticleItems"
                    @openChange="onOpenChange1"
                    @click="handleClickArticle"
                >
                </a-menu>
              </div>
            </a-layout-sider>
            <a-layout>
              <a-layout-content :style="contentStyle">
                <div class="menu-container">
                  <el-menu :default-active="activeIndex" mode="horizontal" class="border-style">
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
                </div>
                <ul class="search-result__list">
                  <div v-if="ifLoading===true">
                    <a-card v-for="item in 9">
                      <a-skeleton active/>
                    </a-card>
                  </div>
                  <div v-else>
                    <div v-if="paperList!=null && paperList.length !== 0">
                      <li class="result-item" v-for="(item, index) in paperList" v-bind:key="item.id">
                        <a-card hoverable @click="getFullPaper(item)">
                          <ArticleCard :paper="item" :total="totalPaper"/>
                        </a-card>
                      </li>
                    </div>
                    <div v-else>
                      <a-empty
                          image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                          :image-style="{height: '60px',}"
                      />
                    </div>
                  </div>
                </ul>
                <a-pagination
                    v-if="paperList!=null && paperList.length !== 0"
                    v-model:current="currentArticle"
                    :total=totalPaper
                    pageSize="25"
                    :showSizeChanger="false" />
              </a-layout-content>
            </a-layout>
            <a-layout-sider :style="siderStyle" width="300px" >
              <div class="echart-style">
                <a-card style="margin-bottom: 40px">
                  <EchartsArticle v-if="paperList!=null && paperList.length !== 0" :field="axisField" :fieldNum="ordNum"/>
                  <a-empty
                      v-else
                      image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                      :image-style="{height: '60px',}"
                  />
                </a-card>

                <a-card>
                  <div class="table-container" v-if="paperList!=null && paperList.length !== 0">
                    <div class="column-left">
                      <div class="title">
                        发表数量最多的作者
                      </div>
                      <div v-for="item in authorRank" :key="item.author_id" class="item" @click="jumpPortal(item.author_id)">
                        {{ item.name }}
                      </div>
                    </div>
                    <div class="column-right">
                      <div class="title">
                        论文数
                      </div>
                      <div v-for="item in authorRank" :key="author_id" class="item">
                        {{ item.count }}
                      </div>
                    </div>
                  </div>
                  <a-empty
                      v-else
                      image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                      :image-style="{height: '60px',}"
                  />
                </a-card>

              </div>
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
			        <el-menu :default-active="activeIndex" class="result-item_1" mode="horizontal">
					        <el-menu-item index="1" class="parent-container" @click="switchExpertOrder(1)">
						        <span class="left-span">姓名</span>
						        <div class="right-icons">
							        <CaretUpOutlined v-show="Exarrow1 % 3 === 1" class="control-icon"/>
							        <CaretDownOutlined v-show="Exarrow1 % 3 === 2" class="control-icon"/>
						        </div>
					        </el-menu-item>
					        <el-menu-item index="2" class="parent-container" @click="switchExpertOrder(2)">
						        <span class="left-span">引用量</span>
						        <div class="right-icons">
							        <CaretUpOutlined v-show="Exarrow2 % 3 === 1" class="control-icon"/>
							        <CaretDownOutlined v-show="Exarrow2 % 3 === 2" class="control-icon"/>
						        </div>
					        </el-menu-item>
					        <el-menu-item index="3" class="parent-container" @click="switchExpertOrder(3)">
						        <span class="left-span">论文数量</span>
						        <div class="right-icons">
							        <CaretUpOutlined v-show="Exarrow3 % 3 === 1" class="control-icon"/>
							        <CaretDownOutlined v-show="Exarrow3 % 3 === 2" class="control-icon"/>
						        </div>
					        </el-menu-item>
				        </el-menu>
			        <li class = "ExpertRes" v-for="item in expertList" v-bind:key="item.id">
                <div v-if="ifLoading===true">
                  <a-card v-for="item in 9">
                    <a-skeleton active/>
                  </a-card>
                </div>
                <div v-else>
                  <div v-if="expertList!=null && expertList.length !== 0">
                    <li class="result-item" v-for="(item, index) in expertList" v-bind:key="item.id">
                      <a-card hoverable style="width: 80%;">
                        <ExpertCard :paper="item" @click="jumpToExDetail(item)"/>
                      </a-card>
                    </li>
                  </div>
                  <div v-else>
                    <a-empty
                        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                        :image-style="{height: '60px',}"
                    />
                  </div>
                </div>
				    </li>
			        <a-pagination v-model:current="current" :total=totalExpert pageSize="25" :showSizeChanger="false" />
		        </a-layout-content>
	        </a-layout>
        </a-tab-pane>
      <a-tab-pane key="3" tab="机构" force-render>
	      <Institution :institute="institutionList"></Institution>
	      <a-pagination v-model:current="currentIns" :total="totalIns" :pageSize="25" :showSizeChanger="false"/>
      </a-tab-pane>
      <a-tab-pane key="4" tab="领域" force-render>
	      <Field v-model="fieldList"></Field>
	      <a-pagination v-model:current="currentField" :total="totalField" :pageSize="25" :showSizeChanger="false"/>
      </a-tab-pane>
      </a-tabs>
    </div>
    <a-float-button-group shape="circle" :style="{ right: '24px' }">
      <a-back-top :visibility-height="0" />
    </a-float-button-group>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar/NavBar.vue";
import ArticleCard from "@/views/search/ArticleCard.vue";
import SearchAPI from "@/api/search.js"
import {BankOutlined, ExperimentOutlined, PieChartOutlined} from '@ant-design/icons-vue';
import {useRoute} from "vue-router";
import router from "@/router/index.js";
import ExpertCard from "@/views/search/ExpertCard.vue";
import EchartsArticle from "@/views/search/EchartsArticle.vue";
import AdvancedSearchBar from "@/components/Search/AdvancedSearchBar.vue";
import Institution from "@/views/search/Institution.vue";
import Field from "@/views/search/Field.vue";

const totalPaper = ref(0);
const totalPaperPage = ref(0);
const totalExpert = ref(0);
const totalExpertPage = ref(0);
const totalInsPage = ref(0);
const totalIns = ref(0);
const totalField = ref(0);
const current = ref(1);
const currentIns = ref(1);
const currentField = ref(1);
const currentArticle = ref(1);
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

const arResult = ref();
const arFilter = ref({});
const arSort = ref({});

const activeKey = ref('1');
const pageCurrent = ref(1);
const paperList = ref();
const paperListPerPage = ref();
const expertList = ref();
const institutionList = ref();
const fieldList = ref([]);
const update = ref(true);
let LastKeyPath = null;
let LKP = null;

const sortKey = ref(['1']);
const searchContent = ref();
const Efield = ref([]);
const tranEfield = ref([]);
const advDomains = ref([]);
const getAdv = async (value) => {
  advDomains.value = value;
  console.log("outer", advDomains.value);
  let count = 0;
  if(advDomains.value !== 0){
    count = advDomains.value.length;
  }
  let filter = {};
  if(count !== 0) {
    let tempArray = [];
    let operator = advDomains.value[0].operator[0];
    let type = advDomains.value[0].type[0];
    let value = advDomains.value[0].value;
    console.log('operator',operator);
    console.log('type',type);
    console.log('value',value);
    if (type === '作者') {
      filter['authorships.author.display_name'] = advDomains.value[0].value;
    } else if (type === '机构') {
      filter['authorships.institutions.display_name'] = advDomains.value[0].value;
    } else if (type === '领域') {
      filter['concepts.display_name'] = advDomains.value[0].value;
    }
    if (count === 1) {
      console.log("filter",count,filter);
      arFilter.value = filter;
      await searchArticleWithAll();
      // await getArticlesFiltered(filter);
    } else if (count > 1) {
      for(let i = 1 ; i < count ; i++){
        const tempOp = advDomains.value[i].operator[i];
        const tempTy = advDomains.value[i].type[i];
        if(tempOp === '并且'){
          console.log("tempTy",tempTy);
          let enTy = '';
          if(tempTy === '作者'){
            enTy = 'authorships.author.display_name';
          }else if(tempTy === '机构'){
            enTy = 'authorships.institutions.display_name';
          }else if(tempTy === '领域'){
            enTy = 'concepts.display_name';
          }
          console.log('enTy',enTy);
          if(filter.hasOwnProperty(enTy)){
            let tempValue = filter[enTy];
            console.log("tempValue",tempValue);
            tempValue = tempValue+'+'+advDomains.value[i].value;
            filter[enTy] = tempValue;
          }else{
            if (tempTy === '作者') {
              filter['authorships.author.display_name'] = advDomains.value[i].value;
            } else if (tempTy === '机构') {
              filter['authorships.institutions.display_name'] = advDomains.value[i].value;
            } else if (tempTy === '领域') {
              filter['concepts.display_name'] = advDomains.value[i].value;
            }
          }
        }else if(tempOp === '或者'){
          console.log("tempTy",tempTy);
          let enTy = '';
          if(tempTy === '作者'){
            enTy = 'authorships.author.display_name';
          }else if(tempTy === '机构'){
            enTy = 'authorships.institutions.display_name';
          }else if(tempTy === '领域'){
            enTy = 'concepts.display_name';
          }
          console.log('enTy',enTy);
          if(filter.hasOwnProperty(enTy)){
            if(!tempArray.includes(filter[enTy])){
              tempArray.push(filter[enTy]);
            }
            console.log("tempArray",tempArray);
            tempArray.push(advDomains.value[i].value);
            filter[enTy] = tempArray;
          }else{
            if (tempTy === '作者') {
              filter['authorships.author.display_name'] = advDomains.value[i].value;
            } else if (tempTy === '机构') {
              filter['authorships.institutions.display_name'] = advDomains.value[i].value;
            } else if (tempTy === '领域') {
              filter['concepts.display_name'] = advDomains.value[i].value;
            }
          }
        }
      }
      console.log("filter",count,filter);
      arFilter.value = filter;
      await searchArticleWithAll();
      // await getArticlesFiltered(filter);
    }
  }
}
const getInput = (value) => {//获取输入框的输入
  searchContent.value = value;
  console.log("searchContent:::",searchContent.value);
}
watch(advDomains, async ()=>{
  console.log("outer",advDomains.value);
  let count = 0;
  if(advDomains.value !== 0){
    count = advDomains.value.length;
  }
  let filter = {};
  if(count !== 0) {
    let tempArray = [];
    let operator = advDomains.value[0].operator[0];
    let type = advDomains.value[0].type[0];
    let value = advDomains.value[0].value;
    tempArray.push(value);
    console.log('operator',operator);
    console.log('type',type);
    console.log('value',value);
    if (type === '作者') {
      filter['authorships.author.display_name'] = advDomains.value[0].value;
    } else if (type === '机构') {
      filter['authorships.institutions.display_name'] = advDomains.value[0].value;
    } else if (type === '领域') {
      filter['concepts.display_name'] = advDomains.value[0].value;
    }
    if (count === 1) {
      console.log("filter",count,filter);
      arFilter.value = filter;
      await searchArticleWithAll();
      // await getArticlesFiltered(filter);
    } else if (count > 1) {
      for(let i = 1 ; i < count ; i++){
        const tempOp = advDomains.value[i].operator[i];
        const tempTy = advDomains.value[i].type[i];
        console.log("tempOp",tempOp);
        if(tempOp === '并且'){
          console.log("tempTy",tempTy);
          let enTy = '';
          if(tempTy === '作者'){
            enTy = 'authorships.author.display_name';
          }else if(tempTy === '机构'){
            enTy = 'authorships.institutions.display_name';
          }else if(tempTy === '领域'){
            enTy = 'concepts.display_name';
          }
          console.log('enTy',enTy);
          if(filter.hasOwnProperty(enTy)){
            let tempValue = filter[enTy];
            console.log("tempValue",tempValue);
            tempValue = tempValue+'+'+advDomains.value[i].value;
            filter[enTy] = tempValue;
          }else{
            if (tempTy === '作者') {
              filter['authorships.author.display_name'] = advDomains.value[i].value;
            } else if (tempTy === '机构') {
              filter['authorships.institutions.display_name'] = advDomains.value[i].value;
            } else if (tempTy === '领域') {
              filter['concepts.display_name'] = advDomains.value[i].value;
            }
          }
        }else if(tempOp === '或者'){
          console.log("tempTy",tempTy);
          let enTy = '';
          if(tempTy === '作者'){
            enTy = 'authorships.author.display_name';
          }else if(tempTy === '机构'){
            enTy = 'authorships.institutions.display_name';
          }else if(tempTy === '领域'){
            enTy = 'concepts.display_name';
          }
          console.log('enTy',enTy);
          if(filter.hasOwnProperty(enTy)){
            if(!tempArray.includes(filter[enTy])){
              tempArray.push(filter[enTy]);
            }
            tempArray.push(advDomains.value[i].value);
            filter[enTy] = tempArray;
          }else{
            if (tempTy === '作者') {
              filter['authorships.author.display_name'] = advDomains.value[i].value;
            } else if (tempTy === '机构') {
              filter['authorships.institutions.display_name'] = advDomains.value[i].value;
            } else if (tempTy === '领域') {
              filter['concepts.display_name'] = advDomains.value[i].value;
            }
          }
        }
      }
      console.log("filter",count,filter);
      arFilter.value = filter;
      await searchArticleWithAll();
      // await getArticlesFiltered(filter);
    }
  }
})
async function getPapers(){//获取论文列表
  ifLoading.value = true;
  currentArticle.value = 1;
  let res = await searchArticleWithAll();
  arResult.value = res;
  paperList.value = arResult.value.data.data.result;
  ifLoading.value = false;
  totalPaper.value = arResult.value.data.data.total;
  totalPaperPage.value = totalPaper.value/25;
  setArticlesFilterContent();
}

function jumpPortal(url){//进入科研人员详情页
  const parts = url.split('/');
  const authorId = parts[parts.length - 1]; // 获取最后一个部分
  console.log(authorId);
  router.push({
    path:`/client/author/${authorId}`
  })
}

const tranEfieldNum = ref([]);
const axisField = ref([]);
const ordNum = ref([]);
const tranEauthor = ref([]);
const authorRankName = ref([]);
const authorRankNum = ref([]);
const arrow1 = ref(0)
const arrow2 = ref(0)
const arrow3 = ref(0)
const arrow4 = ref(0)
const Exarrow1 = ref(0)
const Exarrow2 = ref(0)
const Exarrow3 = ref(0)
const ExFilter = ref({});
const ExSort = ref({});

// const arrow5 = ref(0)
const activeIndex = ref("1")
const route = useRoute();
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

  console.log("sortType,order",sortType,order)
  await searchWithSort(sortType, order);
}
function jumpToExDetail(info){
	console.log("jump");
	console.log(info.id);
	let url = info.id;
	let parts = url.split('/'); // 使用斜杠分割字符串
	let lastPart = parts[parts.length - 1]; // 获取数组中的最后一个元素
	router.push("/client/author/"+lastPart);
}
async function switchExpertOrder(sortType){
	let order = "";
	if(sortType === 1){
		Exarrow1.value ++;
		if(Exarrow1.value % 3 === 1){//上
			order = "asc";
		}else if(Exarrow1.value % 3 === 2){//下
			order = "desc";
		}else if(Exarrow1.value % 3 === 3){
			order = "";
		}
	}else if(sortType === 2){
		Exarrow2.value ++;
		if(Exarrow2.value % 3 === 1){//上
			order = "asc";
		}else if(Exarrow2.value % 3 === 2){//下
			order = "desc";
		}else if(Exarrow2.value % 3 === 0){
			order = "";
		}
	}else if(sortType === 3){
		Exarrow3.value ++;
		if(Exarrow3.value % 3 === 1){//上
			order = "asc";
		}else if(Exarrow3.value % 3 === 2){//下
			order = "desc";
		}else if(Exarrow3.value % 3 === 0){
			order = "";
		}
	}
	await searchExpertWithSort(sortType, order);
}
async function searchWithSort(sortType, order){
  if(sortType === 1){
    let sort = {"display_name": "asc"}
    if(order === ""){
      arSort.value = {}
      currentArticle.value = 1
      const result = await searchArticleWithAll();
      paperList.value = result.data.data.result;
      console.log("sort-search",paperList);
    }else{
      sort.display_name = order;
      arSort.value = sort;
      currentArticle.value = 1
      const result = await searchArticleWithAll();
      paperList.value = result.data.data.result;
      console.log("sort-search",paperList.value);
    }

  }else if(sortType === 2){
    let sort = {"cited_by_count": "asc"}
    if(order === ""){
      arSort.value = {}
      currentArticle.value = 1
      const result = await searchArticleWithAll();
      paperList.value = result.data.data.result;
    }else{
      sort.cited_by_count = order;
      arSort.value = sort
      currentArticle.value = 1
      const result = await searchArticleWithAll();
      paperList.value = result.data.data.result;
    }
  }else if(sortType === 3){
    let sort = {"publication_date": "asc"}
    if(order === ""){
      arSort.value = {}
      currentArticle.value = 1
      const result = await searchArticleWithAll();
      paperList.value = result.data.data.result;
    }else{
      sort.publication_date = order;
      arSort.value = sort
      currentArticle.value = 1
      const result = await searchArticleWithAll();
      paperList.value = result.data.data.result;
    }
  }else if(sortType === 4){
    let sort = {"publication_year": "asc"}
    if(order === ""){
      arSort.value = {}
      currentArticle.value = 1
      const result = await searchArticleWithAll();
      paperList.value = result.data.data.result;
    }else{
      sort.publication_year = order;
      arSort.value = sort
      currentArticle.value = 1
      const result = await searchArticleWithAll();
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
    arSort.value = {}
    currentArticle.value = 1
    const result = await searchArticleWithAll();
    paperList.value = result.data.data.result;
    // }
  }
  setArticlesFilterContent();
}
async function searchExpertWithSort(sortType, order){
	if(sortType === 1){
		let sort = {"display_name": "asc"}
		if(order === ""){
			ExSort.value = {};
			current.value = 1;
			const result = await searchExpertWithAll();
			expertList.value = result.data.data.result;
		}else{
			sort.display_name = order;
			ExSort.value = sort
			current.value = 1;
			const result = await searchExpertWithAll();
			console.log("sortResult:",result);
			console.log("res",result.data);
			expertList.value = result.data.data.result;
		}
		
	}else if(sortType === 2){
		let sort = {"cited_by_count": "asc"}
		if(order === ""){
			ExSort.value = {};
			current.value = 1;
			const result = await searchExpertWithAll();
			console.log("sortResult:",result);
			console.log("res",result.data);
			expertList.value = result.data.data.result;
		}else{
			sort.cited_by_count = order;
			ExSort.value = sort;
			current.value = 1;
			const result = await searchExpertWithAll();
			console.log("sortResult:",result);
			console.log("res",result.data.data.result);
			expertList.value = result.data.data.result;
		}
	}else if(sortType === 3){
		let sort = {"works_count": "asc"}
		if(order === ""){
			ExSort.value = {};
			current.value = 1;
			const result = await searchExpertWithAll();
			console.log("works_count:",result);
			console.log("res",result.data.data.result);
			expertList.value = result.data.data.result;
		}else{
			sort.works_count = order;
			ExSort.value = sort;
			current.value = 1;
			const result = await searchExpertWithAll();
			console.log("works_count:",result);
			console.log("res",result.data);
			expertList.value = result.data.data.result;
		}
	}
	setExpertFilterContent();
	initExpertPage();
	
}
async function searchArticleWithAll(){
  currentArticle.value = 1;
  let res = await SearchAPI.searchArticleWithAll(searchContent.value, currentArticle.value, arFilter.value,arSort.value);
  console.log("func-res",res);
  arResult.value = res;
  console.log("arResult......",arResult.value);
  paperList.value = arResult.value.data.data.result;
  totalPaper.value = arResult.value.data.data.total;
  totalPaperPage.value = totalPaper.value/25;
  setArticlesFilterContent();
  return res;
}
async function searchExpertWithAll(){
	current.value = 1;
	let res = await SearchAPI.searchExpertWithAll(searchContent.value,current.value,ExFilter.value,ExSort.value);
	console.log("hhhhhh",res.data.data);
	console.log("filter",ExFilter.value);
	console.log("sort",ExSort.value);

	
	exResult.value = res;
	expertList.value = exResult.value.data.data.result;
	totalExpert.value = exResult.value.data.data.total;
	totalExpertPage.value = totalExpert.value/25;
	setExpertFilterContent();
	return res;
}
const handleClickArticle = async menuInfo => {
  console.log('click ');
  console.log('click ', menuInfo.keyPath[1]);

  if(LKP === menuInfo.keyPath){
    ArticleState.selectedKeys = [];
    arFilter.value = {};
    await searchArticleWithAll();
    LKP = null;
  }else{
    if (menuInfo.keyPath[0] == "region") {
      const filter ={
        'concepts.display_name':menuInfo.keyPath[1]
      }
      arFilter.value = filter;
      await searchArticleWithAll();
    } else if (menuInfo.keyPath[0] == "language") {
      const filter ={
        'language':menuInfo.keyPath[1]
      }
      arFilter.value = filter;
      await searchArticleWithAll();
    }else if(menuInfo.keyPath[0] == "institution"){
      const filter ={
        'authorships.institutions.display_name':menuInfo.keyPath[1]
      }
      arFilter.value = filter;
      await searchArticleWithAll();
    }else if(menuInfo.keyPath[0] == "type"){
      const filter ={
        'type':menuInfo.keyPath[1]
      }
      arFilter.value = filter;
      await searchArticleWithAll();
    }
    LKP = menuInfo.keyPath;
  }
  setArticlesFilterContent();
}

watch (current, async (newValue, oldValue) => {
	await getExpertsWithPage(newValue);
	console.log("value",newValue);
})
watch (currentIns, async (newValue, oldValue) => {
	await getInstitution(newValue)
	paperListPerPage.value = tmp;
})
// watch (pageCurrent, async (newValue, oldValue) => {
//   const tmp = paperList.value.slice((pageCurrent.value-1)*10,pageCurrent.value*10);
//   paperListPerPage.value = tmp;
// })
watch(currentArticle, async (newValue, oldValue) => {
  await getArticlesWithPage(newValue);
})
watch(currentField, async (newValue, oldValue) => {
	await getField(newValue);
})
const ExFilterClick = async menuInfo => {
	if(LastKeyPath === menuInfo.keyPath){
		state.selectedKeys = [];
		ExFilter.value = {};
		await searchExpertWithAll();
		LastKeyPath = null;
	}else {
		if (menuInfo.keyPath[0] == "region") {
			let filter = {
				'concepts.display_name': menuInfo.keyPath[1]
			}
			ExFilter.value = filter;
			await searchExpertWithAll();
		} else if (menuInfo.keyPath[0] == "country") {
			let filter = {
				'last_known_institution.country_code': menuInfo.keyPath[1]
			}
			ExFilter.value = filter;
			await searchExpertWithAll();
		}
		LastKeyPath = menuInfo.keyPath;
	}
	setExpertFilterContent();
}
async function getExperts(){
  ifLoading.value = true;
	current.value = 1;
	let res = await searchExpertWithAll();
	exResult.value = res;
	expertList.value = exResult.value.data.data.result;
  ifLoading.value = false;
	totalExpert.value = exResult.value.data.data.total;
	totalExpertPage.value = totalExpert.value/25;
	console.log("total",exResult.value.data.data.total);
	setExpertFilterContent();
}
async function getInstitution(page){
	let res = await SearchAPI.search_institution(searchContent.value,page);
	institutionList.value = res.data.data.result;
	totalIns.value = res.data.data.total;
	console.log("totalInst",totalInsPage.value);
}
async function getField(page){
	let res = await SearchAPI.search_concept(searchContent.value,page);
	fieldList.value = res.data.data.result;
	totalField.value = res.data.data.total;
	console.log(fieldList.value);
}
async function getExpertsWithPage(page){
	let res = await SearchAPI.searchExpertWithAll(searchContent.value,page,ExFilter.value,ExSort.value);
	setExpertFilterContent();
	exResult.value = res;
	expertList.value = exResult.value.data.data.result;
}
async function getArticlesWithPage(page){
  let res = await SearchAPI.searchArticleWithAll(searchContent.value,page,arFilter.value,arSort.value);
  setArticlesFilterContent();
  arResult.value = res;
  paperList.value = arResult.value.data.data.result;
}
function initArticlePage(){
  const slice = paperList.value.slice(1, 10);
  paperListPerPage.value = slice;
  pageCurrent.value = 1;
}
async function getExpertsFiltered(Region){
	current.value = 1;
	exResult.value = await SearchAPI.searchExpertWithAll(searchContent.value,current.value,ExFilter.value,ExSort.value);
	expertList.value = exResult.value.data.data.result;
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

const authorRank = ref([]);
function setArticlesFilterContent(){//设置论文过滤条件
  let ArticleField = [];
  let ArticleLanguage = [];
  let ArticleInstitution = [];
  let ArticleType = [];
  let authors = [];
  console.log("filter_set",paperList.value);
  for(let i=0;i<paperList.value.length;i++){
    const paper = paperList.value[i];

    for(let j=0; j<paper.authorships.length; j++) {//add institution
      if (paper.authorships[j].institutions != null) {
        for (let k = 0; k < paper.authorships[j].institutions.length; k++) {
          let institution = paper.authorships[j].institutions[k].display_name;
          if (!ArticleInstitution.includes(institution)) {
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
        }
      }
    }

    if (paper.concepts != null) {
      for (let j = 0; j < paper.concepts.length; j++) {
        let Field = paper.concepts[j].display_name;

        // 检查 Field 是否已经在 tranEfieldNum 中
        let existingField = tranEfieldNum.value.find(item => item.field === Field);

        if (existingField) {
          // 如果 Field 已经存在于数组中，则增加其次数
          existingField.count++;
        } else {
          // 如果 Field 不存在于数组中，则添加一个新的项
          tranEfieldNum.value.push({ field: Field, count: 1 });
        }
      }
    }

    for(let j=0; j<paper.authorships.length; j++) {//add institution
      if(paper.authorships[j].author != null){
        let authorName = paper.authorships[j].author.display_name;

        // 检查 Field 是否已经在 tranEfieldNum 中
        let existingAuthor = tranEauthor.value.find(item => item.name === authorName);

        if (existingAuthor) {
          // 如果 Field 已经存在于数组中，则增加其次数
          existingAuthor.count++;
        } else {
          // 如果 Field 不存在于数组中，则添加一个新的项
          tranEauthor.value.push({ name: authorName, count: 1 ,author_id:paper.authorships[j].author.id});
        }
      }
    }

  }

  // 对 tranEfieldNum.value 数组进行排序（按 count 从大到小）
  tranEfieldNum.value.sort((a, b) => b.count - a.count);

  tranEauthor.value.sort((a, b) => b.count - a.count);

  // 取出数组中的前十个项
  const topTenFields = tranEfieldNum.value.slice(0, 10);
  const topTenAuthors = tranEauthor.value.slice(0,10);

  console.log(topTenFields);

  // 从 topFTenFields 中提取 field 和 count 作为两个数组
  axisField.value = topTenFields.map(item => item.field);
  ordNum.value = topTenFields.map(item => item.count);

  authorRank.value = topTenAuthors;
  console.log("authorRankName",authorRankName.value);
  console.log("authorRankNum",authorRankNum.value);


  const languageItem = ArticleItems.find(ArticleItem => ArticleItem.label === '语言');
  const fieldItem = ArticleItems.find(ArticleItem => ArticleItem.label === '领域');
  const institutionItem = ArticleItems.find(ArticleItem => ArticleItem.label === '机构');
  const typeItem = ArticleItems.find(ArticleItem => ArticleItem.label === '类型');

  Efield.value =  ArticleItems.find(ArticleItem => ArticleItem.label === '领域');


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

const ifLoading = ref(false)
onMounted(async ()=>{//初始渲染论文列表
	searchContent.value = route.query.content;
  console.log("route",route.name);
  if(route.name === "SearchArticle"){
	  console.log("art")
	  activeKey.value = '1';
	  ifLoading.value = true;
	  console.log("route",route.query.content)
	  currentArticle.value = 1;
	  let res = await searchArticleWithAll();
	  console.log("res-on",res);
	  arResult.value = res;
	  paperList.value = arResult.value.data.data.result;
	  console.log("paperList-mou",paperList.value);
	  totalPaper.value = arResult.value.data.data.total;
	  totalPaperPage.value = totalPaper.value/25;
	  console.log("total",arResult.value.data.data.total);
	  ifLoading.value = false;
	  console.log("paperlist:", paperList.value);
	  setArticlesFilterContent();
	  console.log("art")
  }else if(route.name === "SearchExpert"){
	  await getExperts();
	  console.log("expert")
	  activeKey.value = '2';
  }else if(route.name === "SearchInstitution"){
	  await getInstitution(1);
	  console.log("total");
	  activeKey.value = '3';
  }else if(route.name === "SearchField"){
	  await getField(1);
	  activeKey.value = '4';
  }
  // ifLoading.value = true;
  // console.log("route",route.query.content)
  // currentArticle.value = 1;
  // let res = await searchArticleWithAll();
  // console.log("res-on",res);
  // searchContent.value = route.query.content;
  // arResult.value = res;
  // paperList.value = arResult.value.data.data.result;
  // console.log("paperList-mou",paperList.value);
  // totalPaper.value = arResult.value.data.data.total;
  // totalPaperPage.value = totalPaper.value/25;
  // console.log("total",arResult.value.data.data.total);
  // ifLoading.value = false;
  // console.log("paperlist:", paperList.value);
  // setArticlesFilterContent();
  // await getExperts();
  // await getField();
  // await getInstitution();
})
watch(route, async (newVal, oldVal) => {//监视输入框
	searchContent.value = route.query.content;
	if(route.name === "SearchArticle"){
		ifLoading.value = true;
		console.log("route",route.query.content)
		currentArticle.value = 1;
		let res = await searchArticleWithAll();
		console.log("res-on",res);
		arResult.value = res;
		paperList.value = arResult.value.data.data.result;
		console.log("paperList-mou",paperList.value);
		totalPaper.value = arResult.value.data.data.total;
		totalPaperPage.value = totalPaper.value/25;
		console.log("total",arResult.value.data.data.total);
		ifLoading.value = false;
		console.log("paperlist:", paperList.value);
		setArticlesFilterContent();
		console.log("art")
		activeKey.value = '1';
	}else if(route.name === "SearchExpert"){
		await getExperts();
		console.log("expert")
		activeKey.value = '2';
	}else if(route.name === "SearchInstitution"){
		await getInstitution(1);
		console.log("total");
		activeKey.value = '3';
	}else if(route.name === "SearchField"){
		await getField(1);
		console.log("field")
		activeKey.value = '4';
	}
})
watch(activeKey, async (newVal, oldVal) => {//监视输入框
	const hash = {
		1 : "article",
		2 : "expert",
		3 : "institution",
		4 : "field",
	}
	let n = parseInt(activeKey.value)
	const parts = route.path.split('/');
	const type = parts[parts.length - 2];
	if(type === hash[n]){
	
	}else{
		router.push({
			path:"/search/"+hash[n]+"/",
			query:{
				content:route.query.content
			}
		});
	}
	console.log("route",type)
	console.log("key",hash[n])
	
})
watch(searchContent, async (newVal, oldVal) => {//监视输入框
  console.log("newVal:",newVal);
  console.log("oldVal:",oldVal);
  await getPapers();
})

watch (pageCurrent, async (newValue, oldValue) => {
	const tmp = paperList.value.slice((pageCurrent.value-1)*10,pageCurrent.value*10);
	paperListPerPage.value = tmp;
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

const onOpenChange1 = openKeys => {
  const latestOpenKey = openKeys.find(key => ArticleState.openKeys.indexOf(key) === -1);
  if (ArticleState.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    ArticleState.openKeys = openKeys;
  } else {
    ArticleState.openKeys = latestOpenKey ? [latestOpenKey] : [];
  }
}
const onOpenChange = openKeys => {
	const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);
	if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
		state.openKeys = openKeys;
	} else {
		state.openKeys = latestOpenKey ? [latestOpenKey] : [];
	}
}
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
.a-layout-container {
  display: flex;
  max-width: 1500px; /* 根据实际需要调整 */
  margin: 0 auto; /* 这会使整个布局居中 */
  gap: 0px; /* 根据需要在组件之间添加空隙 */
}

.menu-container {
  width: 90%; /* 或者你想要的宽度百分比 */
  margin: auto; /* 使其居中 */
  border: 1px solid #dcdcdc; /* 边框样式 */
  margin-bottom: 10px;
}
.border-style {
  width: 100%; /* 设置此宽度以匹配 a-card */
  border: 1px solid transparent; /* 可选：如果你想在每个菜单项周围添加边框 */
}

.search-result__list {
  list-style: none;
  padding-right: 0;
  padding-left: 0;
  width: 90%; /* 这应该和 menu-container 的宽度一致 */
  margin: auto; /* 使其居中 */

}
.search-result__list .result-item {
  width: 100%;
  box-sizing: border-box; /* 确保内边距和边框不会增加元素的总宽度 */
  margin:0 0 10px 0;
  display: block;
}
.search-bar{
  width: 80%;
  margin: auto;
}
.ExpertRes{
	margin-top: 20px;
}
.slideSearch{
	margin-top: 20px;
	margin-left: 35%;
}
.table-container {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  line-height: 30px;
}
.column-left{
  display: flex;
  flex-direction: column;
}
.column-right{
  display: flex;
  flex-direction: column;
}
.column-left .item {
  text-align: left;
  font-size: 14px;
  color:black;
  cursor: pointer;
  opacity: 80%;
}
.column-left .item:hover {
    transform: scale(1.03); /* 可根据需要调整缩放比例 */
}
.column-right  .item {
  text-align: center;
  font-size: 14px;
  color:black;
}
.column-left .title {
  margin-bottom: 10px;
  text-align: left;
  font-size: 18px;
}
.column-right .title {
  margin-bottom: 10px;
  text-align: right;
  font-size: 18px;
}
</style>