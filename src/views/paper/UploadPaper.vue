<template>
  <div class="avatar-container">
    <div @click="showDialog">
      <span class="pdf">上传PDF</span>
    </div>
  </div>
  <el-dialog title="上传论文 PDF" v-model="dialogVisible" width="600px">
    <el-upload
        drag
        :on-change="uploadPdf"
        :auto-upload="false"
        accept=".pdf"
        :show-file-list="false"
        ref="pdfUploader"
        multiple
    >
    <div v-if="!selected" class="before">
      <el-icon class="el-icon--upload">
        <UploadFilled/>
      </el-icon>
      <div>
        <div >请拖放或选择一个 PDF 文件</div>
      </div>
    </div>
    <div v-else class="after">
      <el-icon style="color: red;font-size: 20px"><Document /></el-icon>
      <div style="">{{ fileName }}</div>
    </div>
    </el-upload>
    <template #footer>
      <el-button type="primary" @click="saveAvatar" :disabled="!selected">上传并保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { Camera, UploadFilled } from "@element-plus/icons-vue";
import VueCropper from "vue-cropperjs";
import 'cropperjs/dist/cropper.css';
import AccountAPI from "@/api/account.js"
import UserAPI from "@/api/user.js"
import {useAccountStore} from "@/stores/account.js";
import Swal from "sweetalert2";
const props = defineProps({
  initialAvatar: String,
  paper_id:String,
});
const emit = defineEmits(['update:avatar']);

const avatar = ref(props.initialAvatar);
const dialogVisible = ref(false);
const cropper = ref(null);
const selected = ref(false);
const globalAccount = useAccountStore();
const fileName = ref(''); // 新增变量存储文件名
let imageFile;
let pdfFile; // 新增 PDF 文件的引用

watch(() => props.initialAvatar, (newAvatar) => {
  avatar.value = newAvatar;
});

const showDialog = () => {
  dialogVisible.value = true;
  selected.value = false;
};

const uploadPdf = (uploadFile) => {
  pdfFile = uploadFile.raw; // 保存上传的 PDF 文件
  fileName.value = uploadFile.raw.name; // 保存文件名
  const reader = new FileReader();
  reader.onload = (event) => {
    cropper.value && cropper.value.replace(event.target.result);
  };
  reader.readAsDataURL(uploadFile.raw);
  selected.value = true;
};

const saveAvatar = async () => {
  if (pdfFile) { // 确保文件不为空
    try {
      console.log(pdfFile)
      const result = await UserAPI.upload_paper(props.paper_id,pdfFile)
      console.log(result)
      if (result.data.success){
        dialogVisible.value = false;
        await Swal.fire({
          icon: 'success', //error\warning\info\question
          title: result.data.message
        })
      }else{
        dialogVisible.value = false;
        await Swal.fire({
          icon: 'error', //error\warning\info\question
          title: result.data.message
        })

      }
      // const result = await AccountAPI.upload_avatar(pdfFile);
      // avatar.value = result.data.url;
      // globalAccount.setAvatar(result.data.data)
      // const result1 = await UserAPI.update_info(globalAccount.userInfo.nickname, result.data.data)
      // console.log(result1)
      // avatar.value = globalAccount.userInfo.avatar;
      // emit('update:avatar', avatar.value);
    } catch (e) {
      await Swal.fire({
        icon: 'error', //error\warning\info\question
        title: "文件上传失败"
      })
    }
  }
};
</script>

<style scoped>
.avatar-container {
  text-align: center;
  margin: auto;
  position: relative;
}

.avatar {
  width: 100px;
  height: 100px;
  background: #f8f8f8;
  border: 1px solid #eee;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}

.avatar-edit {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.avatar-edit i {
  color: #fff;
  font-size: 25px;
}
.avatar:hover .avatar-edit {
  opacity: 1;
}
.after{
  margin-left: 25%;

  display: flex;
  text-align: center;
  align-items: center;
}
</style>
