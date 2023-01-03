<script setup>
import Popup from './Popup.vue'
import LoginVue from './ChatApp/Login.vue';

const props = defineProps({
  modelValue: Boolean
})
</script>

<template>
  <Popup :model-value="modelValue" @update:modelValue="$emit('update:modelValue', $event)" :title="''" hide-buttons width="unset">
    <LoginVue @loged="$emit('update:modelValue', false)" />
  </Popup>
</template>