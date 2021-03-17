<template>
  <g-search-table :ref="setRef" :searchFileds="searchFileds" :extraRowCol="extraRowCol" :api="api">
    <template #table="{ tableLoading, list, tablePagination }">
      <a-table
        class="globalTableUI"
        size="small"
        rowKey="id"
        :loading="tableLoading"
        :columns="columns"
        :data-source="list"
        :pagination="tablePagination"
      >
        <template #action="{ record }">
          <a-button type="link" @click="handleEdit(record)">编辑</a-button>
          <a-button type="link" @click="handleDel(record)">删除</a-button>
        </template>
      </a-table>
    </template>
  </g-search-table>
</template>

<script setup>
import { ref, useContext } from 'vue'
const extraRowCol = {
  xs: 4,
  sm: 12,
  md: 12,
  xl: 8,
  xxl: 18,
}
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '180px',
    slots: { customRender: 'action' },
  },
]
const api = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        list: [
          {
            id: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
          },
          {
            id: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
        ],
        totalRecord: 2,
      })
    }, 800)
  })
const searchFileds = [
  {
    type: 'a-input',
    label: '输入框',
    key: 'input',
    otherOptions: {
      placeholder: '请输入',
      allowClear: true,
    },
  },
  {
    type: 'a-select',
    label: '选择框',
    key: 'select',
    otherOptions: {
      placeholder: '请选择',
      allowClear: true,
      options: [
        {
          label: '选项一',
          value: '1',
        },
      ],
    },
  },
  {
    type: 'a-date-picker',
    label: '日期',
    key: 'date',
    otherOptions: {
      placeholder: '请选择',
      allowClear: true,
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    type: 'a-month-picker',
    label: '月份',
    key: 'month',
    otherOptions: {
      placeholder: '请选择',
      allowClear: true,
      valueFormat: 'YYYY-MM',
    },
  },
  {
    type: 'a-range-picker',
    label: '输入框',
    key: 'range',
    otherOptions: {
      placeholder: ['开始日期', '结束日期'],
      allowClear: true,
      valueFormat: 'YYYY-MM-DD',
    },
  },
]
const ctx = useContext()
const gSearch = ref(null)
const setRef = el => {
  gSearch.value = el
}
const handleEdit = record => {
  console.log('edit', record)
  console.log(gSearch)
  // gSearch.value.refreshData()
}
const paginationChange = e => {
  // gSearch.value.tablePaginationChange(e)
}
const handleDel = record => {
  console.log('del', record)
}
</script>

<style lang="less"></style>
