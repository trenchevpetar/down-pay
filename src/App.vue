<script setup lang="ts">
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import Toast from 'primevue/toast'
import TheSpinner from '@/components/Spinner/TheSpinner.vue'

import { useAuthStore } from '@/stores/auth.store'
import { ref } from 'vue'
import { emitter } from '@/utils/emitter/emitter'

const authStore = useAuthStore()
const isLoading = ref(false)

emitter.on('SET_LOADING', (value) => {
  isLoading.value = value
})
</script>

<template>
  <TheSpinner :is-loading="isLoading" />
  <TheHeader v-if="authStore.isAuthenticated" />
  <RouterView v-else />
  <Toast />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
</style>
