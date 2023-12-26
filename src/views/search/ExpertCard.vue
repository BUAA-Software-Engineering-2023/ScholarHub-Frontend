<template>
	<div>
		<a-typography>
			<a-typography-title :level="3" style="text-align: justify; text-justify: auto;">
				<a-avatar :size="54" class="avatar">
					<template #icon><img src="@/assets/imgs/default.jpg"/></template>
				</a-avatar>
				{{item.display_name}}
			</a-typography-title>
			<div class="authorGrid">
				<a-space direction="vertical">
					<a-space direction="horizontal">

						<code class="tagcolor">H-index:{{item.summary_stats.h_index}}</code>
						<code class="tagcolor">引用数:{{item.cited_by_count}}</code>
						<code class="tagcolor">论文数:{{item.works_count}}</code>
					</a-space>
					<a-space direction="horizontal">
					<a-typography-text v-if="item.last_known_institution!=null">研究机构:</a-typography-text>
					<a-typography-text v-if="item.last_known_institution!=null" strong>{{item.last_known_institution.display_name}}</a-typography-text>
					</a-space>
					<a-space direction="horizontal">
					<a-typography-text :level="5">研究领域:</a-typography-text>
					<a-typography-text :level="5"  v-for="(author, index) in item.x_concepts"   >
						<a-typography-text strong v-if="index<3">
              {{author.display_name}}
              <span v-if="index !== item.x_concepts.length - 1">,&nbsp;</span>
            </a-typography-text>
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
import { LinkOutlined, ReadOutlined, BankOutlined,ExperimentOutlined,PieChartOutlined } from '@ant-design/icons-vue';
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
.tagcolor{
	background-color: white;
	border: 1px solid black;
}
.avatar{
	margin-right: 20px;
}


</style>