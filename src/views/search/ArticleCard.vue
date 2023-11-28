<template>
  <div>
    <a-typography>
      <a-typography-title :level="3" style="text-align: justify; text-justify: auto;">
        {{item.display_name}}
      </a-typography-title>

      <div class="authorGrid">
        <a-typography-title :level="5" class="authorGrid--item" v-for="(author, index) in item.authorships">
          {{author.author.display_name}}, &nbsp
        </a-typography-title>
      </div>

      <a-typography-paragraph style="text-align: justify; text-justify: auto;" :ellipsis="ellipsis">
        {{item.abstract}}
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

function show(){
  console.log(item.value.id);
}

</script>
<!--&lt;!&ndash;<script setup>&ndash;&gt;-->
<!--&lt;!&ndash;import { ref } from 'vue';&ndash;&gt;-->
<!--&lt;!&ndash;import { useRouter } from 'vue-router';&ndash;&gt;-->
<!--&lt;!&ndash;import { useClipboard } from '@vueuse/core';&ndash;&gt;-->
<!--&lt;!&ndash;import { highlightText, toThousands } from '../../utils/index.js';&ndash;&gt;-->
<!--&lt;!&ndash;import { Collection } from '../../api/collect';&ndash;&gt;-->

<!--&lt;!&ndash;const router = useRouter();&ndash;&gt;-->
<!--&lt;!&ndash;const props = defineProps({&ndash;&gt;-->
<!--&lt;!&ndash;  item: {&ndash;&gt;-->
<!--&lt;!&ndash;    type: Object,&ndash;&gt;-->
<!--&lt;!&ndash;    required: true&ndash;&gt;-->
<!--&lt;!&ndash;  },&ndash;&gt;-->
<!--&lt;!&ndash;  notInCollection: {&ndash;&gt;-->
<!--&lt;!&ndash;    type: Boolean,&ndash;&gt;-->
<!--&lt;!&ndash;    default: true,&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;});&ndash;&gt;-->

<!--&lt;!&ndash;// #region 卡片内部交互函数&ndash;&gt;-->

<!--&lt;!&ndash;/**&ndash;&gt;-->
<!--&lt;!&ndash; * 跳转到论文详情页&ndash;&gt;-->
<!--&lt;!&ndash; * item.id用于跳转到论文详情页-&#45;&#45;W2171852244 √&ndash;&gt;-->
<!--&lt;!&ndash; * @param {String} openAlexPaperId 论文的openAlexId&ndash;&gt;-->
<!--&lt;!&ndash; */&ndash;&gt;-->
<!--&lt;!&ndash;const jumpToPaperPage = (openAlexPaperId) => {&ndash;&gt;-->
<!--&lt;!&ndash;  console.log(openAlexPaperId);&ndash;&gt;-->
<!--&lt;!&ndash;  // router.push({&ndash;&gt;-->
<!--&lt;!&ndash;  //   name: "PaperDetail",&ndash;&gt;-->
<!--&lt;!&ndash;  //   params: {paperid: openAlexPaperId}&ndash;&gt;-->
<!--&lt;!&ndash;  // });&ndash;&gt;-->
<!--&lt;!&ndash;  if (openAlexPaperId) {&ndash;&gt;-->
<!--&lt;!&ndash;    const newPage = router.resolve({&ndash;&gt;-->
<!--&lt;!&ndash;      name: "PaperDetail",&ndash;&gt;-->
<!--&lt;!&ndash;      params: {paperid: openAlexPaperId},&ndash;&gt;-->
<!--&lt;!&ndash;    });&ndash;&gt;-->
<!--&lt;!&ndash;    window.open(newPage.href, '_blank');&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->

<!--&lt;!&ndash;/**&ndash;&gt;-->
<!--&lt;!&ndash; * 跳转到作者详情页&ndash;&gt;-->
<!--&lt;!&ndash; * 每一个item.authorships[i].author.id用于跳转到作者详情页-&#45;&#45;A2164292938 √&ndash;&gt;-->
<!--&lt;!&ndash; * @param {String} openAlexAuthorId 作者的openAlexId&ndash;&gt;-->
<!--&lt;!&ndash; */&ndash;&gt;-->
<!--&lt;!&ndash;const jumpToAuthorPage = (openAlexAuthorId) => {&ndash;&gt;-->
<!--&lt;!&ndash;  console.log(openAlexAuthorId);&ndash;&gt;-->
<!--&lt;!&ndash;  if (openAlexAuthorId) {&ndash;&gt;-->
<!--&lt;!&ndash;    const newPage = router.resolve({&ndash;&gt;-->
<!--&lt;!&ndash;      name: 'OpenAlexAuthorDetail',&ndash;&gt;-->
<!--&lt;!&ndash;      params: {tokenid: openAlexAuthorId},&ndash;&gt;-->
<!--&lt;!&ndash;    });&ndash;&gt;-->
<!--&lt;!&ndash;    window.open(newPage.href, '_blank');&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->

<!--&lt;!&ndash;/**&ndash;&gt;-->
<!--&lt;!&ndash; * 跳转到期刊详情页&ndash;&gt;-->
<!--&lt;!&ndash; * item.host_venue.id用于跳转到期刊&#45;&#45; V1983995261 √&ndash;&gt;-->
<!--&lt;!&ndash; * （这个可能host_venue整个为空，也可能只有这个字段为空）&ndash;&gt;-->
<!--&lt;!&ndash; * @param {String} openAlexVenueId 作为论文来源的期刊/会议的openAlexId&ndash;&gt;-->
<!--&lt;!&ndash; */&ndash;&gt;-->
<!--&lt;!&ndash;const jumpToVenuePage = (openAlexVenueId) => {&ndash;&gt;-->
<!--&lt;!&ndash;  console.log(openAlexVenueId);&ndash;&gt;-->
<!--&lt;!&ndash;  if (openAlexVenueId) {&ndash;&gt;-->
<!--&lt;!&ndash;    const newPage = router.resolve({&ndash;&gt;-->
<!--&lt;!&ndash;      name: 'JournalDetail',&ndash;&gt;-->
<!--&lt;!&ndash;      params: {journalid: openAlexVenueId},&ndash;&gt;-->
<!--&lt;!&ndash;    });&ndash;&gt;-->
<!--&lt;!&ndash;    window.open(newPage.href, '_blank');&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->

<!--&lt;!&ndash;/**&ndash;&gt;-->
<!--&lt;!&ndash; * 跳转到领域详情页&ndash;&gt;-->
<!--&lt;!&ndash; * 每一个item.concept[i].id用于跳转到领域详情页&#45;&#45; C2778805511 √&ndash;&gt;-->
<!--&lt;!&ndash; * @param {String} openAlexConceptId 论文领域的openAlexId&ndash;&gt;-->
<!--&lt;!&ndash; */&ndash;&gt;-->
<!--&lt;!&ndash;const jumpToConceptPage = (openAlexConceptId) => {&ndash;&gt;-->
<!--&lt;!&ndash;  console.log(openAlexConceptId);&ndash;&gt;-->
<!--&lt;!&ndash;  if (openAlexConceptId) {&ndash;&gt;-->
<!--&lt;!&ndash;    const newPage = router.resolve({&ndash;&gt;-->
<!--&lt;!&ndash;      name: 'ConceptDetail',&ndash;&gt;-->
<!--&lt;!&ndash;      params: {tokenid: openAlexConceptId},&ndash;&gt;-->
<!--&lt;!&ndash;    });&ndash;&gt;-->
<!--&lt;!&ndash;    window.open(newPage.href, '_blank');&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->

<!--&lt;!&ndash;/**&ndash;&gt;-->
<!--&lt;!&ndash; * 跳转到PDF在线预览网页&ndash;&gt;-->
<!--&lt;!&ndash; * @param {String[URL]} pdfURL PDF在线预览网页&ndash;&gt;-->
<!--&lt;!&ndash; */&ndash;&gt;-->
<!--&lt;!&ndash;const jumpToPDFOnlinePage = (pdfURL) => {&ndash;&gt;-->
<!--&lt;!&ndash;  // console.log(pdfURL);&ndash;&gt;-->
<!--&lt;!&ndash;  window.open(pdfURL, '_blank');&ndash;&gt;-->
<!--&lt;!&ndash;  // window.location.href = pdfURL;&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->

<!--&lt;!&ndash;/**&ndash;&gt;-->
<!--&lt;!&ndash; * 跳转到论文源网址&ndash;&gt;-->
<!--&lt;!&ndash; * @param {String[URL]} webURL 论文源网址&ndash;&gt;-->
<!--&lt;!&ndash; */&ndash;&gt;-->
<!--&lt;!&ndash;const jumpToWorkSourceWeb = (webURL) => {&ndash;&gt;-->
<!--&lt;!&ndash;  // console.log(webURL);&ndash;&gt;-->
<!--&lt;!&ndash;  window.open(webURL, '_blank');&ndash;&gt;-->
<!--&lt;!&ndash;  // window.location.href = webURL;&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->

<!--&lt;!&ndash;// #endregion 卡片内部交互函数&ndash;&gt;-->

<!--&lt;!&ndash;// bibtex&ndash;&gt;-->
<!--&lt;!&ndash;const bibtex = ref("");&ndash;&gt;-->
<!--&lt;!&ndash;const { copy, copied } = useClipboard({ bibtex })&ndash;&gt;-->
<!--&lt;!&ndash;const bibtexDialogVisible = ref(false);&ndash;&gt;-->
<!--&lt;!&ndash;const getBiBTeX = (paperInfo) => {&ndash;&gt;-->
<!--&lt;!&ndash;  // 需要的字段有&ndash;&gt;-->
<!--&lt;!&ndash;  // 文章的标题 work.display_name&ndash;&gt;-->
<!--&lt;!&ndash;  // 文章的作者 work.authorships 对其中每条 authorship.author.display_name&ndash;&gt;-->
<!--&lt;!&ndash;  // 文章的journal host_venue.display_name&ndash;&gt;-->
<!--&lt;!&ndash;  // 文章的出版年份 work.publication_year&ndash;&gt;-->
<!--&lt;!&ndash;  const { display_name, authorships, publication_year, host_venue } = paperInfo;&ndash;&gt;-->
<!--&lt;!&ndash;  const author = authorships.map((authorship) => {&ndash;&gt;-->
<!--&lt;!&ndash;    return authorship.author.display_name;&ndash;&gt;-->
<!--&lt;!&ndash;  });&ndash;&gt;-->
<!--&lt;!&ndash;  const journal = host_venue.display_name;&ndash;&gt;-->
<!--&lt;!&ndash;  bibtex.value = `@article{${display_name},&ndash;&gt;-->
<!--&lt;!&ndash;    author = {${author}},&ndash;&gt;-->
<!--&lt;!&ndash;    title = {${display_name}},&ndash;&gt;-->
<!--&lt;!&ndash;    journal = {${journal}},&ndash;&gt;-->
<!--&lt;!&ndash;    year = {${publication_year}},&ndash;&gt;-->
<!--&lt;!&ndash;  }`;&ndash;&gt;-->
<!--&lt;!&ndash;  console.log(bibtex.value);&ndash;&gt;-->
<!--&lt;!&ndash;  return bibtex.value;&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->

<!--&lt;!&ndash;// 收藏&ndash;&gt;-->
<!--&lt;!&ndash;const favDialogVisible = ref(false)&ndash;&gt;-->
<!--&lt;!&ndash;const favLoading = ref(true)&ndash;&gt;-->
<!--&lt;!&ndash;const collections = ref([])&ndash;&gt;-->
<!--&lt;!&ndash;const amInCol = ref([])&ndash;&gt;-->
<!--&lt;!&ndash;var changedCollection = []&ndash;&gt;-->
<!--&lt;!&ndash;async function showFav(){&ndash;&gt;-->
<!--&lt;!&ndash;  changedCollection = []&ndash;&gt;-->
<!--&lt;!&ndash;  collections.value = []&ndash;&gt;-->
<!--&lt;!&ndash;  amInCol.value = []&ndash;&gt;-->
<!--&lt;!&ndash;  favLoading.value = true&ndash;&gt;-->
<!--&lt;!&ndash;  favDialogVisible.value = true&ndash;&gt;-->
<!--&lt;!&ndash;  const t1 = (await Collection.GetCollectionListByPaper({"work_id":props.item.id.substring(21)})).data.package_list&ndash;&gt;-->
<!--&lt;!&ndash;  amInCol.value = t1?t1:[]&ndash;&gt;-->
<!--&lt;!&ndash;  const t2 = (await Collection.GetCollection()).data.package_list&ndash;&gt;-->
<!--&lt;!&ndash;  collections.value = t2?t2:[]&ndash;&gt;-->
<!--&lt;!&ndash;  favLoading.value = false&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->
<!--&lt;!&ndash;const favChanged = (which) => {&ndash;&gt;-->
<!--&lt;!&ndash;  var i = -1&ndash;&gt;-->
<!--&lt;!&ndash;  if(i = changedCollection.find((col,idx,arr)=>{return col.id == which.id})) {&ndash;&gt;-->
<!--&lt;!&ndash;    changedCollection.splice(i,1);&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  else {&ndash;&gt;-->
<!--&lt;!&ndash;    changedCollection.push(which);&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->
<!--&lt;!&ndash;const likeIt = () => {&ndash;&gt;-->
<!--&lt;!&ndash;  for(const cc of changedCollection) {&ndash;&gt;-->
<!--&lt;!&ndash;    console.log(amInCol.value,cc)&ndash;&gt;-->
<!--&lt;!&ndash;    if(amInCol.value.find((col,idx,arr)=>{return col.package_id == cc.id})) {&ndash;&gt;-->
<!--&lt;!&ndash;      Collection.CancelDocument({&ndash;&gt;-->
<!--&lt;!&ndash;        work_id_list:[props.item.id.substring(21)],&ndash;&gt;-->
<!--&lt;!&ndash;        package_id: cc.id&ndash;&gt;-->
<!--&lt;!&ndash;      })&ndash;&gt;-->
<!--&lt;!&ndash;          .then((res)=>{&ndash;&gt;-->
<!--&lt;!&ndash;            ElNotification({&ndash;&gt;-->
<!--&lt;!&ndash;              title: "取消收藏成功",&ndash;&gt;-->
<!--&lt;!&ndash;              message: "成功将"+props.item.display_name+"移出收藏夹",&ndash;&gt;-->
<!--&lt;!&ndash;              type: "success",&ndash;&gt;-->
<!--&lt;!&ndash;              duration: 1000&ndash;&gt;-->
<!--&lt;!&ndash;            });&ndash;&gt;-->
<!--&lt;!&ndash;            favLoading.value = true;&ndash;&gt;-->
<!--&lt;!&ndash;          })&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->
<!--&lt;!&ndash;    else {&ndash;&gt;-->
<!--&lt;!&ndash;      Collection.AddDocument({&ndash;&gt;-->
<!--&lt;!&ndash;        work_id:props.item.id.substring(21),&ndash;&gt;-->
<!--&lt;!&ndash;        package_id: cc.id&ndash;&gt;-->
<!--&lt;!&ndash;      })&ndash;&gt;-->
<!--&lt;!&ndash;          .then((res)=>{&ndash;&gt;-->
<!--&lt;!&ndash;            ElNotification({&ndash;&gt;-->
<!--&lt;!&ndash;              title: "收藏成功",&ndash;&gt;-->
<!--&lt;!&ndash;              message: "成功将"+props.item.display_name+"加入收藏夹",&ndash;&gt;-->
<!--&lt;!&ndash;              type: "success",&ndash;&gt;-->
<!--&lt;!&ndash;              duration: 1000&ndash;&gt;-->
<!--&lt;!&ndash;            })&ndash;&gt;-->
<!--&lt;!&ndash;            favLoading.value = true;&ndash;&gt;-->
<!--&lt;!&ndash;          });&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->
<!--&lt;!&ndash;</script>&ndash;&gt;-->

<style scoped>
.authorGrid{
  text-align: justify;
  text-justify: auto;
}
.authorGrid--item{
  display: inline-block
}

</style>