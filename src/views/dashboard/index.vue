<template>
  <div class="dashboard">
    {{ width }} {{ height }}
    <div ref="container"></div>
    <a-divider></a-divider>
    <a-button type="primary" @click="exportShot">导出图片</a-button>
  </div>
</template>

<script setup>
import LogicFlow from '@logicflow/core'
import { Control, Menu, DndPanel, Snapshot } from '@logicflow/extension'
LogicFlow.use(Control)
LogicFlow.use(Menu)
LogicFlow.use(DndPanel)
LogicFlow.use(Snapshot)
import { onMounted, reactive, ref, watch, nextTick, onBeforeUnmount } from 'vue'
import useSize from '@/hooks/useSize'
const { width, height } = useSize('appContent')
const data = reactive({
  // 节点
  nodes: [
    {
      id: 21,
      type: 'rect',
      x: 100,
      y: 200,
      text: {
        value: '矩形节点',
        x: 100,
        y: 200,
      },
    },
    {
      id: 50,
      type: 'circle',
      x: 300,
      y: 400,
      text: {
        value: '圆形节点',
        x: 300,
        y: 400,
      },
    },
  ],
  // 边
  edges: [
    {
      type: 'polyline',
      sourceNodeId: 50,
      targetNodeId: 21,
    },
  ],
})
const container = ref(null)
let lf = null
const exportShot = () => {
  console.log(lf)
  lf && lf.getSnapshot()
}
const init = (width, height) => {
  // 渲染画布
  lf = new LogicFlow({
    container: container.value,
    width: width || 720,
    height: height || 640,
    background: {
      color: '#F0F0F0',
    },
    grid: {
      type: 'dot',
      size: 20,
    },
    // 工具配置
    textEdit: true,
    isSilentMode: false,
    edgeType: 'line',
    snapline: true,
  })
  lf.setTheme({
    rect: {
      width: 100,
      height: 50,
      radius: 6,
      fill: '#34415b',
      strokeWidth: 0,
    },
    circle: {
      r: 40,
      fill: '#34415b',
      strokeWidth: 0,
    },
    polygon: {
      fill: '#34415b',
      strokeWidth: 0,
    },
    star: {
      fill: '#34415b',
      strokeWidth: 0,
    },
    triangle: {
      fill: '#34415b',
      strokeWidth: 0,
    },
    hexagon: {
      fill: '#34415b',
      strokeWidth: 0,
    },
    nodeText: {
      fontSize: 16,
      color: '#ffffff',
    },
    edgeText: {
      fontSize: 16,
      color: '#ffffff',
    },
    anchor: {
      fill: '#6edd97',
    },
  })
  lf.render(data)
}
let stopWatch = null
onMounted(() => {
  init()
  nextTick(() => {
    stopWatch = watch(() => {
      const maxWidth = parseInt(width.value * 0.72)
      const maxHeight = parseInt(height.value * 0.72)
      init(maxWidth, maxHeight)
    }, [width, height])
  })
})
onBeforeUnmount(() => {
  stopWatch()
})
</script>
<style>
@import '@logicflow/core/dist/style/index.css';
@import '@logicflow/extension/lib/style/index.css';

.dashboard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
