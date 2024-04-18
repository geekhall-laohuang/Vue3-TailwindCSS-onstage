<template>
  <div class="overflow-auto flex flex-col items-center">
    <m-svg-icon
      name="close"
      v-if="isMobileTerminal"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      fillClass="fill-zinc-900 dark:fill-zinc-200"
      @click="close"
    ></m-svg-icon>
    <img :src="blob" ref="imageTarget" alt="" />
    <m-button
      class="mt-4 w-[80%] xl:1/2"
      @click="onConfirmClick"
      :loading="loading"
      >确定</m-button
    >
  </div>
</template>

<script>
const EMIT_CLOSE = 'close'
</script>

<script setup>
import { ref, onMounted } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { isMobileTerminal } from '@/utils/flexible'
import { getOSSClient } from '@/utils/sts'
import { useStore } from 'vuex'
import { message } from '@/libs'
import { putProfile } from '@/api/sys'

defineProps({
  blob: {
    type: String,
    required: true
  }
})

const emits = defineEmits([EMIT_CLOSE])

const store = useStore()

const loading = ref(false)

/**
 * 确定按钮的点击事件
 */
const onConfirmClick = () => {
  loading.value = true
  // 拿到裁剪后的图片
  cropper.getCroppedCanvas().toBlob((blob) => {
    // 裁剪后的 blob 地址

    putObjectToOSS(blob)
  })
}

/**
 * 进行 OSS 上传
 */
let ossClient
const putObjectToOSS = async (file) => {
  if (!ossClient) {
    ossClient = await getOSSClient()
  }
  try {
    const fileTypeArr = file.type.split('/')
    const fileName = `${store.getters.userInfo.username}/${Date.now()}.${
      fileTypeArr[fileTypeArr.length - 1]
    }`
    // 1. 存放的路径(包含名称)
    // 2. file
    const res = await ossClient.put(`images/${fileName}`, file)
    onChangeProfile(res.url)
  } catch (e) {
    message('error', e)
  }
}

/**
 * 上传新头像到服务器
 */
const onChangeProfile = async (avatar) => {
  // 更新本地数据
  store.commit('user/setUserInfo', {
    ...store.getters.userInfo,
    avatar
  })
  // 更新服务器数据
  await putProfile(store.getters.userInfo)
  message('success', '用户头像修改成功')
  // loading
  loading.value = false
  close()
}

// 移动端配置对象
const mobileOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: 'move',
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可调整裁剪框大小
  cropBoxResizable: false
}

// PC 端配置对象
const pcOptions = {
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1
}

/**
 * 图片裁剪处理
 */
const imageTarget = ref(null)
let cropper = null
onMounted(() => {
  /**
   * 接收两个参数：
   * 1. 需要裁剪的图片 DOM
   * 2. options 配置对象
   */
  cropper = new Cropper(
    imageTarget.value,
    isMobileTerminal.value ? mobileOptions : pcOptions
  )
})

/**
 * 关闭按钮的点击事件
 */
const close = () => {
  emits(EMIT_CLOSE)
}
</script>
