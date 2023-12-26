<template>
	<div v-if="item">
			<a-avatar :size="54" class="avatar">
				<template #icon v-if="item.image_url"><img :src="item.image_url"/></template>
				<template #icon v-if="!item.image_url"><img src="@/assets/imgs/concept.png"/></template>
			</a-avatar>
			<h2> {{item.display_name}} </h2>
			<h4 v-if="item.international.description?.zh" v-html="item.international.description.zh"></h4>
			<h4 v-if="!item.international.description?.zh" v-html="item.international.description?.en"></h4>

	</div>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const ellipsis = {rows:5}
const router = useRouter();
const props = defineProps(['fieldcard']);
const item = computed(() => props.fieldcard)

</script>

<style scoped>
.authorGrid{
	text-align: justify;
	text-justify: auto;
}
.authorGrid--item{
	display: inline-block
}
.tagcolor{
	background-color: white;
	border: 1px solid black;
}
.avatar{
	margin-right: 20px;
}


</style>