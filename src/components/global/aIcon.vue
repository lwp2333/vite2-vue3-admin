<template functional>
  <component :is="type" />
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  type: String,
})
</script>

<style lang="less" scoped></style>
