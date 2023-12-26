<template>
<!--	<li v-for="fie in fieldList" v-bind:key="fie.id">-->
<!--		<a-card hoverable style="width: 80%; margin: 0 auto;">-->
<!--			<field-card :fieldcard="fie" @click="jumpToInsDetail(fie)"/>-->
<!--		</a-card>-->
<!--	</li>-->
	<div class="container">
		<a-card hoverable style="width: 20%; margin: 40px 40px" v-for="fie in fieldList" v-bind:key="fie.id" >
			<field-card :fieldcard="fie" @click="jumpToInsDetail(fie)"/>
		</a-card>

	</div>
</template>
<script setup>

import {ref} from "vue";
import InsCard from "@/views/search/InsCard.vue";
import FieldCard from "@/views/search/FieldCard.vue";
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

function jumpToInsDetail(){

}
</script>
<style scoped>
.container{
	display: flex;
	flex-wrap: wrap
}
</style>