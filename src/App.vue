<template>
  <el-config-provider :locale="i18nLocale" :button="noSpace">
    <router-view></router-view>
  </el-config-provider>
</template>


<script setup>
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { useGlobalStore } from "./stores/global.js";
import en from "element-plus/es/locale/lang/en";
import { reactive, computed } from 'vue'
const globalStore = useGlobalStore();
//配置element按钮文字中间是否有空格
const noSpace = reactive({
  autoInsertSpace: false,
})
const i18nLocale = computed(() => {
  if (globalStore.language && globalStore.language === "zh") return zhCn;
  if (globalStore.language === "en") return en;
  return {};
});
</script>
<style scoped>
*{
  width: 100%;
  height: 100%;
}
</style>
