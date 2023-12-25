<template>
	<li v-for="ins in InstitutionList" v-bind:key="ins.id">
		<a-card hoverable style="width: 80%; margin: 0 auto;">
			<InsCard :institution="ins" @click="jumpToInsDetail(ins)"/>
		</a-card>
	</li>
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

</style>