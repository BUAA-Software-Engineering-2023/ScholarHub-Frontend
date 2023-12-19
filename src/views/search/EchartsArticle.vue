<template>
  <div id="main" style="width: 100%; height: 400px"></div>
</template>

<script lang="js" setup>
import {ref, onMounted, defineProps} from "vue";
//  按需引入 echarts
import * as echarts from "echarts";

const props = defineProps(['field']);

onMounted(
    () => {
      console.log("child:::::",props.field)
      init()
    }
)
function init() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('main'));
  // 指定图表的配置项和数据
  var option = {
    title: {
      text: '论文领域分布'
    },
    tooltip: {},
    legend: {
      data: ['数量']
    },
    xAxis: {
      data: props.field
    },
    yAxis: {},
    series: [
      {
        name: '数量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
</script>


<style scoped>
</style>
