<template>
  <div class="dashboard">
    <a-row>
      <a-col v-for="(item, index) in list" :xl="8" :md="12" :xs="24" :key="index">
        <card-info v-if="index % 2 === 0" title="● 消费监测" source="每日上报" updateTime="2021-03-21">
          <bar-line-echart width="480px" height="360px" :xAxis="xAxis" :yAxisBar="yAxisBar" :yAxisLine="yAxisLine"></bar-line-echart>
        </card-info>
        <card-info v-else title="● 消费分析" source="每月上报" updateTime="2021-03-21">
          <pie-echart width="480px" height="360px" :data="pieData"></pie-echart>
        </card-info>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const list = reactive([...new Array(6).keys()])
const xAxis = reactive(['2020-06', '2020-07', '2020-08', '2020-09', '2020-10', '2020-11', '2020-12'])
const yAxisBar = reactive({
  name: '月消费总额',
  data: [0.8, 1.7, 0.6, 0.8, 1.1, 0.72, 0.78],
})
const yAxisLine = reactive({
  name: '消费同比增长',
  data: [58, 56, 64, 69, 58, 88, 84],
})
const pieData = reactive([
  {
    name: '食',
    value: 48,
  },
  {
    name: '住',
    value: 32,
  },
  {
    name: '行',
    value: 16,
  },
  {
    name: '其他',
    value: 14,
  },
])
</script>
<style>
.dashboard {
  width: 100%;
  height: 100%;
}
</style>
