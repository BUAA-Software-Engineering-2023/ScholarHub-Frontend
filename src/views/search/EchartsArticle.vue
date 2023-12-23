<template>
  <div id="main" style="width: 100%; height: 300px; margin: auto"></div>
</template>

<script lang="js" setup>
import {ref, onMounted, defineProps} from "vue";
//  按需引入 echarts
import * as echarts from "echarts";

const props = defineProps(['field', 'fieldNum']);

watch(props, (newValue, oldValue) => {
  init();
})
onMounted(
    () => {
      console.log("echarts");
      console.log("child:::::",props.field)
      init()
      console.log("echarts end");
    }
)
function init() {
  const myChart = echarts.init(document.getElementById('main'));
  const option = {
    title: {
      text: '论文领域分布',
      textStyle: {
        color: '#333', // 标题颜色
        fontSize: 18   // 标题字体大小
      },
      left: 'center' // 标题居中
    },
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
      data: ['数量'],
      bottom: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.field,
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        lineStyle: {
          color: '#333' // X轴颜色
        }
      },
      axisLabel: {
        show: false
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#333' // Y轴颜色
        }
      }
    },
    series: [
      {
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: props.fieldNum,
        smooth: true, // 让线条平滑
        symbol: 'circle', // 数据点标记为圆形
        symbolSize: 8, // 数据点大小
        itemStyle: {
          color: '#64bd63', // 线条颜色
          borderColor: '#64bd63', // 数据点边框颜色
          borderWidth: 2
        },
        lineStyle: {
          width: 3 // 线条宽度
        }
      }
    ]
  };
  myChart.setOption(option);
}
</script>


<style scoped>

</style>
