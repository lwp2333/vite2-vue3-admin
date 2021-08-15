<template>
  <div class="cardInfo">
    <div class="card--title">{{ title }}</div>
    <div class="card-content">
      <slot>内容</slot>
    </div>
    <div class="card-footer">
      <span class="info">
        <span class="label">来源：</span>
        <span class="value">{{ source }}</span>
      </span>
      <span class="info">
        <span class="label">更新时间：</span>
        <span class="value">{{ updateTime }}</span>
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  source: String,
  updateTime: String,
})
</script>

<style scoped lang="less">
.cardInfo {
  // content-visibility: auto;
  width: 100%;
  height: 100%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  .card--title {
    font-size: 18px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.6);
    line-height: 16px;
    letter-spacing: 0px;
  }
  .card-content {
    flex: 1;
    padding-top: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .label {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
      line-height: 14px;
      letter-spacing: 0px;
    }
    .value {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
      font-weight: 600;
      line-height: 14px;
    }
  }
}
</style>
