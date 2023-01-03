<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import PopupProduct from '../../../components/Shop/Manage/PopupProduct.vue';
import ProductServices from '../../../firebase/product/product'
import { sortCallBack } from '../../../utils/utils'

const showPopupProduct = ref(false)
const filterObj = ref({
  keyword: ''
})
const sortData = ref({
  by: '',
  asc: true,
  type: 'string'
})
const products = ref([])
const categories = ref([])
const selectedProduct = ref({})
const computedProducts = computed(() => {
  let result = JSON.parse(JSON.stringify(products.value)).map(productObj => ({
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
const editProduct = productObj => {
  selectedProduct.value = productObj
  showPopupProduct.value = true
}
const removeProduct = productId => {
  Swal.fire({
    title: 'Are you sure want to remove this product? This action cannot be undo.',
    showCancelButton: true,
    confirmButtonText: 'Remove',
  }).then(async (result) => {
    if (result.isConfirmed) {
      await ProductServices.deleteProduct(productId)
      Swal.fire('Removed!', '', 'success')
    }
  })
}
watch(showPopupProduct, v => {
  if (!v) {
    selectedProduct.value = {}
  }
})
const setSort = (field, type = 'string') => {
  const { by, asc } = sortData.value
  if (by === field) {
    if (asc) {
      sortData.value.by = ''
    } else {
      sortData.value.asc = !asc
    }
  } else {
    sortData.value.type = type
    sortData.value.by = field
    sortData.value.asc = false
  }
}
onMounted(() => {
  ProductServices.getProducts(data => {
    products.value = data || []
  })
  ProductServices.getCategories(data => {
    categories.value = data || []
  })
})
</script>
<template>
  <h2 class="text-2xl">Products</h2>
  <div class="my-2 flex items-center justify-between">
    <div class="flex items-center">
      <button class="rounded-md text-white bg-green-500 px-3 py-1 font-semibold mr-3" @click="showPopupProduct = true">Add</button>
      <input v-model="filterObj.keyword" type="text" placeholder="Search" class="border-2 rounded-md px-2 py-1">
    </div>
    <div class="flex items-center">
      <label for="filter-products-category" class="mr-2">Category</label>
      <v-select id="filter-products-category" appendToBody v-model="filterObj.categoryId" :options="categories" label="name" :reduce="e => e.id" class="min-w-[150px]"></v-select>
    </div>
  </div>
  <div class="flex font-semibold border-b-2 py-1 items-center">
    <div class="w-2/12 px-2 cursor-pointer" @click="setSort('name')">
      Name
      <span
        :class="[
          sortData.by === 'name' ? 'opacity-100' : 'opacity-0'
        ]"
      >
        {{ sortData.asc ? '&#8593;' : '&#8595;' }}
      </span>
    </div>
    <div class="w-2/12 px-2">Image</div>
    <div class="w-2/12 px-2 cursor-pointer" @click="setSort('categoryName')">
      Category
      <span
        :class="[
          sortData.by === 'categoryName' ? 'opacity-100' : 'opacity-0'
        ]"
      >
        {{ sortData.asc ? '&#8593;' : '&#8595;' }}
      </span>
    </div>
    <div class="w-2/12 px-2 cursor-pointer" @click="setSort('description')">
      Description
      <span
        :class="[
          sortData.by === 'description' ? 'opacity-100' : 'opacity-0'
        ]"
      >
        {{ sortData.asc ? '&#8593;' : '&#8595;' }}
      </span>
    </div>
    <div class="w-1/12 px-2 cursor-pointer" @click="setSort('price', 'number')">
      Price
      <span
        :class="[
          sortData.by === 'price' ? 'opacity-100' : 'opacity-0'
        ]"
      >
        {{ sortData.asc ? '&#8593;' : '&#8595;' }}
      </span>
    </div>
    <div class="w-1/12 px-2 text-center cursor-pointer" @click="setSort('isActive')">
      Status
      <span
        :class="[
          sortData.by === 'isActive' ? 'opacity-100' : 'opacity-0'
        ]"
      >
        {{ sortData.asc ? '&#8593;' : '&#8595;' }}
      </span>
    </div>
    <div class="w-2/12 px-2 text-center">Actions</div>
  </div>
  <div class="flex-1 overflow-y-auto">
    <div
      v-for="(productObj, pIndex) in computedProducts"
      :key="`product-${pIndex}`"
      class="flex border-b-2 py-1 items-center last:border-b-0"
    >
    <div class="w-2/12 px-2">{{ productObj.name }}</div>
      <div class="w-2/12 px-2">{{ productObj.featuredImage }}</div>
      <div class="w-2/12 px-2">{{ productObj.categoryName }}</div>
      <div class="w-2/12 px-2">{{ productObj.description }}</div>
      <div class="w-1/12 px-2">{{ productObj.price }}</div>
      <div class="w-1/12 px-2 text-center">{{ productObj.isActive ? 'Active' : 'Archived' }}</div>
      <div class="w-2/12 px-2 flex items-center justify-center">
        <button class="bg-blue-400 text-white rounded-lg text-sm px-3 py-1 font-semibold mr-2" @click="editProduct(productObj)">Edit</button>
        <button class="bg-red-400 text-white rounded-lg text-sm px-3 py-1 font-semibold" @click="removeProduct(productObj.id)">Remove</button>
      </div>
    </div>
  </div>
  <PopupProduct v-model="showPopupProduct" :product="selectedProduct" />
</template>