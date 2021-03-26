<template>
  <div class="qrCode">
    <a-row>
      <a-col :xl="8" :md="12" :xs="24">
        <a-input-search v-model:value="qrData.text" placeholder="请输入内容" enter-button="生成" @search="createQrCode" />

        <a-spin :spinning="loading">
          <div class="square">
            <img class="qrcodeImg" :src="qrData.url" />
          </div>
        </a-spin>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import QRCode from 'qrcode'
import { message } from 'ant-design-vue'

const qrData = reactive({
  text: undefined,
  url: undefined,
})
const loading = ref(false)
const createQrCode = async () => {
  qrData.url = undefined
  if (!qrData.text) {
    message.warn('请输入内容！')
    return
  }
  loading.value = true
  qrData.url = await QRCode.toDataURL(qrData.text, { width: 240 })
  setTimeout(() => {
    loading.value = false
  }, 240)
}
</script>

<style scoped lang="less">
.qrCode {
  width: 100%;
  height: 100%;
}
.square {
  margin-top: 24px;
  width: 100%;
  height: 36vh;
  background-image: linear-gradient(45deg, #eee 25%, transparent 0, transparent 75%, #eee 0),
    linear-gradient(45deg, #eee 25%, transparent 0, transparent 75%, #eee 0);
  background-position: 0 0, 15px 15px;
  background-size: 30px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  .qrcodeImg {
    object-fit: contain;
  }
}
</style>
