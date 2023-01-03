<script setup>
import { ref, onMounted, watch } from 'vue';
import Popup from '../../Popup.vue'
import ProductServices from '../../../firebase/product/product'

const props = defineProps({
  product: Object,
  modelValue: Boolean
})
const emit = defineEmits(['update:modelValue'])
const categories = ref([])
const formData = ref({
  isActive: true
})
const close = () => {
  emit('update:modelValue', false)
}
watch(() => props.modelValue, v => {
  if (v) {
    formData.value = JSON.parse(JSON.stringify(props.product))
    formData.value.isActive = typeof formData.value.isActive === 'undefined' ? true : formData.value.isActive
    getCategories()
  }
})
const onSubmit = async () => {
  try {
    const {
      name,
      featuredImage,
      categoryId,
      description,
      price,
      isActive,
    } = formData.value
    if (!name || !featuredImage || !categoryId || !price || !description) {
      Swal.fire('Error!', 'Invalid data', 'error')
      return
    }
    const data = {
      name,
      featuredImage,
      categoryId,
      price,
      description,
      isActive,
    }
    if (props.product.id) {
      await ProductServices.updateProduct(props.product.id, data)
    } else {
      await ProductServices.createProduct(data)
    }
    Swal.fire('Updated!', '', 'success')
    close()
  } catch (error) {
      Swal.fire('Error!', String(error), 'error')
  }
}
const getCategories = () => {
  ProductServices.getCategories(data => {
    categories.value = data || []
  })
}
</script>

<template>
  <Popup :model-value="modelValue" showOnClickOutside showOnClickOk @update:modelValue="$emit('update:modelValue', $event)" :title="product.id ? `Edit: ${product.name}` : 'Add product'" @ok="onSubmit">
    <form @submit.prevent="onSubmit">
      <div>
        <label for="product-name">Name</label>
        <input id="product-name" v-model="formData.name" type="text" class="border-2 w-full p-2 rounded-sm" placeholder="Enter Product Name...">
      </div>
      <div>
        <label for="product-featured-image">Featured mage</label>
        <input id="product-featured-image" v-model="formData.featuredImage" type="text" class="border-2 w-full p-2 rounded-sm" placeholder="Enter Product image...">
      </div>
      <div class="mt-2">
        <label for="product-category">Category</label>
        <v-select id="product-category" appendToBody v-model="formData.categoryId" :clearable="false" :options="categories" label="name" :reduce="e => e.id"></v-select>
      </div>
      <div class="mt-2">
        <label for="product-price">Price</label>
        <textarea id="product-price" v-model="formData.price" type="number" class="border-2 w-full p-2 rounded-sm" placeholder="Enter Product price..."></textarea>
      </div>
      <div class="mt-2">
        <label for="product-description">Description</label>
        <textarea id="product-description" v-model="formData.description" type="text" class="border-2 w-full p-2 rounded-sm" placeholder="Enter Product description..."></textarea>
      </div>
      <div class="mt-2">
        <label for="product-status">Status</label>
        <v-toggle-button v-model:isActive="formData.isActive" />
      </div>
      <button type="submit" class="hide"></button>
    </form>
  </Popup>
</template>