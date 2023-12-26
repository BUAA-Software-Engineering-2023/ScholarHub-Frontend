
<template>

    <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
      <a-layout >
        <a-layout style="min-width: 1200px">
          <a-layout-header theme="light" :style="headerStyle" >
            <!-- 机构信息区域 -->
            <div class="institution-info">
              <div class="institution-details" style="display: flex ">
                <div style="margin-top: 10px;">
                <div style="font-size: 25px;font-weight: 800">
                  {{ institutionname }}
                </div>
                <div style="font-size: 20px;margin-top: 10px;font-weight: 200">
                  {{ geo }}
                </div>
              </div>
              </div>
            </div>
          </a-layout-header>


          <a-layout-content :style="contentStyle" style="margin-left: 15%;min-width: 1200px">
            <div class="institution-total">
              <a-row :gutter="25">
                <a-col :span="5">
                  <a-card hoverable :bordered="false">
                    <div class="card-content">
                      <Paper style="font-size: 50px" />
                      <div style="text-align: center;margin-left: 25%;">
                        <p>发文总量</p >
                        <h2 style="font-weight: bold;color: #53cda5">{{ works_count }}</h2>
                      </div>
                    </div>
                  </a-card>
                </a-col>
                <a-col :span="5">
                  <a-card hoverable :bordered="false">
                    <div class="card-content">
                      <Core style="font-size: 50px" />
                      <div style="text-align: center;margin-left: 25%;">
                        <p>H指数</p >
                        <h2 style="color: #747bff;font-weight: bold">{{ h_index }}</h2>
                      </div>
                    </div>
                  </a-card>
                </a-col>
                <a-col :span="5">
                  <a-card hoverable :bordered="false">
                    <div class="card-content">
                      <Quote style="font-size: 50px" />
                      <div style="text-align: center;margin-left: 25%;">
                        <p>总被引频次</p >
                        <h2 style="color: rgb(145,236,252);font-weight: bold">{{cited_by_count}}</h2>
                      </div>
                    </div>
                  </a-card>
                </a-col>
                <a-col :span="5">
                  <a-card hoverable :bordered="false">
                    <div class="card-content">
                      <Data style="font-size: 50px"  value=""/>
                      <div style="text-align: center;margin-left: 20%;">
                        <p>篇均被引频次</p >
                        <h2 style="color: rgb(217,144,175);font-weight: bold">{{ Math.floor(cited_by_count / works_count)}}</h2>
                      </div>
                    </div>
                  </a-card>
                </a-col>
              </a-row>
            </div>
            <div style="margin-left: 10px;margin-bottom: 20px">
            <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 15 }">
              <a-col :xs="24" :sm="12" :md="12" :lg="10">
                <InstitutionTrend v-if="pflag" style="width: 95%; height: 250px;padding-left: 10%;padding-bottom: 10%" :series="series" :years="years"></InstitutionTrend>
              </a-col>
              <a-col :xs="24" :sm="12" :md="12" :lg="10">
                <Pie v-if="pflag" style="width: 95%; height: 250px;padding-left: 10%;padding-bottom: 10%" :data="data" ></Pie>
              </a-col>
            </a-row>
            </div>

            <div class="outer-container">
              <a-row :gutter="16">
                <a-col :span="24">
                  <div class="research-container">
                    <div class="research-item">
                      <div class="line"></div>
                      <div class="research-title">机构数据库</div>
                      <div class="research-details">
                        <div class="research-institutions">
                          <div class="institution-container" v-for="(institution, index) in researchinstitutions" :key="index">
                            <span class="institution-name">43534</span>
                            <span v-if="index !== researchinstitutions.length - 1">, </span>
                          </div>
                        </div>
                        <div class="research-stats">
                          <p>引用量: {{cited_by_count}}&nbsp; | &nbsp; 论文数: {{works_count}}</p >


                        </div>
                      </div>
                      <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="associated_repositories">
                        <template #footer>

                        </template>
                        <template #renderItem="{ item }">
                          <a-list-item key="item.title">

                            <template #extra>

                            </template>
                            <a-list-item-meta :description="item.description">
                              <template #title>
                                <a :href="item.href">{{ item.title }}</a>
                              </template>

                            </a-list-item-meta>

                          </a-list-item>
                        </template>
                      </a-list>
                    </div>
                  </div>

                </a-col>
              </a-row>
            </div>
          </a-layout-content>






        </a-layout>

        <a-layout-sider :reverseArrow="true" theme="light" v-model="collapsed" @collapse="changeShowSide" collapsible :width="400" :style="siderStyle">
          <transition name="slide">
            <div class="AuthorsBox">
              <div class="line"></div>
              <div class="reprsent-title">合作机构</div>
              <a-list item-layout="vertical" size="small" :split="true" :data-source="associated_institutions" v-show="showSide">

                <template #renderItem="{ item }">
                  <a-list-item key="item.title">
                    <template #actions>
                          <span v-for="{ icon, text } in item.actions" :key="icon">
                            <component :is="icon" style="margin-right: 8px" />
                            {{ text }}
                          </span>
                    </template>

                    <a-list-item-meta :description="item.description">
                      <template #title>
                        <a :href="item.href" style="font-size: 15px">{{ item.title }}</a>
                      </template>

                    </a-list-item-meta>
                    <div style="margin-right: 100px">{{ item.content }}</div>
                  </a-list-item>
                </template>
              </a-list>
            </div>
          </transition>

        </a-layout-sider>

      </a-layout>

    </a-space>

</template>



<script setup>
import Data from "@/assets/icons/Data.vue";
import Paper from "@/assets/icons/Paper.vue";
import Core from "@/assets/icons/Core.vue";
import Quote from "@/assets/icons/Quote.vue";
import InstitutionTrend from "@/components/visual/InstitutionTrend.vue";

import { useRoute } from "vue-router";
import Trend from "@/components/visual/Trend.vue";
import Relationship from "@/components/visual/Relationship.vue";
import Search from "@/api/search.js";
import Swal from "sweetalert2";
import {CalendarOutlined, LinkOutlined} from "@ant-design/icons-vue";
import {ref} from "vue";
import Pie from "@/components/visual/Pie.vue";

const route = useRoute()
const institution = ref();
const institutionname = ref();
const works_count = ref();
const cited_by_count = ref();
const h_index = ref();
const geo = ref();
const associated_institutions = ref([]);
const associated_repositories = ref([]);
const series = ref([]);
const years = ref([]);
const x_concepts = ref([]);
const data = ref([]);
const pflag = ref(false)
const showSide = ref(true)
const InstitutionId ="https://openalex.org/"+route.params.institutionId
const changeShowSide = (collapsed, type)=>{
  showSide.value = !showSide.value;
}
onMounted(async ()=>{
  pflag.value = false;
  const result =  await Search.institution_detail(InstitutionId)
  if (result.data.success){
    const response = result.data.data
    console.log(response)
    institution.value = result.data.data
    institutionname.value = institution.value.display_name
    works_count.value = institution.value.works_count
    cited_by_count.value = institution.value.cited_by_count
    h_index.value = institution.value.summary_stats.h_index
    geo.value = institution.value.geo.city
    x_concepts.value = institution.value.x_concepts

    let paperData = [];
    let cited_by_counts = [];
    let yearArr = [];
    data.value = x_concepts.value.map(concept => ({
      value: concept.score,
      name: concept.display_name,
      url: concept.id,
    }));

    console.log(data)


    onMounted(() => {
      data.value = x_concepts.map(concept => ({
        value: concept.score,
        name: concept.display_name,
        url: concept.id,
      }));
    });

    for (let i = 0;i<response.counts_by_year.length;i++){
      paperData.push(response.counts_by_year[i].works_count);
      cited_by_counts.push(response.counts_by_year[i].cited_by_count);
      yearArr.push(response.counts_by_year[i].year)
    }

    for (let i=yearArr.length-1;i>=0;i--){
      years.value.push(yearArr[i]);
    }

    series.value.push( {
      name: '发文量',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: paperData
    });
    pflag.value = true;





    const associated_institutions_list = institution.value.associated_institutions

    for (let i = 0 ;i<associated_institutions_list.length;i++){
      const url = associated_institutions_list[i].id
      const parts = url.split('/');
      const institutionId = parts[parts.length - 1];
      const institutionActions = [
        { text: "concept:  "+associated_institutions_list[i].type.toString() },
      ];
      associated_institutions.value.push({
        href: "/client/institution/"+ institutionId,
        title: associated_institutions_list[i].display_name,
        actions: institutionActions
      });
    }


    const repositories_list = institution.value.repositories
    console.log(repositories_list)
    for (let i = 0 ;i<repositories_list.length;i++){
      const url = repositories_list[i].id

      associated_repositories.value.push({
        href: url,
        title: (i+1).toString() + ". " + repositories_list[i].display_name,
      });
    }





  }
  else {
    let promise = Swal.fire({
      icon: 'error',
      title:'该机构不存在'
    })
  }
})




const headerStyle = {
  marginLeft: '16%',
  marginTop: '20px',
  textAlign: 'center',
  color: '000',
  height: 'auto',
  width: '69%',
  backgroundColor: '#fff',
  borderRadius: '10px',
  minWidth: '970px',
  boxShadow:  '0 0 5px 0 hsla(0,0%,68.2%,.3)'
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 134px)',
  color: '#000',
};
const siderStyle = {
  textAlign: 'center',
  color: '#fff',
  marginTop: '10px',
  marginRight: '100px',
  borderRadius: '20px',
};

</script>





<style scoped>
*{
  line-height: 30px;
}
body{
  background-color:#041527;
}
.container {
  margin-top: 10px;
}


.research-list li {
  background-color: #fff;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
}
.institution-info{
  display: flex;
  text-align: left;
  margin-bottom: 2%;
  margin-top: 1%;
}
.institution-details{
  margin-left: 20px;
  display: flex;

}
.institution-total{
  padding: 20px;
}
img{
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
.card-content {

  display: flex;
  align-items: center;
}

.card-content div {
  margin-left: 20px;
}
.institution-info {
  z-index: 10000;
}

.institution-info img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.institution-info .institution-details {
  align-items: center;
  flex-grow: 1;
}

.institution-info .h-index {
  text-align: right;
}

.research-item {
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.research-title {
  font-size: 24px;
  margin-left: 15px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.research-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.research-institutions {
  font-size: 16px;
  color: #555;
}

.institution-container {
  display: inline-block;
}

.institution-name {
  font-weight: bold;
}

.research-stats {
  font-size: 14px;
  color: #777;
}
.research-container{
  text-align: left;
}
.outer-container{
  width: 81%;
  border-radius: 5px;
  margin-left: 20px;
  padding: 10px;
  background-color: white;
  font-family: sans-serif;
  box-shadow:  0 0 5px 0 hsla(0,0%,68.2%,.3)
}
.AuthorsBox {
  margin: 20px 10px 10px 10px;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  position: relative; /* 为伪元素定位 */
}
.reprsent-title{
  font-size: 15px;
  margin-left: 10px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  text-align: left;
}


.line{
  background:black;/*背景色为浅灰色*/
  width:5px;/*设置宽高*/
  margin-top: 3px;
  height:25px;
  left:150px;
  border-radius: 2px;
  float:left;/*让此div与前面的并排显示*/
}
</style>