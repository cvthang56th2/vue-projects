<script setup>
import { onMounted, ref } from 'vue';
import ListProducts from '../../../components/Shop/ListProducts.vue';
import Navbar from '../../../components/Shop/Navbar.vue';

const products = ref([])
const getProducts = category => {
  const apiUrl = category ? `https://fakestoreapi.com/products/category/${category}` : 'https://fakestoreapi.com/products'
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      products.value = data
    })
}
onMounted(() => {
  getProducts()
})
</script>
<template>
  <div class="h-full p-5 flex flex-col">
    <Navbar />
    <div class="flex-1 overflow-y-auto">
      <ListProducts :products="products" />
    </div>
  </div>
</template>