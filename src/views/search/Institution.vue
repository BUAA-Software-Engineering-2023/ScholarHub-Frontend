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

const InstitutionList = computed({
	get() {
		return props.institute
	},
	set(value) {
		emit('update:institute', value)
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