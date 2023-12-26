<template>
	<div>
		<a-typography v-if="item">
			
			<a-avatar :size="54" class="avatar">
				<template #icon v-if="item.image_url != null"><img :src="item.image_url"/></template>
				<template #icon v-if="item.image_url == null"><img src="@/assets/imgs/instituition.png"/></template>
			</a-avatar>
			<h3>{{item.display_name}}</h3>
			<h4>{{item.description}}</h4>
		</a-typography>
	</div>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import insImg from "@/assets/imgs/instituition.png"
const ellipsis = {rows:5}
const router = useRouter();
const props = defineProps(['funder']);
const item = ref()
console.log("in inscard")
onMounted( ()=>{
	item.value = props.funder
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

}


</style>