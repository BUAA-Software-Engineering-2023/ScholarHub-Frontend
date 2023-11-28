<template>
  <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
    <template #renderItem="{ item }">
      <a-list-item key="item.title">
        <template #actions>
          <span v-for="{ icon, text } in actions" :key="icon">
            <component :is="icon" style="margin-right: 8px" />
            {{ text }}
          </span>
        </template>
        <template #extra>
        </template>
        <a-list-item-meta :description="item.description">
          <template #title>
            <a :href="item.href">{{ item.title }}</a>
          </template>
        </a-list-item-meta>
        {{ item.content }}
      </a-list-item>
    </template>
  </a-list>
</template>
<script setup>
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';
const listData = [];
const props = defineProps(['reference_works'])
for (let i = 0; i < props.reference_works.length; i++) {
  const url = props.reference_works[i].id;
// 使用字符串分割方法，以 '/' 分割URL，并选择最后一个部分
  const parts = url.split('/');
  const paperId = parts[parts.length - 1]; // 获取最后一个部分
  console.log(paperId); // 输出 W1775749144
  listData.push({
    href: paperId,
    title: props.reference_works[i].display_name,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
        props.reference_works[i].publication_year,
  });
}

const pagination = {
  onChange: page => {
    console.log(page);
  },
  pageSize: 3,
};
const actions = [
  {
    icon: StarOutlined,
    text: '156',
  },
  {
    icon: LikeOutlined,
    text: '156',
  },
  {
    icon: MessageOutlined,
    text: '2',
  },
];
</script>

