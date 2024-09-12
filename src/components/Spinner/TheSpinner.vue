<template>
  <div v-if="isLoading" class="spinner">
    <div class="spinner-overlay" />
    <ProgressSpinner strokeWidth="2" fill="transparent" animationDuration="1s" />
  </div>
</template>

<script lang="ts" setup>
import ProgressSpinner from 'primevue/progressspinner'

defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})
</script>

<style>
@import './spinner.css';
</style>
