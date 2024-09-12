<template>
  <h1>Recurring expenses</h1>
  <template v-if="canAdd">
    <Button label="Add new recurring expense" />
  </template>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'

defineProps({
  canAdd: {
    type: Boolean,
    default: false
  }
})
</script>
