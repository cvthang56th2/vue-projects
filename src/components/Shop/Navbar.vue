<script setup>
import { ref } from 'vue';
import { useShopStore } from '../../stores/Shop/shop';
import PopupCarts from './PopupCarts.vue';
import PopupOrders from './PopupOrders.vue';

const shopStore = useShopStore()
const showPopupCarts = ref(false)
const showPopupOrders = ref(false)
</script>
<template>
<div class="flex justify-between items-center mb-5">
  <h1 class="text-2xl font-bold cursor-pointer">
    <router-link :to="{path: `/shop`}">
      Shop
    </router-link>
  </h1>
  <ul class="flex items-center">
    <li class="mr-3 hover:underline cursor-pointer" @click="showPopupCarts = true">Cart ({{shopStore.cartsArr.length}})</li>
    <li class="mr-3 hover:underline cursor-pointer" @click="showPopupOrders = true">Orders ({{shopStore.orders.length}})</li>
    <li class="bg-red-300 text-white px-3 py-1">Hi, John</li>
  </ul>
  <PopupCarts v-model="showPopupCarts" />
  <PopupOrders v-model="showPopupOrders" />
</div>
</template>