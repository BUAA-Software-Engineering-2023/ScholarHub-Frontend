<script setup>
import UserApi from "@/api/user.js";
import SideBar from "@/views/user/SideBar.vue";
import Swal from "sweetalert2";
import {useGlobalStore} from "@/stores/global.js";
import Avatar from "@/components/Account/Avatar.vue";
import {useAccountStore} from "@/stores/account.js";

const globalStore  = useAccountStore();

async function handleChange(){
    const result = await UserApi.update_info(formState.nickname);
    globalStore.userInfo.nickname = formState.nickname;
    if (!result.data.success){
      let promise = Swal.fire({
        icon: 'error',
        title:'服务器错误'
      });
    }else{
      let promise = Swal.fire({
        icon: 'success',
        title:'修改信息成功！'
      });
    }
}
const avatar = ref(globalStore.userInfo.avatar);
onMounted( async () => {
  console.log(globalStore.userInfo)
});
const onFinish = values => {
  console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});
const formState = reactive({
  layout: 'vertical',
  username: globalStore.userInfo.username,
  nickname: globalStore.userInfo.nickname,
  email:  globalStore.userInfo.email,
});
const formItemLayout = computed(() => {
  return {};
});
const buttonItemLayout = computed(() => {
  return {};
});

</script>

<template>
  <div class="main-container">
    <div class="sidebar">
      <SideBar select-keys="1"></SideBar>
    </div>
    <div class="content">
      <div class="header">
        <div class="avatar">
          <Avatar :initial-avatar="avatar"></Avatar>
        </div>
        <div class="header-content">{{globalStore.userInfo.nickname}}</div>
      </div>
      <div class="information">
        <div class="left">
          <div class="title"> 个人信息</div>
          <el-divider></el-divider>
          <a-form  :layout="formState.layout" ref="formRef" :model="formState" name="dynamic_rule" v-bind="formItemLayout" >
            <a-form-item
                label="用户名"
                name="username"
                :rules="[{ required: true, message: 'Please input your username!' }]"
            >
              <a-input  :disabled="true" v-model:value="formState.username" />
            </a-form-item>

            <a-form-item
                label="昵称"
                name="nickname"
                :rules="[{ required: true, message: 'Please input your nickname!' }]"
            >
              <a-input v-model:value="formState.nickname" />
            </a-form-item>

              <a-button @click="handleChange" type="primary">保存</a-button>
          </a-form>
        </div>
          <div class="right">
            <div class="title">账号安全</div>
            <el-divider></el-divider>
            <a-form
                :layout="formState.layout"
                :model="formState"
                name="normal_login"
                class="login-form"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
            >
              <a-form-item
                  label="邮箱"
                  name="邮箱"
                  :rules="[{ required: true, message: '请输入您的邮箱' }]"
              >
                <a-input :disabled="true" v-model:value="formState.email">
                  <template #prefix>
                    <UserOutlined class="site-form-item-icon" />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item>
                <a class="login-form-forgot" href="">Forgot password?</a>
              </a-form-item>
              <a-form-item>
                <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
                  Save
                </a-button>
              </a-form-item>
            </a-form>
          </div>
      </div>
    </div>
  </div>


</template>

<style lang="scss" scoped>

.header{
  background-color: white;
  padding: 20px;
  text-align: center;
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
.avatar{
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  margin: auto;
  align-items: center;
  text-align: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.information{
  display: flex;
  margin-top: 20px;
}
.left{
  text-align: left;
  width: 42%;
  padding: 50px;
  border-radius: 10px;
  background-color: white;
}
.right{
  text-align: left;
  width: 42%;
  margin-left: 30px;
  padding: 50px;
  border-radius: 10px;
  background-color: white;
}
.title{
  color: #18181b;
  font-weight: 800;
  font-size: 25px;
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.header-content{
  font-size: 25px;
  font-weight: 900;
}

</style>