<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import PopupCategory from '../../../components/Shop/Manage/PopupCategory.vue';
import ProductServices from '../../../firebase/product/product'
import { sortCallBack } from '../../../utils/utils'

const showPopupCategory = ref(false)
const filterObj = ref({
  keyword: ''
})
const sortData = ref({
  by: '',
  asc: true,
  type: 'string'
})
const categories = ref([])
const selectedCategory = ref({})
const computedCategories = computed(() => {
  let result = JSON.parse(JSON.stringify(categories.value))
  const { keyword } = filterObj.value
  if (keyword) {
    const reg = new RegExp(keyword, 'gi')
    result = result.filter(item => (
      (item.name && item.name.match(reg)) ||
      (item.description && item.description.match(reg))
    ))
  }
  const { by, asc, type } = sortData.value
  if (by) {
    result = result.sort(sortCallBack(by, !asc, type))
  }
  return result
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
const editCategory = categoryObj => {
  selectedCategory.value = categoryObj
  showPopupCategory.value = true
}
const removeCategory = categoryId => {
  Swal.fire({
    title: 'Are you sure want to remove this category? This action cannot be undo.',
    showCancelButton: true,
    confirmButtonText: 'Remove',
  }).then(async (result) => {
    if (result.isConfirmed) {
      await ProductServices.deleteCategory(categoryId)
      Swal.fire('Removed!', '', 'success')
    }
  })
}
watch(showPopupCategory, v => {
  if (!v) {
    selectedCategory.value = {}
  }
})
onMounted(() => {
  ProductServices.getCategories(data => {
    categories.value = data || []
  })
})
</script>
<template>
  <h2 class="text-2xl">Categories</h2>
  <div class="my-2 flex items-center justify-between">
    <div class="flex items-center">
      <button class="rounded-md text-white bg-green-500 px-3 py-1 font-semibold mr-3" @click="showPopupCategory = true">Add</button>
      <input v-model="filterObj.keyword" type="text" placeholder="Search" class="border-2 rounded-md px-2 py-1">
    </div>
  </div>
  <div class="flex font-semibold border-b-2 py-1 items-center">
    <div class="w-4/12 cursor-pointer px-2" @click="setSort('name')">
      Name
      <span
        :class="[
          sortData.by === 'name' ? 'opacity-100' : 'opacity-0'
        ]"
      >
        {{ sortData.asc ? '&#8593;' : '&#8595;' }}
      </span>
    </div>
    <div class="w-5/12 cursor-pointer px-2" @click="setSort('description')">
      Description
      <span
        :class="[
          sortData.by === 'description' ? 'opacity-100' : 'opacity-0'
        ]"
      >
        {{ sortData.asc ? '&#8593;' : '&#8595;' }}
      </span>
    </div>
    <div class="w-1/12 cursor-pointer px-2 text-center" @click="setSort('status')">
      Status
      <span
        :class="[
          sortData.by === 'status' ? 'opacity-100' : 'opacity-0'
        ]"
      >
        {{ sortData.asc ? '&#8593;' : '&#8595;' }}
      </span>
    </div>
    <div class="w-2/12 px-2 text-center">Actions</div>
  </div>
  <div class="flex-1 overflow-y-auto">
    <div
      v-for="(categoryObj, cIndex) in computedCategories"
      :key="`category-${cIndex}`"
      class="flex border-b-2 py-1 items-center last:border-b-0"
    >
    <div class="w-4/12 px-2">{{ categoryObj.name }}</div>
      <div class="w-5/12 px-2">{{ categoryObj.description }}</div>
      <div class="w-1/12 px-2 text-center">{{ categoryObj.isActive ? 'Active' : 'Archived' }}</div>
      <div class="w-2/12 px-2 flex items-center justify-center">
        <button class="bg-blue-400 text-white rounded-lg text-sm px-3 py-1 font-semibold mr-2" @click="editCategory(categoryObj)">Edit</button>
        <button class="bg-red-400 text-white rounded-lg text-sm px-3 py-1 font-semibold" @click="removeCategory(categoryObj.id)">Remove</button>
      </div>
    </div>
  </div>
  <PopupCategory v-model="showPopupCategory" :category="selectedCategory" />
</template>