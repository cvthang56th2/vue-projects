<script setup>
defineProps({
  quantityEditable: Boolean,
  total: String | Number,
  carts: Array,
  showRemove: Boolean
})
defineEmits(['changeQuantity', 'removeCart'])
</script>
<template>
  <div class="flex border-b-2">
    <div class="w-1/12 px-2 py-1 font-semibold text-gray-500">STT</div>
    <div class="w-2/12 px-2 py-1 font-semibold text-gray-500">Name</div>
    <div class="w-2/12 px-2 py-1 font-semibold text-gray-500">Price</div>
    <div class="w-2/12 px-2 py-1 font-semibold text-gray-500">Quantity</div>
    <div class="px-2 py-1 font-semibold text-gray-500" :class="showRemove ? 'w-4/12' : 'w-5/12'">Total</div>
    <div v-if="showRemove" class="w-1/12 px-2 py-1 font-semibold text-gray-500"></div>
  </div>
  <template v-if="carts.length">
    <div v-for="(cartObj, cIndex) in carts" :key="`cart-${cIndex}`" class="flex border-b-2">
      <div class="w-1/12 px-2 py-1">{{ cIndex + 1 }}</div>
      <div class="w-2/12 px-2 py-1">{{ cartObj.product.name }}</div>
      <div class="w-2/12 px-2 py-1">{{ cartObj.product.price }}</div>
      <div class="w-2/12 px-2 py-1">
        <input v-if="quantityEditable" v-model="cartObj.inputQuantity" type="number" class="border-2 w-full px-1" @change="$emit('changeQuantity', cartObj.product.id)">
        <span v-else>{{ cartObj.quantity }}</span>
      </div>
      <div class="px-2 py-1 font-semibold" :class="showRemove ? 'w-4/12' : 'w-5/12'">${{ cartObj.total || 0 }}</div>
      <div v-if="showRemove" class="w-1/12 px-2 py-1">
        <button @click="$emit('removeCart', cartObj.product.id)" class="text-sm bg-red-500 rounded-md px-2 text-white py-1">Remove</button>  
      </div>
    </div>
    <div class="flex border-b-2">
      <div class="w-7/12 px-2 py-1 text-gray-400 font-semibold">Total</div>
      <div class="px-2 py-1 font-semibold" :class="showRemove ? 'w-4/12' : 'w-5/12'">${{ total }}</div>
      <div v-if="showRemove" class="w-1/12 px-2 py-1"></div>
    </div>
  </template>
  <div v-else class="py-2 text-center">
    No item added.
  </div>
</template>