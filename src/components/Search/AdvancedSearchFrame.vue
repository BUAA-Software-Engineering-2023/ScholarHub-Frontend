<template>
  <div ref="searchContainerTarget" class="search-container">
    <a-space class="search-type">
      <a-select
          ref="select"
          v-model:value="value1"
          :bordered=false
          style="width: 100px;"
          :options="options1"
          @focus="focus"
          @change="handleChange"
      >
      </a-select>
    </a-space>
    <div class="search-divider"></div>
    <input  @keyup.enter="search" v-model="searchValue" @focus="onFocusHandler" class="search-input" type="text" placeholder="搜索一下...">
    <button class="show-adv" @click="showAdv">
      高级搜索
      <DownOutlined v-show="!AdvSearch"/> <UpOutlined v-show="AdvSearch" />
    </button>
    <button class="delete-btn" @click="clearSearchValue"><keep-alive> <el-icon v-show="searchValue"><Close /></el-icon></keep-alive></button>
    <button class="search-btn" @click="search" v-show="!AdvSearch">
      <el-icon class="search-icon"><Search /></el-icon>
    </button>
  </div>
  <div v-show="AdvSearch" class="adv-search-container">
    <a-form
        ref="formRef"
        name="dynamic_form_item"
        :model="dynamicValidateForm"
        v-bind="formItemLayoutWithOutLabel"
    >
      <a-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
          :key="domain.key"
          v-bind="formItemLayout"
          :name="['domains', index, 'value']"
          :rules="{
        required: true,
        message: '该表不能为空',
        trigger: 'change',
      }" style="width: 100%"
      >
        <div class="adv-search-item">
          <a-space class="adv-search-class">
            <a-select
                ref="select"
                v-model:value="advSearchClass[index]"
                :bordered=false
                style="width: 80px;"
                :options="SearchClassOptions"
                @focus="focus"
                @change="handleChange"
            >
            </a-select>
          </a-space>
          <a-space class="adv-search-type">
            <a-select
                ref="select"
                v-model:value="advSearchType[index]"
                :bordered=false
                style="width: 80px;"
                :options="SearchTypeOptions"
                @focus="focus"
                @change="handleChange"
            >
            </a-select>
          </a-space>
          <a-input
              v-model:value="domain.value"
              placeholder="please input domain"
              style="margin-left: 20px; width: 100%;"
          />
          <MinusCircleOutlined
              v-if="dynamicValidateForm.domains.length > 1"
              class="dynamic-delete-button"
              @click="removeDomain(domain)"
              style="margin-left: 10px"
          />
        </div>
      </a-form-item>
      <a-form-item v-bind="formItemLayoutWithOutLabel">
        <div class="bottom">
          <div class="left">
            <a-button type="primary" ghost style="width: 100%" @click="addDomain">
              <PlusOutlined />
              添加检索条件
            </a-button>
          </div>
          <div class="right">
            <a-button type="primary" html-type="submit" @click="submitForm">检索</a-button>
            <a-button style="margin-left: 10px" @click="resetForm">重置条件</a-button>
          </div>
        </div>
      </a-form-item>
    </a-form>
  </div>
  <transition name="slide">
    <div
        v-if="$slots.dropdown"
        v-show="isFocused"
        class="search-dropdown search-scrollbar"
    >
      <!-- scrollbar- 开头的是滚动条样式，要装插件 tailwind-scrollbar 详见tailwind.config.cjs -->
      <slot name="dropdown"/>
    </div>
  </transition>
</template>

<script setup>
import {Close, Search} from "@element-plus/icons-vue";
import { useVModel, onClickOutside } from '@vueuse/core';
import { reactive, ref } from 'vue';
const formRef = ref();
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const dynamicValidateForm = reactive({
  domains: [],
});

const submitForm = () => {
  formRef.value
      .validate()
      .then(() => {
        emits('getAdv', dynamicValidateForm.domains);
        console.log('values', dynamicValidateForm.domains);
      })
      .catch(error => {
        console.log('error', error);
      });
};
const resetForm = () => {
  formRef.value.resetFields();
};
const removeDomain = item => {
  const index = dynamicValidateForm.domains.indexOf(item);
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1);
  }
};
const addDomain = () => {
  dynamicValidateForm.domains.push({
    value: '',
    key: Date.now(),
    type:advSearchType.value,
    operator:advSearchClass.value,
  });
};
const advSearchClass = ref(["并且"])
const SearchClassOptions = ref([
    {
      value: "并且",
      label: "并且"
    },{
      value: "或者",
      label: "或者",
  }])
const advSearchType = ref(["作者"])
const SearchTypeOptions = ref([
  {
    value: "作者",
    label: "作者",
  },
  {
    value: "机构",
    label: "机构",
  },
  {
    value: "领域",
    label: "领域",
  }
])
const value1 = ref("论文")
const options1 = ref([
  {
    value: '论文',
    label: '论文',
  },
  {
    value: '科研人员',
    label: '科研人员',
  },
  {
    value: '来源',
    label: '来源',
  },
  {
    value: '机构',
    label: '机构',
  },
  {
    value: '领域',
    label: '领域',
  },
  {
    value: '出版社',
    label: '出版社',
  },
  {
    value: '基金',
    label: '基金',
  },
]);
const isFocused = ref(false);
const searchContainerTarget = ref(null);
const AdvSearch = ref(false)
const CLEAR = 'clear';
const FOCUS = 'focus'
const SEARCH = 'search';
const INPUT = 'input';
const EMIT_UPDATE_MODEL_VALUE = 'update:modelValue';
// emits与props进行父子组件通信，保持searchValue一致
const emits = defineEmits([SEARCH, CLEAR, FOCUS, INPUT,EMIT_UPDATE_MODEL_VALUE, 'getAdv']);
const props = defineProps(
    {modelValue:{type:String,required:true}}
)
const showAdv = () =>{
  AdvSearch.value = !AdvSearch.value;

}
const searchValue = useVModel(props);
onClickOutside(searchContainerTarget, () => {
  isFocused.value = false;
});
const onFocusHandler = () => {
  isFocused.value = true;
};

// 监听输入框的变化

// 用常量定义、符合规范
const clearSearchValue = () =>{
  searchValue.value = '';
  emits(CLEAR,'')
}
const search = () =>{
  emits(SEARCH,searchValue.value,value1.value)
}
const handleChange = value => {
  console.log(`selected ${value}`);
};
</script>

<style scoped>
.search-container {
  display: flex;
  min-width: 400px;
  align-items: center;
  background-color: #f4f4f5;
  padding: 5px;
  border-radius: 30px;
  border: 2px solid #ccc;
  transition:all 0.2s linear 0s;
}

.search-container:hover{
  box-shadow: 10px 10px #4B70E2;
}

.search-type {
  text-align: center;
  flex: 1;
  width: 100px;;
  border: none;
  border-radius: 16px 0 0 16px;
  background-color: #f4f4f5;
  font-size: 14px;
  color: #808080;
  outline: none;
}

.search-divider {
  width: 1px;
  height: 3vh;
  background-color: #e4e4e7;
}

.search-input {
  flex: 6;
  border: none;
  border-radius: 0;
  background-color: #f4f4f5;
  font-size: 14px;
  color: #18181b;
  outline: none;
}

.search-btn {
  color: black;
  background-color: #f4f4f5;
  border: none;
  border-radius: 0 16px 16px 0;
  cursor: pointer;
}
.delete-btn{
  border: none;
  background-color: #f4f4f5;
  color: black;
}
.search-icon{
  transition:all 0.2s linear 0s;
  font-size: 16px;
}
.search-icon:hover{
  font-size: 25px;
}
/* 去掉按钮的焦点样式 */
button:focus {
  outline: none;
  /* 可以将outline设置为none来去掉焦点时的边框 */
}
button{
  line-height: 0;
}
.slide-enter-active,
.slide-leave-active{
  transition: all .5s;
}
.slide-enter-from,
.slide-leave-to{
  opacity: 0;
  transform: translateY(40px);
}
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
.adv-search-container{
  padding: 10px;
  width: 100%;
  background: white;
  min-width: 400px;
}
.adv-search-item{
  margin-left: 20px;
  width: 100%;
  display: flex;

}
.adv-search-class{
  border-radius: 5px;
  border: black 1px solid;
}
.adv-search-type{
  border-radius: 5px;
  margin-left: 10px;
  border: black 1px solid;
}
.bottom{
  display: flex;
  justify-content: space-between;
}

.left {
  margin-left: 20px;
  max-width: 200px;
  flex-grow: 1; /* Takes as much space as available */
}

.right {
  margin-left: 20px;
  display: flex;
}
</style>
