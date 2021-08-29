# vite2-vue3-admin

#### Vite2 + Vue3.x + ant-design 2.x

[admin.lwp.fun ](http://admin.lwp.fun) tips：可注册成功后登入

##### 目录树

```
├─public
└─src
    ├─api
    ├─assets
    │  ├─font
    │  ├─icon
    │  ├─img
    │  └─svg
    ├─components
    │  └─global
    │          aIcon.vue
    │          iconFont.js
    │          index.js
    ├─constants
    ├─directives
    ├─filters
    ├─hooks
    │      useCountDown.js
    │      useDeviceInfo.js
    │      useEchartSwipe.js
    │      useFullscreen.js
    │      useInterval.js
    │      useMouse.js
    │      useSize.js
    │      useTableRequest.js
    │      useWinResize.js
    ├─layout
    │      index.vue
    │      siderContent.vue
    │      subMenu.vue
    ├─router
    │  └─modules
    │  │  asyncRoutes.js
    │  │  index.js
    ├─store
    │  └─modules
    │  │  actions.js
    │  │  getters.js
    │  │  index.js
    │  │  mutations.js
    ├─styles
    │      global.less
    │      theme.less
    ├─utils
    │      auth.js
    │      index.js
    │      request.js
    │      validate.js
    └─views
    │  └─...more
    │  App.vue
    │  main.js
    │  permisson.js
│  .editorconfig
│  .env.development
│  .env.production
│  .env.staging
│  .gitignore
│  .prettierrc
│  index.html
│  package.json
│  README.md
│  postcss.config.js
│  vite.config.js
```

##### 使用 script setup 与 css v-bind 实验性功能 😂

```vue
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
```

```vue
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
import { toRefs } from 'vue'

const emit = defineEmits(['update:value', 'update'])
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
    emit('update:value', option.value)
    return
  }
  // 多选-判断是否存在
  const selectedList = [...(value.value || [])]
  const isHas = selectedList.includes(option.value)

  // 多选情况，全部只能选中，不能取消（点击其他项目即取消全选）
  if (option.value === undefined) {
    emit('update:value', undefined)
    return
  }
  if (!isHas) {
    // 选中
    selectedList.push(option.value)
    emit('update:value', selectedList)
    return
  }
  //取消
  emit(
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
```

##### 视图

![pc](https://cdn200.oss-cn-hangzhou.aliyuncs.com/md/img/pc.png)
![iphone](https://cdn200.oss-cn-hangzhou.aliyuncs.com/md/img/phone.png)
![iphone2](https://cdn200.oss-cn-hangzhou.aliyuncs.com/md/img/phone2.png)
![iphone3](https://cdn200.oss-cn-hangzhou.aliyuncs.com/md/img/phone3.png)
![iphone4](https://cdn200.oss-cn-hangzhou.aliyuncs.com/md/img/phone4.png)
