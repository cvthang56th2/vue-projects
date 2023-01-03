<script setup>
import { onMounted, ref } from 'vue';
import ListProducts from '../../../components/Shop/ListProducts.vue';
import Navbar from '../../../components/Shop/Navbar.vue';
import ProductServices from '../../../firebase/product/product'

const products = ref([])
const getProducts = categoryId => {
  ProductServices.getProducts(data => {
    products.value = (data || [])
    if (categoryId) {
      products.value = products.value.filter(e => e.categoryId === categoryId)
    }
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