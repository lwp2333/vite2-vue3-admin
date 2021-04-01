<template>
  <div class="flatSelect">
    <flat-select v-model:value="search.status" title="状态" :options="options"></flat-select>
    <flat-select multiple v-model:value="search.sex" title="性别" :options="options2"></flat-select>
    <flat-select>
      <template #title>日期范围：</template>
      <template #default>
        <a-date-picker></a-date-picker>
      </template>
    </flat-select>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const search = reactive({
  status: undefined,
  age: undefined,
})
const options = ['全部', '待接收', '处理中', '已完成'].map(item => ({ label: item, value: item === '全部' ? undefined : item }))
const options2 = ['全部', '男', '女'].map(item => ({
  label: item,
  value: item === '全部' ? undefined : item,
}))
</script>

<style scoped lang="less"></style>
