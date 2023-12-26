<template>
	<div class="container">
		<a-card hoverable style="width: 20%; margin: 40px 40px" v-for="fund in FunderList" v-bind:key="fund.id" >
			<FunderCard :funder="fund" @click="jumpFunder(fund.id)"/>
		</a-card>
	</div>
</template>
<script setup>


import {ref} from "vue";
import InsCard from "@/views/search/InsCard.vue";
import PublisherCard from "@/views/search/PublisherCard.vue";
import FunderCard from "@/views/search/FunderCard.vue";
import router from "@/router/index.js";
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue'])
const ifLoading = ref(false)
const FunderList = computed({
	get() {
		return props.modelValue
	},
	set(value) {
		emit('update:modelValue', value)
	}
})

// 监视 props.modelValue 的变化
watch(
	() => props.modelValue,
	(newValue, oldValue) => {
		console.log("modelValue hahaha",FunderList.value)
		ifLoading.value = !newValue; // 如果 newValue 不存在（即未赋值），则 ifLoading.value 为 true
	},
	{ immediate: true } // 立即触发，以处理初始值
);

function jumpFunder(url){//进入科研人员详情页
	const parts = url.split('/');
	const InsId = parts[parts.length - 1]; // 获取最后一个部分
	console.log(url);
	router.push({
		path:`/client/funder/${InsId}`
	})
}
</script>
<style scoped>
.container{
	display: flex;
	flex-wrap: wrap
}
</style>