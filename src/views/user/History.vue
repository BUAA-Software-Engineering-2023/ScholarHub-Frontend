<script setup>
import UserApi from "@/api/user.js";
import { h, ref } from 'vue';
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
import SideBar from "@/views/user/sideBar.vue";
import Swal from "sweetalert2";
const collections = ref([])
const authorInfo = ref()
function showAuthorInfo(author) {
  authorInfo.value = author;
  console.log(authorInfo.value.id)
}

function hideAuthorInfo() {
  authorInfo.value = null;
}
onMounted( async () => {
  const result =  await UserApi.get_favorite();
  console.log(result.data)
  if (!result.data.success){
    let promise = Swal.fire({
      icon: 'error',
      title:'服务器错误'
    });
  }
  collections.value = result.data.data
});

</script>

<template>
  <div class="main-container">
    <div class="sidebar">
      <SideBar select-keys="3"></SideBar>
    </div>
    <div class="content">
      <div class="header">
        <div class="title">我的收藏</div>
        <div class="header-content">总共收藏{{collections.length}}篇论文</div>
      </div>
    </div>
  </div>


</template>

<style lang="scss" scoped>

.header{
  background-color: white;
  padding: 20px;
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
.collection {
  margin: 20px;
  border: 1px solid #5a5a5a;
  background-color: #fff;
  width: 80%;
  border-radius: 20px !important;
  text-align: left;
  color: #363c50 !important;
}

.collection h2 {
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.collection-item {
  font-size: 18px;
  padding: 10px;
  color: #363c50;
}

.collection-title {
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  color: #a0a5a8;
}

.collection-title:hover{
  color: #4B70E2;
}
.collection-details {
  cursor: pointer;
  font-size: 14px;
  color: #75a468;
}

.collection-abstract {
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
  width: 90px;
  height: 80px;
  margin-right: 30px;
  padding-right: 20px;
}
// 动画
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
.collection-stats{
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
</style>