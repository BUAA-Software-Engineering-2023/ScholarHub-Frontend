<script setup>
import UserApi from "@/api/user.js";
import SideBar from "@/views/user/SideBar.vue";
import Swal from "sweetalert2";
import {useAccountStore} from "@/stores/account.js";
import AccountApi from "@/api/account.js"
import UploadAuthorAvatar from "@/views/user/UploadAuthorAvatar.vue";
import Search from "@/api/search.js";

const globalStore  = useAccountStore();
const authorBio = ref('这里是作者的简介...');
const editableBio = ref('');
const isEditing = ref(false);
const authorName = ref("");
const avatar = ref("");
const authorInfo = ref()
const Mounted = ref(false)
const input = ref("")
// 切换编辑模式
async function toggleEdit() {
  if (isEditing.value) {
    authorBio.value = editableBio.value; // 保存编辑后的内容
    const result = await AccountApi.update_author_info(globalStore.userInfo.author_id,authorName.value,authorBio.value,avatar.value);
    console.log(result.data)
    authorName.value = input.value;
    // 这里可以添加代码将编辑后的内容发送到服务器
  } else {
    editableBio.value = authorBio.value; // 准备编辑内容
  }
  isEditing.value = !isEditing.value;
}
const is_Author = ref(globalStore.userInfo.is_Author);
onMounted( async () => {
  const result =  await Search.author_detail(globalStore.userInfo.author_id)
  if (result.data.success){
    authorName.value = result.data.data.display_name
    input.value = result.data.data.display_name
    avatar.value = result.data.data.avatar
    authorInfo.value = result.data.data
  }
  Mounted.value = true;
  console.log(result)
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
      <SideBar select-keys="4"></SideBar>
    </div>
    <div v-if="!is_Author" class="content">
      <div class="header">
        <div class="avatar">
          <UploadAuthorAvatar v-show="Mounted" :initial-avatar="avatar"></UploadAuthorAvatar>
        </div>
        <div class="header-content">{{authorName}}</div>
      </div>
      <div class="information">

        <div class="left">
          <div class="title">
            作者信息
            <EditOutlined @click="toggleEdit" v-if="!isEditing" class="edit-button" />
          </div>
          <el-divider></el-divider>
          <div class="profile-section">
            <div class="title">
              作者姓名
              <a-input v-model:value="input" :disabled="!isEditing" class="name-input"></a-input>
            </div>
            <div class="title">
              作者简介
            </div>
            <!-- ...其他内容... -->
          </div>
          <el-divider></el-divider>
          <div v-if="!isEditing" class="author-bio">{{ authorBio }}</div>
          <a-textarea v-else v-model:value="editableBio" :rows="4"></a-textarea>
          <button class="btn" v-if="isEditing" @click="toggleEdit">保存</button>
        </div>
        <div class="right">
          <div class="title">合作学者</div>
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
    <div class="empty" v-else>
        <a-empty description="暂无作者信息"></a-empty>
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
.empty {
  margin-left: 10vw;
  background-color: white;
  margin-top: 20px;
  color: black;
  /* 右侧内容样式 */
  width: 60%; /* 右侧宽度，可以根据需求调整 */
  height: 200%;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  border-radius: 10px;
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


.author-bio {
  margin-bottom: 15px;
  font-size: 16px;
  line-height: 1.5;
  color: #555;
}

a-textarea {
  margin-bottom: 10px;
  width: 100%;
}

a-button{
  margin-top: 20px;
}
.profile-section a-button:hover {
  background-color: #45a049;
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
.edit-button {
  margin-left: 10px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  color: #a0a5a8;
}
.btn{
  margin-top: 20px;
  font-size: 14px;
  background-color: white;
  color: black;
  border: black 1px solid;
  align-items: center;
  transition: 0.5s;
}
.btn:hover{
  color: white;
  background-color: black;
}
.name-input {
  margin-top: 10px;
  margin-bottom: 20px;
}
.profile-section .title{
  font-size: 20px;
  font-weight: 400;
}
</style>