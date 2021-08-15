<template>
  <component :is="type" />
</template>

<script setup>
defineProps({
  type: String,
})
</script>

<style lang="less" scoped></style>
