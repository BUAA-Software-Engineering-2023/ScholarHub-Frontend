<template>
  <div>
    <a-typography>
      <a-typography-title :level="3" style="text-align: justify; text-justify: auto; color:darkblue">
        {{ paper.display_name }}
      </a-typography-title>

      <div class="authorGrid">
        <a-typography-title :level="5" class="authorGrid--item" v-for="(author, index) in paper.authorships">
          {{ author.author.display_name }}, &nbsp
        </a-typography-title>
      </div>

      <a-typography-paragraph style="text-align: justify; text-justify: auto;" :ellipsis="ellipsis" v-if="paper.abstract">
        {{ paper.abstract }}
      </a-typography-paragraph>
      <a-typography-paragraph style="text-align: justify; text-justify: auto; color: grey" :ellipsis="ellipsis" v-else>
        There is no abstract about this article.
      </a-typography-paragraph>
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
}

.authorGrid--item {
  display: inline-block;
  color: darkgreen;
}
</style>
