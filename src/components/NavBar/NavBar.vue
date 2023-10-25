<script setup>

</script>
<!--登录之后的导航栏-->
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
              <input type="text" autocomplete="off" id="search" :placeholder="defaultText">
              <button>
                <i></i>
              </button>
            </div>
          </div>

          <!-- 右侧导航栏 -->
          <div class="navbar-container-right">
            <div class="navbar-btns-User">
              <!--用户登录: 展示用户的头像以及其他信息-->
              <div class="userPhoto" @mouseover="mouseOver" @mouseleave="mouseLeave" v-if="isLogin">
                <!-- 用户头像 -->
                <a class="hasAvatar" :style="{opacity}" href="https://blog.csdn.net/weixin_52372879?spm=1000.2115.3001.5343"  >
                  <img src="../assets/portrait.png">
                </a>
                <!-- 用信息弹出框 初始display:none-->
                <div class="navbar-profile"  :style="{display}" >
                  <div class="profile-user">
                    <!-- 用户简介的头像 -->
                    <a class="profile-avatar" href="https://blog.csdn.net/weixin_52372879?spm=1000.2115.3001.5343">
                      <img src="../assets/portrait.png"></a>
                    <p class="profile-nickName">京茶吉鹿</p>
                  </div>
                </div>
              </div>
              <!--用户未登录: 提示提示信息-->
              <div class="userPhoto" v-else @click.prevent="login">
                <a href="">登录/注册</a>
              </div>

              <!-- 会员中心 -->
              <div class="navbar-btn navbar-btn-dynamic navbar-fl">
                <a href="">会员中心</a>
              </div>
              <!-- 足迹 -->
              <div class="navbar-btn navbar-btn-news navbar-fl">
                <a href="">足迹</a>
              </div>
              <!-- 动态 -->
              <div class="navbar-btn navbar-btn-news navbar-fl">
                <a href="">动态</a>
              </div>
              <!-- 消息 -->
              <div class="navbar-btn navbar-btn-news navbar-fl">
                <a href="">消息</a>
              </div>
              <!-- 发布 -->
              <div class="navbar-btn navbar-btn-write navbar-fl">
                <a class="write" href="">
                  <i ></i>发布
                  <i ></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>


<style scoped>
.navbar{
  position: fixed;
  z-index: 2001;
  top: 0px;
  width: 100%;
  left: 0px;
  font-size: 14px;
  /* 字体粗细，400相当于normal */
  font-weight: 400;
  color: #222226;
  background-color: #fff;
  /* 阴影  水平阴影距离，垂直阴影距离， 模糊尺寸， 阴影尺寸 颜色*/
  box-shadow:0 2px 4px 0 rgb(0, 0, 0,5%);
}
.navbar-container{
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
  width: 80px;
  max-width: 80px;
  height: 44px;
  display: block;
  margin-top: calc((48px - 44px)/ 2);
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
  color:#000;
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
.navbar-btns-User{
  flex: 1;
}
.userPhoto{
  height: 100%;
  float: left;
  position: relative;
  line-height: 48px;
  text-align: center;
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.navbar-profile{
  width: 248px;
  color: #222226;
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
.navbar-btn-write>a i:first-child{
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
  background: url("../assets/write.png");
  background-size: 100%;
  margin-right: 2px;
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
</style>

