<template>
	<NavBar></NavBar>
	<a-layout>
		<a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
			<div class="logo" />
			<a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" class="sideBar">
				<a-menu-item key="1" @click="handleClick(1)">
					<user-outlined />
					<span style="font-size: 20px">审批论文</span>
				</a-menu-item>
				<a-menu-item key="2" @click="handleClick(2)">
					<video-camera-outlined />
					<span style="font-size: 20px">审批个人门户</span>
				</a-menu-item>
			</a-menu>
		</a-layout-sider>
		<a-layout>
			<a-layout-header style="background: #fff; padding: 0 ">
				<menu-unfold-outlined
					v-if="collapsed"
					class="trigger"
					@click="() => (collapsed = !collapsed)"
					style="margin-right: 90%"
				/>
				<menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" style="margin-right: 90%" />
			</a-layout-header>
			<a-layout-content
				:style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '680px' }"
			>
				<PaperApproval v-if="page===1" />
				<PortalApproval v-if="page===2" />
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>
<script setup>
import { ref } from 'vue';
import NavBar from "@/components/NavBar/NavBar.vue";
import PaperApproval from "@/views/admin/PaperApproval.vue";
import { LinkOutlined, ReadOutlined, BankOutlined,ExperimentOutlined,PieChartOutlined } from '@ant-design/icons-vue';
import PortalApproval from "@/views/admin/PortalApproval.vue";
const selectedKeys = ref(['1']);
const collapsed = ref(false);
let page = ref('1');
function handleClick(n){
	if(n==1){
		page.value=1;
	}else{
		page.value=2;
	}
}
</script>
<style scoped>
#components-layout-demo-custom-trigger .trigger {
	font-size: 18px;
	line-height: 64px;
	padding: 0 24px;
	cursor: pointer;
	transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
	color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
	height: 32px;
	background: rgba(255, 255, 255, 0.3);
	margin: 16px;
}

.site-layout .site-layout-background {
	background: #fff;
}
.sideBar{
	margin-top: 40px;
}
</style>