
<template>
	<a-table bordered :data-source="dataSource" :columns="columns">
		<template #bodyCell="{ column, text, record }">
			<template v-if="column.dataIndex === 'name'">
				<router-link tag="a" target="_blank" :to="/client\paper/+record.paper_id">{{ text }}</router-link>
			</template>
			<template v-else-if="column.dataIndex === 'operation'">
				<a-popconfirm
					v-if="dataSource.length"
					title="确定要通过?"
					@confirm="onPass(record)"
				>
					<a-button type="primary" :size="size" v-if="record.status === '待审核'">
						<template #icon>
							<CheckOutlined />
						</template>
					</a-button>
				</a-popconfirm>
				<a-popconfirm
					v-if="dataSource.length"
					title="确定要拒绝?"
					@confirm="onRefuse(record)"
					class="rightButton"
				>
					<a-button type="primary" :size="size" v-if="record.status === '待审核'" danger>
						<template #icon>
							<CloseOutlined />
						</template>
					</a-button>
				</a-popconfirm>
			</template>
		</template>
	</a-table>
</template>
<script setup>
import { CheckOutlined, CloseOutlined, BankOutlined,ExperimentOutlined,PieChartOutlined,DownOutlined } from '@ant-design/icons-vue';
import { computed, reactive, ref } from 'vue';
import AdminAPI from '@/api/admin.js'
import { cloneDeep } from 'lodash-es';
const columns = [
	{
		title: '论文名称',
		dataIndex: 'name',
	},
	{
		title: '全文链接',
		dataIndex: 'url',
	},
	{
		title: '申请状态',
		dataIndex: 'status',
	},
	{
		title: '操作',
		dataIndex: 'operation',
		width: '15%',
	},
];

const dataSource = ref([
]);
const count = computed(() => dataSource.value.length + 1);
const editableData = reactive({});
const edit = key => {
	editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};
const save = key => {
	Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
	delete editableData[key];
};
const onRefuse = async record => {
	console.log("key", record);
	await reviewApply(record.id,false);
};

const onPass = async record => {
	console.log("key", record);
	await reviewApply(record.id,true);
};
onMounted(async ()=>{
	await getApply();
})
async function reviewApply(id,pass){
	const result = await AdminAPI.reviewPaperApply(id,pass);
	dataSource.value = result.data.data;
}
async function getApply(){
	const result = await AdminAPI.getSystemPaper();
	dataSource.value = result.data.data;
	console.log("res",result);
}
</script>
<style lang="less" scoped>
.rightButton{
	margin-left: 10px;
}
.editable-cell {
	position: relative;
	.editable-cell-input-wrapper,
	.editable-cell-text-wrapper {
		padding-right: 24px;
	}
	
	.editable-cell-text-wrapper {
		padding: 5px 24px 5px 5px;
	}
	
	.editable-cell-icon,
	.editable-cell-icon-check {
		position: absolute;
		right: 0;
		width: 20px;
		cursor: pointer;
	}
	
	.editable-cell-icon {
		margin-top: 4px;
		display: none;
	}
	
	.editable-cell-icon-check {
		line-height: 28px;
	}
	
	.editable-cell-icon:hover,
	.editable-cell-icon-check:hover {
		color: #108ee9;
	}
	
	.editable-add-btn {
		margin-bottom: 8px;
	}
}
.editable-cell:hover .editable-cell-icon {
	display: inline-block;
}
</style>