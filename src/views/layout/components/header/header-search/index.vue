<template>
  <div class="w-full guide-search">
    <m-search v-model="inputValue" @search="onSearchHandler">
      <template #dropdown>
        <div>
          <!-- 搜索提示 -->
          <hint-vue
            :searchText="inputValue"
            v-show="inputValue"
            @itemClick="onSearchHandler"
          ></hint-vue>
          <!-- 最近搜索 -->
          <history-vue
            v-show="!inputValue"
            @itemClick="onSearchHandler"
          ></history-vue>
        </div>
        <!-- 推荐主题 -->
        <theme-vue v-show="!inputValue"></theme-vue>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import hintVue from './hint.vue'
const inputValue = ref('')
import historyVue from './history.vue'
import themeVue from './theme.vue'

import { useStore } from 'vuex'

const store = useStore()
/**
 * 搜索回调
 */

const onSearchHandler = (val) => {
  inputValue.value = val
  console.log(val)
  if (val) {
    store.commit('search/addHistory', val)
    // 触发 searchText 变化
    store.commit('app/changeSearchText', val)
  }
}
</script>
