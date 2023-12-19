<template>
	<NavBar/>
	<a-layout>
		<a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
			<div class="logo" />
			<a-menu
				v-model:selectedKeys="selectedKeys"
				theme="dark"
				mode="horizontal"
				:style="{ lineHeight: '64px' }"
			>
				<a-menu-item key="1">个人门户认领审批</a-menu-item>
				<a-menu-item key="2">论文上传审批</a-menu-item>
			</a-menu>
		</a-layout-header>
		<a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
		<PortalApproval v-if="selectedKeys[0]==='1'"></PortalApproval>
		<PaperApproval v-if="selectedKeys[0]==='2'"></PaperApproval>
		</a-layout-content>
		<a-layout-footer :style="{ textAlign: 'center' }">

		</a-layout-footer>
	</a-layout>
</template>
<script setup>
import { ref } from 'vue';
import PortalApproval from '@/views/admin/PortalApproval.vue';
import PaperApproval from '@/views/admin/PaperApproval.vue';
import NavBar from "@/views/search/NavBar/NavBar.vue";
const selectedKeys = ref(['1']);
</script>
<style scoped>
#components-layout-demo-fixed .logo {
	width: 120px;
	height: 31px;
	background: rgba(255, 255, 255, 0.2);
	margin: 16px 24px 16px 0;
	float: left;
}
.site-layout .site-layout-background {
	background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
	background: #141414;
}
</style>