import { onMounted, reactive, toRefs } from 'vue'
import useWinResize from './useWinResize'
/**
 *
 * @param {dom id节点或者 ref句柄} target
 */
export default function useDeviceInfo(mapList) {
  const deviceInfo = reactive({
    deviceWidth: 0,
    deviceHeight: 0,
    devicePixelRatio: 1,
    deviceScreenType: 'xs',
    mapResultWidth: '100%'
  })
  const map = { ...mapList }
  const getDeviceInfo = () => {
    deviceInfo.deviceWidth = document.body.clientWidth
    deviceInfo.deviceHeight = document.body.clientHeight
    deviceInfo.devicePixelRatio = window.devicePixelRatio
    const { deviceWidth } = deviceInfo
    if (deviceWidth < 576) {
      deviceInfo.deviceScreenType = 'xs'
    } else if (deviceWidth < 768) {
      deviceInfo.deviceScreenType = 'sm'
    } else if (deviceWidth < 992) {
      deviceInfo.deviceScreenType = 'md'
    } else if (deviceWidth < 1200) {
      deviceInfo.deviceScreenType = 'lg'
    } else if (deviceWidth < 1600) {
      deviceInfo.deviceScreenType = 'xl'
    } else {
      deviceInfo.deviceScreenType = 'xxl'
    }
    deviceInfo.mapResultWidth = map[deviceInfo.deviceScreenType]
  }
  onMounted(() => {
    getDeviceInfo()
  })
  useWinResize(getDeviceInfo)
  return { ...toRefs(deviceInfo) }
}
