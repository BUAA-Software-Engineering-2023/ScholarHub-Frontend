<template>
	<div class="container">
		<a-card v-if="props.ifLoading === false" hoverable style="width: 20%; margin: 40px 40px" v-for="fie in fieldList" v-bind:key="fie.id" >
			<field-card :fieldcard="fie" @click="jumpToInsDetail(fie)"/>
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

function jumpToInsDetail(){

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