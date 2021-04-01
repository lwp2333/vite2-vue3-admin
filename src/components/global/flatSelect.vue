<template>
  <div class="flatSelect">
    <div class="title">
      <slot name="title"> {{ title }}： </slot>
    </div>
    <div class="options">
      <slot>
        <span v-for="(option, index) in options" class="option" :class="isActive(option)" @click="selected(option)" :key="index">
          {{ option.label }}
        </span>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs, defineEmit, useContext } from 'vue'

defineEmit({
  'update:value': null,
})
const ctx = useContext()
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  value: {
    default: () => undefined,
  },
  multiple: {
    type: Boolean,
    default: () => false,
  },
  theme: {
    type: String,
    default: '#1890ff',
  },
})
const { multiple, value, theme } = toRefs(props)
const selected = option => {
  // 单选
  if (!multiple.value) {
    ctx.emit('update:value', option.value)
    return
  }
  // 多选-判断是否存在
  const selectedList = [...(value.value || [])]
  const isHas = selectedList.includes(option.value)

  // 多选情况，全部只能选中，不能取消（点击其他项目即取消全选）
  if (option.value === undefined) {
    ctx.emit('update:value', undefined)
    return
  }
  if (!isHas) {
    // 选中
    selectedList.push(option.value)
    ctx.emit('update:value', selectedList)
    return
  }
  //取消
  ctx.emit(
    'update:value',
    selectedList.filter(item => item !== option.value)
  )
}
const isActive = option => {
  if (!multiple.value) {
    return option.value === value.value ? 'selected' : ''
  }
  const selectedList = [...(value.value || [])]
  const isHas = selectedList.includes(option.value) || (option.value === undefined && !selectedList.length)
  return isHas ? 'selected' : ''
}
</script>

<style scoped lang="less">
.flatSelect {
  padding: 4px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  line-height: 14px;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(207, 218, 230, 0.5);
  }
  .title {
    min-width: 100px;
    color: #333333;
  }
  .options {
    flex: 1;
    min-height: 42px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    .option {
      display: inline-block;
      min-width: 64px;
      text-align: center;
      cursor: pointer;
      border: 1px dashed transparent;
      border-radius: 4px;
      color: #677380;
      padding: 6px;
      margin-bottom: 4px;
      &:hover {
        border: 1px dashed v-bind(theme);
      }
      &:not(:last-child) {
        margin-right: 20px;
      }
    }
    .selected {
      color: #fff;
      background-color: v-bind(theme);
    }
  }
}
</style>
