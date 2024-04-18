<template>
  <div>
    <span id="qqLoginBtn" v-show="false"></span>
    <m-svg-icon
      class="w-4 cursor-pointer"
      name="qq"
      @click="onQQLogin"
    ></m-svg-icon>
  </div>
</template>

<script>
// QQ 登录的 URL
const QQ_LOGIN_URL =
  'https://graph.qq.com/oauth2.0/authorize?client_id=101998494&response_type=token&scope=all&redirect_uri=https%3A%2F%2Fimooc-front.lgdsunday.club%2Flogin'
</script>

<script setup>
import { onMounted } from 'vue'
import brodacast from './brodacast'
import { oauthLogin } from './oauth'
import { LOGIN_TYPE_QQ } from '@/constants'

// QQ 登录挂起
onMounted(() => {
  QC.Login(
    {
      btnId: 'qqLoginBtn'
    },
    // 登录成功之后的回调，但是需要注意，这个回调只会在《登录回调页面中被执行》
    // 登录存在缓存，登录成功一次之后，下次进入会自动重新登录（即：触发该方法，所以我们应该在离开登录页面时，注销登录）
    ({ nickname, figureurl_qq_2 }, opts) => {
      console.log('qq')
      console.log(data)
      // 注销登录， 防止下次打开页面直接展示上一次的用户信息
      QC.Login.signOut()
      // 拿到qq用户的唯一标识， 通过这个标识来判断用户是否已经注册
      const accessToken = /access_token=((.*))&expires_in/.exec(
        window.location.hash
      )[1]
      // 3. 拼接请求对象
      const oauthObj = {
        nickname: data.nickname,
        figureurl_qq_2: data.figureurl_qq_2,
        accessToken
      }
      brodacast.send(oauthObj)

      // 移动端下没有窗口的概念
      oauthLogin(LOGIN_TYPE_QQ, oauthobj)

      window.close()
    }
  )
})
/**
 * 登录按钮事件
 */
const onQQLogin = () => {
  openQQWindow()
}

/**
 * 处理 qq 登录视窗
 */
const openQQWindow = async () => {
  window.open(
    QQ_LOGIN_URL,
    'oauth2Login_10609',
    'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes'
  )
  // 等待
  brodacast.wait().then((oauthobj) => {
    brodacast.clear()
    // 登录操作
    console.log('TODO：执行登录操作')
    console.log(oauthObj)
    oauthLogin(LOGIN_TYPE_QQ, oauthobj)
  })
}
</script>
