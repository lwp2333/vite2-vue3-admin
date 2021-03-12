import { message } from 'ant-design-vue'

// 注册一个全局自定义指令 `v-focus`
const focus = {
  // 当被绑定的元素插入到 DOM 中时……
  mounted(el) {
    // Focus the element
    el.focus()
  },
}
// 注册一个全局自定义指令 `v-copy`
const copy = {
  mounted(el, binding) {
    el.style.cursor = 'pointer'
    const handler = () => {
      const textarea = document.createElement('textarea')
      textarea.readOnly = 'readOnly'
      textarea.value = binding.value || el.innerText
      document.body.appendChild(textarea)
      textarea.select()
      textarea.setSelectionRange(0, textarea.value.length)
      const result = document.execCommand('Copy')
      if (result) {
        message.success(`已复制：${textarea.value}`)
      }
      document.body.removeChild(textarea)
    }
    el.addEventListener('click', handler)
  },
}
export default {
  focus,
  copy,
}
