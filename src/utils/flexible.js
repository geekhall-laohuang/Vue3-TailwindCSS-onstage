import { computed } from 'vue'

/**
 * 判断当前是否为移动设备
 */
export const isMobileTerminal = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
})

/**
 * 动态指定 rem 基准值 最大为 40px
 * 根据用户的屏幕宽度 进行计算  在赋值给 html 作为 fontsize 大小
 */
export const useREM = () => {
  //定义 最大的 fontsize
  const MAX_FONT_SIZE = 40
  //监听 html 文档被解析完成的事件
  document.addEventListener('DOMContentLoaded', () => {
    //拿到html
    const html = document.querySelector('html')
    //计算 fontsize 根据屏幕宽度 / 10
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    //赋值给 html
    html.style.fontSize = fontSize + 'px'
  })
}
