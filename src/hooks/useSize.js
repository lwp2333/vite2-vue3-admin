import { onMounted, reactive, toRefs, isRef, nextTick } from 'vue'
import useWinResize from './useWinResize'
/**
 *
 * @param {dom id节点或者 ref句柄} target
 */https://github.com/lwp2333/Vite2Admin/blob/master/src/hooks/useSIze.js
export default function useSize(target) {
  const size = reactive({
    width: 0,
    height: 0,
  })
  const getSizeInfo = () => {
    const targetDom = isRef(target) ? target.value : document.getElementById(target)
    size.width = targetDom.offsetWidth
    size.height = targetDom.offsetHeight
  }
  useWinResize(getSizeInfo)
  onMounted(() => {
    setTimeout(() => {
      getSizeInfo()
    }, 120)
  })
  return { ...toRefs(size) }
}
