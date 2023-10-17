<script lang="ts" setup>
import { ref, onMounted } from "vue";
//  按需引入 echarts
import * as echarts from "echarts";
const main = ref() // 使用ref创建虚拟DOM引用，使用时用main.value
onMounted(
    () => {
      init()
    }
)
function init() {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(main.value,'dark');
  // 指定图表的配置项和数据
  const option = {
    backgroundColor:'' ,//设置无背景色
    legend: {
      top: 'bottom'
    },
    // toolbox: {
    //   show: true,
    //   feature: {
    //     mark: { show: true },
    //     dataView: { show: true, readOnly: false },
    //     restore: { show: true },
    //     saveAsImage: { show: true }
    //   }
    // },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'area',
        areaStyle:{
          opacity:0.5
        },
        itemStyle: {
          borderRadius: 8,
          opacity:0.8
        },
        data: [
          { value: 40, name: '科研' },
          { value: 38, name: 'rose 2' },
          { value: 32, name: 'rose 3' },
          { value: 30, name: 'rose 4' },
          { value: 28, name: 'rose 5' },
          { value: 26, name: 'rose 6' },
          { value: 22, name: 'rose 7' },
          { value: 18, name: 'rose 8' }
        ]
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
</script>

<template>
  <div ref="main" style="width: 800px; height: 800px; margin-top: 5%; margin-left: 50%"></div>
</template>

<style scoped>

</style>

