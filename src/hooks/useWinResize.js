import { onMounted, onBeforeUnmount } from 'vue'

export default function useWinResize(Action = () => {}) {
  const fn = () => {
    /**
     * 延迟更新重绘等操作
     */
    setTimeout(Action, 120)
  }
  onMounted(() => {
    window.addEventListener('resize', fn, false)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', fn)
  })
  return null
}
