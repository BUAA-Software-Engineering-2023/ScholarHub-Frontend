<script setup>
import UserApi from "@/api/user.js";
import { h, ref } from 'vue';
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
import SideBar from "@/views/user/SideBar.vue";
import Swal from "sweetalert2";
import router from "@/router/index.js";
const historyInfo = ref([])
const authorInfo = ref()
function showAuthorInfo(author,collectionId) {
  authorInfo.value = author;
  console.log(collectionId)
  collection_id.value = collectionId;
}

function hideAuthorInfo() {
  authorInfo.value = null;
}
onMounted( async () => {
  const result =  await UserApi.get_history();
  console.log(result.data)
  if (!result.data.success){
    let promise = Swal.fire({
      icon: 'error',
      title:'服务器错误'
    });
  }
  historyInfo.value = result.data.data
});
function jump_to_article(id){
  console.log(id)
  const parts = id.split('/');
  const paperId = parts[parts.length - 1]; // 获取最后一个部分
  console.log(`/client/paper/${paperId}`)
  router.push(`/client/paper/${paperId}`)
}
</script>

<template>
  <div class="main-container">
    <div class="sidebar">
      <SideBar select-keys="3"></SideBar>
    </div>

    <div class="content">
      <div class="header">
        <div class="title">浏览历史</div>
        <div class="header-content">总共浏览共{{historyInfo.length}}篇论文</div>
      </div>
        <div class="empty" v-if="!historyInfo.length">
          <a-empty description="暂无浏览记录" />
        </div>
        <div v-else class="history">
          <div v-for="(history, index) in historyInfo" :key="index" class="history-item">
            <div  @click="jump_to_article(history.work)"> <span class="history-title">{{ history.title }}</span> </div>
            <div  class="author" v-for="(author,index1) in history.authorships" :key="index1">
              <div class="history-details">
                <div   @mouseover="showAuthorInfo(author.author)"
                       @mouseleave="hideAuthorInfo"
                       class="author_container"
                ><span id="authorName" class="author-name-hover">
                  {{ author.author.display_name }}
                </span>
                  <span v-if="index1 !== history.authorships.length - 1">，</span>
                </div>
              </div>
              <transition  name="slide">
                <div v-if="authorInfo && authorInfo.id === author.author.id" class="author-info">
                  <img src="@/assets/imgs/default.jpg" alt="Author Avatar">
                  <div class="author-details">
                    <div class="author-name">{{ authorInfo.display_name }}</div>
                    <div class="author-stats">
                      引用量: {{ authorInfo.citations }}&nbsp; | &nbsp; 论文数: {{ authorInfo.history_count }}
                    </div>
                    <div class="author-title">
                      贡献： {{
                        author.author_position === 'first' ? '第一作者' :
                            author.author_position === 'middle' ? '中间作者' :
                                author.author_position === 'last' ? '最后作者' :
                                    '其他作者'
                      }}
                    </div>
                    <div class="author-title">
                    </div>
                  </div>
                </div>
              </transition>
            </div>
            <div class="history-stats">
              引用: <span class="count">{{ history.cited_by_count }}</span>
            </div>
          </div>
        </div>
    </div>
  </div>


</template>

<style lang="scss" scoped>

.header{
  text-align: left;
  border-radius: 10px;
  margin-right: 10vw;
  color: #18181b;
  margin-top: 20px;
}
.main-container {
  min-height: 900px;
  height: 100%;
  background-color: #f0f1f4;
  min-width:  1100px;
  display: flex;
}

.sidebar {
  /* 左侧导航栏样式 */
  width: 20%; /* 左侧宽度，可以根据需求调整 */
  background-color: #f0f1f4; /* 侧边栏背景色 */
  /* 可添加其他样式 */
}

.content {
  margin-left: 10vw;
  /* 右侧内容样式 */
  width: 80%; /* 右侧宽度，可以根据需求调整 */
  /* 可添加其他样式 */
}
.history {
  margin-top: 20px;
  background-color: #fff;
  width: 86%;
  border-radius: 20px !important;
  text-align: left;
  color: #363c50 !important;
}

.history h2 {
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.history-item {
  font-size: 18px;
  padding: 10px;
  color: #363c50;
}

.history-title {
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  color: #a0a5a8;
}

.history-title:hover{
  color: #4B70E2;
}
.history-details {
  cursor: pointer;
  font-size: 14px;
  color: #75a468;
}

.history-abstract {
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.6;
  color: #d0cece;
}
.author_container{
  display: inline-block;
}
.title{
  font-weight: 800;
  font-size: 20px;
  width: 80%;
  text-align: left;
}
.header-content{
  font-size: 15px;
  font-weight: 300;
}
.author-container {
  position: relative;
}

.author-info {
  position: absolute;
  border-radius: 5px;
  top: auto;
  transition: .5s;
  margin-left: 10px;
  background-color: #fff;
  padding: 5px;
  border: 1px solid #ccc;
  display: flex;
  box-shadow: 1px 1px #a0a5a8;
}
.author{
  display: inline-block;
}
.author-info{
  z-index: 10000;
}
.author-info img{
  width: 80px;
  height: 80px;
}
.slide-enter-from,
.slide-leave-to{
  opacity: 0;
  transform: translateY(40px);
}
.slide-enter-active,
.slide-leave-active{
  transition: all .5s;
}
.author-name{
  font-size: 20px;
}
.author-stats{
  font-size: 12px;
}
.author-title{
  font-size: 12px;
}
.author-details{
  margin-left: 20px;
}
.history-stats{
  margin-bottom: 10px;
  font-size: 14px;
  color: #a0a5a8;
}
.count{
  color: #4B70E2;
}
#authorName:hover{
  text-decoration: none; /* 取消实线下划线 */
  border-bottom: 1px dashed #75a468; /* 添加虚线下划线 */
}
.empty {
  background-color: #fff;
  padding: 200px;
  height: 70%;
  width: 86%;
  margin-top: 20px;
  border-radius: 10px !important;
  text-align: left;
  color: #363c50 !important;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
}
.header{
  background-color: white;
  padding: 20px;
  text-align: left;
  border-radius: 10px;
  margin-right: 10vw;
  color: #18181b;
  margin-top: 20px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
}
</style>