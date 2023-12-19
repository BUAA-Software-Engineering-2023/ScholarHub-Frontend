<template>
	<a-table bordered :data-source="dataSource" :columns="columns">
		<template #bodyCell="{ column, text, record }">
			<template v-if="column.dataIndex === 'name'">
				<div class="editable-cell">
					<div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
						<a-input v-model:value="editableData[record.key].name" @pressEnter="save(record.key)" />
						<check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
					</div>
					<div v-else class="editable-cell-text-wrapper">
						{{ text || ' ' }}
						<edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
					</div>
				</div>
			</template>
			<template v-else-if="column.dataIndex === 'operation'">
				<a-popconfirm
					v-if="dataSource.length"
					title="确定要通过?"
					@confirm="onPass(record)"
				>
					<a-button type="primary" :size="size" v-if="record.status === 'no'">
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
					<a-button type="primary" :size="size" v-if="record.status === 'no'" danger>
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
import { computed, reactive, ref } from 'vue';
import AdminAPI from '@/api/admin.js'
import { cloneDeep } from 'lodash-es';
import {CheckOutlined, CloseOutlined} from "@ant-design/icons-vue";
const columns = [
	{
		title: '原因',
		dataIndex: 'reason',
		width: '30%',
	},
	{
		title: '电话号码',
		dataIndex: 'phoneNumber',
	},
	{
		title: '申请状态',
		dataIndex: 'status',
	},
	{
		title: '申请时间',
		dataIndex: 'time',
	},
	{
		title: '操作',
		dataIndex: 'operation',
	},
];
const dataSource = ref([
	{
		key: '0',
		reason: 'Edward King 0',
		phoneNumber: 32,
		time: '12:00',
		status: 'yes',
	},
	{
		key: '1',
		reason: 'Edward King 0',
		phoneNumber: 32,
		time: '12:00',
		status: 'no',
	},
	{
		key: '2',
		reason: 'Edward King 0',
		phoneNumber: 32,
		time: '12:00',
		status: 'no',
	},
	{
		key: '3',
		reason: 'Edward King 0',
		phoneNumber: 32,
		time: '12:00',
		status: 'no',
	},
	{
		key: '4',
		reason: 'Edward King 0',
		phoneNumber: 32,
		time: '12:00',
		status: 'no',
	},
	{
		key: '5',
		reason: 'Edward King 0',
		phoneNumber: 32,
		time: '12:00',
		status: 'no',
	},
	{
		key: '6',
		reason: 'Edward King 0',
		phoneNumber: 32,
		time: '12:00',
		status: 'no',
	},
	{
		key: '7',
		reason: 'Edward King 0',
		phoneNumber: 32,
		time: '12:00',
		status: 'no',
	},
	{
		key: '8',
		reason: 'Edward King 0',
		phoneNumber: 32,
		time: '12:00',
		status: 'no',
	},
	{
		key: '9',
		reason: 'Edward King 0',
		phoneNumber: 32,
		time: '12:00',
		status: 'no',
	},
	{
		key: '10',
		reason: 'Edward King 0',
		phoneNumber: 32,
		time: '12:00',
		status: 'no',
	},
	{
		key: '11',
		reason: 'Edward King 0',
		phoneNumber: 32,
		time: '12:00',
		status: 'no',
	},
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
	let key = record.key;
	console.log("key", record);
	dataSource.value = dataSource.value.filter(item => item.key !== key);
	await reviewApply();
};

const onPass = async record => {
	let key = record.key;
	console.log("key", record);
	dataSource.value = dataSource.value.filter(item => item.key !== key);
	await reviewApply();
};
onMounted(async ()=>{
	// await getApply();
})
async function reviewApply(id,pass){
	const result = await AdminAPI.reviewPortalApply(id,pass);
}
async function getApply(){
	const result = await AdminAPI.getPortalApply();
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