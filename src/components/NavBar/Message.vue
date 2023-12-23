<template>
  <div class="message_icon" @click="showSidebar">
    <Message></Message>
  </div>
  <el-drawer size="20%" class="aside-message" v-model="visible"  title="I am the title" :with-header="false">
    <div class="button-container">
      <a @click="readAllMessages"  class="btn" style="--clr: #29aeef">
        <span>
          一键已读
        </span>
      </a>
    </div>
    <div v-for="message in messages" :key="message.message_id">
      <div  class="message" @click.prevent="showDetails(message)">
        <img class="user-avatar" src="@/assets/icons/default_avatar.png" alt="User Avatar" />
        <div class="message-content">
          <div class="message-sender"> <span>{{ message.receiver_username }}</span> <div class="send_time">{{message.created_at}}</div></div>
          <div class="message-text">{{ message.content }} <DeleteOutlined @click="deleteMessage(message)"/> </div>
	        
        </div>
        <span class="unread-badge" v-if="!message.is_read"></span>
      </div>
      <el-divider></el-divider>
    </div>
  </el-drawer>
</template>

<script lang="js" setup>
import Message from "@/assets/icons/Message.vue";
import MessageAPI from "@/api/message.js"
import { DeleteOutlined } from '@ant-design/icons-vue';
const visible = ref(false)
const messages = ref([
])
const showDetails = async (message)=>{
    message.is_read = true;
    await MessageAPI.read_message(message.message_id);
	await getMessages();
}
const getMessages = async ()=>{
	const result = await MessageAPI.get_messages();
	console.log("messages:",result.data.data);
	messages.value = result.data.data;
}
const showSidebar = async ()=>{
    visible.value = true;
	await getMessages();
}
const readAllMessages = async ()=>{
    await MessageAPI.read_all_messages();
	await getMessages();
}
const deleteMessage = async (message)=>{
	await MessageAPI.delete_messages(message.message_id);
	await getMessages();
}

</script>

<style scoped>
*{
  color: black;
}
.user-avatar {
  width: 50px; /* 根据需要调整头像大小 */
  height: 50px; /* 根据需要调整头像大小 */
  border-radius: 50%;
  margin-right: 10px; /* 根据需要调整头像和消息内容的间距 */
}

.message-content {
  margin:0;
  line-height: 2;
  text-align: justify !important;
  justify-content: space-between !important;
  width: 100%;
  overflow: hidden;
}

.message-sender {
  display: flex;
  font-weight: bold;
  text-align: justify !important;
  justify-content: space-between !important;
  /* 根据需要调整发送者姓名的样式 */
}

.message-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 根据需要调整消息内容的样式 */
}

.unread-badge {
  display: inline-block;
  width: 2px;
  height: 2px;
  padding: 4px;
  background-color: red;
  border-radius: 50%;
  /* 根据需要调整未读消息小红点的样式 */
}

.message_icon {
  display: flex;
  margin-top: 15px;
  align-items: center; /* 垂直居中 */
}
.message{
  margin-top: 10px;
  align-items: center;
  display: flex;
  width: 100%;
  margin-bottom: 10px;
}
.message:hover{
    cursor: pointer;
}
.message_icon:hover {
  cursor: pointer;
}
.send_time{
  font-size: 10px;
  color: #a0a5a8;
  margin: auto 0 auto auto;
}
.aside-message{
  margin: 20px 20px 20px 0 !important;
  height: calc(100vh - 40px) !important;
}

.el-divider{
  margin: 0;
  padding: 0;
}
/* 按钮样式，包括背景、文本和过渡属性 */
.btn {
  position: relative;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #333;
  border-radius: 40px;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 1em;
  font-weight: 600;
  letter-spacing: .1em;
  transition: transform .1s;
  overflow: hidden;
}
.btn span {
  position: relative;
  color: rgba(255, 255, 255, .25);
  transition: color .5s;
}
/* 悬停时文本颜色变化 */
.btn:hover span {
  color: rgba(255, 255, 255, 1);
}


/* 悬停时会扩展开的圆圈样式 */
.btn::before {
  content: "";
  position: absolute;
  top: var(--y);
  left: var(--x);
  transform: translate(-50%, -50%);
  background-color: var(--clr);
  width: 0;
  height: 0;
  border-radius: 50%;
  transition: 1s, left 0s, top 0s;
}
.btn:hover::before {
  width: 200px;
  height: 200px;
}
.button-container {
  display: flex;
  justify-content: flex-end;
}
a:hover{
  cursor: pointer;
}
/* 样式保持不变 */
</style>
