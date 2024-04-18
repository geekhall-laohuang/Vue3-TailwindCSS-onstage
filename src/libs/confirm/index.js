import { h, render } from 'vue'
import confrimComponent from './index.vue'

/**
 *  展示 confirm 用户只传递一个参数 ， 那么这个参数 为 content
 * @param {*} title 标题 （如果没有传递内容 标题作为内容）
 * @param {*} content 内容 （如果没有title， 那么content会作为第一个参数传入）
 * @param {*} cancelText 取消按钮文本
 * @param {*} confirmText 确认按钮文本
 */
export const confirm = (title, content, cancelText, confirmText) => {
  return new Promise((resolve, rejct) => {
    if (title && !content) {
      content = title
      title = ''
    }

    /**
     * 关闭的回调
     */
    const close = () => {
      // 3. 把渲染的 vnode 去掉
      render(null, document.body)
    }

    /**
     * 取消按钮的回调
     */
    const cancelHandler = () => {
      rejct(new Error('取消按钮点击'))
    }

    /**
     * 确定按钮的回调
     */
    const confirmHandler = () => {
      resolve()
    }

    //1. 生成 vnode
    const vnode = h(confrimComponent, {
      title,
      content,
      cancelText,
      confirmText,
      cancelHandler,
      confirmHandler,
      close
    })
    // 2. render 渲染
    render(vnode, document.body)
  })
}
