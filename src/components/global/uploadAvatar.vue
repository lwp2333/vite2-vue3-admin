<template>
  <a-upload
    v-model:file-list="fileList"
    name="files"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    action="http://www.lwp.fun:7000/uploadFile"
    :before-upload="beforeUpload"
    @change="handleChange"
  >
    <img class="avatar" v-if="avatarUrl" :src="avatarUrl" alt="头像" />
    <div v-else>
      <LoadingOutlined v-if="loading" />
      <PlusOutlined v-else />
      <div class="ant-upload-text">上传头像</div>
    </div>
  </a-upload>
</template>
<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

defineProps({
  avatarUrl: {
    type: String,
    default: () => '',
  },
})
const emit = defineEmits(['update:avatarUrl'])
const fileList = ref([])
const loading = ref(false)
const handleChange = ({ file, fileList, event }) => {
  if (file.status === 'uploading') {
    loading.value = true
    return
  }
  if (file.status === 'done') {
    const { ossUrl } = file.response.data
    loading.value = false
    emit('update:avatarUrl', ossUrl)
    return
  }
  if (file.status === 'error') {
    loading.value = false
    message.error('上传失败')
    return
  }
}

const beforeUpload = file => {
  const { size, type } = file
  const limitType = ['image/jpeg', 'image/png']
  const isJpgOrPng = limitType.includes(type)
  const isLt2M = size / 1024 / 1024 < 2
  if (!isJpgOrPng) {
    message.error('请选择jpg/png格式的图片!')
  }
  if (!isLt2M) {
    message.error('请选择大小不超过2MB的图片!')
  }
  return isJpgOrPng && isLt2M
}
</script>
<style lang="less" scoped>
.avatar {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
.avatar-uploader > .ant-upload {
  width: 100px;
  height: 100px;
}
.ant-upload-select-picture-card i {
  font-size: 28px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #1890ff;
}
</style>
