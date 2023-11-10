<template>
  <div class="statistics">
    <div class="statistic">
      <div class="icon">
        <i class="el-icon-data-line"></i>
      </div>
      <div class="count-container">
        <WorkCount></WorkCount>
        <div class="info">
          <div class="title">论文成果</div>
          <div class="count">{{ work_count }}</div>
        </div>
      </div>
      <div class="count-container">
        <AuthorCount></AuthorCount>
        <div class="info">
          <div class="title">科研人员</div>
          <div class="count">{{ author_count}}</div>
        </div>
      </div>
      <div class="count-container">
        <InstitutionCount></InstitutionCount>
        <div class="info">
          <div class="title">收录机构</div>
          <div class="count">{{ institution_count }}</div>
        </div>
      </div>
      <div class="count-container">
        <ConceptCount></ConceptCount>
        <div class="info">
          <div class="title">涉及领域</div>
          <div class="count">{{ concept_count }}</div>
        </div>
      </div>
      <div class="count-container">
        <FunderCount></FunderCount>
        <div class="info">
          <div class="title">基金机构</div>
          <div class="count">{{ funder_count }}</div>
        </div>
      </div>
      <div class="count-container">
        <SourceCount></SourceCount>
        <div class="info">
          <div class="title">来源</div>
          <div class="count">{{ source_count }}</div>
        </div>
      </div>
<!--      <div class="title">机构数量</div>-->
<!--      <div class="count">{{ institution_count }}</div>-->
<!--      <div class="title">领域数量</div>-->
<!--      <div class="count">{{ concept_count }}</div>-->
<!--      <div class="title">收录的出版机构数量</div>-->
<!--      <div class="count">{{ publisher_count }}</div>-->
<!--      <div class="title">来源数量</div>-->
<!--      <div class="count">{{ source_count }}</div>-->
    </div>
    <!-- 其他统计数据以同样的格式添加 -->
  </div>
</template>

<script setup>
import HomeAPI from "@/api/home.js"
import WorkCount from "@/assets/icons/WorkCount.vue";
import AuthorCount from "@/assets/icons/AuthorCount.vue";
import InstitutionCount from "@/assets/icons/InstitutionCount.vue";
import ConceptCount from "@/assets/icons/ConceptCount.vue";
import FunderCount from "@/assets/icons/FunderCount.vue";
import SourceCount from "@/assets/icons/SourceCount.vue";
import Message from "@/assets/icons/Message.vue";
const work_count = ref(0); // 这里替换为实际的数据
const author_count = ref(0); // 替换为实际的数据
const source_count = ref(0); // 替换为实际的数据
const institution_count = ref(0); // 替换为实际的数据
const concept_count = ref(0); // 替换为实际的数据
const publisher_count = ref(0); // 替换为实际的数据
const funder_count = ref(0); // 替换为实际的数据
onMounted(() => {
  const result = HomeAPI.get_data();
  result.then(data => {
    // 在异步操作成功时处理数据
    const tmp = data.data.data;
    console.log(data.data.data);
    work_count.value = tmp.work_count;
    author_count.value = tmp.author_count;
    source_count.value = tmp.source_count;
    institution_count.value = tmp.institution_count;
    concept_count.value = tmp.concept_count;
    publisher_count.value = tmp.publisher_count;
    funder_count.value = tmp.funder_count;

  }).catch(error => {
    // 在异步操作失败时处理错误
    console.error(error);
  });
});
</script>

<style scoped>
*{
  text-align: left;
}
.statistics {
  margin-top: 8%;
}

.statistic {
  margin-bottom: 10px;
  margin-left:75vw;
}
.count-container {
  margin-top: 10px;
  display: flex !important;
  align-items: flex-start /* 添加这行以左对齐 */ !important;
}

.info {
  margin-left: 10px; /* 可根据需要调整间距 */
}
.title {
  color: #a0a5a8;
  font-weight: bold;
}

.count {
  font-size: 24px;
  color: white;
}
</style>
