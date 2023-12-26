<template>
	<div class="container">
		<a-card v-if="props.ifLoading === false" hoverable style="width: 20%; margin: 40px 40px" v-for="fie in fieldList" v-bind:key="fie.id" >
			<field-card :fieldcard="fie" @click="jumpField(fie.id)"/>
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
import FieldCard from "@/views/search/FieldCard.vue";
const props = defineProps(['modelValue','ifLoading']);
import router from "@/router/index.js";
const emit = defineEmits(['update:modelValue']);
const active = ref(true);
const block = ref(false);
const size = ref('default');
const avatarShape = ref('circle');

const fieldList = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	}
})
watch(props, (newValue, oldValue)=>{
  console.log("in-ifLoading",props.ifLoading);
})
function jumpField(url){//进入科研人员详情页
	const parts = url.split('/');
	const FieldId = parts[parts.length - 1]; // 获取最后一个部分
	console.log(FieldId);
	router.push({
		path:`/client/concept/${FieldId}`
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