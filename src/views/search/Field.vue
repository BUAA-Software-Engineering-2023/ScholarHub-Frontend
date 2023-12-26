<template>
<!--	<li v-for="fie in fieldList" v-bind:key="fie.id">-->
<!--		<a-card hoverable style="width: 80%; margin: 0 auto;">-->
<!--			<field-card :fieldcard="fie" @click="jumpToInsDetail(fie)"/>-->
<!--		</a-card>-->
<!--	</li>-->
	<div class="container">
		<a-card hoverable style="width: 20%; margin: 40px 40px" v-for="fie in fieldList" v-bind:key="fie.id" >
			<field-card :fieldcard="fie" @click="jumpField(fie.id)"/>
		</a-card>

	</div>
</template>
<script setup>

import {ref} from "vue";
import InsCard from "@/views/search/InsCard.vue";
import FieldCard from "@/views/search/FieldCard.vue";
import router from "@/router/index.js";
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const fieldList = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	}
})

function jumpField(url){//进入科研人员详情页
	const parts = url.split('/');
	const FieldId = parts[parts.length - 1]; // 获取最后一个部分
	console.log(FieldId);
	router.push({
		path:`/client/concept/${FieldId}`
	})
}
</script>
<style scoped>
.container{
	display: flex;
	flex-wrap: wrap
}
</style>