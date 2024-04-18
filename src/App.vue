<template>
  <!-- 一级路由出口 -->
  <div class="h-screen w-screen fixed top-0 left-0">
    <!-- <router-view /> -->
    <m-transition-router-view
      :routerType="$store.getters.routerType"
      mainComponentName="home"
    >
    </m-transition-router-view>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
