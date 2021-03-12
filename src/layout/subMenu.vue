<template functional>
  <a-sub-menu :key="menuInfo.key">
    <template #title>
      <a-icon :type="menuInfo.icon" />
      <span>{{ menuInfo.title }}</span>
    </template>
    <template v-for="item in menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.key">
        <a-icon :type="item.icon" />
        <span>{{ item.title }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.key" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  menuInfo: Object,
})
</script>
