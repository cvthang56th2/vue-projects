<script setup>
import { useShopStore } from '../../stores/Shop/shop';
import Popup from '../Popup.vue'
import Carts from './Carts.vue'
const props = defineProps({
  modelValue: Boolean
})
const emit = defineEmits(['update:modelValue'])
const shopStore = useShopStore()
const removeCart = productId => {
  Swal.fire({
    title: 'Are you sure want to remove this product from carts?',
    showCancelButton: true,
    confirmButtonText: 'Remove',
  }).then((result) => {
    if (result.isConfirmed) {
      shopStore.removeFromCart(productId)
      Swal.fire('Removed!', '', 'success')
    }
  })
}
const order = () => {
  if (!shopStore.cartsArr.length) {
    return
  }
  Swal.fire({
    title: 'Are you sure want to Create new Order?',
    showCancelButton: true,
    confirmButtonText: 'Yes',
  }).then((result) => {
    if (result.isConfirmed) {
      shopStore.createNewOrder()
      Swal.fire('Created!', '', 'success')
      close()
    }
  })
}
const close = () => {
  emit('update:modelValue', false)
}
const onChangeQuantity = productId => {
  const quantity = Number(shopStore.carts[productId].inputQuantity)
  if (!quantity || isNaN(quantity) || quantity <= 0) {
    Swal.fire({
      title: 'Are you sure want to remove this product from carts?',
      showCancelButton: true,
      confirmButtonText: 'Remove',
    }).then((result) => {
      if (result.isConfirmed) {
        shopStore.removeFromCart(productId)
      } else {
        shopStore.carts[productId].inputQuantity = shopStore.carts[productId].quantity
      }
    })
  } else {
    shopStore.carts[productId].quantity = quantity
  }
}
</script>

<template>
  <Popup :model-value="modelValue" @update:modelValue="$emit('update:modelValue', $event)" :title="'Carts'" hide-buttons>
    <Carts :carts="shopStore.cartsArr" :total="shopStore.total" show-remove quantity-editable @removeCart="removeCart" @changeQuantity="onChangeQuantity" />
    <div class="flex justify-end mt-5">
      <button class="text-white bg-blue-500 px-5 py-2 rounded-md" @click="order">Order</button>
    </div>
  </Popup>
</template>