<script setup>
import {h, ref} from "vue";
import {
  AppstoreOutlined,
  CalendarOutlined, HistoryOutlined,
  MailOutlined,
  SettingOutlined,
  StarOutlined,
  UserOutlined
} from "@ant-design/icons-vue";
import router from "@/router/index.js";

const theme = ref('light');
const openKeys = ref(['sub1','sub2']);
const props = defineProps(["selectKeys"])
const selectedKeys = [props.selectKeys];
const items = ref([
  {
    key: 'sub1',
    icon: () => h(MailOutlined),
    label: '主页',
    title: '主页',
    children: [
      {
        key: '1',
        label: '个人信息',
        title: '个人信息',
        path: 'client/user/information',
        icon: () => h(UserOutlined),
      },
      {
        key: '4',
        label: '学术门户',
        title: '学术门户',
        path: 'client/user/scholar',
        icon: () =>h(UserOutlined),
      }
    ]
  },
  {
    key: 'sub2',
    icon: () => h(CalendarOutlined),
    label: '学术中心',
    title: '学术中心',
    children: [
      {
        key: "2",
        label: "论文收藏",
        title: '论文收藏',
        path: "client/user/collections",
        icon: ()=> h(StarOutlined)
      },
      {
        key: "3",
        label: "浏览历史",
        title: "浏览历史",
        path: "client/user/history",
        icon: ()=>h(HistoryOutlined)
      }
    ]
  },
]);
function handleMenuClick({ item, key, keyPath }) {
  // 获取到当前的key,并且跳转

  router.push('/'+item.path)
}
</script>

<template>
  <div class="sideBar">
    <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        style="width: 100%;"
        mode="inline"
        :theme="theme"
        :items="items"
        @click="handleMenuClick"
    />
  </div>
</template>

<style scoped>

.sideBar{
  text-align: left;
  width: 100%;
  padding: 10px;
  flex: none;
  min-width: 0;
  background-color: white;
  border-radius: 10px;
  margin-top: 20px;
  margin-left: 8vw;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
}
</style>