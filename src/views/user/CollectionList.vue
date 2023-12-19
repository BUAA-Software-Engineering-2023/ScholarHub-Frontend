<script setup>
import UserApi from "@/api/user.js";
import Swal from "sweetalert2";
import router from "@/router/index.js";
import {useRoute} from "vue-router";
import {defineEmits} from "vue";
const title = ref('')
const collections = ref()
const selectedId = ref(null);
const route = useRoute();
const props = defineProps('folderSelected')
onMounted( async () => {
  selectedId.value = route.query.id
  const result =  await UserApi.get_favorite();
  console.log(result.data)
  if (!result.data.success){
    let promise = Swal.fire({
      icon: 'error',
      title:'服务器错误'
    });
  }
  collections.value = result.data.data
  if (selectedId.value===''||selectedId.value===undefined){
    await query('');
  }else{
    await query(selectedId.value)
  }
});
async function createNewFolder(title){
  console.log(title);
  let result = await UserApi.create_favorite(title);
  if (!result.data.success){
    let promise = Swal.fire({
      icon: 'error',
      title:'服务器错误'
    });
  }else{
    let promise = Swal.fire({
      icon: 'success',
      title:'创建成功！'
    });
    result = await UserApi.get_favorite();
    collections.value = result.data.data;
  }

}
async function deleteFolder(folderId){
  let result =  await UserApi.delete_favorite(folderId)
  if (!result.data.success){
    let promise = Swal.fire({
      icon: 'error',
      title:'服务器错误'
    });
  }else{
    let promise = Swal.fire({
      icon: 'success',
      title:'删除成功！'
    });
  }
  result = await UserApi.get_favorite();
  collections.value = result.data.data;
}
async function query(folderId){
  if (folderId){
    selectedId.value = folderId;
    await router.push({name: 'Collections', query: {id: folderId}})
    emits('select')
    console.log(selectedId.value)
  }else{
    selectedId.value = '';
    console.log(!selectedId.value)
    await router.push({name: 'Collections'})
    emits('select')
  }
}
async function renameFolder(folderId,title){
  let promise = Swal.fire({
    title: "收藏夹名称为",
    input: "text",
    inputValue: title,
    inputAttributes: {
      autocapitalize: "off"
    },
    showCancelButton: true,
    confirmButtonText: "确认",
    showLoaderOnConfirm: true,
    preConfirm: async (new_name) => {
      try {
        console.log(new_name);
        const result = await UserApi.update_favorite_name(folderId,new_name);
        console.log(result);
      } catch (error) {
        Swal.showValidationMessage(`
        Request failed: ${error}
      `);
      }
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    console.log(result)
    if (result.isConfirmed) {
      Swal.fire({
        icon:"success",
        title: "修改成功",
      });
    }
  });
  let result = await UserApi.get_favorite();
  collections.value = result.data.data;
}
const emits = defineEmits(['select']);
</script>

<template>
  <div class="wrapper">
    <header>我的收藏</header>
    <div class="inputField">
      <input  v-model="title" type="text" placeholder="添加新的收藏夹">
      <button @click="createNewFolder(title)" v-if="title.length" ><PlusOutlined /></button>
    </div>
    <ul class="todoList" >
      <div  class="li-container" :class="{ 'selected':  !selectedId }"><img src="@/assets/icons/default_avatar.png" alt=""> <li  @click="query()">所有收藏</li></div>
         <div class="li-container" @click="query(collection.id)" :class="{ 'selected': collection.id === selectedId }" v-for="(collection, index) in collections" :key="index">
           <img src="@/assets/icons/default_avatar.png" alt=""> <li >{{collection.title}}
           <span class="actions">
            <span class="edit" @click.prevent="renameFolder(collection.id, collection.title)">
              <EditOutlined />
            </span>
            <span class="icon" @click.prevent="deleteFolder(collection.id)">
              <DeleteOutlined />
            </span>
          </span>
         </li>
       </div>
    </ul>
<!--    <div class="footer">-->
<!--      <span> <span class="pendingTasks"></span> Your Stars</span>-->
<!--      <button>Clear All</button>-->
<!--    </div>-->
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
img{
  margin: auto;
  width: 40px;
  height: 40px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

::selection {
  color: #ffff;
  background: rgb(142, 73, 232);
}

body {
  width: 100%;
  height: 100vh;
  /* overflow: hidden; */
  padding: 10px;
  background: linear-gradient(to bottom, #68EACC 0%, #497BE8 100%);
}

.wrapper {
  height: 422px;
  color: #18181b;
  margin-left: 8vw;
  margin-top: 20px;
  background: #fff;
  max-width: 400px;
  min-width: 300px;
  width: 100%;
  padding: 25px;
  border-radius: 5px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
}

.wrapper header {
  font-size: 30px;
  font-weight: 600;
}

.wrapper .inputField {
  margin: 20px 0;
  width: 100%;
  display: flex;
  height: 45px;
}

.inputField input {
  width: 85%;
  height: 100%;
  outline: none;
  border-radius: 3px;
  border: 1px solid #ccc;
  font-size: 17px;
  padding-left: 15px;
  transition: all 0.3s ease;
}

.inputField input:focus {
  border-color: #8E49E8;
}

.inputField button {
  width: 50px;
  height: 100%;
  border: none;
  color: #fff;
  margin-left: 5px;
  font-size: 21px;
  outline: none;
  background: #8E49E8;
  cursor: pointer;
  border-radius: 3px;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.inputField button:hover,
.footer button:hover {
  background: #721ce3;
}

.inputField button.active {
  opacity: 1;
  pointer-events: auto;
}

.wrapper .todoList {
  max-height: 250px;
  overflow-y: auto;
}

.todoList li {
  width: 80%;
  position: relative;
  list-style: none;
  margin-bottom: 8px;
  border-radius: 3px;
  padding: 10px 15px;
  cursor: default;
  overflow: hidden;
  word-wrap: break-word;
}

 .icon {
   width: 45px;
   color: #000000;
   padding: 10px 15px;
   border-radius: 0 3px 3px 0;
   cursor: pointer;
   transition: all 0.2s ease;
}
 .actions{
   display: flex;
   position: absolute;
   right: -100px;
   top: 50%;
   transform: translateY(-50%);
   transition: all 0.2s ease;
 }

.todoList li:hover .actions{
    right: 0;
}


.wrapper .footer {
  display: flex;
  width: 100%;
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;
}

.footer button {
  padding: 6px 10px;
  border-radius: 3px;
  border: none;
  outline: none;
  color: #fff;
  font-weight: 400;
  font-size: 16px;
  margin-left: 5px;
  background: #8E49E8;
  cursor: pointer;
  user-select: none;
  opacity: 0.6;
  pointer-events: none;
  transition: all 0.3s ease;
}

.footer button.active {
  opacity: 1;
  pointer-events: auto;
}
li:hover{
  color: white;
  transition: all 0.3s ease;
  cursor: pointer;
}
.todoList li.selected {
  color: white;
}
.li-container{
  display: flex;
  padding: 10px;
  text-align: left;
  margin-bottom: 10px;
  border-radius: 10px;
}
.li-container:hover{
  color: white;
  transition: all 0.3s ease;
  background: #8E49E8;
  cursor: pointer;
}
.selected{
  background: #8E49E8;
  color: white;
}
.li-container li{
  font-weight: 500;
  margin: auto;
}
.edit{
  width: 45px;
  color: #000000;
  padding: 10px 15px;
  border-radius: 0 3px 3px 0;
  cursor: pointer;
  transition: all 0.2s ease;
}
.edit:hover{
  color: white;
  background: #4B70E2;
}
.icon:hover{
  color: white;
  background-color: red;
}
</style>