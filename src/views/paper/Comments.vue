<template>
  <u-comment-scroll>
  <u-comment :config="config" @submit="submit" @like="like" upload relative-time>
    <!-- <template>用户信息导航栏卡槽</template> -->
    <!-- <template #info>用户信息卡槽</template> -->
    <!-- <template #card>用户信息卡片卡槽</template> -->
    <u-comment-nav v-model="latest" @sorted="sorted"></u-comment-nav>
  </u-comment>
  </u-comment-scroll>
</template>

<script setup lang="ts">
// 下载表情包资源emoji.zip https://readpage.lanzouy.com/b04duelxg 密码:undraw
// static文件放在public下,引入emoji.ts文件可以移动assets下引入,也可以自定义到指定位置
import emoji from '@/assets/emoji/emoji'
import { reactive, ref } from 'vue'
import {
  CommentApi,
  ConfigApi,
  SubmitParamApi,
  UToast,
  createObjectURL,
  dayjs,
  UComment,
  UCommentNav,
  UCommentScroll
} from 'undraw-ui'
import CommentSAPI from "@/api/comments"
import {useRoute} from "vue-router";
import {useAccountStore} from "@/stores/account"
const route = useRoute()
const paperId = ref("https://openalex.org/"+route.params.paperId)
const props = defineProps(['comments'])
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
  comments: props.comments,
  total: 10
})

//排序
const latest = ref(true)
const sorted = (latest: boolean) => {
  console.log(latest)
}

let temp_id = 100
// 提交评论事件
const submit = async ({ content, parentId, files, finish }: SubmitParamApi) => {
  console.log(config.user.username)
  console.log('提交评论: ' + content, parentId, files)
  /**
   * 上传文件后端返回图片访问地址，格式以'||'为分割; 如:  '/static/img/program.gif||/static/img/normal.webp'
   */
  let contentImg = files?.map(e => createObjectURL(e)).join('||')

  temp_id += 1
  const comment: {
    uid: string | number;
    address: string;
    createTime: string;
    id: string;
    reply: null;
    user: { homeLink: string; avatar: string; username: string };
    parentId: undefined;
    content: undefined;
    contentImg: any;
    likes: number
  } = {
    id: String(temp_id),
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
      homeLink: `/${temp_id}`
    },
    reply: null
  }

  const result = await CommentSAPI.send_comments(paperId.value,content,parentId);
  console.log(result)
  setTimeout(() => {
    finish(comment)
    UToast({ message: '评论成功!', type: 'info' })
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