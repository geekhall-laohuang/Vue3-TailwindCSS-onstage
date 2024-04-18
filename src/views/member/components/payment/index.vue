<template>
  <!-- PC 端 -->
  <pc-payment-vue v-if="!isMobileTerminal" :payData="payData"></pc-payment-vue>
  <!-- 移动端 -->
  <mobile-payment-vue v-if="isMobileTerminal" :payData="payData">
  </mobile-payment-vue>
</template>
<script setup>
import pcPaymentVue from './pc-payment/index.vue'
import mobilePaymentVue from './mobile-payment/index.vue'
import { isMobileTerminal } from '@/utils/flexible'

defineProps({
  payData: Object
})
</script>
