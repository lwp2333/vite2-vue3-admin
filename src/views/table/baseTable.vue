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

  <span class="title">主题颜色更改</span>
  <a-input-group compact>
    <a-select v-model:value="type" :options="typeOptions"> </a-select>
    <a-auto-complete v-model:value="color" :options="dataSource" placeholder="请选择或输入颜色值" />
    <a-button type="primary" @click="handelUpdate">更改</a-button>
  </a-input-group>
</template>

<script setup>
import { message } from 'ant-design-vue'
import { ref } from 'vue'
const typeOptions = [
  {
    label: '@primary-color',
    value: '@primary-color',
  },
  {
    label: '@border-color-base',
    value: '@border-color-base',
  },
]
const type = ref('@primary-color')
const color = ref('#1890ff')
const dataSource = [
  {
    label: '#1890ff',
    value: '#1890ff',
  },
  {
    label: '#52c41a',
    value: '#52c41a',
  },
  {
    label: '#faad14',
    value: '#faad14',
  },
  {
    label: '#f5222d',
    value: '#f5222d',
  },
  {
    label: '#dce3e8',
    value: '#dce3e8',
  },
]

const handelUpdate = () => {
  if (!window.less) {
    message.warn('不支持less.modifyVars')
    return
  }
  const data = {
    [type.value]: color.value,
  }
  window.less
    .modifyVars(data)
    .then(() => {
      message.success('修改成功！')
    })
    .catch(() => {
      message.error('修改失败！')
    })
}
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
    label: '日期范围',
    key: 'range',
    otherOptions: {
      placeholder: ['开始日期', '结束日期'],
      allowClear: true,
      valueFormat: 'YYYY-MM-DD',
    },
  },
]
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
