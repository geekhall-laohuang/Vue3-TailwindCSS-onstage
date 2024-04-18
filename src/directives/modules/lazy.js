import { useIntersectionObserver } from '@vueuse/core'

export default {
  // 图片懒加载 : 在用户无法看到时， 不加载图片 ，用户可以看到时， 加载图片
  mounted(el) {
    // 1. 拿到 img 的 src
    const imgSrc = el.src
    // 2. 把 src 变成 空
    el.src = ''

    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 3.  当图片看见时， 加载图片
        el.src = imgSrc
        // 4.  停止监听
        stop()
      }
    })
  }
}
