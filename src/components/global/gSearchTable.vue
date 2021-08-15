<template>
  <div class="g-search">
    <a-form :ref="setRef" :model="searchParams" :labelCol="formLabelCol" :wrapperCol="formWrapperCol">
      <a-row type="flex" align="middle" :gutter="[6, 6]">
        <a-col v-for="(item, index) in searchFileds" v-bind="formItemCol" :key="index">
          <a-form-item :label="item.label" :name="item.key">
            <component :is="item.type" v-model:value="searchParams[item.key]" v-bind="item.otherOptions" />
          </a-form-item>
        </a-col>
        <a-col v-bind="extraRowCol" :style="{ textAlign: 'right' }">
          <a-button @click="handleReset"> 重置 </a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
  <div class="g-divider"></div>
  <div class="content">
    <slot name="table" v-bind="{ tableLoading, list, tablePagination }"></slot>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import useTableRequest from '@/hooks/useTableRequest'
const props = defineProps({
  searchFileds: {
    type: Array,
    default: () => [],
  },
  extraRowCol: {
    type: Object,
    default: () => {},
  },
  api: {
    type: Function,
    default: () => () => {},
  },
})

const formLabelCol = {
  xs: 6,
  sm: 6,
  md: 6,
  xl: 10,
  xxl: 8,
}
const formWrapperCol = {
  xs: 18,
  sm: 18,
  md: 18,
  xl: 14,
  xxl: 16,
}
const formItemCol = { xs: 20, sm: 12, md: 12, xl: 8, xxl: 6 }
const { api } = props
const queryForm = ref(null)
const setRef = el => {
  queryForm.value = el
}
const searchParams = reactive({})
const { list, tablePagination, tableError, tableLoading, Action } = useTableRequest(api, searchParams)
const [refreshData, tablePaginationChange] = Action
const handleReset = () => {
  queryForm.value.resetFields()
  refreshData()
}
</script>

<style scoped lang="less"></style>
