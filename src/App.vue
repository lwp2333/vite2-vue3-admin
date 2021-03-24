<template>
  <a-config-provider :locale="zhCN">
    <router-view></router-view>
  </a-config-provider>
</template>

<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import useRem from '@/hooks/useRem'

useRem()
</script>

<style lang="less"></style>
