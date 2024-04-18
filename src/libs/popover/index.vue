<template>
  <div class="relative" @mouseenter="onMoussenter" @mouseleave="onMouseleave">
    <div ref="referenceTarget">
      <!-- 具名插槽 ： 触发弹层的视图 -->
      <slot name="reference" />
    </div>
    <!-- 气泡展示 -->
    <transition name="slide">
      <div
        ref="contentTarget"
        v-show="isVisable"
        class="absolute p-1 z-20 bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-md"
        :style="contentStyle"
      >
        <!-- 匿名插槽： 弹出层视图中展示的内容 -->
        <slot />
      </div>
    </transition>
  </div>
</template>
<script>
// 延迟关闭时间
const DELAY_TIME = 100

// 气泡位置
const PROP_TOP_LEFT = 'top-left'
const PROP_TOP_RIGHT = 'top-right'
const PROP_BOTTOM_LEFT = 'bottom-left'
const PROP_BOTTOM_RIGHT = 'bottom-right'

// 定义指定位置的 Enum
const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]
</script>

<script setup>
import { nextTick, ref, watch } from 'vue'
/**
 *  1. 指定所有可选位置的常量 并生成 enum
 *  2. 通过props 控制指定位置
 *  3. 获取元素的DOM， 创建读取元素尺寸的方法
 *  4. 生成气泡的样式对象， 用来控制每个位置对应的样式
 *  5. 根据 prop， 计算样式对象
 */
const props = defineProps({
  //控制气泡弹出的位置， 给出错误提示
  plcacement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator(val) {
      const result = placementEnum.includes(val)
      if (!result) {
        throw new Error(
          `你的 placement 必须是 ${placementEnum.join('、')}中的一个`
        )
      }
      return result
    }
  }
})

const isVisable = ref(false)

/**
 *  鼠标移入触发
 */
let timeout
const onMoussenter = () => {
  isVisable.value = true
  if (timeout) {
    clearInterval(timeout)
  }
}

const onMouseleave = () => {
  timeout = setTimeout(() => {
    isVisable.value = false
    timeout = null
  }, DELAY_TIME)
}

/**
 *  计算元素的尺寸
 */
const referenceTarget = ref('')
const contentTarget = ref('')
const useElementSize = (target) => {
  if (!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}

/**
 * 气泡样式
 */
const contentStyle = ref({
  top: 0,
  left: 0
})

//期望气泡展示的时候再进行计算
watch(isVisable, (val) => {
  if (!val) return
  //等待元素渲染
  nextTick(() => {
    switch (props.plcacement) {
      //左上
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width + 'px'
        break

      //右上
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          -useElementSize(referenceTarget.value).width + 'px'
        break

      //左下
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width + 'px'
        break

      //右下
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          -useElementSize(referenceTarget.value).width + 'px'
        break
    }
  })
})
</script>

<style lang="scss" scoped>
.slide-enter-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
