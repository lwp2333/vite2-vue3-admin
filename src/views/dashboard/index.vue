<template>
  <div class="dashboard">
    <a-row>
      <a-col v-for="(item, index) in list" :xl="8" :md="12" :xs="24" :key="index">
        <card-info v-if="index % 2 === 0" title="● 运行监测" source="运行处" updateTime="2021-03-21">
          <bar-line-echart width="480px" height="360px" :xAxis="xAxis" :yAxisBar="yAxisBar" :yAxisLine="yAxisLine"></bar-line-echart>
        </card-info>
        <card-info v-else title="● 数据分析" source="运行处" updateTime="2021-03-21">
          <pie-echart width="480px" height="360px" :data="pieData"></pie-echart>
        </card-info>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const list = reactive([...new Array(24).keys()])
const xAxis = reactive(['2020-06', '2020-07', '2020-08', '2020-09', '2020-10', '2020-11', '2020-12'])
const yAxisBar = reactive({
  name: '工业总产值当月值',
  data: [0.8, 1.7, 0.6, 0.8, 1.1, 0.72, 0.78],
})
const yAxisLine = reactive({
  name: '工业总产值当月同比增长',
  data: [58, 56, 64, 69, 58, 88, 84],
})
const pieData = reactive([
  {
    name: '在建',
    value: 37,
  },
  {
    name: '已建成',
    value: 49,
  },
  {
    name: '运营中',
    value: 13,
  },
  {
    name: '其他',
    value: 1,
  },
])
</script>
<style>
.dashboard {
  width: 100%;
  height: 100%;
}
</style>
