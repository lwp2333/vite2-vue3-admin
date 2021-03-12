import { ref, onMounted, onUnmounted, watch } from 'vue'

export default function useInterval(Action = () => {}, delay = 1000, immediate = false) {
  let timerInstance = null
  const interval = ref(delay)
  const startInterval = () => {
    immediate && Action()
    timerInstance = setInterval(() => {
      Action()
    }, interval.value)
  }
  const clear = () => {
    timerInstance && clearInterval(timerInstance)
  }
  const setTime = val => {
    interval.value = val
  }
  const restTime = () => {
    interval.value = delay
  }
  const stopWatch = watch(interval, () => {
    clear()
    timerInstance = setInterval(() => {
      Action()
    }, interval.value)
  })
  onMounted(() => {
    startInterval()
  })
  onUnmounted(() => {
    clear()
    stopWatch()
  })
  return [timerInstance, setTime, restTime, clear, startInterval]
}
