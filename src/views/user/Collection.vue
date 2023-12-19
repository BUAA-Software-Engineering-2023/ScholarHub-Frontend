<script setup>
import UserApi from "@/api/user.js";
import { h, ref } from 'vue';
import SideBar from "@/views/user/SideBar.vue";
import Swal from "sweetalert2";
import CollectionList from "@/views/user/CollectionList.vue";
import {useRoute} from "vue-router";
import router from "@/router/index.js";
const collections = ref([])
const authorInfo = ref()
const route = useRoute();
const title = ref('');
const empty = ref('还没有收藏？，快去收藏论文吧！')
const folderId = ref('')
const collection_id = ref()
function showAuthorInfo(author,collectionId) {
  authorInfo.value = author;
  console.log(collectionId)
  collection_id.value = collectionId;
}
function hideAuthorInfo() {
  authorInfo.value = null;
}
onMounted( async () => {
  folderId.value = route.query.id
  if (folderId.value === ''||folderId.value===undefined) {
      folderId.value=''
  }else{
    const result =  await UserApi.get_favorite_item(folderId.value);
    if (!result.data.success){
      let promise = Swal.fire({
        icon: 'error',
        title:'服务器错误'
      });
      collections.value = result.data.data.items
      title.value = result.data.data.title
    }
    console.log(title.value)
  }
  isMounted.value = true;
});
function jump_to_article(id){
  console.log(id)
  const parts = id.split('/');
  const paperId = parts[parts.length - 1]; // 获取最后一个部分
  console.log(`/client/paper/${paperId}`)
  router.push(`/client/paper/${paperId}`)
}
async function handleSelect(){
  folderId.value = route.query.id
  if (folderId.value === ''||folderId.value===undefined) {
  }else{
    const result = await UserApi.get_favorite_item(folderId.value);
    collections.value = result.data.data.items
    title.value = result.data.data.title
    console.log(collections.value)
  }
}
const isMounted = ref(false);
</script>

<template>
  <div class="main-container">
    <div class="sidebar">
      <SideBar  select-keys="2"></SideBar>
      <CollectionList v-show="isMounted" @select="handleSelect"></CollectionList>
    </div>
    <div class="content">
      <div class="header">
        <div v-if="!folderId" class="title">我的收藏</div>
        <div class="title" v-else>{{title}}</div>
        <div class="header-content">总共收藏{{collections.length}}篇论文</div>
      </div>
      <div class="empty" v-if="!collections.length">
        <a-empty :description="empty" />
      </div>
      <div v-else class="collection">
        <div v-for="(collection, index) in collections" :key="index" class="collection-item">
          <div  @click.prevent="jump_to_article(collection.work)"> <span class="collection-title">{{ collection.title }}</span> </div>
          <div  class="author" v-for="(author,index1) in collection.authorships" :key="index1">
            <div class="collection-details">
              <div   @mouseover="showAuthorInfo(author.author,collection.id)"
                     @mouseleave="hideAuthorInfo"
                     class="author_container"
              ><span id="authorName" class="author-name-hover">{{ author.author.display_name }}</span>
                <span v-if="index1 !== collection.authorships.length - 1">，</span>
              </div>
            </div>
            <transition  name="slide">
              <div v-if="authorInfo && authorInfo.id === author.author.id&&collection_id===collection.id" class="author-info">
                <img src="@/assets/icons/default_avatar.png" alt="Author Avatar">
                <div class="author-details">
                  <div class="author-name">{{ authorInfo.display_name }}</div>
                  <div class="author-stats">
                    引用量: {{ authorInfo.citations }}&nbsp; | &nbsp; 论文数: {{ authorInfo.paper_count }}
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
          <div class="collection-stats">
            引用: <span class="count">{{ collection.cited_by_count }}</span>
          </div>
          <el-divider></el-divider>
        </div>
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
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
}
.main-container {
  min-height: 900px;
  height: 100%;
  background-color: #f0f1f4;
  min-width:  1100px;
  display: flex;
}

.sidebar {
  border-radius: 10px;
  min-width: 300px;
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
  margin-top: 20px;
  background-color: #fff;
  width: 86%;
  border-radius: 20px !important;
  text-align: left;
  color: #363c50 !important;
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
  width: 80px;
  height: 80px;
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