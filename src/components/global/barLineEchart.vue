<template>
  <div class="barLineEchart" ref="main" :style="{ width, height }"></div>
</template>

<script setup>
import * as Echarts from 'echarts'
import { computed, defineProps, onMounted, ref, toRefs, watch } from 'vue'

const props = defineProps({
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '100%',
  },
  xAxis: {
    type: Array,
    required: true,
  },
  yAxisBar: {
    type: Object,
    required: true,
  },
  yAxisLine: {
    type: Object,
    required: true,
  },
})
const { xAxis, yAxisBar, yAxisLine } = props
let myChart = null
const main = ref()
const options = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    legend: {
      data: [yAxisBar.name, yAxisLine.name],
    },
    xAxis: [
      {
        type: 'category',
        data: xAxis,
        axisPointer: {
          type: 'shadow',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 2.5,
        interval: 0.5,
        axisLabel: {
          formatter: '{value} k',
        },
      },
      {
        type: 'value',
        interval: 20,
        axisLabel: {
          formatter: '{value} %',
        },
      },
    ],
    series: [
      {
        name: yAxisBar.name,
        type: 'bar',
        barWidth: 20,
        itemStyle: {
          color: '#5b8ff9',
        },
        data: yAxisBar.data,
      },
      {
        name: yAxisLine.name,
        type: 'line',
        yAxisIndex: 1,
        label: { show: true, formatter: '{c} %' },
        itemStyle: {
          color: '#61d7a7',
        },
        data: yAxisLine.data,
      },
    ],
  }
})
const initEchart = () => {
  if (myChart) {
    myChart.clear()
  }
  myChart = Echarts.init(main.value, null, { renderer: 'svg' })
  if (options.value) {
    myChart.setOption(options.value)
  }
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}

onMounted(() => {
  initEchart()
})
</script>

<style scoped lang="less"></style>
