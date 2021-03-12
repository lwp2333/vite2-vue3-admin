<template>
  点击复制（v-copy指令）：
  <a-tag v-copy color="blue"> {{ text }} </a-tag>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="Activity name" name="name">
      <a-input v-focus v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="Activity zone" name="region">
      <a-select v-model:value="formState.region" placeholder="please select your zone">
        <a-select-option value="shanghai">Zone one</a-select-option>
        <a-select-option value="beijing">Zone two</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="Activity time" name="date">
      <a-date-picker
        v-model:value="formState.date"
        format="YYYY-MM-DD"
        valueFormat="YYYY-MM-DD"
        show-time
        type="date"
        placeholder="Pick a date"
      />
    </a-form-item>
    <a-form-item label="Instant delivery" name="delivery">
      <a-switch v-model:checked="formState.delivery" />
    </a-form-item>
    <a-form-item label="Activity type" name="type">
      <a-checkbox-group v-model:value="formState.type">
        <a-checkbox value="1" name="type">Online</a-checkbox>
        <a-checkbox value="2" name="type">Promotion</a-checkbox>
        <a-checkbox value="3" name="type">Offline</a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="Resources" name="resource">
      <a-radio-group v-model:value="formState.resource">
        <a-radio value="1">Sponsor</a-radio>
        <a-radio value="2">Venue</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="Activity form" name="textarea">
      <a-input v-model:value="formState.desc" type="textarea" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-space size="large">
        <a-button @click="onCancel">Cancel</a-button>
        <a-button type="primary" @click="onSubmit">Create</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive } from 'vue'
import { Moment } from 'moment'
const formList = reactive([])
const formState = reactive({
  name: '',
  region: undefined,
  date: undefined,
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const labelCol = { span: 4 }
const wrapperCol = { span: 8 }
const onCancel = () => {}
const onSubmit = () => {}
const text = `思念变成海，在窗外进不来`
</script>

<style lang="less">
.box {
  height: 1200px;
}
</style>
