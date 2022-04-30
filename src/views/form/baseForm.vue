<template>
  <a-form :ref="setRef" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="活动名称" name="name">
      <a-input v-model:value="form.name" />
    </a-form-item>
    <a-form-item label="活动代号" name="nickName">
      <a-input v-model:value="form.nickName" />
    </a-form-item>
    <a-form-item label="活动电话" name="phone">
      <a-input v-model:value="form.phone" />
    </a-form-item>
    <a-form-item label="举办人身份证" name="idcard">
      <a-input v-model:value="form.idcard" />
    </a-form-item>
    <a-form-item label="活动邮箱" name="email">
      <a-input v-model:value="form.email" />
    </a-form-item>
    <a-form-item label="活动地址" name="region">
      <a-select v-model:value="form.region" placeholder="请选择活动地址">
        <a-select-option value="北京"> 北京 </a-select-option>
        <a-select-option value="上海"> 上海 </a-select-option>
        <a-select-option value="杭州"> 杭州 </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="活动时间" required name="date">
      <a-date-picker format="YYYY-MM-DD HH:mm:ss" valueFormat="YYYY-MM-DD HH:mm:ss" v-model:value="form.date" show-time type="date" />
    </a-form-item>
    <a-form-item label="是否发布" name="publish">
      <a-switch v-model:checked="form.publish" />
    </a-form-item>
    <a-form-item label="活动类型" name="type">
      <a-checkbox-group v-model:value="form.type">
        <a-checkbox value="1" name="type"> one </a-checkbox>
        <a-checkbox value="2" name="type"> two </a-checkbox>
        <a-checkbox value="3" name="type"> three </a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="活动来源" name="resource">
      <a-radio-group v-model:value="form.resource">
        <a-radio value="线上"> 线上 </a-radio>
        <a-radio value="线下"> 线下 </a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="活动描述" name="desc">
      <a-textarea v-model:value="form.desc" />
    </a-form-item>
    <div style="display: flex; justify-content: center">
      <a-space size="large">
        <a-button type="primary" @click="onSubmit"> 确定 </a-button>
        <a-button @click="resetForm"> 重置 </a-button>
      </a-space>
    </div>
  </a-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { NotEmpty, NotSelect, NotRadio, limitStr, nickStr, phoneStr, idCardStr, emailStr } from '@/utils/validate'
const labelCol = {
  xl: 4,
  md: 6,
  xs: 8,
}
const wrapperCol = {
  xl: 12,
  md: 14,
  xs: 16,
}
const ruleForm = ref(null)
const form = reactive({
  name: null,
  nickName: null,
  phone: null,
  idcard: null,
  email: null,
  region: null,
  date: null,
  publish: null,
  type: [],
  resource: null,
  desc: null,
})
const setRef = el => {
  ruleForm.value = el
}
const onSubmit = () => {
  ruleForm.value
    .validate()
    .then(() => {
      console.log('values', form)
    })
    .catch(error => {
      console.log('error', error)
    })
}
const resetForm = () => {
  ruleForm.value.resetFields()
}
const rules = {
  name: [limitStr('活动名称')],
  nickName: [nickStr('活动代号')],
  phone: [phoneStr()],
  idcard: [idCardStr()],
  email: [emailStr()],
  region: [NotRadio('活动地址')],
  date: [NotRadio('活动时间')],
  type: [NotSelect('活动类型')],
  resource: [NotRadio('活动来源')],
  desc: [NotEmpty('活动描述')],
}
</script>

