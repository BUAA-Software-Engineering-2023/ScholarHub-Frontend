<script setup>
import Comments from "@/views/paper/Comments.vue";
import SearchAPI from "@/api/search.js"
import {useRoute} from "vue-router";
import ReferenceWork from "@/views/paper/ReferenceWork.vue";
import RelatedWork from "@/views/paper/RelatedWork.vue";
import Concept from "@/assets/icons/Concept.vue";
import Type from "@/assets/icons/Type.vue";
import {StarFilled} from "@element-plus/icons-vue";
import UserAPI from "@/api/user.js"
import { message } from 'ant-design-vue';

const paperInfo =ref([])
const route = useRoute()
const authorInfo = ref()
const download = ref(false)
const showFavorite = ref(false);
const paperId = "https://openalex.org/"+route.params.paperId
const reference_works = ref([]);
const related_works = ref([]);
const favorites = ref([])
onMounted(async () => {
  const result = await SearchAPI.get_article_detail(paperId);
  favorites.value = await (await UserAPI.get_favorite()).data.data;
  console.log(result)
  if (result.data.success){
    console.log(result.data.data)
    paperInfo.value = [result.data.data]
  }
  if (paperInfo.value[0].referenced_works)
  {
    const list = paperInfo.value[0].referenced_works
    for (let i = 0; i < list.length; i++) {
      const url = list[i].id;
// 使用字符串分割方法，以 '/' 分割URL，并选择最后一个部分
      const parts = url.split('/');
      const paperId = parts[parts.length - 1]; // 获取最后一个部分
      console.log(paperId); // 输出 W1775749144
      reference_works.value.push({
        href: paperId,
        title: "["+(i+1)+"] "+ list[i].display_name+" "+list[i].publication_year,
        avatar: 'https://joeschmoe.io/api/v1/random',
      });
    }
  }
  if (paperInfo.value[0].related_works)
  {
    const list = paperInfo.value[0].related_works
    for (let i = 0; i < list.length; i++) {
      const url = list[i].id;
      const parts = url.split('/');
      const paperId = parts[parts.length - 1]; // 获取最后一个部分
      console.log(paperId); // 输出 W1775749144
      related_works.value.push({
        href: paperId,
        title: "["+(i+1)+"] "+ list[i].display_name,
        avatar: 'https://joeschmoe.io/api/v1/random',
      });
    }
  }
  if (paperInfo.value[0].locations){
    const locations = paperInfo.value[0].locations;
    for (let i=0;i<locations.length;i++){
      const landing_page_url = locations[i].landing_page_url
      options.value.push(
          {
            value: landing_page_url,
            label: landing_page_url,
          },
      )
    }

  }

});
function showAuthorInfo(author) {
  authorInfo.value = author;
}
const isFavorite = ref(false); // 是否已经收藏，可以根据实际逻辑进行设置

function toggleFavorite() {
  isFavorite.value = !isFavorite.value; // 切换收藏状态的逻辑
}
function downloadPDF(){
  const url = paperInfo.value[0].open_access.oa_url // 下载文件的url
  const link = document.createElement('a') ;
  link.href = url;
  link.download = 'file.pdf' // 下载文件的名称
  link.target="_blank"
  link.click()
  // window.URL.revokeObjectURL(url)
}
function hideAuthorInfo() {
  authorInfo.value = null;
}
const showAbstract = ref(false);

function toggleAbstract() {
  showAbstract.value = !showAbstract.value;
}
function showDownload(){
  download.value = true;
}
function hideDownload(){
  download.value = false;
}
function showFavoriteList(){
  showFavorite.value = true;
}
const options = ref([]);
const value = ref();
const handleChange = async value => {
  console.log(value); // { key: "lucy", label: "Lucy (101)" }
  const url = value.value // 下载文件的url
  console.log(url.value)
  const link = document.createElement('a') ;
  link.href = url;
  link.target="_blank"
  link.click()
  // window.URL.revokeObjectURL(url)
};
async function add_favorite(foldId,paperId){
  // message.success('收藏成功！', 10);
  const result = await UserAPI.add_favorite_item(foldId,paperId);
  message.success('收藏成功！', 10);
  toggleFavorite();
}
</script>


<template>
  <div class="main-container">
    <div class="content">
      <div class="paper">
        <div v-for="(paper, index) in paperInfo" :key="index" class="paper-item">
          <div  @click="jumpToarticle"> <span class="paper-title">{{ paper.display_name }}</span> </div>
          <div  class="author" v-for="(author,index1) in paper.authorships" :key="index1">
            <div class="paper-details">
              <div   @mouseover="showAuthorInfo(author.author)"
                     @mouseleave="hideAuthorInfo"
                     class="author_container"
              ><span id="authorName" class="author-name-hover">{{ author.author.display_name }}</span>
                <span v-if="index1 !== paper.authorships.length - 1">，</span>
              </div>
            </div>
            <transition  name="slide">
              <div v-if="authorInfo && authorInfo.id === author.author.id" class="author-info">
                <img src="@/assets/imgs/default.jpg" alt="Author Avatar">
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
          <div v-if="paper.concepts" class="concepts">
            <div class="concepts-text">
              <Concept></Concept>
              <div class="concept"  v-for="(concept,index1) in paper.concepts">
                <span class="concept-content"> {{concept.display_name}}</span>
                <span v-if="index1 !== paper.concepts.length - 1">，</span>
              </div>
            </div>
          </div>
          <div class="type"  v-if="paper.type">
            <Type></Type>
            <div class="concept">
              <span class="concept-content"> {{paper.type}}</span>
            </div>
          </div>
          <div class="paper-stats">
            引用: <span class="count">{{ paper.cited_by_count }}</span>
          </div>
          <div v-if="paper.abstract" class="paper-abstract">
            <div class="title">摘要</div>
            <div class="abstract-text" v-if="paper.abstract.length<500">
              {{paper.abstract}}
            </div>
            <div v-else>
              <div v-if="showAbstract" class="abstract-text">
                {{ paper.abstract }}
                <span class='shouqi' @click="toggleAbstract">收起</span>
              </div>
              <div v-else class="abstract-text-collapsed">
                {{ paper.abstract.slice(0, 500) }}...
                <span class="more" @click="toggleAbstract">更多</span>
              </div>
            </div>

          </div>

          <div v-if="paper.keywords" class="keywords">
            <div class="title">关键词</div>
            <div class="keywords-text">
              <div class="keyword"  v-for="(keyword,index1) in paper.keywords">
                <span class="keyword-content"> {{keyword.keyword}}</span>
                <span v-if="index1 !== paper.keywords.length - 1">，</span>
              </div>
            </div>
          </div>
          <div class="buttons">
            <div @click="downloadPDF" @mouseover="showDownload" @mouseleave="hideDownload" class="download-pdf">
              <span class="pdf"> PDF</span>
              <transition  name="slide1">
                <span class="arrow" v-if="download"><EyeOutlined /></span>
              </transition>
            </div>
            <div class="paper-link">
              <a-select
                  :autoClearSearchValue="true"
                  v-model:value="value"
                  label-in-value
                  placeholder="原文链接"
                  style="width: 120px;box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;margin: 5px;border-radius: 5px"
                  :options="options"
                  @change="handleChange"
              ></a-select>
            </div>
            <button @mouseover="showFavoriteList" class="favorite-button" >
              <span v-if="isFavorite">已收藏<el-icon class="icons"><StarFilled /></el-icon></span>
              <span v-else >收藏 <el-icon class="icons"><Star /></el-icon></span>
            </button>
            <div v-show="showFavorite&&!isFavorite" @mouseover="showFavoriteList" @mouseleave="showFavorite = false" class="favorite-list" >
              <div v-for="(favorite,index) in favorites" :key="index">
                <div class="favorite-list-item" @click="add_favorite(favorite.id,paperId)"> {{favorite.title}}</div>
              </div>
              <!-- 这里放置你的收藏列表内容 -->
            </div>
          </div>

        </div>
      </div>

      <div class="reference_work">
        <div class="title"> 参考文献</div>
        <ReferenceWork :reference_works="reference_works"></ReferenceWork>
      </div>
      <div class="reference_work">
        <div class="title"> 评论区</div>
        <Comments :comments="comments"></Comments>
      </div>
    </div>
    <div class="sideBar">
      <div class="relatedwork">
        <div class="title">相关文献</div>
        <RelatedWork :related_works="related_works"></RelatedWork>
      </div>
      <div class="reference_graph">
        <div class="title">引用量</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.paper {
  padding: 10px;
  background-color: white;
  border-radius: 10px !important;
  text-align: left;
  color: #363c50 !important;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
}

.paper h2 {
  font-size: 24px;
  font-weight: bold;
  color: #5a5a5a;
}

.paper-item {
  font-size: 18px;
  padding: 10px;
  color: #363c50;
}

.paper-title {
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  color: #000E28;
}
.paper-details {
  cursor: pointer;
  font-size: 14px;
  color: #75a468;
}

.paper-abstract {
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.6;
  color: #5a5a5a;
}
.keywords-text{
  display: flex;
}
.concepts-text{
  display: flex;
}
.author_container{
  display: inline-block;
}
.title{
  color: white;
  width: 80%;
  text-align: left;
}
.el-divider{
  margin: 0 !important;
  padding: 0 !important;
}
.author-container {
  position: relative;
}
.author_container{
  display: inline-block;
}
.title{
  color: white;
  width: 80%;
  text-align: left;
}
.el-divider{
  margin: 0 !important;
  padding: 0 !important;
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
  border-radius: 20px;
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
  padding-right: 20px;
  margin-left: 20px;
}
.paper-stats{
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #75a468;
  font-weight: 600;
}
.count{
  color: #75a468;
}
#authorName:hover{
  text-decoration: none;
  border-bottom: 1px dashed #75a468;
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
.slide1-enter-from,
.slide1-leave-to{
  opacity: 0;
  transform: translateX(40px);
}
.slide1-enter-active,
.slide1-leave-active{
  transition: all .5s;
}

.recommendation-stats{
  margin-bottom: 10px;
  font-size: 14px;
  color: #a0a5a8;
}
.title{
  color:black;
  font-size: 18px;
  font-weight: 800;
}
.sideBar{
  border-radius: 10px;
  min-width: 300px;
  /* 左侧导航栏样式 */
  width: 20%; /* 左侧宽度，可以根据需求调整 */
  background-color: #f0f1f4; /* 侧边栏背景色 */
}
.content{
  margin-left: 10vw;
  margin-top: 30px;
  width: 60%;
}
.main-container{
  min-height: 900px;
  height: 100%;
  background-color: #f0f1f4;
  min-width:  1100px;
  display: flex;
}

.shouqi{
  cursor: pointer;
  color: blue;
}
.more {
  cursor: pointer;
  color: blue;
}
.keyword{
  font-size: 14px;
  margin-right: 6px;
  color: #666666;
}
.concept{
  margin-left: 5px;
  font-size: 14px;
}
/* 悬停添加箭头图标 */
.download-pdf {
  font-size: 14px;
  cursor: pointer;
  display: flex;
  border-radius: 5px;
  background-color: #C51C01;
  border: none;
  color: #ffff;
  text-align: center;
  font-weight: 400;
  width: 80px;
  transition: all 0.5s;
  padding: 5px;
  margin: 5px 5px 5px 0;
  vertical-align: middle;
}
.download-pdf span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}
.pdf{
  font-weight: 600 ;
  margin: auto 10px;
}
.arrow{
  margin: auto 5px;
}
.reference_work {
  margin-top: 20px;
  background-color: white;
  border-radius: 10px !important;
  text-align: left;
  color: #363c50 !important;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  padding: 20px;
  margin-bottom: 20px;
}

.reference-item {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
}

.title {
  font-weight: bold;
}

.publication-year {
  font-style: italic;
}
.favorite-button {
  font-size: 14px;
  margin: 5px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  outline: none;
}

.favorite-button:hover {
  background-color: #2980b9;
}
.buttons{
  display: flex;
}
.type{
  margin-top: 10px;
  display: flex;
  font-weight: 400;
}
.concepts{
  margin-top: 10px;
}
.icons{
  top: 2px;
  font-size: 15px;
  color: #e7a43d;
}
.buttons {
  position: relative; /* 确保父元素是相对定位 */
}
.favorite-list {
  position: absolute; /* 绝对定位 */
  top: 100%; /* 位于按钮的下方 */
  left: 210px; /* 从左边开始 */
  width: 100px;
  z-index: 1000; /* 确保它在其他元素上方 */
  background-color: white; /* 可选：背景颜色 */
  border: 1px solid #ccc; /* 可选：边框 */
  border-radius: 5px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2); /* 可选：阴影效果 */
  /* 其他样式 */
}
.favorite-list-item{
  color: black;
  font-size: 14px;
  padding: 0 10px;
  margin: 5px 5px;
  border-radius: 5px;
}
.favorite-list-item:hover{
  color: black;
  background-color: #f2f4f7;

}

.sideBar{
  border-radius: 10px;
  min-width: 280px;
  margin-top: 30px;
  margin-left: 3%;
  /* 左侧导航栏样式 */
  width: 15%; /* 左侧宽度，可以根据需求调整 */
  background-color: #f0f1f4; /* 侧边栏背景色 */
}

.reference_graph{
  margin-top: 20px;
  padding: 10px;
  background-color: white;
  border-radius: 10px !important;
  text-align: left;
  color: #363c50 !important;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  height: 30%;
}

.relatedwork{
  padding: 10px;
  background-color: white;
  border-radius: 10px !important;
  text-align: left;
  color: #363c50 !important;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  height: 630px;
  overflow-y: scroll;
}

#chart-container {
  position: relative;
  height: 100%;
  overflow: hidden;
}
</style>