<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <div class="flex flex-col h-screen">
    <div>
      <RouterLink to="/" class="p-3 text-lg text-purple-500 font-semibold">Vue Projects</RouterLink>
    </div>
    <div class="flex-1 overflow-y-auto">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
</style>
