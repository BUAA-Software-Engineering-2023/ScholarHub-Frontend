<template>
  <div>
    <a-typography>
      <a-typography-title :level="3" style="text-align: justify; text-justify: auto; color:darkblue">
        {{item.display_name}}
      </a-typography-title>

      <div class="authorGrid">
        <a-typography-title :level="5" class="authorGrid--item" v-for="(author, index) in item.authorships">
          {{author.author.display_name}}, &nbsp
        </a-typography-title>
      </div>

      <a-typography-paragraph style="text-align: justify; text-justify: auto;" :ellipsis="ellipsis" v-if="item.abstract">
        {{item.abstract}}
      </a-typography-paragraph>
      <a-typography-paragraph style="text-align: justify; text-justify: auto; color: grey" :ellipsis="ellipsis" v-else>
        There is no abstract about this article.
      </a-typography-paragraph>

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

onMounted(()=>{

})
onUpdated(()=>{

})

</script>

<style scoped>
.authorGrid{
  text-align: justify;
  text-justify: auto;
}
.authorGrid--item{
  display: inline-block;
  color:darkgreen;
}

</style>