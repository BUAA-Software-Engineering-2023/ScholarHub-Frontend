<template>
  <Background></Background>
  <NavBar :showSearch="showSearch"></NavBar>
  <SearchBar class="search"></SearchBar>
  <div class="main">
    <div class="slogen">
      <div class="slogen-title">Make Academia Visible</div>
      <div class="slogen-dis">
        创新思想，共享智慧，启迪未来<br/>
        海量数据构建智慧网络，构建专业可视化的学术成果分享平台
      </div>
    </div>
    <div class="right">
      <StatisticsComponent></StatisticsComponent>
    </div>
    <div class="title">
      <h2>个性推荐</h2>
    </div>
    <div class="recommendation">

      <div v-for="(recommendation, index) in recommendations" :key="index" class="recommendation-item">
        <div  @click="jumpToarticle"> <span class="recommendation-title">{{ recommendation.display_name }}</span> </div>
        <div  class="author" v-for="(author,index1) in recommendation.authorships" :key="index1">
          <div class="recommendation-details">
            <div   @mouseover="showAuthorInfo(author.author)"
                   @mouseleave="hideAuthorInfo"
                   class="author_container"
            ><span id="authorName" class="author-name-hover">{{ author.author.display_name }}</span>
              <span v-if="index1 !== recommendation.authorships.length - 1">，</span>
            </div>
          </div>
          <transition  name="slide">
            <div v-if="authorInfo && authorInfo.id === author.author.id" class="author-info">
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
        <div class="recommendation-abstract">{{ recommendation.abstract }}</div>
        <div class="recommendation-stats">
          引用: <span class="count">{{ recommendation.cited_by_count }}</span>
        </div>
        <el-divider></el-divider>
      </div>
    </div>
  </div>
</template>
<script setup>

import Background from '../../components/Background/Background.vue';
import SearchBar from "../../components/Search/SearchBar.vue";
import NavBar from "@/components/NavBar/NavBar.vue";
import StatisticsComponent from "@/components/visual/StatisticsComponent.vue";
import HomeAPI from "@/api/home.js";
import {getName} from "@/utils/token.js";
// const { width, height } = useWindowSize();
const recommendations = ref([])
const showSearch = ref(false); // 根据你的需求将其设置为 true 或 false
const authorInfo = ref(null);
const userName = ref('')
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  const result =  HomeAPI.get_recommendation();
  console.log(result)
  userName.value = getName();
  result.then(data => {
    // 在异步操作成功时处理数据
    recommendations.value = data.data.data[0].result
    console.log(recommendations.value)
  });
});
function showAuthorInfo(author) {
  authorInfo.value = author;
  console.log(authorInfo.value.id)
}

function hideAuthorInfo() {
  authorInfo.value = null;
}
function handleScroll() {
  const threshold = 350; // 你可以根据实际需要调整这个值
  showSearch.value = window.scrollY > threshold;
}
</script>
<style lang="scss" scoped>
*{
  margin: auto;
}

.main{
  justify-content: space-between;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.login-container {
  height: 100%;

  .login-box {
    z-index: 2;
    position: absolute;
    width: 80%;
    height: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    box-shadow: 0 0.7px 1.7px rgba(0, 0, 0, 0.248);
    box-sizing: border-box;
    backdrop-filter: blur(8px);

    &:hover {
      box-shadow: 0 0.7px 1.7px rgba(0, 0, 0, 0.248),
      0 1.7px 4.3px rgba(0, 0, 0, 0.355), 0 3.5px 8.9px rgba(0, 0, 0, 0.445),
      0 7.3px 18.3px rgba(0, 0, 0, 0.552), 0 20px 50px rgba(0, 0, 0, 0.8);
    }

    &:hover~.frosted-bg {
      filter: blur(10px);
    }
  }
}

.earth-img {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
  width: 300px;
}

.slogen {
  position: absolute;
  left: 20%;
  top: calc(50%);

  &-title {
    font-size: 40px;
    font-weight: 900;
    color: white;
  }

  &-dis {
    margin-top: 5vh;
    font-size: 20px;
    font-weight: 200;
    color: #aab1b9;
    line-height: 30px;
  }
}
.search {
  position: absolute;
  left: 10vw;
  top: 350px;
  width: 52vw;
}
.login-register {
  font-size: 12px;
  color: #409eff;
  margin-left: 10px;
}

.login-form {
  position: absolute;
  top: 50%;
  left: 80%;
  transform: translate(-50%, -50%);
  width: 420px;
  padding: 50px 40px 45px;
  border-radius: 10px;
  box-shadow: 0 0.7px 1.7px rgba(0, 0, 0, 0.248);

  .login-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 45px;

    .login-icon {
      width: 200px;
      height: 100px;
    }

    .logo-text {
      padding: 0 0 0 25px;
      margin: 0;
      font-size: 42px;
      font-weight: bold;
      color: #34495e;
      white-space: nowrap;
    }
  }

  .el-form-item {
    margin-bottom: 40px;
  }

  .login-btn {
    display: flex;
    justify-content: space-between;
    background-color: transparent !important;
    width: 100%;
    margin-top: 40px;
    white-space: nowrap;

    .el-button {
      width: 185px;
      background-color: transparent;
    }
  }

  .register-btn {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 40px;
    white-space: nowrap;

    .el-button {
      width: 350px;
      background-color: transparent;
    }
  }
}

@media screen and (max-width:1260px) {
  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .slogen {
    display: none;
  }
}

.el-input__wrapper {
  background-color: transparent !important;
}
.recommendation {
  border: 1px solid #5a5a5a;
  background-color: #0e161e;
  width: 80%;
  border-radius: 20px !important;
  text-align: left;
  color: #363c50 !important;
}

.recommendation h2 {
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.recommendation-item {
  font-size: 18px;
  padding: 10px;
  color: #363c50;
}

.recommendation-title {
  cursor: pointer;  /*鼠标悬停变小手*/
  font-size: 20px;
  font-weight: bold;
  color: #a0a5a8;
}
.recommendation-title:hover{
  color: #4B70E2;
}
.recommendation-details {
  cursor: pointer;
  font-size: 14px;
  color: #75a468;
}

.recommendation-abstract {
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
.recommendation-stats{
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