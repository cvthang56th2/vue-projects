<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import AuthServices from '../../firebase/auth/auth'
import UserServices from '../../firebase/user/user'
import { useAuthStore } from '../../stores/ChatApp/auth';
import { useShopStore } from '../../stores/Shop/shop';
import PopupCarts from './PopupCarts.vue';
import PopupOrders from './PopupOrders.vue';
import PopupAuthentication from '../PopupAuthentication.vue';

const authStore = useAuthStore()
const shopStore = useShopStore()
const showPopupCarts = ref(false)
const showMenu = ref(false)
const showPopupOrders = ref(false)
const logout = () => {
  Swal.fire({
    title: 'Are you sure want to Logout?',
    showCancelButton: true,
    confirmButtonText: 'Yes',
  }).then((result) => {
    if (result.isConfirmed) {
      AuthServices.logout()
      authStore.currentUser = null
      showMenu.value = false
    }
  })
}
const onClickAuth = () => {
  if (authStore.currentUser?.userName) {
    showMenu.value = true
  } else {
    authStore.showPopupAuthentication = true
  }
}
const hideMenu = () => {
  showMenu.value = false
}
onBeforeUnmount(() => {
  document.removeEventListener('click', hideMenu)
})
const checkLogin = (cb) => {
  if (!authStore.currentUser?.uid) {
    authStore.showPopupAuthentication = true
    return
  }
  if (typeof cb === 'function') {
    cb()
  }
}
onMounted(() => {
  document.addEventListener('click', hideMenu)
  AuthServices.onAuthStateChanged(async (res) => {
    const { uid } = res || {}
    if (uid) {
      const userInfo = await UserServices.getUserById(uid)
      if (userInfo) {
        authStore.currentUser = userInfo
        if (userInfo.carts) {
          shopStore.carts = JSON.parse(userInfo.carts)
        }
        if (userInfo.orders) {
          shopStore.orders = JSON.parse(userInfo.orders)
        }
      }
    }
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
  <ul class="flex items-center">
    <li class="mr-3 hover:underline cursor-pointer" @click="checkLogin(() => showPopupCarts = true)">Cart ({{shopStore.cartsArr.length}})</li>
    <li class="mr-3 hover:underline cursor-pointer" @click="checkLogin(() => showPopupOrders = true)">Orders ({{shopStore.orders.length}})</li>
    <li class="relative">
      <button class="bg-red-300 text-white px-3 py-1" @click.stop="onClickAuth">{{ authStore.currentUser && authStore.currentUser.userName ? `Hi, ${authStore.currentUser.userName}!` : 'Login' }}</button>
      <ul v-if="showMenu" class="w-[100px] mt-1 absolute top-full right-0 bg-red-400 text-white z-[2]">
        <li class="border-b-2 py-1 px-1 cursor-pointer">View Profile</li>
        <li class="py-1 px-1 cursor-pointer" @click="logout">Logout</li>
      </ul>
    </li>
  </ul>
  <PopupAuthentication v-model="authStore.showPopupAuthentication" />
  <PopupCarts v-model="showPopupCarts" />
  <PopupOrders v-model="showPopupOrders" />
</div>
</template>