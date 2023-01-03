<script setup>
import { onMounted, ref } from 'vue';
import Products from './Products.vue';
import Categories from './Categories.vue';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const currentTab = ref('home')
const TABS = [
  {
    label: 'Dashboard',
    value: 'home'
  },
  {
    label: 'Categories',
    value: 'categories'
  },
  {
    label: 'Products',
    value: 'products'
  },
]
const changeTab = tabValue => {
  currentTab.value = tabValue
  router.replace({
    name: route.name,
    query: {
      ...route.query,
      tab: tabValue
    },
  })
}
onMounted(() => {
  currentTab.value = route.query.tab || 'home'
})
</script>
<template>
  <div class="h-full p-5 flex flex-col">
    <h1 class="text-3xl font-bold">Manage Shop</h1>
    <div class="flex-1 overflow-y-auto">
      <div class="flex pt-5 h-full">
        <div class="w-1/6 border-r-2 h-full overflow-y-auto">
          <ul>
            <li
              v-for="(tabObj, tIndex) in TABS"
              class="mb-2 font-semibold cursor-pointer hover:underline last:mb-0"
              :class="currentTab === tabObj.value ? 'text-green-500' : ''"
              @click="changeTab(tabObj.value)"
            >
              {{ tabObj.label }}
            </li>
          </ul>
        </div>
        <div class="w-5/6 ml-3 h-full overflow-y-auto flex flex-col">
          <div v-if="currentTab === 'home'">
            <h2 class="text-2xl font-bold">Dashboard</h2>
          </div>
          <Categories v-if="currentTab === 'categories'" />
          <Products v-if="currentTab === 'products'" />
        </div>
      </div>
    </div>
  </div>
</template>