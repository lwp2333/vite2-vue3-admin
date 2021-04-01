<template functional>
  <a-sub-menu :key="menuInfo.path">
    <template #title>
      <icon-font :type="menuInfo.iconType" />
      <span>{{ menuInfo.title }}</span>
    </template>
    <template v-for="item in menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.path">
        <icon-font :type="item.iconType" />
        <span>{{ item.title }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.path" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  menuInfo: Object,
})
</script>
