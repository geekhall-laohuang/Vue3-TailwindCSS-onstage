// 频道名
const LOGIN_SUCCESS_CHANNEL = 'LOGIN_SUCCESS_CHANNEL'

// 官方声明 safari 支持 BroadcastChannel ，但是实测 15.3 的版本并不支持 ，所以我们需要对其进行判定使用，在不支持 BroadcastChannel 的浏览器中，使用 localstorage
let broadcastChannel = null
if (window.BroadcastChannel) {
  broadcastChannel = new BroadcastChannel(LOGIN_SUCCESS_CHANNEL)
}

/**
 * 等待回调，它将返回一个 promise，并携带对应的数据
 */
const wait = () => {
  return new Promise((resolve, reject) => {
    if (broadcastChannel) {
      // 触发 message 事件时的回调函数
      broadcastChannel.onmessage = async (event) => {
        // 改变 promise 状态
        resolve(event.data)
      }
    } else {
      // 触发 localStorage 的 setItem 事件时回调函数
      window.onstorage = (e) => {
        // 判断当前的事件名
        if (e.key === LOGIN_SUCCESS_CHANNEL) {
          // 改变 promise 状态
          resolve(JSON.parse(e.newValue))
        }
      }
    }
  })
}

/**
 * 发送消息。
 * broadcastChannel：触发 message
 * localStorage：触发 setItem
 */
const send = (data) => {
  if (broadcastChannel) {
    broadcastChannel.postMessage(data)
  } else {
    localStorage.setItem(LOGIN_SUCCESS_CHANNEL, JSON.stringify(data))
  }
}

/**
 * 清除
 */
const clear = () => {
  if (broadcastChannel) {
    broadcastChannel.close()
    broadcastChannel = null
  }
  localStorage.removeItem(LOGIN_SUCCESS_CHANNEL)
}

export default {
  wait,
  send,
  clear
}
