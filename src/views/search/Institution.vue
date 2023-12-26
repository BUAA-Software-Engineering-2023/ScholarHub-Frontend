<template>
	<div class="container">
		<a-card v-if="props.ifLoading === false" hoverable style="width: 20%; margin: 40px 40px" v-for="ins in InstitutionList" v-bind:key="ins.id" >
			<InsCard :institution="ins" @click="jumpIns(ins.id)"/>
		</a-card>
    <a-card v-else v-for="item in 9" class="card-style">
      <a-skeleton-avatar class="card-item" :active="active" :size="size" :shape="avatarShape" />
      <a-skeleton-input class="card-item2" style="width: 200px" :active="active" :size="size" />
      <a-skeleton-input class="card-item2" style="width: 200px" :active="active" :size="size" />
      <a-skeleton-input class="card-item2" style="width: 200px" :active="active" :size="size" />
    </a-card>
	</div>
</template>
<script setup>


import {ref} from "vue";
import InsCard from "@/views/search/InsCard.vue";
const props = defineProps(['institute', 'ifLoading']);
import router from "@/router/index.js";
const emit = defineEmits(['update:institute'])
const InstitutionList = computed({
	get() {
		return props.institute
	},
	set(value) {
		emit('update:institute', value)
	}
})

function jumpIns(url){//进入科研人员详情页
	const parts = url.split('/');
	const InsId = parts[parts.length - 1]; // 获取最后一个部分
	console.log(url);
	router.push({
		path:`/client/institution/${InsId}`
	})
}
</script>
<style scoped>
.card-style{
  display: flex;
  flex-direction: column;
  width: 20%;
  margin: 40px 40px;
}
.card-item{
  display: block;
  margin: auto;
  margin-bottom: 10px;
}
.card-item2{
  display: block;
  margin: auto;
  margin-bottom: 40px;
  height: 2px;
}
.container{
	display: flex;
	flex-wrap: wrap
}
</style>