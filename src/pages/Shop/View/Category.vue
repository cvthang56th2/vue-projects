<script setup>
import { onMounted, ref } from 'vue';
import ListProducts from '../../../components/Shop/ListProducts.vue';
import Navbar from '../../../components/Shop/Navbar.vue';
import { useRoute } from 'vue-router'

const products = ref([])
const route = useRoute();  

const getProducts = () => {
  const apiUrl = `https://fakestoreapi.com/products/category/${route.params.category}`
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      products.value = data || []
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