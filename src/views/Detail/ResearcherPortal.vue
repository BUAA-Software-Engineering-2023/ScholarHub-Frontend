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
                <p style="margin: 0;font-size: 15px">{{authorName}}</p >
                <p>{{last_known_institution}}</p >
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
                      <div >
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
                      <div >
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
                      <div >
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
                      <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
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

<script lang="ts" setup>
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
const listData: Record<string, string>[] = [];

for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://d.wanfangdata.com.cn/periodical/ChlQZXJpb2RpY2FsQ0hJTmV3UzIwMjMwODMxEg1oa3hiMjAyMzAyMDE1GggydzljcXptbQ%3D%3D',
    title: `科研成果 ${i + 1}`,
    avatar: '/assets/icons/default_avatar.png',
    description:
        '作者1，作者2，作者3',
    content:
        '这是一段论文简介,这是一段论文简介,这是一段论文简介,这是一段论文简介,这是一段论文简介,这是一段论文简介,这是一段论文简介,这是一段论文简介,这是一段论文简介,这是一段论文简介,这是一段论文简介,这是一段论文简介,这是一段论文简介,这是一段论文简介,',
  });
}
const pagination = {
  onChange: (page: number) => {
    console.log(page);
  },
  pageSize: 3,
};
const actions: Record<string, any>[] = [
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

    console.log(avatar.value)
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
</style>