<script setup>
import { ref, onMounted, watch } from 'vue';
import Popup from '../../Popup.vue'
import ProductServices from '../../../firebase/product/product'

const props = defineProps({
  category: Object,
  modelValue: Boolean
})
const emit = defineEmits(['update:modelValue'])
const formData = ref({
  isActive: true
})
const close = () => {
  emit('update:modelValue', false)
}
watch(() => props.modelValue, (v) => {
  if (v) {
    formData.value = JSON.parse(JSON.stringify(props.category))
    formData.value.isActive = typeof formData.value.isActive === 'undefined' ? true : formData.value.isActive
  }
})
const onSubmit = async () => {
  try {
    const {
      name,
      description,
      isActive,
    } = formData.value
    if (!name || !description) {
      Swal.fire('Error!', 'Invalid data', 'error')
      return
    }
    const data = {
      name,
      description,
      isActive,
    }
    if (props.category.id) {
      await ProductServices.updateCategory(props.category.id, data)
    } else {
      await ProductServices.createCategory(data)
    }
    Swal.fire('Updated!', '', 'success')
    close()
  } catch (error) {
      Swal.fire('Error!', String(error), 'error')
  }
}
</script>

<template>
  <Popup :model-value="modelValue" showOnClickOutside showOnClickOk @update:modelValue="$emit('update:modelValue', $event)" :title="category.id ? `Edit: ${category.name}` : 'Add category'" @ok="onSubmit">
    <form @submit.prevent="onSubmit">
      <div>
        <label for="category-name">Name</label>
        <input id="category-name" v-model="formData.name" type="text" class="border-2 w-full p-2 rounded-sm" placeholder="Enter Category Name...">
      </div>
      <div class="mt-2">
        <label for="category-description">Description</label>
        <textarea id="category-description" v-model="formData.description" type="text" class="border-2 w-full p-2 rounded-sm" placeholder="Enter category description..."></textarea>
      </div>
      <div class="mt-2">
        <label for="category-status">Status</label>
        <v-toggle-button v-model:isActive="formData.isActive" />
      </div>
      <button type="submit" class="hide"></button>
    </form>
  </Popup>
</template>