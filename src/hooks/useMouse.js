import { ref, onMounted, onUnmounted } from 'vue'

export default function useMouse() {
  const x = ref(0)
  const y = ref(0)
  const updateXY = e => {
    x.value = e.x
    y.value = e.y
  }
  onMounted(() => {
    document.addEventListener('mousemove', updateXY)
  })
  onUnmounted(() => {
    document.removeEventListener('mousemove', updateXY)
  })
  return { x, y }
}
