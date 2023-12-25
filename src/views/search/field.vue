<template>
	<li v-for="field in fieldList" v-bind:key="field.id">
		<a-card hoverable style="width: 80%; margin: 0 auto;">
			<fieldCard :field="field" @click="jumpToInsDetail(field)"/>
		</a-card>
	</li>
</template>
<script setup>

import {ref} from "vue";
import InsCard from "@/views/search/InsCard.vue";
import FieldCard from "@/views/search/fieldCard.vue";
const props = defineProps(['field']);
const emit = defineEmits(['update:field'])

const fieldList = computed({
	get() {
		return props.field
	},
	set(value) {
		emit('update:field', value)
	}
})

function jumpToInsDetail(){

}
</script>
<style scoped>

</style>