<template>
	<div v-if="item">
		<a-typography >
			<a-typography-title :level="3" style="text-align: justify; text-justify: auto;">
				{{item.display_name}}
			</a-typography-title>
		</a-typography>
		<div class="authorGrid">
			<a-space direction="vertical">
				<a-space direction="horizontal">
					<a-typography-title :level="4" v-if="item.international.description.zh!=null">描述:</a-typography-title>
					<a-typography-title :level="4" v-if="item.international.description.zh!=null" strong>{{item.international.description.zh}}</a-typography-title>
					<a-typography-title :level="4" v-if="item.international.description.zh==null">描述:</a-typography-title>
					<a-typography-title :level="4" v-if="item.international.description.zh==null" strong>{{item.international.description.en}}</a-typography-title>
				</a-space>
				<!--					<a-space direction="horizontal">-->
				<!--						<a-typography-text :level="5">研究领域:</a-typography-text>-->
				<!--						<a-typography-text :level="5"  v-for="(author, index) in item.x_concepts"   >-->
				<!--							<a-typography-text strong v-if="index<3">{{author.display_name}},</a-typography-text>-->
				<!--						</a-typography-text>-->
				<!--					</a-space>-->
			</a-space>
		</div>
	</div>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const ellipsis = {rows:5}
const router = useRouter();
const props = defineProps(['fieldcard']);
const item = ref()
onMounted( ()=>{
	item.value = props.fieldcard
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