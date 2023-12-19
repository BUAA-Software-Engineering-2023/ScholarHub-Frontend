<script lang="ts" setup>
import { ref, onMounted } from "vue";
//  按需引入 echarts
import * as echarts from "echarts";
const props = defineProps(["series","years"]);
const main = ref() // 使用ref创建虚拟DOM引用，使用时用main.value
onMounted(
    async () => {
      init()
    }
)
function init() {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(main.value);
  // 指定图表的配置项和数据
  const option = {
    backgroundColor: '',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ["发文量", '引用频次']
    },
    toolbox: {
      feature: {
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.years,
        minInterval: 1,
      }
    ],
    yAxis: [
      {
        type: 'value',
        minInterval: 1,
      }
    ],
    series: props.series
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
</script>

<template>
  <div class="TrendBox">
    <div class="line"></div><div class="title">研究趋势</div>
    <div ref="main" style="width: 350px; height: 350px;"></div>
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
  margin: 10px 10px 10px 0;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  position: relative; /* 为伪元素定位 */
}
</style>

