import { watch, ref, onMounted, onUnmounted } from 'vue'

export default function useFullscreen() {
  let isFullscreen = ref(document.fullscreenElement)

  watch(isFullscreen, () => {
    if (isFullscreen.value) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  })
  // const keyDownChangeIsfull = event => {
  //   if (event && event.keyCode === 122) {
  //     isFullscreen.value = !!document.fullscreenElement
  //   }
  //   console.log(isFullscreen.value)
  // }
  // onMounted(() => {
  //   window.addEventListener('keydown', keyDownChangeIsfull, false)
  // })
  // onUnmounted(() => {
  //   window.removeEventListener('keydown', keyDownChangeIsfull)
  // })
  const setFull = () => {
    isFullscreen.value = true
  }
  const exitFull = () => {
    isFullscreen.value = false
  }
  const toggleFull = () => {
    isFullscreen.value = !isFullscreen.value
  }
  return { isFullscreen, setFull, exitFull, toggleFull }
}
