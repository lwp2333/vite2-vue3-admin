<template>
  <div class="siderContent">
    <div class="logo">
      <img :src="logo" :style="{ width: '48px' }" />
      Vite2 Vue3
    </div>
    <a-menu
      :selectedKeys="menuSelectedKeys"
      :openKeys="menuOpenKeys"
      theme="light"
      mode="inline"
      :default-selected-keys="[]"
      @click="handleCLick"
      @select="handleSelect"
      @openChange="openChange"
      class="g-scrollbar-y"
    >
      <template v-for="item in menuList">
        <a-menu-item v-if="!item.children" :key="item.path">
          <icon-font :type="item.iconType" />
          <!-- <span>{{ item.title }}</span> -->
          <a-badge :dot="!item.show">
            {{ item.title }}
          </a-badge>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script setup>
import logo from '@/assets/svg/logo.svg'
import subMenu from './subMenu.vue'
import { computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
const Store = useStore()
const Router = useRouter()
const Route = useRoute()
const menuList = computed(() => {
  return Store.getters.menuList
})

const initMenuList = () => {
  Store.dispatch('menuInfo/generateMenu')
}
initMenuList()
const menuOpenKeys = computed(() => {
  return Store.getters.menuOpenKeys
})
const menuSelectedKeys = computed(() => {
  return Store.getters.menuSelectedKeys
})
const handleSelect = ({ item, key, selectedKeys }) => {
  Store.commit('menuInfo/SET_selectedKeys', selectedKeys)
}
const openChange = keys => {
  Store.commit('menuInfo/SET_openKeys', keys)
}
const handleCLick = ({ key }) => {
  Store.commit('appInfo/SET_drawerStatus', false)
  Router.push({ path: key })
}
watchEffect(() => {
  const { matched: matchList } = Route
  const validList = matchList.filter(item => {
    return !item.meta.hide && item.path !== '/'
  })
  const [select, ...open] = validList.reverse()
  const selectedKeys = [select.path]
  const OpenKeys = open.map(item => item.path)
  handleSelect({ selectedKeys })
  openChange(OpenKeys)
})
</script>

<style scoped lang="less">
.siderContent {
  height: 100vh;
  padding: 30px 0px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .logo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 18px;
  }
}
.ant-menu-inline {
  border: none;
}
</style>
