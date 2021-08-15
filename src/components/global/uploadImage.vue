<template>
  <div class="clearfix">
    <a-upload
      action="http://www.lwp.fun:7000/uploadFile"
      list-type="picture-card"
      v-model:file-list="imageList"
      @change="handleChange"
      @preview="handlePreview"
    >
      <div v-if="imageList.length < limit">
        <plus-outlined />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <a-modal centered :width="mapResultWidth" v-model:visible="previewVisible" :closable="false" :footer="null" :bodyStyle="{ padding: 0 }">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import useDeviceInfo from '@/hooks/useDeviceInfo'

const emit = defineEmits(['update:imageList'])
defineProps({
  imageList: {
    type: Array,
    default: () => [],
  },
  limit: {
    type: Number,
    default: () => 4,
  },
})

const previewVisible = ref(false)
const previewImage = ref('')
const { mapResultWidth } = useDeviceInfo({
  xs: '100%',
  sm: '88%',
  md: '76%',
  lg: '64%',
  xl: '52%',
  xxl: '40%',
})

const handlePreview = async file => {
  previewImage.value = file.url || file.preview
  previewVisible.value = true
}

const handleChange = ({ fileList }) => {
  const imageList = [...fileList].map(item => {
    const { response = null, ...other } = item
    if (response) {
      const { ossUrl: url } = response.data || {}
      return {
        ...other,
        url,
      }
    } else {
      return item
    }
  })
  emit('update:imageList', imageList)
}
</script>
<style lang="less" scoped>
.ant-upload-select-picture-card i {
  font-size: 28px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #1890ff;
}
</style>
