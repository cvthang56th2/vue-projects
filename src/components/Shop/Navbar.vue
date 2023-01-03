<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'

const categories = ref([])
const route = useRoute();  

onMounted(() => {
  fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(data => {
      categories.value = data
    })
})
</script>
<template>
<div class="flex justify-between items-center mb-5">
  <h1 class="text-2xl font-bold cursor-pointer">
    <router-link :to="{path: `/shop`}">
      Shop
    </router-link>
  </h1>
  <ul class="flex">
    <li
      v-for="(category, cIndex) in categories"
      :key="`category-${cIndex}`"
      class="mr-3 hover:underline cursor-pointer capitalize"
      :class="route.params.category === category ? 'text-green-500' : ''"
    >
      <router-link :to="{path: `/shop/${category}`}">
        {{ category }}
      </router-link>
    </li>
    <li class="mr-3 hover:underline cursor-pointer">Cart</li>
    <li class="mr-3 hover:underline cursor-pointer">Orders</li>
    <li class="bg-red-300 text-white px-3 py-1">Hi, John</li>
  </ul>
</div>
</template>