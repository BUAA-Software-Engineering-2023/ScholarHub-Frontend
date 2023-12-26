<template>
  <NavBar></NavBar>
    <a-layout style="height: 100%">
      <a-layout-sider style="margin-top: 10px;height: 100%" v-model:collapsed="state.collapsed" collapsible>
        <a-menu v-model:selectedKeys="state.selectedKeys" theme="dark" mode="inline" :inline-collapsed="state.collapsed" :items="items"></a-menu>
        <div class="sider-footer">
          <menu-unfold-outlined v-if="state.collapsed" @click="toggleCollapsed" class="trigger" />
          <menu-fold-outlined v-else @click="toggleCollapsed" class="trigger" />
        </div>
      </a-layout-sider>
      <a-layout>
        <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '680px' }">
          <PaperApproval v-if="page === '1'" />
          <PortalApproval v-if="page === '2'" />
        </a-layout-content>
      </a-layout>
    </a-layout>
</template>
<script setup>
import { reactive, h } from 'vue';
import NavBar from "@/components/NavBar/NavBar.vue";
import PaperApproval from "@/views/admin/PaperApproval.vue";
import PortalApproval from "@/views/admin/PortalApproval.vue";
import { PieChartOutlined, DesktopOutlined } from '@ant-design/icons-vue';
const page = ref('1');
const state = reactive({
  collapsed: false,
  selectedKeys: ['1'],
  openKeys: [],
  preOpenKeys: [],
});

const items = reactive([
  {
    key: '1',
    icon: () => h(PieChartOutlined),
    label: '审批论文',
    title: '审批论文',
    onClick: () => handleClick('1')
  },
  {
    key: '2',
    icon: () => h(DesktopOutlined),
    label: '审批个人门户',
    title: '审批个人门户',
    onClick: () => handleClick('2')
  }
]);


const handleClick = (key) => {
  page.value = key;
  state.selectedKeys = [key];
};

const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
  state.openKeys = state.collapsed ? [] : state.preOpenKeys;
};


watch(
    () => state.selectedKeys,
    (newVal) => {
      page.value = newVal[0];
    }
);
</script>
<style scoped>
/* ... 其他样式 ... */

/* 自定义带图标的菜单项样式 */
.a-menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.a-menu-item .anticon {
  margin-bottom: 4px; /* 调整图标与文字之间的间距 */
}

/* 自定义菜单项标签（文字）样式 */
.a-menu-item-label {
  display: block;
  text-align: center;
}
.sider-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-bottom: 0; /* 这会将容器推到底部 */
}

.trigger {
  font-size: 18px;
  cursor: pointer;
  color: white;
  /* 调整颜色和悬停样式 */
}
.container{
  height: 100%;
}
</style>
