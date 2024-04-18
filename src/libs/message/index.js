import messageComponent from './index.vue'
import { h, render } from 'vue'
/**
 *
 * @param {*} type  类型: success . warn . error
 * @param {*} content  描述文本
 * @param {*} duration  展示时长  默认 3000
 */

export const message = (type, content, duration = 3000) => {
  // 动画结束时的回调
  const onDestory = () => {
    // 3. 删除 render
    render(null, document.body)
  }
  // 1. 拿到vnode
  const vnode = h(messageComponent, {
    type,
    content,
    duration,
    destory: onDestory
  })
  // 2. render vnode
  render(vnode, document.body)
}
