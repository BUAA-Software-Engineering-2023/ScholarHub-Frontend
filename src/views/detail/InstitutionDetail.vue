
<template>
  <div class="container">
    <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
      <a-layout>
        <a-layout>
          <a-layout-header theme="light" :style="headerStyle">
            <!-- 机构信息区域 -->
            <div class="institution-info">
              <div class="institution-details">
                <!-- 机构相关信息展示 -->
                <div style="font-size: 25px;font-weight: 800">
                  institutionName
                </div>
                <div style="font-size: 20px;margin-top: 10px;font-weight: 200">
                  location
                </div>
              </div>
            </div>
          </a-layout-header>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 25 }">
            <a-col :span="4">
            </a-col>
            <a-col :span="12">
          <a-layout-content :style="contentStyle" style="margin-left: 15%;min-width: 1200px">
            <div class="institution-total">
              <a-row :gutter="25">
                <a-col :span="5">
                  <a-card hoverable :bordered="false">
                    <div class="card-content">
                      <Paper style="font-size: 50px" />
                      <div style="text-align: center;margin-left: 25%;">
                        <p>发文总量</p >
                        <h2 style="font-weight: bold;color: #53cda5">34543</h2>
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
                        <h2 style="color: #747bff;font-weight: bold">34543543</h2>
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
                        <h2 style="color: rgb(145,236,252);font-weight: bold">435345</h2>
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
                        <h2 style="color: rgb(217,144,175);font-weight: bold">345435</h2>
                      </div>
                    </div>
                  </a-card>
                </a-col>
              </a-row>
            </div>
            <div style="margin-left: 10px;margin-bottom: 20px">
            <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 15 }">
              <a-col :xs="24" :sm="12" :md="12" :lg="10">
                <InstitutionTrend style="width: 95%; height: 250px;"></InstitutionTrend>
              </a-col>
              <a-col :xs="24" :sm="12" :md="12" :lg="10">
                <InstitutionTrend style="width: 95%; height: 250px;"></InstitutionTrend>
              </a-col>
            </a-row>
            </div>

            <div class="outer-container">
              <a-row :gutter="16">
                <a-col :span="24">
                  <div class="research-container">
                    <div class="research-item">
                      <div class="line"></div>
                      <div class="research-title">研究成果</div>
                      <div class="research-details">
                        <div class="research-institutions">
                          <div class="institution-container" v-for="(institution, index) in researchinstitutions" :key="index">
                            <span class="institution-name">43534</span>
                            <span v-if="index !== researchinstitutions.length - 1">, </span>
                          </div>
                        </div>
                        <div class="research-stats">
                          <p>引用量: 546456&nbsp; | &nbsp; 论文数: 234324</p >
                        </div>
                      </div>
                      <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="works">
                        <template #footer>

                        </template>
                        <template #renderItem="{ item }">
                          <a-list-item key="item.title">
                            <template #actions>
                              <span v-for="{ icon, text } in item.actions" :key="icon">
                              <component :is="icon" style="margin-right: 8px" />
                              text
                            </span>
                            </template>
                            <template #extra>

                            </template>
                            <a-list-item-meta :description="item.description">
                              <template #title>
                                <a :href="item.href">Title</a>
                              </template>
                              <template #avatar><a-avatar :src="item.avatar" /></template>
                            </a-list-item-meta>
                            content
                          </a-list-item>
                        </template>
                      </a-list>
                    </div>
                  </div>

                </a-col>
              </a-row>
            </div>
          </a-layout-content>
            </a-col>

            <a-col :span="5">
              <div class="AuthorsBox">
                <div class="line"></div>
                <div class="reprsent-title">代表学者</div>
              <a-list item-layout="vertical" size="small" :split="false" :data-source="listData">

                <template #renderItem="{ item }">
                  <a-list-item key="item.title">
                    <template #actions>
                    <span v-for="{ icon, text } in actions" :key="icon">
                      <component :is="icon" style="margin-right: 8px" />
                      {{ text }}
                    </span>
                    </template>

                    <a-list-item-meta :description="item.description">
                      <template #title>
                        <a :href="item.href" style="font-size: 15px">{{ item.title }}</a>
                      </template>
                      <template #avatar><a-avatar :src="item.avatar" /></template>
                    </a-list-item-meta>
                    {{ item.content }}
                  </a-list-item>
                </template>
              </a-list>
              </div>


              <div class="AuthorsBox">
                <div class="line"></div>
                <div class="reprsent-title">合作机构</div>
                <a-list item-layout="vertical" size="small" :split="false" :data-source="listData">

                  <template #renderItem="{ item }">
                    <a-list-item key="item.title">
                      <template #actions>
                    <span v-for="{ icon, text } in actions2" :key="icon">
                      <component :is="icon" style="margin-right: 8px" />
                      {{ text }}
                    </span>
                      </template>

                      <a-list-item-meta >
                        <template #title>
                          <a :href="item.href" style="font-size: 20px;text-align: left;">{{ item.title }}</a>
                        </template>
                      </a-list-item-meta>
                      {{ item.content }}
                    </a-list-item>
                  </template>
                </a-list>
              </div>


            </a-col>
          </a-row>
        </a-layout>
      </a-layout>
    </a-space>
  </div>
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

const route = useRoute()

const InstitutionId ="https://openalex.org/"+route.params.institutionId
onMounted(async ()=>{
  const result =  await Search.institution_detail(InstitutionId)
  if (result.data.success){
    const response = result.data.data
    console.log(response)
  }
  else {
    let promise = Swal.fire({
      icon: 'error',
      title:'该机构不存在'
    })
  }
})
const listData = [];
for (let i = 0; i < 5; i++) {
  listData.push({
    href: 'https://www.antdv.com/',
    title: `name${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
        'Ant Design',
  });
}

const actions = [
  {

    text: '发文量:77',
  },
  {
    text: '被引频次:306',
  },
  {
    text: 'H指数:11',
  },
];

const actions2 = [
  {

    text: '合作发文量：57',
  },
  {
    text: '合作发文被引频次：375',
  },

];

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 'auto',
  padding: '20px',
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 134px)',
  color: '#000',
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
}
.institution-details{
  display: flex;
  margin-left: 10px;
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
  display: flex;
  width: 50%;
  justify-content: space-between;
  flex-grow: 1;
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