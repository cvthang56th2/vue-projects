<script setup>
</script>
<template>
<div class="flex justify-between items-center mb-5">
  <h1 class="text-2xl font-bold cursor-pointer">
    <router-link :to="{path: `/shop`}">
      Shop
    </router-link>
  </h1>
  <ul class="flex">
    <li class="mr-3 hover:underline cursor-pointer">Cart</li>
    <li class="mr-3 hover:underline cursor-pointer">Orders</li>
    <li class="bg-red-300 text-white px-3 py-1">Hi, John</li>
  </ul>
</div>
</template>