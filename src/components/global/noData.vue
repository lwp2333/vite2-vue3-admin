<template>
  <a-row type="flex" justify="center">
    <a-col :xl="8" :md="12" :xs="24">
      <img :src="nodata" alt="" />
    </a-col>
  </a-row>
</template>

<script setup>
import nodata from '@/assets/svg/noData.svg'
</script>

<style lang="less" scoped>
img {
  width: 100%;
  height: 100%;
}
</style>
