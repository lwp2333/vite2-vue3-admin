<template>
  <div class="wangEditor">
    <div ref="editor"></div>
    <div v-html="content.html"></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import Wangeditor from 'wangeditor'
const editor = ref()
const content = reactive({
  html: '',
  text: '',
})
let instance
onMounted(() => {
  instance = new Wangeditor(editor.value)
  Object.assign(instance.config, {
    onchange() {
      content.html = instance.txt.html()
    },
  })
  instance.create()
})
onBeforeUnmount(() => {
  instance.destroy()
  instance = null
})
</script>

<style scoped lang="less">
.wangEditor {
  padding: 48px;
}
</style>
