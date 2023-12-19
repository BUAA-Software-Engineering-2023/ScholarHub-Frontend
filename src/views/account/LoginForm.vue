<template>
  <div class="shell">
    <div class="container a-container"  id="a-container">
      <el-form v-if="!showRegister" ref="loginFormRef" :model="registerForm" :rules="registerRules"  action="" method="" class="form" :class="{ 'is-txl': activeForm === 'a', 'is-z': activeForm === 'a' }" id="a-form">
        <h2 class="form_title title">创建账号</h2>
        <div class="form_icons">
        </div>
        <span class="form_span">在这里，有无数可能</span>
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" type="text" class="form_input" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" type="text" class="form_input" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" type="password" class="form_input" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirm_password">
          <el-input v-model="registerForm.confirm_password" type="password" class="form_input" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="registerForm.code" type="text" class="code form_input" placeholder="验证码"> </el-input>
          <el-button
              @click.prevent="sendVerificationCode"
              class="send-code-btn"
              type="primary"
              size="small"
              :disabled="sendCodeDisabled"
          >
            {{ sendCodeDisabled ? `${countdown} 秒后重新发送` : '发送验证码' }}
          </el-button>
        </el-form-item>
        <button @click.prevent="Register" class="form_button button submit">SIGN UP</button>
      </el-form>
    </div>

    <div class="container b-container" id="b-container">
      <el-form v-if="showRegister" ref="registerFormRef" :model="loginForm" :rules="loginRules" action="" method="" class="form" :class="{ 'is-txl': activeForm === 'b', 'is-z': activeForm === 'b' }" id="b-form">
        <h2 class="form_title title">登入账号</h2>
        <div class="form_icons">
        </div>
        <span class="form_span">知识让一切不可能变为可能</span>
        <el-form-item prop="email">
          <el-input v-model="loginForm.email" type="text" class="form_input" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" class="form_input" placeholder="密码"></el-input>
        </el-form-item>
        <a class="form_link">忘记密码？</a>
        <button @click.prevent="login" class="form_button button submit">SIGN IN</button>
      </el-form>
    </div>

    <div class="switch" id="switch-cnt">
      <div class="switch_circle"></div>
      <div class="switch_circle switch_circle-t"></div>
      <div class="switch_container" id="switch-c1">
        <div class="login-logo">
          <img width="150" class="login-icon" src="@/assets/imgs/scholarHub.png" alt="" />
        </div>
        <h2 class="switch_title title" style="letter-spacing: 0;">Welcome Back！</h2>
        <p class="switch_description description">已经有账号了嘛，去登入账号来进入奇妙世界吧！！！</p>
        <button class="switch_button button switch-btn" @click="changeForm('b')">SIGN IN</button>
      </div>

      <div class="switch_container is-hidden" id="switch-c2">
        <div class="login-logo">
          <img width="150" class="login-icon" src="@/assets/imgs/scholarHub.png" alt="" />
        </div>
        <h2 class="switch_title title" style="letter-spacing: 0;">Hello Friend！</h2>
        <p class="switch_description description">去注册一个账号，成为尊贵的粉丝会员，让我们踏入奇妙的旅途！</p>
        <button class="switch_button button switch-btn" @click="changeForm('a')">SIGN UP</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import Swal from 'sweetalert2';
import {useAccountStore} from '@/stores/account'
import {getLogin} from "@/utils/token.js";

import { onMounted } from 'vue';
import router from "@/router/index.js";
import {useSearchStore} from "@/stores/search.js";
import SearchAPI from "@/api/search.js"
import UserAPI from '@/api/user.js'
import NavBar from "@/views/search/NavBar/NavBar.vue";
import UserApi from "@/api/user.js";
onMounted(() => {
  if (getLogin()==='true'){
    console.log(getLogin())
    showRegister.value = true;
    activeForm.value = 'b';
    toggleClasses();
  }
});

const accountStore = useAccountStore();
const validateName = (rule,value,callback)=>{
  if(!value.length){
    callback(new Error("请输入用户名"))
  }else{
    callback();
  }
}
const validatePassword = (rule,value,callback)=>{
  if(!value.length){
    callback(new Error("请输入密码"))
  }else{
    callback();
  }
}
const validateEmail = (rule,value,callback)=>{
  if (!value.length){
    callback(new Error("请输入邮箱"))
  }else{
    callback();
  }
}
const validateConfirmPassword = (rule,value,callback)=>{
  if (!value.length){
    callback(new Error("请再次输入密码"))
  }else{
    callback();
  }
}
const validateCode = (rule,value,callback)=>{
  if (!value.length){
    callback(new Error("请输入验证码"))
  }else{
    callback();
  }
}
// 校验表单
const loginRules = ref({
  email: [{validator:validateEmail, trigger: "blur" }],
  password: [{validator:validatePassword, trigger: "blur" }]
});
const loginForm = ref({
  email:"",
  password:""
})
const registerForm = ref({
  username:"",
  email:"",
  code:"",
  password:"",
  confirm_password:""
})
const registerRules = ref({
  username: [{validator:validateName, trigger: "blur" }],
  password: [{validator:validatePassword, trigger: "blur" }],
  confirm_password:[{validator:validateConfirmPassword,trigger:"blur"}],
  email:[{validator:validateEmail,trigger:"blur"}],
  code:[{validator:validateCode,trigger:"blur"}],

})
const showRegister = ref(false)
const activeForm = ref('a');

const changeForm = (form) => {
  console.log(form+" "+activeForm.value)
  if (form === 'a' && activeForm.value === 'b') {
    console.log("123")
    showRegister.value = false;
    activeForm.value = 'a';
    nextTick(toggleClasses);
  } else if (form === 'b' && activeForm.value === 'a') {
    console.log("123")
    showRegister.value = true;
    activeForm.value = 'b';
    nextTick(toggleClasses);
  }
};

const toggleClasses = () => {
  const switchCtn = document.querySelector("#switch-cnt");
  const switchC1 = document.querySelector("#switch-c1");
  const switchC2 = document.querySelector("#switch-c2");
  const switchCircle = document.querySelectorAll(".switch_circle");
  const aContainer = document.querySelector("#a-container");
  const bContainer = document.querySelector("#b-container");

  switchCtn.classList.add("is-gx");
  setTimeout(() => {
    switchCtn.classList.remove("is-gx");
  }, 1500);

  switchCtn.classList.toggle("is-txr");
  switchCircle[0].classList.toggle("is-txr");
  switchCircle[1].classList.toggle("is-txr");

  switchC1.classList.toggle("is-hidden");
  switchC2.classList.toggle("is-hidden");
  aContainer.classList.toggle("is-txl");
  bContainer.classList.toggle("is-txl");
  bContainer.classList.toggle("is-z");
};
async function Register () {
  const result = await useAccountStore().register(registerForm.value.username,registerForm.value.email,registerForm.value.code,registerForm.value.password,registerForm.value.confirm_password)
  if(result === '注册成功'){
    await Swal.fire({
      icon: 'success', //error\warning\info\question
      title: '注册成功',
      text: '即将跳转至登录界面',
    })
    changeForm('b')
  }else{
    await Swal.fire({
      icon: 'error', //error\warning\info\question
      title: '注册失败',
      text: result
    })
  }
}
const countdown = ref(60);
let countdownInterval;
const sendCodeDisabled = ref(false)
const startCountdown = () => {
  sendCodeDisabled.value = true;
  countdown.value = 60;

  countdownInterval = setInterval(() => {
    countdown.value--;
    if (countdown.value === 0) {
      clearInterval(countdownInterval);
      sendCodeDisabled.value = false;
    }
  }, 1000);
};

async function sendVerificationCode() {
  if (!sendCodeDisabled.value) {
    const result = await useAccountStore().getCode(registerForm.value.email)
    if (result==='验证码已发送'){
      await Swal.fire({
        icon: 'success',
        title: result,
        text: '请登录邮箱查收',
      });
      startCountdown();
    }else{
      await Swal.fire({
        icon: 'error',
        title: result,
      });
    }
  }
}
async function login (){
  const result = await useAccountStore().loginWithPassword(loginForm.value.email,loginForm.value.password);
  if (result==='登录成功'){
    const favorite = await UserAPI.get_favorite();
    console.log(favorite.data.data)
    useAccountStore().setFavorite(favorite.data.data)
    const info =  (await UserApi.get_info()).data.data;
    useAccountStore().setInfo(info)
    console.log(useAccountStore().favorites)
    await Swal.fire({
      icon: 'success', //error\warning\info\question
      title: result
    })
    const searchStore = useSearchStore();
    const result1 = await SearchAPI.history();
    const HistoryList = []
    let index;
    for (index in result1.data.data){
      console.log(result1.data.data)
      HistoryList.push(result1.data.data[index].title)
    }
    searchStore.setSearchHistory(HistoryList)
    await router.push('/client')
  }else{
    await Swal.fire({
      icon: 'error', //error\warning\info\question
      title: result
    })
  }

}

</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* 字体无法选中 */
  user-select: none;
}


.shell {
  position: relative;
  height: 100%;
  padding: 25px;
  background-color: #ecf0f3;
  opacity: 0.9;
  box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
  border-radius: 12px;
  overflow: hidden;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 600px;
  height: 100%;
  padding: 25px;
  background-color: #ecf0f3;
  transition: 1.25s;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.iconfont {
  margin: 0 5px;
  border: rgba(0, 0, 0, 0.5) 2px solid;
  border-radius: 50%;
  font-size: 25px;
  padding: 3px;
  opacity: 0.5;
  transition: 0.1s;
}

.iconfont:hover {
  opacity: 1;
  transition: 0.15s;
  cursor: pointer;
}
.form_input {
  width: 350px;

  height: 40px;
  margin: 4px 0;
  font-size: 13px;
  letter-spacing: 0.15px;
  border: none;
  outline: none;
  background-color: #ecf0f3;
  transition: 0.25s ease;
  border-radius: 8px;
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}
.code{
  width: 200px;
}
.form_input:focus {
  box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
}

.form_span {
  color: black;
  margin-bottom: 12px;
}

.form_link {
  color: #5a5a5a;
  font-size: 15px;
  margin-top: 25px;
  border-bottom: 1px solid #a0a5a8;
  line-height: 2;
}

.title {
  font-size: 34px;
  font-weight: 700;
  line-height: 3;
  color: #5a5a5a;
  letter-spacing: 10px;
}

.description {
  font-size: 14px;
  color: black;
  letter-spacing: 0.25px;
  text-align: center;
  line-height: 1.6;
}

.button {
  width: 180px;
  height: 50px;
  border-radius: 25px;
  margin-top: 30px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1.15px;
  background-color: #4B70E2;
  color: #f9f9f9;
  box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
  border: none;
  outline: none;
}

.a-container {
  z-index: 100;
  left: calc(100% - 600px);
}

.b-container {
  left: calc(100% - 600px);
  z-index: 0;
}

.switch {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 400px;
  padding: 50px;
  z-index: 200;
  transition: 1.25s;
  //background-color: #ecf0f3;
  overflow: hidden;
  box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #d1d9e6;
}

.switch_circle {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-color: #ecf0f3;
  box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
  bottom: -60%;
  left: -60%;
  transition: 1.25s;
}

.switch_circle-t {
  top: -30%;
  left: 60%;
  width: 300px;
  height: 300px;
}

.switch_container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width: 400px;
  //padding: 50px 55px;
  transition: 1.25s;
}

.switch_button {
  cursor: pointer;
}

.switch_button:hover,
.submit:hover {
  box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
  transform: scale(0.985);
  transition: 0.25s;
}

.switch_button:active,
.switch_button:focus {
  box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
  transform: scale(0.97);
  transition: 0.25s;
}

.is-txr {
  left: calc(100% - 400px);
  transition: 1.25s;
  transform-origin: left;
}

.is-txl {
  left: 0;
  transition: 1.25s;
  transform-origin: right;
}

.is-z {
  z-index: 200;
  transition: 1.25s;
}

.is-hidden {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  transition: 1.25s;
}

.is-gx {
  animation: is-gx 1.25s;
}

@keyframes is-gx {

  0%,
  10%,
  100% {
    width: 400px;
  }

  30%,
  50% {
    width: 500px;
  }
}
.el-form-item{
  margin-top: 15px;
}
.send-code-btn {
  //background-color: white;
  color: #409eff;
  background-color: #ecf0f3;
  width: 140px;
  border:none;
  margin-left: 10px;
  font-size: 14px;
  transition: 1.25s;
}
.send-code-btn:hover{
  height: 45px;
  box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
  background-color: #e3e0e0;
}

</style>
