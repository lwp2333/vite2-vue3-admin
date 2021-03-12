<template>
  <a-layout :style="layoutStyle">
    <a-layout-sider
      v-show="!breakPointValue"
      v-model:collapsed="collapsed"
      :style="siderStyle"
      :width="240"
      :trigger="null"
      breakpoint="lg"
      @breakpoint="breakpoint"
    >
      <sider-content />
    </a-layout-sider>
    <a-drawer :visible="drawerSider" :closable="false" :width="240" placement="left" :bodyStyle="drawerBodyStyle" @close="onClose">
      <sider-content />
    </a-drawer>
    <a-layout :style="layoutStyle">
      <a-layout-header :style="headerStyle">
        <div class="headerBox">
          <div class="left">
            <MenuFoldOutlined v-if="collapsed" @click="handleCollapsed" />
            <MenuUnfoldOutlined v-else @click="handleCollapsed" />
            <a-breadcrumb>
              <a-breadcrumb-item v-for="(item, index) in matchList" :key="index">
                <router-link :to="{ path: item.path }">
                  <!-- <BankOutlined v-if="item.path === '/'" /> -->
                  <!-- <template v-else> -->
                  {{ item.meta.title }}
                  <!-- </template> -->
                </router-link>
              </a-breadcrumb-item>
            </a-breadcrumb>
          </div>
          <div class="right">
            <a-avatar :size="36" :src="avatar" />
            <a-dropdown>
              <a class="ant-dropdown-link" @click="e => e.preventDefault()"> <MoreOutlined /></a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a href="javascript:;">个人中心</a>
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item>
                    <a href="javascript:;" @click="loginOut">退出登录</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content :style="contentStyle">
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <div id="appContent" class="g-scrollbar">
              <component :is="Component" />
            </div>
          </transition>
        </router-view>
      </a-layout-content>
      <a-layout-footer :style="footerStyle">Vite2 Vue3 </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { reactive, ref, toRefs, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { removeAllToken } from '@/utils/auth'
import avatar from '@/assets/svg/avatar.svg'
import siderContent from './siderContent.vue'

const layoutStyle = {
  height: '100vh',
  backgroundColor: '#fafdff',
}
const siderStyle = {
  height: '100vh',
  backgroundColor: '#fff',
}
const headerStyle = {
  background: '#fff',
  padding: '0px 18px',
}
const contentStyle = {
  paddingTop: '0px',
}
const footerStyle = {
  textAlign: 'center',
  padding: '6px 0px',
}
const drawerBodyStyle = {
  padding: '0px',
}
const collapsed = ref(false)
const breakPointValue = ref(false)
const drawerSider = ref(false)

const breakpoint = value => {
  breakPointValue.value = value
  // 是否触发断点 初始决定是否启用
  drawerSider.value = value
}
const handleCollapsed = () => {
  collapsed.value = !collapsed.value
  if (breakPointValue.value) {
    drawerSider.value = true
  }
}
const onClose = () => {
  drawerSider.value = false
}

// 面包屑逻辑
const currentRouteInfo = reactive({
  matchList: [],
})
const Router = useRouter()
const Route = useRoute()
watchEffect(() => {
  const { matched } = Route
  currentRouteInfo.matchList = [...matched]
})
const { matchList } = {
  ...toRefs(currentRouteInfo),
}
// 退出登录
const loginOut = () => {
  removeAllToken()
  Router.push({ path: '/login' })
}
</script>

<style lang="less" scoped>
.headerBox {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left,
.right {
  display: flex;
  justify-content: space-between;
  align-items: center;
  > :not(:last-child) {
    margin-right: 22px;
  }
}
#appContent {
  height: calc(100vh - 98px);
  padding: 16px;
  overflow: auto;
  background-color: #fff;
  box-shadow: 6px 6px 4px #f0f2f5;
}
</style>
