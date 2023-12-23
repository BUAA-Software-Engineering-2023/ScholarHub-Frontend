<template>
    <a-list item-layout="vertical" size="small" :pagination="pagination" :data-source="props.related_works">
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
              <a :href="item.href" class="ellipsis-text">{{ item.title }}</a>
            </template>
          </a-list-item-meta>
          {{ item.content }}
        </a-list-item>
      </template>
    </a-list>
  </template>
<script setup>
  
  const props = defineProps(['related_works'])
  
  
  const pagination = {
    onChange: page => {
      console.log(page);
    },
    style:{height: '32px', lineHeight: '32px', textAlign: 'center !important',text:'9px !important'},
    pageSize: 8,
  };
  </script>
  <style scoped>
  .ellipsis-text {
    display: inline-block;
    width: 100%; /* 设置文本显示的宽度 */
    white-space: nowrap; /* 禁止换行 */
    overflow: hidden; /* 隐藏溢出部分 */
    text-overflow: ellipsis; /* 显示省略号 */
  }
  </style>
  