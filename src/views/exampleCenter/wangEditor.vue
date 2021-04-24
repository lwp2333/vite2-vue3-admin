<template>
  <div class="wangEditor">
    <div ref="editor"></div>
    <a-divider />
    <upload-avatar v-model:avatarUrl="avatarUrl" />
    <upload-image v-model:imageList="imageList" />
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
  instance.config.zIndex = 500
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

const avatarUrl = ref('http://lwp2333.oss-cn-beijing.aliyuncs.com/711f7eecf616f8703462aab5fdac5cae.jpg')
const imageList = ref([])
</script>

<style scoped lang="less">
.wangEditor {
  padding: 24px 0px;
}
</style>
