<script setup>
import { ref, computed, onMounted } from 'vue'
import ProductServices from '../../firebase/product/product'
import { sortCallBack } from '../../utils/utils';

const props = defineProps({
  products: Array
})

const filterObj = ref({
  keyword: ''
})
const sortData = ref({
  by: '',
  asc: true,
  type: 'string'
})
const categories = ref([])
const computedProducts = computed(() => {
  let result = JSON.parse(JSON.stringify(props.products)).map(productObj => ({
    ...productObj,
    categoryName: (categories.value.find(e => e.id === productObj.categoryId) || {}).name
  }))
  const { keyword, categoryId } = filterObj.value
  if (keyword) {
    const reg = new RegExp(keyword, 'gi')
    result = result.filter(item => (
      (item.name && item.name.match(reg)) ||
      (item.description && item.description.match(reg))
    ))
  }
  if (categoryId) {
    result = result.filter(item => item.categoryId === categoryId)
  }
  const { by, asc, type } = sortData.value
  if (by) {
    result = result.sort(sortCallBack(by, !asc, type))
  }
  return result
})
const onChangeSort = (value) => {
  let by = ''
  let asc = true
  let type = 'string'
  switch (value) {
    case 'Price Increase':
      by = 'price'
      type = 'number'
      break;
    case 'Price Decrease':
      by = 'price'
      type = 'number'
      asc = false
      break;
    case 'Name Ascending':
      asc = false
      by = 'name'
      break;
    case 'Name Descending':
      by = 'name'
      break;
    default:
      break;
  }
  sortData.value.by = by
  sortData.value.asc = asc
  sortData.value.type = type
}
onMounted(() => {
  ProductServices.getCategories(data => {
    categories.value = data || []
  })
})
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex-0 flex justify-between items-center">
      <div class="flex items-center mb-2">
        <label for="filter-products-category" class="mr-2">Category</label>
        <v-select id="filter-products-category" appendToBody v-model="filterObj.categoryId" :options="categories" label="name" :reduce="e => e.id" class="min-w-[150px]"></v-select>
      </div>
      <div class="flex items-center mb-2">
        <label for="sort-products-category" class="mr-2">Sort</label>
        <v-select id="sort-products-category" appendToBody :options="['None', 'Price Increase', 'Price Decrease', 'Name Ascending', 'Name Descending']" class="min-w-[150px]" @update:modelValue="onChangeSort"></v-select>
      </div>
    </div>
    <div class="flex-1 overflow-y-auto flex flex-wrap">
      <div
        v-for="(productObj, pIndex) in computedProducts" :key="`product-${pIndex}`"
        class="w-full md:w-1/2 lg:w-1/4 px-2 mb-4"
      >
        <div class="border-2 shadow-lg rounded-lg">
          <div class="w-full pb-[320px] relative overflow-hidden">
            <img :src="productObj.image || 'https://via.placeholder.com/1000'" :alt="productObj.name" class="absolute inset-0 object-cover h-full w-full">
          </div>
          <div class="px-4">
            <div class="text-lg font-semibold text-center my-2">
              {{ productObj.name }}
            </div>
            <div class="text-md text-center mb-2">
              ${{ productObj.price }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>