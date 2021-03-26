<template>
  <div class="pieEchart" ref="main" :style="{ width, height }"></div>
</template>

<script setup>
import * as Echarts from 'echarts'
import { computed, defineProps, onMounted, reactive, ref, toRefs, watch } from 'vue'

const props = defineProps({
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '100%',
  },
  colorList: {
    type: Array,
    default: () => ['#5B8FF9', '#63DAAB', '#657798', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF'],
  },
  data: {
    type: Array,
    required: true,
  },
  interval: {
    type: Number,
    required: false,
    default: 2200,
  },
})
// 图表实例
const { colorList, data, interval } = props

const options = computed(() => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br /> 数量占比： {d}%',
    },
    legend: {
      orient: 'vertical',
      right: 14,
      top: 'center',
      icon: 'circle',
    },
    color: colorList,
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['36%', '58%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
          formatter: '{b}\n {c}个',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '22',
            fontWeight: 'bold',
          },
        },
        data,
      },
    ],
  }
})

let myEchart = null
const main = ref()
const initEchart = () => {
  if (myEchart) {
    myEchart.clear()
  }
  myEchart = Echarts.init(main.value, null, { renderer: 'svg' })
  if (options.value) {
    myEchart.setOption(options.value)
  }
  window.addEventListener('resize', () => {
    myEchart && myEchart.resize()
  })
}
// 轮播控制变量
let timer = null
let currentIndex = -1 // 当前轮播位置
const currentItem = reactive({
  // 当前高亮项数据
  name: '',
  value: '',
})
let selectedLengend = null // 当前可高亮数据（null 未为切换时候，代表所有）
let len = 0 // 数据长度
let currDataList = null

// 高亮
const highLight = index => {
  myEchart.dispatchAction({
    type: 'highlight',
    dataIndex: currDataList[index].dataIndex,
  })
}
// 取消高亮
const downplay = index => {
  if (index === -1 || len === 0) {
    return
  }
  myEchart.dispatchAction({
    type: 'downplay',
    dataIndex: currDataList[index].dataIndex,
  })
}
const echartResize = () => {
  myChart && myChart.resize()
}
const clearInstance = () => {
  if (!myEchart) {
    return
  }
  myEchart.off('mouseover')
  myEchart.off('mouseout')
  myEchart.off('click')
  myEchart.clear()
  myEchart = null
}
const clearTimer = () => {
  timer && clearInterval(timer)
}

const autoSwipe = () => {
  mainAction()
  clearTimer()
  timer = setInterval(mainAction, interval)
}
const initPieEvent = () => {
  if (!myEchart) {
    return
  }
  myEchart.on('mouseover', e => {
    // 判断当前高亮是否是为悬浮的dataIndex
    const { dataIndex } = e
    if (currentIndex !== -1 && dataIndex !== currDataList[currentIndex].dataIndex) {
      // 取消轮播当前的高亮
      downplay(currentIndex)
    }
    // 改变当前项为 悬浮项
    currentItem.name = e.name
    currentItem.value = e.value
    // 下次轮播从当前高亮项开始downplay
    currentIndex = dataIndex
    // 直接清除定时器
    clearTimer()
  })
  myEchart.on('mouseout', () => {
    autoSwipe() // 鼠标离开，重新启动高亮
  })
  myEchart.on('legendselectchanged', e => {
    // 图表项，切换展示与否
    selectedLengend = e.selected
    // 重新开始轮播
    autoSwipe()
  })
  myEchart.on('click', e => {
    $emit('clickItem', e) // 外部扩展事件
  })
}
const mainAction = () => {
  const { series } = myEchart.getOption()
  currDataList = series[0].data.map((item, index) => ({
    ...item,
    dataIndex: index,
  })) // 给每一项数据增加 dataIndex 后续 会用到
  if (selectedLengend) {
    // 如果存在 选中不选中图表的信息则需要重新过滤轮播
    currDataList = currDataList.filter(item => selectedLengend[item.name])
  }
  len = currDataList.length
  downplay(currentIndex % len)
  if (len > 0) {
    currentIndex = (currentIndex + 1) % len
    len === 1 ? clearTimer() : highLight(currentIndex)
    currentItem.name = currDataList[currentIndex].name
    currentItem.value = currDataList[currentIndex].value
  } else {
    currentIndex = -1 // 取消所有数据展示 ， 重置为-1
    currentItem.name = ''
    currentItem.value = ''
    clearTimer()
  }
}

onMounted(() => {
  initEchart()
  initPieEvent()
  autoSwipe()
})
</script>

<style scoped lang="less"></style>
