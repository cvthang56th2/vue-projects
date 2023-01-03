import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAuthStore } from '../ChatApp/auth'
import UserServices from '../../firebase/user/user'

export const useShopStore = defineStore('shop', () => {
  const authStore = useAuthStore()
  const carts = ref({})
  const orders = ref([])
  const cartsArr = computed(() => {
    return Object.keys(carts.value).map(id => {
      const cartObj = carts.value[id]
      cartObj.total = Number(cartObj.quantity * cartObj.product.price).toFixed(2)
      return cartObj
    })
  })
  const total = computed(() => cartsArr.value.reduce((result, item) => {
    result = Number(result) + Number(item.total)
    return Number(result).toFixed(2)
  }, 0))

  const updateUserCart = () => {
    if (!authStore.currentUser?.uid) {
      authStore.showPopupAuthentication = true
      return
    }
    UserServices.update(authStore.currentUser.uid, {
      carts: JSON.stringify(carts.value)
    })
  }

  const updateUserOrders = () => {
    if (!authStore.currentUser?.uid) {
      authStore.showPopupAuthentication = true
      return
    }
    UserServices.update(authStore.currentUser.uid, {
      carts: JSON.stringify(carts.value),
      orders: JSON.stringify(orders.value)
    })
  }

  const addToCart = productObj => {
    if (!authStore.currentUser?.uid) {
      authStore.showPopupAuthentication = true
      return
    }
    const quantity = (carts.value[productObj.id]?.quantity || 0) + 1
    carts.value[productObj.id] = {
      quantity,
      inputQuantity: quantity,
      product: JSON.parse(JSON.stringify(productObj)),
    }
    updateUserCart()
  }
  
  const removeFromCart = productId => {
    delete carts.value[productId]
    updateUserCart()
  }

  const createNewOrder = () => {
    if (!cartsArr.value.length) {
      return
    }
    orders.value.push({
      carts: cartsArr.value,
      total: total.value,
      createdAt: new Date()
    })
    carts.value = {}
    updateUserOrders()
  }
  
  const cancelOrder = orderIndex => {
    orders.value[orderIndex].status = 'canceled'
    updateUserOrders()
  }

  return {
    carts,
    cartsArr,
    total,
    orders,
    addToCart,
    updateUserCart,
    removeFromCart,
    createNewOrder,
    cancelOrder
  }
})