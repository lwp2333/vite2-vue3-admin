<template>
  <div class="iconGallery g-scrollbar-y">
    <a-checkbox v-model:checked="checkAll" :indeterminate="indeterminate" @change="onCheckAllChange">{{
      checkAll ? '取消全选' : '全选'
    }}</a-checkbox>
    <a-spin :spinning="loading">
      <a-row :gutter="[20, 20]">
        <a-col v-for="(item, index) in iconList" :xl="3" :lg="4" :md="6" :sm="8" :key="index">
          <a-dropdown :trigger="['contextmenu']">
            <a-card hoverable :bordered="false" @click="handelChange(item)" :class="{ card_active: seletedIconList.includes(item.name) }">
              <icon-font :type="item.type" style="font-size: 36px" />
              <span class="name">{{ item.name }}</span>
            </a-card>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1">
                  <span v-copy="computedIconHtml(item)">复制图标</span>
                </a-menu-item>
                <a-menu-item key="2">
                  <span @click="handleDel(index, item)">删除图标</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>

<script setup>
import { ref, reactive, watchEffect, resolveComponent } from 'vue'
import iconJson from '@/constants/iconList'
const loading = ref(false)
const iconList = reactive([...iconJson])
const seletedIconList = reactive([])
const indeterminate = ref(false)
const checkAll = ref(false)
const onCheckAllChange = () => {
  // 清除选中的
  seletedIconList.length = 0
  if (checkAll.value) {
    const nameList = iconList.map(item => item.name)
    seletedIconList.push(...nameList)
  }
}
const handelChange = icon => {
  let isCancel = false
  seletedIconList.forEach((item, index) => {
    if (icon.name === item) {
      isCancel = true
      seletedIconList.splice(index, 1)
    }
  })
  !isCancel && seletedIconList.push(icon.name)
}
watchEffect(() => {
  const all = iconList.length
  const len = seletedIconList.length
  checkAll.value = len === all ? true : false
  indeterminate.value = len === 0 || len === all ? false : true
})
const computedIconHtml = item => {
  const { type } = item
  return ` <icon-font type="${type}" />`
}
const delApi = (index, name) =>
  new Promise(resolve => {
    setTimeout(() => {
      iconList.splice(index, 1)
      const list = [...seletedIconList].filter(item => item !== name) // 同时删除已经选中的
      console.log(list)
      seletedIconList.length = 0
      seletedIconList.push(...list)
      resolve(200)
    }, 1800)
  })
const handleDel = async (index, { name }) => {
  loading.value = true
  const res = await delApi(index, name).catch(err => [console.log(err)])
  loading.value = false
}
</script>

<style scoped lang="less">
.iconGallery {
  width: 100%;
  height: 100%;
}
:deep(.ant-card-body) {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.32s;
  &:hover {
    background-color: #e6f7ff;
  }
  .name {
    width: 64px;
    display: inline-block;
    text-align: center;
    margin-top: 8px;
  }
}
.card_active {
  background-color: #e6f7ff;
}
</style>
