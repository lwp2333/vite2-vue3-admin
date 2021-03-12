import { onMounted, onUnmounted, reactive } from 'vue'
import useWinResize from '/@/hooks/useWinResize'
import Echarts from 'echarts'
/**
 *
 * @param {*} dom  节点
 * @param {*} option 额外配置项
 * @param {*} interval 速度ms
 * @param {*} clickEvent 点击事件做什么
 */
export default function useEchartSwipe(dom = null, dataOption = null, interval = 2200, clickEvent = () => {}) {
  let timer = null
  let currentIndex = -1
  let selectedLengend = null
  let len = 0
  let myEchart = null
  let currDataList = null
  const currentItem = reactive({
    name: '',
    value: ''
  })
  const clearInstance = () => {
    myEchart.off('mouseover')
    myEchart.off('mouseout')
    myEchart.off('click')
    myEchart.clear()
    myEchart = null
  }
  /**
   * 初始化 echarts
   */
  const initPieEchart = () => {
    myEchart && clearInstance()
    myEchart = Echarts.init(dom.value)
    myEchart.setOption(dataOption)
  }
  /**
   *  auto swipe
   */
  const autoSwipe = () => {
    mainAction()
    timer && clearInterval(timer)
    timer = setInterval(mainAction, interval)
  }
  const highLight = index => {
    myEchart.dispatchAction({
      type: 'highlight',
      dataIndex: currDataList[index].dataIndex
    })
  }
  const downplay = index => {
    if (index === -1 || len === 0) return
    myEchart.dispatchAction({
      type: 'downplay',
      dataIndex: currDataList[index].dataIndex
    })
  }
  const mainAction = () => {
    const { series } = myEchart.getOption()
    currDataList = series[0].data.map((item, index) => {
      return {
        ...item,
        dataIndex: index
      }
    }) // 给每一项数据增加 dataIndex 后续 会用到
    if (selectedLengend) {
      // 如果存在 选中不选中图表的信息则需要重新过滤轮播
      currDataList = currDataList.filter(item => selectedLengend[item.name])
    }
    len = currDataList.length
    downplay(currentIndex % len)
    if (len > 0) {
      currentIndex = (currentIndex + 1) % len
      len === 1 ? clearInterval(timer) : highLight(currentIndex)
      currentItem.name = currDataList[currentIndex].name
      currentItem.value = currDataList[currentIndex].value
    } else {
      currentIndex = -1 // 取消所有数据展示 ， 重置为-1
      currentItem.name = ''
      currentItem.value = ''
      timer && clearInterval(timer)
    }
  }
  /**
   * 挂载监听 mouseover， mousemove 事件
   */
  const initPieEvent = () => {
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
      currentIndex = e.dataIndex
      // 直接清除定时器
      timer && clearInterval(timer)
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
      clickEvent(e) // 外部扩展事件
    })
  }
  const resizeEcharts = () => {
    myEchart && myEchart.resize()
  }
  useWinResize(resizeEcharts)

  onMounted(() => {
    setTimeout(() => {
      initPieEchart()
      initPieEvent()
      autoSwipe()
    }, 120)
  })

  onUnmounted(() => {
    timer && clearInterval(timer)
  })
  return currentItem
}
