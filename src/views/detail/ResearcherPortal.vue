<template>
    <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
      <a-layout>
        <a-layout style="width: 80%" >
          <a-layout-header theme="light" :style="headerStyle">
            <div class="author-info">
              <div class="author-details">
                <img class="avatar" src="@/assets/imgs/default.jpg" alt="Author Avatar">
                <div class="author-detail" style="display: flex ">
                  <div style="margin-top: 10px;">
                    <div style="font-size: 25px;font-weight: 800">
                      {{authorName}}
                    </div>
                    <a style="font-size: 20px;margin-top: 10px;font-weight: 200" :href="hrefins">
                      {{last_known_institution}}
                    </a>
                  </div >

                 <div style="margin-left: 50px;cursor: pointer" href="#" id="button-claim" @click="showModal " >认领</div>

                  <a-modal v-model:open="open" title="认领门户" @ok="handleOk" >
                    <template #footer>
                      <div>
                      <a-button style="height: 38px;font-weight: bold" key="back" @click="handleCancel">取消</a-button>
                      <a-button style="height: 38px;font-weight: bold" key="submit" type="primary" :loading="loading"  @click="handleClaim">提交</a-button>
                      </div>

                    </template>
                   <div>
                     <a-form
                         :model="formState"
                         name="basic"
                         :label-col="{ span: 8 }"
                         :wrapper-col="{ span: 16 }"
                         autocomplete="off"
                         @finish="onFinish"
                         @finishFailed="onFinishFailed"
                     >
                       <div style="font-weight: bold;font-size: 15px;">

                       <a-form-item
                           label="原因"
                           name="reason"
                       >
                         <a-textarea v-model:value="formState.reason" />
                       </a-form-item>

                       <a-form-item
                           label="电话号码"
                           name="phone number"
                       >
                         <a-input v-model:value="formState.phone_number" />
                       </a-form-item>
                       </div>
                     </a-form>
                   </div>
                  </a-modal>



                </div>
              </div>
            </div>
          </a-layout-header>
          <a-layout-content :style="contentStyle" style="margin-left: 10%;min-width: 1200px">
            <div class="author-total">
              <a-row :gutter="16">
                <a-col :span="5">
                  <a-card hoverable :bordered="false">
                    <div class="card-content">
                      <Paper style="font-size: 50px" />
                      <div style="text-align: center;margin-left: 25%;">
                        <p>发文总量</p >
                        <h2 style="font-weight: bold;color: #53cda5">{{ works_count }}</h2>
                      </div>
                    </div>
                  </a-card>
                </a-col>
                <a-col :span="5">
                  <a-card hoverable :bordered="false">
                    <div class="card-content">
                      <Core style="font-size: 50px" />
                      <div style="text-align: center;margin-left: 25%;">
                        <p>H指数</p >
                        <h2 style="color: #747bff;font-weight: bold">{{ h_index }}</h2>
                      </div>
                    </div>
                  </a-card>
                </a-col>
                <a-col :span="5">
                  <a-card hoverable :bordered="false">
                    <div class="card-content">
                      <Quote style="font-size: 50px" />
                      <div style="text-align: center;margin-left: 25%;">
                        <p>总被引频次</p >
                        <h2 style="color: rgb(145,236,252);font-weight: bold">{{ cited_by_count }}</h2>
                      </div>
                    </div>
                  </a-card>
                </a-col>
                <a-col :span="5">
                  <a-card hoverable :bordered="false">
                    <div class="card-content">
                      <Data style="font-size: 50px"  value=""/>
                      <div style="text-align: center;margin-left: 25%;">
                        <p>篇均被引频次</p >
                        <h2 style="color: rgb(217,144,175);font-weight: bold">{{ Math.floor(cited_by_count / works_count)}}</h2>
                      </div>
                    </div>
                  </a-card>
                </a-col>
              </a-row>
            </div>
            <div class="outer-container">
              <a-row :gutter="16">
                <a-col :span="24">
                  <div class="research-container">
<!--                    <span class="title">研究成果</span>-->
                    <div class="research-item">
                      <div class="line"></div>
                      <div class="research-title">研究成果</div>
                      <div class="research-details">
                        <div class="research-authors">

                        </div>
                        <div class="research-stats">
                          <p>引用量: {{ cited_by_count }}&nbsp; | &nbsp; 论文数: {{works_count}}</p >
                        </div>
                      </div>

                      <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="works">
                        <template #footer>

                        </template>
                        <template #renderItem="{ item }">
                          <a-list-item :key="item.title">
                            <template #actions>
      <span v-for="{ icon, text } in item.actions" :key="text">
        <component :is="icon" style="margin-right: 8px" />
        {{ text }}
      </span>
                            </template>
                            <template #extra>
                            </template>
                            <a-list-item-meta>
                              <template #title>
                                <a :href="item.href">{{ item.title }}</a>
                              </template>
                              <template #description>
                                <router-link :to="item.descriptionUrl">{{ item.description }}</router-link>
                              </template>
                            </a-list-item-meta>
                            {{ item.content }}
                          </a-list-item>
                        </template>

                      </a-list>
                    </div>
                  </div>
                </a-col>
              </a-row>
            </div>
          </a-layout-content>
<!--          <a-layout-footer :style="footerStyle">Footer</a-layout-footer>-->
        </a-layout>
        <a-layout-sider :reverseArrow="true" theme="light" v-model="collapsed" @collapse="changeShowSide" collapsible :width="400" :style="siderStyle">
          <transition name="slide">
            <Trend v-if="pflag" :series="series" :years="years"  v-show="showSide"></Trend>
          </transition>
          <transition name="slide">
            <Relationship v-if="pflag" :cooperations="cooperations" :coauthors="coauthors" v-show="showSide"></Relationship>
          </transition>
        </a-layout-sider>
      </a-layout>

    </a-space>
    <a-float-button-group shape="circle" :style="{ left: '24px' }">

      <a-back-top :visibility-height="0" />
    </a-float-button-group>

</template>

<script  setup>
import Search from "@/api/search.js"
import { useRoute } from "vue-router";
import Core from "@/assets/icons/Core.vue";
import Paper from "@/assets/icons/Paper.vue";
import Quote from "@/assets/icons/Quote.vue";
import Data from "@/assets/icons/Data.vue";
import Trend from "@/components/visual/Trend.vue";
import Relationship from "@/components/visual/Relationship.vue";
import { AntDesignOutlined, LinkOutlined,  CalendarOutlined,} from '@ant-design/icons-vue';
import { ApplyForClaim } from '@/api/author.js';
import Swal from "sweetalert2";
import {ref} from "vue";
const route = useRoute()
const showSide = ref(true)
const authorName = ref('')
const last_known_institution =ref('')
const h_index = ref('')
const author = ref()
const collapsed = ref(false)
const avatar = ref()
const works_count = ref()
const cited_by_count = ref()
const works = ref([])
const authorlist = ref([])
const series = ref([])
const years = ref([])
const cooperations =ref([])
const coauthors = ref([]);
const pflag = ref(false)
const hrefins = ref()
const pagination = {
  onChange: page => {
    console.log(page);
  },
  style:{height: '32px', lineHeight: '32px', textAlign: 'center !important'},
  pageSize: 7,
};

const changeShowSide = (collapsed, type)=>{
  showSide.value = !showSide.value;
}
const loading = ref(false);
const open = ref(false);
const showModal = () => {
  open.value = true;
};
const handleOk = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    open.value = false;
  }, 2000);
};
const handleCancel = () => {
  open.value = false;
};



const onFinish = values => {
  console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

const formState = ref({
  author_id: route.params.authorId,
  reason: '',
  phone_number: '',
});

const handleClaim = async () => {
  try {
    const response = await ApplyForClaim(
        formState.value.author_id,
        formState.value.reason,
        formState.value.phone_number
    );
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      open.value = false;
      Swal.fire('成功申请', '', 'success')
    }, 1500);

    // 这里可以添加一些成功后的逻辑，比如弹出通知或清空表单
  } catch (error) {
    Swal.fire('认领失败', '', 'error')
    // 这里可以添加错误处理逻辑
  }
};


// const AuthorId = "https://openalex.org/A5067833651"
const AuthorId ="https://openalex.org/"+route.params.authorId
onBeforeMount(async () => {
  const result =  await Search.author_detail(AuthorId)
  if (result.data.success){
    const response = result.data.data
    console.log(response)
    author.value = result.data.data
    last_known_institution.value = author.value.last_known_institution?.display_name
    h_index.value = author.value.summary_stats?.h_index
    authorName.value = author.value.display_name
    works_count.value = author.value.works_count
    cited_by_count.value = author.value.cited_by_count
    avatar.value = author.value.avatar
    const listData = author.value.works
    let paperData = [];
    let numberCollaborate = [];
    let cited_by_counts = [];
    let yearArr = [];
    let cooperationArr = [];
    const urlins = author.value.last_known_institution?.id
    const parts = urlins.split('/');
    const insId = parts[parts.length - 1];
    hrefins.value = "/client/institution/"+ insId;
    for (let i = 0;i<(response.collaborators.length>=10?10:response.collaborators.length);i++){
      numberCollaborate.push(response.collaborators[i].cooperation_times);
      cooperationArr.push(response.collaborators[i].display_name)
    }
    for (let i = 0;i<response.counts_by_year.length;i++){
      paperData.push(response.counts_by_year[i].works_count);
      cited_by_counts.push(response.counts_by_year[i].cited_by_count);
      yearArr.push(response.counts_by_year[i].year)
    }
    console.log(cooperationArr);
    for (let i=yearArr.length-1;i>=0;i--){
      years.value.push(yearArr[i]);
    }
    for (let i = 0;i<cooperationArr.length;i++){
      coauthors.value.push(cooperationArr[i]);
    }

    console.log(paperData)
    series.value.push( {
      name: '发文量',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: paperData
    });
    console.log(series.value)
    series.value.push( {
      name: '引用频次',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: cited_by_counts
    });
    cooperations.value.push({
          name: '合作次数',
          type: 'bar',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'cooperations'
          },
          data: numberCollaborate
        });
    for (let i = 0; i < listData.length; i++) {
      const url = listData[i].id
      const parts = url.split('/');
      const paperId = parts[parts.length - 1]; // 获取最后一个部分
      const authorships = author.value.works[i].authorships;
      const paperActions = [
        { icon: LinkOutlined, text: listData[i].cited_by_count.toString() },
        { icon: CalendarOutlined, text: listData[i].publication_date.toString() },
      ];
      let string = '';
      let authorid ;
      for (let j = 0; j < authorships.length; j++){
        const authorname = authorships[j].author.display_name
        let url = authorships[j].author.id;
        let parts = url.split('/');
        authorid = parts[parts.length - 1];
        if (j!==authorships.length-1)
          string = string+authorname+',';
        else
          string +=authorname;
      }
      authorlist.value.push(string)
      if (listData[i].abstract){
        works.value.push({
          href: "/client/paper/"+ paperId,
          title: listData[i].display_name,
          avatar: listData[i].avatar,
          description: authorlist.value[i],
          descriptionUrl: "/client/author/" + authorid,
          content: listData[i].abstract.slice(0, 300) + "...",
          actions: paperActions
        });
      }
      else {
        works.value.push({
          href: "/client/paper/"+ paperId,
          title: listData[i].display_name,
          avatar: listData[i].avatar,
          description: authorlist.value[i],
          content: "No summary available",
          actions: paperActions
        });
      }

    }
    pflag.value = true;
  }else {
    let promise = Swal.fire({
      icon: 'error',
      title:'该作者不存在'
    })
    pflag.value = true;
  }
})
const headerStyle = {
  marginLeft: '12%',
  marginTop: '20px',
  textAlign: 'center',
  color: '000',
  height: 'auto',
  width: '72%',
  backgroundColor: '#fff',
  borderRadius: '10px',
  minWidth: '970px',
  boxShadow:  '0 0 5px 0 hsla(0,0%,68.2%,.3)'
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 134px)',
  color: '#000',
};
const siderStyle = {
  textAlign: 'center',
  color: '#fff',
  marginTop: '20px',
  marginRight: '100px',
  borderRadius: '10px'
};




</script>

<style scoped>
*{
  line-height: 30px;
}
body{
  background-color:#041527;
}
.container {
  margin-top: 10px;
}


.research-list li {
  background-color: #fff;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
}
.author-info{
  display: flex;
  text-align: left;
}
.author-details{
  display: flex;
}
.author-total{
  padding: 20px;
}
img{
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
.card-content {

  display: flex;
  align-items: center;
}
.card-content div {
  margin-left: 20px;
}
.author-info {
  background-color: white;
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-grow: 1;
}

.author-info img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 10px;
}

.author-info .author-details {
  align-items: center;
  flex-grow: 1;
}

.author-info .h-index {
  text-align: right;
}

.research-item {
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.research-title {
  font-size: 24px;
  margin-left: 15px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.research-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.research-authors {
  font-size: 16px;
  color: #555;
}



.research-stats {
  font-size: 14px;
  color: #777;
}


.research-container{
  text-align: left;
}
.outer-container{
  width: 81%;
  border-radius: 5px;
  margin-left: 20px;
  padding: 10px;
  background-color: white;
  font-family: sans-serif;
  box-shadow:  0 0 5px 0 hsla(0,0%,68.2%,.3)
}
.title{
  font-weight: 900;
}
.slide-enter-from,
.slide-leave-to{
  opacity: 0;
  transform: translateY(40px);
}
.slide-enter-active{
  transition: all .5s;
}


#button-claim {
  position: relative;
  width: 70px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  margin: 30px;
  text-decoration: none;
  color: #5a6fc0;
  font-size: 15px;
  padding: 0 20px;
  text-transform: uppercase;
  transition: 0.5s;
  overflow: hidden;

}
#button-claim::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-top: 2px solid #5a6fc0;
  border-left: 2px solid #5a6fc0;
  transition: 0.5s;
  transition-delay: 0.5s;
}
#button-claim::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
  border-bottom: 2px solid #5a6fc0;
  border-right: 2px solid #5a6fc0;
  transition: 0.5s;
  transition-delay: 0.5s;
}
#button-claim:hover::before, #button-claim:hover::after {
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}
#button-claim:hover {
  background-color: #5a6fc0;
  color: white;
  box-shadow: 0 0 50px #5a6fc0;
  transition-delay: 0.3s;
}
#button-claim:nth-child(1) {
  filter: hue-rotate(150deg);
}
#button-claim:nth-child(3) {
  filter: hue-rotate(270deg);
}
#button-claim:nth-child(4) {
  filter: hue-rotate(400deg);
}
#button-claim:nth-child(5) {
  filter: hue-rotate(70deg);
}


.line{
  background:black;/*背景色为浅灰色*/
  width:5px;/*设置宽高*/
  margin-top: 3px;
  height:25px;
  left:150px;
  border-radius: 2px;
  float:left;/*让此div与前面的并排显示*/
}
</style>