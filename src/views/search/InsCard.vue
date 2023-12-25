<template>
	<div>
		<a-typography v-if="item">
			<a-typography-title :level="3" style="text-align: justify; text-justify: auto;">
				<a-avatar :size="54" class="avatar">
					<template #icon><img :src="item.image_url"/></template>
				</a-avatar>
				{{item.display_name}}
			</a-typography-title>
			<div class="authorGrid">
				<a-space direction="vertical">
					<a-space direction="horizontal">
						<a-typography-title :level="4" v-if="item.type!=null">类型:</a-typography-title>
						<a-typography-title :level="4" v-if="item.type!=null" strong>{{item.type}}</a-typography-title>
					</a-space>
<!--					<a-space direction="horizontal">-->
<!--						<a-typography-text :level="5">研究领域:</a-typography-text>-->
<!--						<a-typography-text :level="5"  v-for="(author, index) in item.x_concepts"   >-->
<!--							<a-typography-text strong v-if="index<3">{{author.display_name}},</a-typography-text>-->
<!--						</a-typography-text>-->
<!--					</a-space>-->
				</a-space>
			</div>
		</a-typography>
	</div>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const ellipsis = {rows:5}
const router = useRouter();
const props = defineProps(['institution']);
const item = ref()
console.log("in inscard")
onMounted( ()=>{
	item.value = props.institution
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