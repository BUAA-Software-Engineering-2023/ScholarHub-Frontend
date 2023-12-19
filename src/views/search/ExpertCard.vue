<template>
	<div>
		<a-typography>
			<a-typography-title :level="3" style="text-align: justify; text-justify: auto;">
				{{item.display_name}}
			</a-typography-title>
			<div class="authorGrid">
				<a-space direction="vertical">
					<a-space direction="horizontal">
						<a-typography-text keyboard>H-index:{{item.summary_stats.h_index}}</a-typography-text>
						<a-typography-text keyboard>引用数:{{item.cited_by_count}}</a-typography-text>
					</a-space>
					<a-typography-text v-if="item.last_known_institution!=null">研究机构: {{item.last_known_institution.display_name}}</a-typography-text>
					<a-space direction="horizontal">
					<a-typography-text :level="5">研究领域:</a-typography-text>
					<a-typography-text :level="5"  v-for="(author, index) in item.x_concepts"   >
						<a-typography-text v-if="index<3">{{author.display_name}},</a-typography-text>
					</a-typography-text>
					</a-space>
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
const props = defineProps(['paper']);
const item = ref()
item.value = props.paper
</script>

<style scoped>
.authorGrid{
	text-align: justify;
	text-justify: auto;
}
.authorGrid--item{
	display: inline-block
}

</style>