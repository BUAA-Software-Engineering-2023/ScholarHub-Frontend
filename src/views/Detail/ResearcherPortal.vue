<template>
  <div class="container">
    <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
      <a-layout>
        <a-layout-sider v-model="collapsed" @collapse="changeShowSide" collapsible :width="400" :style="siderStyle">学者贡献
         <transition name="slide">
           <Trend v-show="showSide"></Trend>
         </transition>
        </a-layout-sider>
        <a-layout>
          <a-layout-header theme="light" :style="headerStyle">
            <div class="author-info">
              <img src="@/assets/icons/default_avatar.png" alt="">
              <div class="author-details">
                <p style="margin: 0;font-size: 15px">{{authorName}}</p>
                <p>{{last_known_institution}}</p>
              </div>
              <div class="h-index">
                <p style="margin: 0;font-size: 20px">H指数：{{h_index}}</p>
              </div>
            </div>
          </a-layout-header>
          <a-layout-content :style="contentStyle" style="margin-left: 15%;min-width: 1100px">
            <div class="author-total">
              <a-row :gutter="16">
                <a-col :span="5">
                  <a-card hoverable :bordered="false">
                    <div class="card-content">
                      <Paper style="font-size: 50px" />
                      <div >
                        <p>学术发文总量</p>
                        <h2>168</h2>
                      </div>
                    </div>
                  </a-card>
                </a-col>
                <a-col :span="5">
                  <a-card hoverable :bordered="false">
                    <div class="card-content">
                      <Core style="font-size: 50px" />
                      <div >
                        <p>核心发文总量</p>
                        <h2>168</h2>
                      </div>
                    </div>
                  </a-card>
                </a-col>
                <a-col :span="5">
                  <a-card hoverable :bordered="false">
                    <div class="card-content">
                      <Quote style="font-size: 50px" />
                      <div >
                        <p>学术发文总量</p>
                        <h2>168</h2>
                      </div>
                    </div>
                  </a-card>
                </a-col>
                <a-col :span="5">
                  <a-card hoverable :bordered="false">
                    <div class="card-content">
                      <Data style="font-size: 50px"  value=""/>
                      <div >
                        <p>学术发文总量</p>
                        <h2>168</h2>
                      </div>
                    </div>
                  </a-card>
                </a-col>
              </a-row>
            </div>
            <div class="outer-container">
              <a-row :gutter="16">
                <a-col :span="24">
                  <div class="research-container">
                    <span class="title">研究成果</span>
                    <div class="research-item">
                      <div class="research-title">研究成果标题</div>
                      <div class="research-details">
                        <div class="research-authors">
                          <div class="author-container" v-for="(author, index) in researchAuthors" :key="index">
                            <span class="author-name">{{ author }}</span>
                            <span v-if="index !== researchAuthors.length - 1">, </span>
                          </div>
                        </div>
                        <div class="research-stats">
                          <p>引用量: 10&nbsp; | &nbsp; 论文数: 5</p>
                        </div>
                      </div>
                      <div class="research-abstract">
                        这里是研究成果的摘要内容，可以是一段文字。
                      </div>
                    </div>
                  </div>
                </a-col>
              </a-row>
            </div>
          </a-layout-content>
          <a-layout-footer :style="footerStyle">Footer</a-layout-footer>
        </a-layout>
      </a-layout>
    </a-space>
  </div>
</template>

<script setup>
import Search from "@/api/search.js"
import { useRoute } from "vue-router";
import Core from "@/assets/icons/Core.vue";
import Paper from "@/assets/icons/Paper.vue";
import Quote from "@/assets/icons/Quote.vue";
import Data from "@/assets/icons/Data.vue";
import Trend from "@/components/visual/Trend.vue";
import Swal from "sweetalert2";
const route = useRoute()
const showSide = ref(true)
const authorName = ref('')
const last_known_institution =ref('')
const h_index = ref('')
const author = ref()
const collapsed = ref(false)
const changeShowSide = (collapsed, type)=>{
    showSide.value = !showSide.value;
}

// const AuthorId = "https://openalex.org/A5067833651"
const AuthorId ="https://openalex.org/"+route.params.authorId
onMounted(async () => {
    const result =  await Search.author_detail(AuthorId)
    if (result.data.success){
      const response = result.data.data
      console.log(response)
      author.value = result.data.data
      last_known_institution.value = author.value.last_known_institution.display_name
      h_index.value = author.value.summary_stats.h_index
      authorName.value = author.value.display_name
    }else {
      let promise = Swal.fire({
        icon: 'error',
        title:'该作者不存在'
      })
    }

})
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
const siderStyle = {
  textAlign: 'center',
  color: '#fff',
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};

// 添加研究成果列表的数据
const researchResults = ref([
  { id: 1, title: '研究成果 1' },
  { id: 2, title: '研究成果 2' },
  { id: 3, title: '研究成果 3' },
  // 添加更多研究成果
]);
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

.research-list {
  list-style: none;
  padding: 0;
}

.research-list li {
  background-color: #fff;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
}
.author-info{
  display: flex;
  text-align: left;
}
.author-details{
  margin-left: 10px;
}
.author-total{
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
.author-info {
  display: flex;
  width: 50%;
  justify-content: space-between;
  flex-grow: 1;
}

.author-info img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.author-info .author-details {
  align-items: center;
  flex-grow: 1;
}

.author-info .h-index {
  text-align: right;
}

.research-item {
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.research-title {
  font-size: 24px;
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

.research-authors {
  font-size: 16px;
  color: #555;
}

.author-container {
  display: inline-block;
}

.author-name {
  font-weight: bold;
}

.research-stats {
  font-size: 14px;
  color: #777;
}

.research-abstract {
  font-size: 16px;
  line-height: 1.6;
  color: #444;
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
.title{
  font-weight: 900;
}
.slide-enter-from,
.slide-leave-to{
  opacity: 0;
  transform: translateY(40px);
}
.slide-enter-active{
  transition: all .5s;
}
</style>
