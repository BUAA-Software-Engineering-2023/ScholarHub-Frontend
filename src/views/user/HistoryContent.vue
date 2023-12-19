<template>
  <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="props.reference_works">
    <template #renderItem="{ item }">
      <a-list-item key="item.title">
        <!--        <template #actions>-->
        <!--          <span v-for="{ icon, text } in actions" :key="icon">-->
        <!--            <component :is="icon" style="margin-right: 8px" />-->
        <!--            {{ text }}-->
        <!--          </span>-->
        <!--        </template>-->
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
const props = defineProps(['reference_works'])


const pagination = {
  onChange: page => {
    console.log(page);
  },
  style:{height: '32px', lineHeight: '32px', textAlign: 'center !important'},
  pageSize: 5,
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

