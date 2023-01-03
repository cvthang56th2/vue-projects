<script setup>
import { useShopStore } from '../../stores/Shop/shop';
import { formatDate } from '../../utils/utils'
import Popup from '../Popup.vue'
import Carts from './Carts.vue'

const props = defineProps({
  modelValue: Boolean
})
const shopStore = useShopStore()
const cancelOrder = orderIndex => {
  Swal.fire({
    title: 'Are you sure want to cancel this order?',
    showCancelButton: true,
    confirmButtonText: 'Yes',
  }).then((result) => {
    if (result.isConfirmed) {
      shopStore.cancelOrder(orderIndex)
      Swal.fire('Canceled!', '', 'success')
    }
  })
}
</script>

<template>
  <Popup :model-value="modelValue" @update:modelValue="$emit('update:modelValue', $event)" :title="'Carts'" hideCancel>
    <template v-if="shopStore.orders.length">
      <div v-for="(orderObj, oIndex) in shopStore.orders" :key="`cart-${oIndex}`" class="border-b-2 mb-4 last:mb-0">
        <div class="flex justify-between">
          <div class="text-gray-400 font-semibold">Order #{{ oIndex + 1 }}</div>
          <div>Created At: {{ formatDate(orderObj.createdAt) }}</div>
        </div>
        <Carts :carts="orderObj.carts" :total="orderObj.total" />
        <div class="py-2 flex justify-end">
          <span v-if="orderObj.status === 'canceled'" class="bg-gray-500 text-white px-2">CANCLED</span>
          <button v-else @click="cancelOrder(oIndex)" class="text-sm bg-red-500 rounded-md px-2 text-white py-1">Cancel</button>  
        </div>
      </div>
    </template>
    <div v-else class="py-2 text-center">
      No item added.
    </div>
  </Popup>
</template>