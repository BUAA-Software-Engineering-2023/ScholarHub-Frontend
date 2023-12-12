<template>
  <div class="container">
    <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
      <a-layout>
        <a-layout-sider v-model="collapsed" @collapse="changeShowSide" collapsible :width="400" :style="siderStyle">
          <transition name="slide">
            <Trend v-show="showSide"></Trend>
          </transition>
        </a-layout-sider>
        <a-layout>
          <a-layout-header theme="light" :style="headerStyle">
            <div class="author-info">
              <div class="author-details">
                <a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }" src="{{avatar}}">
                  <template #icon>
                    <AntDesignOutlined />
                  </template>
                </a-avatar>

                <div style="display: flex">

                  <div style="margin: 0;">
                    <div style="font-size: 25px">
                      {{authorName}}
                    </div>

                    <br>
                    <div style="font-size: 20px">
                      {{last_known_institution}}
                    </div>

                  </div >
                  <a href="#" id="button-claim" @click="showModal">认领</a>
                  <a-modal v-model:open="open" title="Title" @ok="handleOk">
                    <template #footer>
                      <a-button key="back" @click="handleCancel">Return</a-button>
                      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Submit</a-button>
                    </template>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                  </a-modal>

<!--                  <div style="margin-left: 5%;margin-top: 3%;">-->
<!--                    <a-space wrap>-->
<!--                      <a-button type = "dashed"  style="background-color: #001529;color: white;font-size: 80%">认领门户</a-button>-->
<!--                    </a-space>-->
<!--                  </div>-->
                </div>
              </div>
<!--              <div class="h-index">-->
<!--&lt;!&ndash;                <p style="margin: 0;font-size: 20px">H指数：{{h_index}}</p >&ndash;&gt;-->
<!--                <a-card hoverable :bordered="false"   style="height: 55%; margin-top: 5px;">-->
<!--                  <div class="card-H ">H指数</div>-->
<!--                  <div class="card-H card-H-content">{{h_index}}</div>-->
<!--                </a-card>-->
<!--              </div>-->
            </div>
          </a-layout-header>
          <a-layout-content :style="contentStyle" style="margin-left: 15%;min-width: 1100px">
            <div class="author-total">
              <a-row :gutter="16">
                <a-col :span="5">
                  <a-card hoverable :bordered="false">
                    <div class="card-content">
                      <Paper style="font-size: 50px" />
                      <div style="text-align: center;margin-left: 25%;">
                        <p>学术发文总量</p >
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
                        <h2 style="color: rgb(145,236,252);font-weight: bold">{{ cited_by_count }}</h2>
                      </div>
                    </div>
                  </a-card>
                </a-col>
                <a-col :span="5">
                  <a-card hoverable :bordered="false">
                    <div class="card-content">
                      <Data style="font-size: 50px"  value=""/>
                      <div style="text-align: center;margin-left: 25%;">
                        <p>篇均被引频次</p >
                        <h2 style="color: rgb(217,144,175);font-weight: bold">{{ Math.floor(cited_by_count / works_count)}}</h2>
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
<!--                    <span class="title">研究成果</span>-->
                    <div class="research-item">
                      <div class="research-title">研究成果</div>
                      <div class="research-details">
                        <div class="research-authors">
                          <div class="author-container" v-for="(author, index) in researchAuthors" :key="index">
                            <span class="author-name">{{ author }}</span>
                            <span v-if="index !== researchAuthors.length - 1">, </span>
                          </div>
                        </div>
                        <div class="research-stats">
                          <p>引用量: {{ cited_by_count }}&nbsp; | &nbsp; 论文数: 5</p >
                        </div>
                      </div>
<!--                      <div class="research-abstract">-->
<!--                        这里是研究成果的摘要内容，可以是一段文字。-->
<!--                      </div>-->
                      <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="works">
                        <template #footer>

                        </template>
                        <template #renderItem="{ item }">
                          <a-list-item key="item.title">
                            <template #actions>
                            <span v-for="{ icon, text } in actions" :key="icon">
                              <component :is="icon" style="margin-right: 8px" />
                              {{ text }}
                            </span>
                            </template>
                            <template #extra>

                            </template>
                            <a-list-item-meta :description="item.description">
                              <template #title>
                                <a :href="item.href">{{ item.title }}</a>
                              </template>
                              <template #avatar><a-avatar :src="item.avatar" /></template>
                            </a-list-item-meta>
                            {{ item.content }}
                          </a-list-item>
                        </template>
                      </a-list>
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
    <a-float-button-group shape="circle" :style="{ right: '24px' }">
      
      <a-back-top :visibility-height="0" />
    </a-float-button-group>
  </div>

</template>

<script  setup>
import Search from "@/api/search.js"
import { useRoute } from "vue-router";
import Core from "@/assets/icons/Core.vue";
import Paper from "@/assets/icons/Paper.vue";
import Quote from "@/assets/icons/Quote.vue";
import Data from "@/assets/icons/Data.vue";
import Trend from "@/components/visual/Trend.vue";
import { AntDesignOutlined, LinkOutlined,  VerticalAlignBottomOutlined,CustomerServiceOutlined, CommentOutlined} from '@ant-design/icons-vue';
import Swal from "sweetalert2";
import {ref} from "vue";

const route = useRoute()
const showSide = ref(true)
const authorName = ref('')
const last_known_institution =ref('')
const h_index = ref('')
const author = ref()
const collapsed = ref(false)
const avatar = ref()
const works_count = ref()
const cited_by_count = ref()
const works = ref([])
const authorlist = ref([])
const pagination = {
  onChange: page => {
    console.log(page);
  },
  style:{height: '32px', lineHeight: '32px', textAlign: 'center !important'},
  pageSize: 7,
};
const actions = [
  { icon: LinkOutlined , text: '2' },
  { icon: VerticalAlignBottomOutlined, text: '2' },
];
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
    works_count.value = author.value.works_count
    cited_by_count.value = author.value.cited_by_count
    avatar.value = author.value.avatar
    const listData = author.value.works



    console.log(authorlist)
    for (let i = 0; i < listData.length; i++) {
      const url = listData[i].id
      const parts = url.split('/');
      const paperId = parts[parts.length - 1]; // 获取最后一个部分
      const authorships = author.value.works[i].authorships;
      let string = '';
      for (let j = 0; j < authorships.length; j++){
        const authorname = authorships[j].author.display_name
        if (j!==authorships.length-1)
          string = string+authorname+',';
        else
          string +=authorname;
      }
      console.log(string)
      authorlist.value.push(string)
      if (listData[i].abstract){
        works.value.push({
          href: "/client/paper/"+ paperId,
          title: listData[i].display_name,
          avatar: listData[i].avatar,
          description: authorlist.value[i],
          content: listData[i].abstract.slice(0, 300) + "..."
        });
      }
      else {
        works.value.push({
          href: "/client/paper/"+ paperId,
          title: listData[i].display_name,
          avatar: listData[i].avatar,
          description: authorlist.value[i],
          content: "No summary available"
        });
      }

    }
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
.card-H{
  text-align: center;
  font-size: 20px;

}
.card-H-content{
  text-align: center;
  color: #4B70E2;
  margin-top: 5px;
  font-size: 30px;
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
#button-claim {
  position: relative;
  width: 70px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  margin: 30px;
  text-decoration: none;
  color: #91ecfc;
  font-size: 15px;
  padding: 0 20px;
  text-transform: uppercase;
  transition: 0.5s;
  overflow: hidden;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #1113);
}
#button-claim::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-top: 2px solid #91ecfc;
  border-left: 2px solid #91ecfc;
  transition: 0.5s;
  transition-delay: 0.5s;
}
#button-claim::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
  border-bottom: 2px solid #91ecfc;
  border-right: 2px solid #91ecfc;
  transition: 0.5s;
  transition-delay: 0.5s;
}
#button-claim:hover::before, #button-claim:hover::after {
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}
#button-claim:hover {
  background-color: #91ecfc;
  color: #000;
  box-shadow: 0 0 50px #91ecfc;
  transition-delay: 0.3s;
}
#button-claim:nth-child(1) {
  filter: hue-rotate(150deg);
}
#button-claim:nth-child(3) {
  filter: hue-rotate(270deg);
}
#button-claim:nth-child(4) {
  filter: hue-rotate(400deg);
}
#button-claim:nth-child(5) {
  filter: hue-rotate(70deg);
}
</style>