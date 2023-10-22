<!--登录之前的导航栏-->
<template>
  <div>
    <div class="navbarBox" style="min-height: 48px;">
      <div class="navbar">
        <!-- 导航栏容器 -->
        <div class="navbar-container">
          <!-- 左侧 -->
          <div class="navbar-container-left">
            <!-- 网页logo -->
            <div class="logo">
              <img src="@/assets/imgs/scholarHub.png" alt="">
            </div>
          </div>

          <!-- 右侧导航栏 -->
          <div class="navbar-container-right">
            <div class="userPhoto formButton" @click.prevent="login">
              <a href="">登录</a>
            </div>
            <div class="userPhoto formButton" @click.prevent="register">
              <a href="">注册</a>
            </div>
          </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script setup>
import router from "@/router/index.js";
import {setLogin} from "@/utils/token.js";

function login() {
  setLogin(true)
  router.push('/login');
}
function register(){
  setLogin(false)
  router.push('/login');
}
</script>

<style scoped>
.navbar-container-right {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* 靠右对齐 */
}

body{
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.navbar{
  position: fixed;
  z-index: 2001;
  top: 0;
  width: 100%;
  left: 0;
  font-size: 14px;
  /* 字体粗细，400相当于normal */
  font-weight: 400;
  color: #222226;
  /* 阴影  水平阴影距离，垂直阴影距离， 模糊尺寸， 阴影尺寸 颜色*/
  box-shadow:0 2px 4px 0 rgb(0, 0, 0,5%);
}
.navbar-container{
  width: 100%;
  /* 最小宽度，窗口缩小之后到1280px不会再缩小 */
  min-width: 1280px;
  box-sizing: border-box;
  padding: 0 24px;
  margin: 10px auto;
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
  margin-top: -10px;
  /* 当箭头鼠标移到会变成手式鼠标 */
  cursor: pointer;
}
.logo img{
  width: 180px;
  max-width: 180px;
  height: 100px;
  display: block;
  //margin-top: calc((48px - 44px)/ 2);
}
.left-ul{
  width: auto;
  height: 100%;
  /* 去除li中的间隙，在li中设置font-size,否则没有内容 */
  font-size: 0px;
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
  padding: 0 40px;
  flex: 1;
}
.navbar-search-container{
  width: 100%;
  max-width: 720px;
  height: 32px;
  line-height: 32px;
  margin-top: calc((48px - 32px)/ 2);
  box-sizing: border-box;
  font-size: 0px;
  margin-left: auto;
  margin-right: auto;

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
.navbar-search-container button{
  display: inline-block;
  width: 88px;
  height: 100%;
  outline: 0;
  border: 0 none;
  border-radius: 0 16px 16px 0;
  font-size: 14px;
  line-height: 32px;
  cursor: pointer;
  background-color: #fc5531;
  text-align: left;
}
.navbar-search-container i{
  display: inline-block;
  width: 24px;
  height: 24px;
  background: url(https://g.csdnimg.cn/common/csdn-toolbar/images/csdn-white-search.png) no-repeat center center;
  background-size: 100%;
  vertical-align: middle;
  position: relative;
  top: -1px;
  margin-left: 14px;
}
.navbar-search-container span{
  display: inline-block;
  vertical-align: top;
  color: #fff;
}

.navbar-profile .profile-user{
  text-align: center;
  padding: 20px 0 12px 0;
  border-bottom: 1px solid #e8e8ed;
}
.navbar-profile .profile-user .profile-avatar{
  position: absolute;
  width: 48px;
  height: 48px;
  padding: 0px;
  top: -32px;
  left: 50%;
  -webkit-transform: translate(-50%,0);
  transform: translate(-50%,0);
  border-radius: 50%;
  cursor: pointer;
  z-index: 9999;
  border: 1px solid #e8e8ed;
}
.profile-user .profile-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
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
.navbar-btn-write>a i:last-child{
  display: inline-block;
  width: 10px;
  height: 7px;
  margin-left: 7px;
  vertical-align: middle;
  background: url(https://g.csdnimg.cn/common/csdn-toolbar/images/write-hover-thro.png) no-repeat center center;
  background-size: 100%;
}
.formButton1{

}
.formButton {
  margin-left: 20px;
  font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;
  text-transform: uppercase;
  font-size: 15px;
  width: 100px;
  border-radius: 20px;
  text-align: center;
  border: 3px solid #009688;
  display: inline-block;
  text-decoration: none;
  color: #009688;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  transition: .3s;
}
.formButton::before, .formButton::after{
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background-color: #009699;
  top: -100%;
  transition: .3s;
  z-index: -1;
  opacity: .5;
}
.formButton:after{
  opacity: 1;
  transition-delay: .2s;
}
.formButton:hover{
  color: #fff;
}
.formButton:hover::before,.formButton:hover::after{
  top: 0;
}
.formButton {
  margin-left: 20px;
  font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;
  text-transform: uppercase;
  font-size: 15px;
  width: 100px;
  border-radius: 20px;
  text-align: center;
  border: 3px solid #009688;
  display: inline-block;
  text-decoration: none;
  color: #009688;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  transition: .3s;
}
.formButton::before, .formButton::after{
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background-color: #009699;
  top: -100%;
  transition: .3s;
  z-index: -1;
  opacity: .5;
}
.formButton:after{
  opacity: 1;
  transition-delay: .2s;
}
.formButton:hover{
  color: #fff;
}
.formButton:hover::before,.formButton:hover::after{
  top: 0;
}
</style>

