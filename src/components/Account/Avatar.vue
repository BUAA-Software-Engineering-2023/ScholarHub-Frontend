<template>
  <div class="avatar-container">
    <div class="avatar" @click="showDialog">
      <el-avatar :size="100" :src="avatar"/>
      <span class="avatar-edit">
                <el-icon><Camera/></el-icon>
            </span>
    </div>
    <el-dialog title="裁剪图片" v-model="dialogVisible" width="600px">
      <vue-cropper
          ref="cropper"
          :ready="cropImage"
          :zoom="cropImage"
          :cropmove="cropImage"
          :crop="cropImage"
          :src="props.initialAvatar"
          :viewMode="1"
          :aspectRatio="1"
          dragMode="move"
          style="width: 100%; height: 400px; text-align: center"
          v-if="selected"
      ></vue-cropper>
      <el-upload
          drag
          :on-change="setImage"
          :auto-upload="false"
          accept="image/*"
          :show-file-list="false"
          v-else
      >
        <el-icon class="el-icon--upload">
          <UploadFilled/>
        </el-icon>
        <div>
          请选择一张图片
        </div>
      </el-upload>
      <template #footer>
        <el-button type="primary" @click="saveAvatar">上传并保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Camera, UploadFilled } from "@element-plus/icons-vue";
import VueCropper from "vue-cropperjs";
import 'cropperjs/dist/cropper.css';
import AccountAPI from "@/api/account.js"
import UserAPI from "@/api/user.js"
import {useAccountStore} from "@/stores/account.js";
const props = defineProps({
  initialAvatar: String
});
const emit = defineEmits(['update:avatar']);

const avatar = ref(props.initialAvatar);
const dialogVisible = ref(false);
const cropper = ref(null);
const selected = ref(false);
const globalAccount = useAccountStore();
let imageFile;

watch(() => props.initialAvatar, (newAvatar) => {
  avatar.value = newAvatar;
});

const showDialog = () => {
  dialogVisible.value = true;
  selected.value = false;
};

const setImage = (uploadFile) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    cropper.value && cropper.value.replace(event.target.result);
  };
  reader.readAsDataURL(uploadFile.raw);
  selected.value = true;
};

const cropImage = () => {
  cropper.value.getCroppedCanvas({
    width: 512,
    height: 512,
    imageSmoothingQuality: "high"
  }).toBlob(blob => imageFile = new File([blob], "avatar.png"));
};

const saveAvatar = async () => {
  try {
    const result = await AccountAPI.upload_avatar(imageFile);
    globalAccount.setAvatar(result.data.data)
    const result1 = await UserAPI.update_info(globalAccount.userInfo.nickname,result.data.data)
    console.log(result1)
    avatar.value = globalAccount.userInfo.avatar;
    emit('update:avatar', avatar.value);
  } catch (e) {
    console.error('图片上传失败', e);
  }
  dialogVisible.value = false;
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
</style>
