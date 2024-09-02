<template>
  <ul class="circle-bar-list">
    <li v-for="debt in items" :key="debt.id">
      <Card :class="{ 'circle-bar-card--has-overlay': isLoading }">
        <template #title>
          <h3>{{ debt.debtName }}</h3>
          {{ debt.holder }} - {{ debt.status.toUpperCase() }}
        </template>
        <template #content>
          <CircleBar
            :current-leftover="debt.currentLeftover"
            :original-balance="debt.originalBalance"
            :interest-rate="debt.interestRate"
          />
          <Divider />
          <MeterGroup :value="meterGroupData(debt)" :max="debt.originalBalance" />
          <Divider />
        </template>
        <template #footer>
          <Button label="Edit" icon="pi pi-pencil" />
          <Button
            label="Delete"
            icon="pi pi-trash"
            severity="danger"
            @click="onDeleteDebt(debt.id)"
          />
          <Button label="Add funds" severity="info" />
        </template>
      </Card>
      <ProgressSpinner
        v-if="isLoading"
        strokeWidth="4"
        fill="transparent"
        animationDuration=".5s"
        aria-label="Custom ProgressSpinner"
      />
    </li>
  </ul>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import CircleBar from '@/components/CircleBar/CircleBar.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import MeterGroup from 'primevue/metergroup'
import DebtService from '@/features/Debts/debt.service'
import Divider from 'primevue/divider'

import type { DebtModel } from '@/features/Debts/debt.interface'

const isLoading = ref(false)
const onDeleteDebt = async (id) => {
  isLoading.value = true
  await DebtService.deleteDebt(id)
  isLoading.value = false
  await DebtService.fetchDebts()
}

defineProps({
  items: Array<DebtModel>
})

const meterGroupData = (debt) => {
  return [
    {
      label: 'Paid',
      color: '#34d399',
      value: debt.originalBalance - debt.currentLeftover,
      icon: 'pi pi-table'
    },
    {
      label: 'Current leftover',
      color: '#fbbf24',
      value: debt.currentLeftover,
      icon: 'pi pi-inbox'
    }
  ]
}
</script>

<style>
@import './circle-bar-list.css';
</style>
