<template>
  <u-comment :config="config"  @submit="submit" @operate="operate" @like="like" ref="commentRef" upload relative-time>
    <!-- <template>用户信息导航栏卡槽</template> -->
    <!-- <template #info>用户信息卡槽</template> -->
    <!-- <template #card>用户信息卡片卡槽</template> -->
    <u-comment-nav v-model="latest" @sorted="sorted"></u-comment-nav>
    <template #operate="scope" v-if="useAccountStore().userInfo.is_admin">
      <Operate :comment="scope" @remove="remove" />
    </template>
  </u-comment>
</template>

<script setup lang="ts">
// 下载表情包资源emoji.zip https://readpage.lanzouy.com/b04duelxg 密码:undraw
// static文件放在public下,引入emoji.ts文件可以移动assets下引入,也可以自定义到指定位置
import emoji from '@/assets/emoji/emoji'
import { reactive, ref } from 'vue'
import Operate from "@/views/paper/operate.vue";
import {
  CommentApi,
  ConfigApi,
  SubmitParamApi,
  UToast,
  createObjectURL,
  dayjs,
  UComment,
  UCommentNav,
  UCommentScroll, CommentInstance
} from 'undraw-ui'
import CommentSAPI from "@/api/comments"
import {useRoute} from "vue-router";
import {useAccountStore} from "@/stores/account"
import {throttle} from "echarts";
const route = useRoute()
const paperId = ref("https://openalex.org/"+route.params.paperId)
const props = defineProps(['comments'])
const comments = props.comments
const user = ref(useAccountStore())
const config = reactive<ConfigApi>({
  user: {
    id: user.value.userInfo.id,
    username: user.value.userInfo.nickname,
    avatar: user.value.userInfo.avatar,
    // 评论id数组 建议:存储方式用户uid和评论id组成关系,根据用户uid来获取对应点赞评论id,然后加入到数组中返回
    likeIds: [1, 2, 3]
  },
  emoji: emoji,
  comments: [],
  total: 10
})
const commentRef = ref<CommentInstance>()
const  remove = async (comment: CommentApi) => {
  console.log(comment.id)
  const result = await CommentSAPI.delete_comments(comment.id)
  if (result.data.success){

  }
  setTimeout(() => {
      commentRef.value.remove(comment)
  }, 200)
}
const _throttle = throttle((type: string, comment: CommentApi, finish: Function) => {
  switch (type) {
    case '删除':
      alert(`删除成功: ${comment.id}`)
      finish()
      break
    case '举报':
      alert(`举报成功: ${comment.id}`)
      break
  }
})
const operate = (type: string, comment: CommentApi, finish: Function) => {
  _throttle(type, comment, finish)
}
//排序
const latest = ref(true)
const sorted = (latest: boolean) => {
  console.log(latest)
}

let temp_id = props.comments[props.comments.length-1]
// 提交评论事件
const submit = async ({ content, parentId, files, finish }: SubmitParamApi) => {
  console.log(props.comments)
  console.log('提交评论: ' + content, parentId, files)
  console.log(commentRef.value)
  /**
   * 上传文件后端返回图片访问地址，格式以'||'为分割; 如:  '/static/img/program.gif||/static/img/normal.webp'
   */
  let contentImg = files?.map(e => createObjectURL(e)).join('||')
  const result = await CommentSAPI.send_comments(paperId.value,content,parentId);
  temp_id += 1
  const comment: CommentApi={
    id: "1",
    parentId: parentId,
    uid: config.user.id,
    address: '来自北京',
    content: content,
    likes: 0,
    createTime: dayjs().subtract(5, 'seconds').toString(),
    contentImg: contentImg,
    user: {
      username: config.user.username,
      avatar: config.user.avatar,
      level: null,
      homeLink: `/${temp_id}`
    },
    reply: null
  }
  setTimeout(() => {
    finish(comment)
    UToast({ message: '评论成功!', type: 'success' })
  }, 200)
}
// 点赞按钮事件 将评论id返回后端判断是否点赞，然后在处理点赞状态
const like = (id: string, finish: () => void) => {
  console.log('点赞: ' + id)
  setTimeout(() => {
    finish()
  }, 200)
}

config.comments = props.comments

</script>
<style scoped>

</style>