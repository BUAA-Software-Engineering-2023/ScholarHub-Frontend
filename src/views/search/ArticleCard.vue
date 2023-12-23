<template>
  <div>
    <a-typography>
      <h3 v-html="paper.display_name" class="title-style" style="margin-bottom: 0px;text-align: justify; text-justify: auto; color:darkblue">
      </h3>

      <div class="authorGrid">
        <h5 class="authorGrid--item" v-for="(author, index) in paper.authorships" :key="author.author.display_name">
          {{ author.author.display_name }},&nbsp;
        </h5>
      </div>

      <a-typography-paragraph style="text-align: justify; text-justify: auto;" :ellipsis="ellipsis" v-if="paper.abstract">
        {{ paper.abstract }}
      </a-typography-paragraph>
      <a-typography-paragraph style="text-align: justify; text-justify: auto; color: grey" :ellipsis="ellipsis" v-else>
        There is no abstract about this article.
      </a-typography-paragraph>

      <div class="cite-style">
        <span>引用&nbsp;&nbsp;</span>
        <span style="color:green">{{paper.cited_by_count}} </span>
      </div>


    </a-typography>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps(['paper']);
const emits = defineEmits();
const ellipsis = { rows: 5 };

// 在这种情况下，不需要使用 onMounted 或 onUpdated。
// 响应式系统将在 prop 更改时自动更新组件。

</script>

<style scoped>
.authorGrid {
  text-align: justify;
  text-justify: auto;
  margin-top: 0;
}

.authorGrid--item {
  display: inline-block;
  color: darkgreen;
  margin-top: 2px;
  margin-bottom: 8px;
}

.cite-style{
  text-align: left;
  text-justify: auto;
  font-size: 12px;
}

.title-style::before {
  content: ''; /* 空内容 */
  display: inline-block; /* 使伪元素像块元素一样行为 */
  width: 25px; /* 调整为你希望的宽度 */
  height: 25px; /* 调整为你希望的高度 */
  background-image: url('@/assets/icons/pdf.png'); /* 图片路径 */
  background-size: cover; /* 或者可以设置为 contain，根据需要 */
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 5px; /* 调整与标题文本的间距 */
  vertical-align: middle; /* 根据需要调整垂直对齐 */
}


</style>
