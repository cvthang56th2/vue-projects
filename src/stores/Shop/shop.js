import { defineStore } from 'pinia'
import { computed, nextTick, ref } from 'vue'

export const useShopStore = defineStore('shop', () => {
  const carts = ref({})
  const orders = ref([])
  const cartsArr = computed(() => Object.keys(carts.value).map(id => {
    const cartObj = carts.value[id]
    cartObj.total = Number(cartObj.quantity * cartObj.product.price).toFixed(2)
    return cartObj
  }))
  const total = computed(() => cartsArr.value.reduce((result, item) => {
    result = Number(result) + Number(item.total)
    return Number(result).toFixed(2)
  }, 0))

  const addToCart = productObj => {
    const quantity = (carts.value[productObj.id]?.quantity || 0) + 1
    carts.value[productObj.id] = {
      quantity,
      inputQuantity: quantity,
      product: JSON.parse(JSON.stringify(productObj)),
    }
  }
  
  const removeFromCart = productId => {
    delete carts.value[productId]
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
  }
  
  const cancelOrder = orderIndex => {
    orders.value.splice(orderIndex, 1)
  }

  return {
    carts,
    cartsArr,
    total,
    orders,
    addToCart,
    removeFromCart,
    createNewOrder,
    cancelOrder
  }
})