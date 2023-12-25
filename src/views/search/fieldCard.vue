<template>
	<div>
		<a-typography v-if="item">
			<a-typography-title :level="3" style="text-align: justify; text-justify: auto;">
				{{item.display_name}}
			</a-typography-title>
		</a-typography>
	</div>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const ellipsis = {rows:5}
const router = useRouter();
const props = defineProps(['field']);
const item = ref()
onMounted( ()=>{
	console.log("in inscard")
	item.value = props.field
	console.log("inscard" + item.value)
})

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