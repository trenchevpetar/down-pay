<template>
  <h1>Dashboard</h1>
  <DebtModal />
  <CircleBarList v-if="!isLoading" :items="debts" />
  <ProgressSpinner v-else />
</template>

<script setup lang="ts">
import CircleBarList from '@/components/CircleBarList/CircleBarList.vue'
import ProgressSpinner from 'primevue/progressspinner'

import DebtModal from '@/features/Debts/DebtModal.vue'
import DebtService from '@/features/Debts/debt.service'
import { onMounted, ref } from 'vue'

const debts = ref(null)
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  debts.value = await DebtService.fetchDebts()
  isLoading.value = false
})
</script>
