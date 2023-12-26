<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
const props = defineProps(["data"]);
const main = ref()
onMounted(
    async () => {
      init()
    }
)
function init() {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(main.value);


  const percentFormatter = (params) => {
    const total = props.data.reduce((sum, item) => sum + item.value, 0);
    const percent = ((params.data.value / total) * 100).toFixed(2);
    return `${params.marker}${params.data.name}: ${percent}%`;
  };
  // 指定图表的配置项和数据
  const option = {
    title: {
      text: '相关领域占比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: percentFormatter
    },
    legend: {
      show: false // 设置图例不显示
    },


    series: [
      {

        name: '相关领域占比',
        type: 'pie',
        radius: '60%',
        data: props.data,


        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  myChart.on('click', function (params) {
    // 调用事件处理函数
    handleChartClick(params);
  });
}
function handleChartClick(params) {
  // 假设每个扇形数据项都有一个 URL 字段
  if (params.data && params.data.url) {
    let urlc = params.data.url
    let parts = urlc.split('/');
    let id = parts[parts.length - 1];
    console.log(id)
    window.open("/client/concept/"+id); // 在新标签页中打开 URL
  }
}
</script>

<template>
  <div class="TrendBox">
    <div class="line"></div><div class="title">研究趋势</div>
    <div ref="main" style="width: 350px; height: 230px;"></div>
  </div>
</template>

<style scoped>
.line{
  background:black;/*背景色为浅灰色*/
  width:5px;/*设置宽高*/
  margin-top: 3px;
  height:25px;
  left:150px;
  border-radius: 2px;
  float:left;/*让此div与前面的并排显示*/
}

.title {
  color: black;
  font-size: 15px;
  text-align: left; /* 使标题靠右 */
  padding-left: 10px; /* 添加右侧内边距 */
  font-weight: 800;
}

.TrendBox {
  margin: 10px 10px 10px 10px;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  position: relative; /* 为伪元素定位 */
}
</style>