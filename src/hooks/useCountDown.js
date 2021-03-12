import { ref, onMounted, onUnmounted, watch } from 'vue'

export default function useCountDown(Action, num) {
  const count = ref(num)
  let timer = null
  onMounted(() => {
    timer = setInterval(() => {
      count.value--
    }, 1000)
  })
  watch([count], () => {
    if (count.value === 0) {
      timer && clearInterval(timer)
      Action()
    }
  })
  onUnmounted(() => {
    timer && clearInterval(timer)
  })
  return count
}
