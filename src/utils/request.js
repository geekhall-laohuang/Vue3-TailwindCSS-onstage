import axios from 'axios'
import store from '@/store'

const service = axios.create({
  //根据项目的状态 自动切换开发状态
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      // 如果token存在 注入token
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    config.headers.icode = 'helloqianduanxunlianying'
    return config // 必须返回配置
  },
  (err) => {}
)

/**
 * 响应拦截器
 * 服务器返回数据之后 ， 前端.then() 之前被调用
 */
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    //   要根据success的成功与否决定下面的操作
    if (success) {
      return data
    } else {
      // TODO：业务错误
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // 处理 token 超时
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // 退出操作
      store.dispatch('user/logout')
    }
    return Promise.reject(error)
  }
)

export default service
