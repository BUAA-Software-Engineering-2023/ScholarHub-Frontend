<template>
  <div>
    <div class="navbarBox" style="min-height: 48px;">
      <div class="navbar">
        <!-- 导航栏容器 -->
        <div class="navbar-container">
          <!-- 左侧 -->
          <div class="navbar-container-left">
            <!-- 网页logo -->
            <div class="logo" @click="gotoHome">
              <img src="@/assets/imgs/scholarHub.png" alt="#">
            </div>
            <!-- 左侧导航栏 -->
            <ul class="left-ul">
              <li title=""><router-link active-class="active" to="#"> 博客 </router-link></li>
              <li title=""><router-link active-class="active" to="#"> 开发者文库 </router-link></li>
              <li title=""><router-link active-class="active" to="#"> 课程 </router-link></li>
              <li title=""><router-link active-class="active" to="#"> 问答 </router-link></li>
              <li title=""><router-link active-class="active" to="#"> 社区 </router-link></li>
              <li title=""><router-link active-class="active" to="#"> 插件 </router-link></li>
              <li title=""><router-link active-class="active" to="#"> 认证 </router-link></li>
              <li title=""><router-link active-class="active" to="#"> 开源 </router-link></li>
            </ul>
          </div>

          <!-- 中间搜索框 -->
          <div class="navbar-container-middle">
            <div class="navbar-search-container">
              <SearchBar v-if="props.showSearch"></SearchBar>
            </div>
          </div>

          <!-- 右侧导航栏 -->
          <div class="navbar-container-right">
            <div class="navbar-btns-User">
              <!--用户登录: 展示用户的头像以及其他信息-->
              <div class="userPhoto" @mouseover="mouseOver" @mouseleave="mouseLeave">
                <!-- 用户头像 -->
                <a class="hasAvatar">
                  <img src="@/assets/icons/default_avatar.png" alt="用户头像">
                </a>

                <transition  name="slide">
                <div class="navbar-profile" v-if="showProfile">
                  <div id="test"></div>
                    <div class="profile-user">
                      <div class="profile-nickName">
                        <img class="profile-avatar" src="@/assets/icons/default_avatar.png" alt="用户头像"> <span class="nickName">您好，{{name}}</span> <!-- 显示用户姓名 -->
                      </div>
                      <el-divider></el-divider>
                      <div class="profile-links">
                        <a href="#" class="profile-link">学术主页</a>
                        <a href="#" class="profile-link">我的收藏</a>
                        <a href="#" class="profile-link">个人信息</a>
                      </div>
                      <el-divider></el-divider>
                      <div class="profile-links" @click.prevent="logout">
                        <a href="" class="profile-link">退出登录</a>
                      </div>
                    </div>
                  <!-- Profile content goes here -->
                </div>
                </transition>
              </div>
            </div>
            <Message></Message>
          </div>

        </div>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import {clearToken, getName} from "@/utils/token.js";
  import router from "@/router/index.js";
  import SearchBar from "@/components/Search/SearchBar.vue";
  import {useSearchStore} from "@/stores/search.js";
  import Notification from "@/components/NavBar/Message.vue";
  import Message from "@/components/NavBar/Message.vue";
  const searchStore = useSearchStore();
  const showProfile = ref(false)
  const props = defineProps(["showSearch"])
  const name = getName();
  function mouseOver() {
    showProfile.value = true;
  }

  function mouseLeave() {
    showProfile.value = false;
  }
  function logout(){
    clearToken();
    searchStore.setSearchHistory([]);
    searchStore.setSearchInput('');
    router.push('/')
  }
  function gotoHome(){
    router.push('/client')
  }
</script>
<!--登录之后的导航栏-->

<style scoped>
.navbar{
  position: fixed;
  z-index: 20011;
  height: 60px;
  top: 0;
  width: 100%;
  left: 0;
  font-size: 14px;
  /* 字体粗细，400相当于normal */
  font-weight: 400;
  color: white;
  //opacity: .8;
  background-color: #0e161e;
  /* 阴影  水平阴影距离，垂直阴影距离， 模糊尺寸， 阴影尺寸 颜色*/
  box-shadow:0 2px 4px 0 rgb(0, 0, 0,5%);
}

.navbar-container{
  color: white;
  width: 100%;
  /* 最小宽度，窗口缩小之后到1280px不会再缩小 */
  min-width: 1280px;
  box-sizing: border-box;
  padding: 0 24px;
  margin: 0 auto;
  height: 48px;
  line-height: 48px;
  display: flex;
  justify-content: space-between;
  -webkit-box-pack: justify;
}
.toolbar-container-left{
  /* 元素会根据自身宽高来设置尺寸。它是完全非弹性的：既不会缩短，也不会伸长来适应 flex 容器 */
  flex: none;
}
.logo{
  position: relative;
  float: left;
  margin-right: 8px;
  /* 当箭头鼠标移到会变成手式鼠标 */
  cursor: pointer;
}
.logo img{
  width: 120px;
  max-width: 180px;
  height: 67px;
  display: block;
//margin-top: calc((48px - 44px)/ 2);
}
.left-ul{
  width: auto;
  height: 100%;
  margin-top: 10px;
  /* 去除li中的间隙，在li中设置font-size,否则没有内容 */
  font-size: 0;
  float: left;
}
.left-ul li{
  position: relative;
  display: inline-block;
  font-size: 14px;
  height: 100%;
  line-height: 48px;
}
a{
  color:white;
  padding: 0 10px;
  /* 删除a标签的下划线 */
  text-decoration: none;
}
/* 鼠标停留时的样式 */
.left-ul li:hover{
  background-color: #eee;
}
.navbar-container-middle{
  padding: 10px 40px;
  flex: 1;
}
.navbar-search-container{
  width: 100%;
  max-width: 720px;
  color: #4B70E2;
  height: 32px;
  line-height: 20px;
  box-sizing: border-box;
}
.navbar-search-container input{
  font-size: 14px;
  display: inline-block;
  width: calc(100% - 88px);
  height: 100%;
  line-height: inherit;
  /* 为了后面聚焦搜索框样式，将边框外围线清除 */
  outline: 0;
  background: #f5f6f7;
  color: #222226;
  vertical-align: top;
  text-indent: 16px;
  border: 1px solid #e8e8ed;
  border-right: none;
  box-sizing: border-box;
  border-radius: 16px 0 0 16px;
}
/* 搜索框聚焦样式 */
.navbar-search-container input:focus{
  border: 1px solid #fc5531;
  border-right: none;
}

.navbar-btns-User{
  flex: 1;
}
.userPhoto{
  height: 100%;
  float: left;
  position: relative;
  padding: 0 8px;
}
.hasAvatar{
  display: block;
  line-height: 48px;
  color: #222226;
  margin-top: calc((48px - 32px)/ 2);
  margin-right: 16px;
  opacity: 1;
}
.hasAvatar img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.navbar-profile{
  width: 248px;
  color: #222226;
  margin-top: 10px;
  background: #fff;
  position: absolute;
  min-height: 200px;
  top: 48px;
  left: 50%;
  margin-left: -132px;
  z-index: 9999999;
  border-radius: 4px;
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 6%);
}
.navbar-profile .profile-user{
  padding: 20px 0 12px 0;
  border-bottom: 1px solid #e8e8ed;
}
.navbar-profile .profile-user .profile-avatar{
  position: absolute;
  height: 48px;
  padding: 0px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 9999;
}
.profile-user {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.profile-nickName {
  display: flex; /* 使用 Flexbox 布局 */
  align-items: center; /* 垂直居中对齐 */
}

.profile-avatar {
  border-radius: 50%; /* 圆形头像 */
  margin-right: 10px; /* 添加一些间距以与用户名分隔开 */
}

.navbar-profile .profile-user .profile-nickName{
  width: 100%;
  box-sizing: border-box;
  padding: 0 16px;
  font-size: 16px;
  color: #222226;
  font-weight: 500;
  height: 40px;
  line-height: 40px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.navbar-btn{
  position: relative;
  height: 48px;
  line-height: 48px;
  color: inherit;
  text-align: center;
  padding: 0 4px;
}
.navbar-fl{
  float: left;
}
.write{
  display: block;
  min-width: 88px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #fff;
  background: #fc5531;
  border-radius: 20px;
  margin-top: calc((48px - 32px)/ 2);
}
.navbar-container-right{
  display: flex;
  align-items: center;
  margin-right: 60px;
  padding-top: 5px;
}
.slide-enter-active,
.slide-leave-active{
  transition: all .5s;
}

.profile-link {
  border-radius: 5px;
  padding-left: 15px;
  font-size: 15px;
  display: flex;
  color: #888f96;
  margin-top: -10px;
  text-decoration: none;
}

.profile-link:hover {
  color: #293541;
  background-color: #e8e8e4;
}
.nickName{
  margin-left: 60px;
}
.slide-enter-from,
.slide-leave-to{
  opacity: 0;
  transform: translateY(40px);
}
a:hover {
  cursor: pointer
}
#test {
  top: -20px;
  left: 115px;
  position: absolute;
  border-width: 10px;
  border-style: solid;
  width: 0px;
  height: 0px;
  border-color: transparent;
  border-bottom-color: #e0dede;
}
#test::after {
  content: "  ";
  top: -9px;
  left: -10px;
  position: absolute;
  border-width: 10px;
  border-style: solid;
  width: 0;
  height: 0;
  border-color: transparent;
  border-bottom-color: white;
}
.el-divider{
  margin-top: 10px;
  width: 90%;
}
.el-divider--horizontal{
  margin: 15px;
}
</style>

