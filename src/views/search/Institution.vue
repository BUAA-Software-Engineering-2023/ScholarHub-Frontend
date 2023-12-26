<template>
	<div class="container">
		<a-card hoverable style="width: 20%; margin: 40px 40px" v-for="ins in InstitutionList" v-bind:key="ins.id" >
			<InsCard :institution="ins" @click="jumpToInsDetail(ins)"/>
		</a-card>
	</div>
</template>
<script setup>


import {ref} from "vue";
import InsCard from "@/views/search/InsCard.vue";
const props = defineProps(['institute']);
const emit = defineEmits(['update:institute'])
const ifLoading = ref(false)
const InstitutionList = computed({
	get() {
		return props.institute
	},
	set(value) {
		emit('update:institute', value)
	}
})

// 监视 props.institute 的变化
watch(
    () => props.institute,
    (newValue, oldValue) => {
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