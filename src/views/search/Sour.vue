<template>
	<div class="container">
		<a-card hoverable style="width: 20%; margin: 40px 40px" v-for="sour in SourceList" v-bind:key="sour.id" >
			<SourceCard :sourceContent="sour" @click="jumpToInsDetail(sour)"/>
		</a-card>
	</div>
</template>
<script setup>


import {ref} from "vue";
import InsCard from "@/views/search/InsCard.vue";
import PublisherCard from "@/views/search/PublisherCard.vue";
import SourceCard from "@/views/search/SourceCard.vue";
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue'])
const ifLoading = ref(false)
const SourceList = computed({
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
		console.log("modelValue hahaha",SourceList.value)
		ifLoading.value = !newValue; // 如果 newValue 不存在（即未赋值），则 ifLoading.value 为 true
	},
	{ immediate: true } // 立即触发，以处理初始值
);

function jumpToInsDetail(){

}
</script>
<style scoped>
.container{
	display: flex;
	flex-wrap: wrap
}
</style>