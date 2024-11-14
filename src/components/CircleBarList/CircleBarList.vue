<template>
  <ul class="circle-bar-list">
    <TheSpinner v-if="isLoading" />
    <li v-for="debt in items" :key="debt.$id">
      <pre>
        {{ debt }}
      </pre>
      <Card :class="{ 'circle-bar-card--has-overlay': isLoading }">
        <template #title>
          <h3 class="circle-bar-list-title">
            {{ debt.debtName }}
          </h3>
          <Button disabled outlined size="small">
            Original balance:
            {{ formatCurrency(debt.originalBalance, debt.currency) }}
          </Button>
          <Divider />
          <ButtonGroup>
            <Button
              severity="info"
              icon="pi pi-building-columns"
              v-tooltip.top="`Holder: ${debt.holder}`"
              readonly
            />
            <Button
              severity="help"
              icon="pi pi-chart-line"
              v-tooltip.top="`Status: ${debt.status.toUpperCase()}`"
              readonly
            />
          </ButtonGroup>
        </template>
        <template #content>
          <CircleBar
            :currency="debt.currency"
            :current-leftover="debt.currentLeftover"
            :original-balance="debt.originalBalance"
            :interest-rate="debt.interestRate"
          />
          <Divider />
          <MeterGroup :value="meterGroupData(debt)" :max="debt.originalBalance" />
          <Divider />
        </template>
        <template #footer>
          <ButtonGroup>
            <Button label="Edit" icon="pi pi-pencil" @click="onEditDebt(debt.$id)" />
            <Button
              label="Delete"
              icon="pi pi-trash"
              severity="danger"
              @click="onDeleteDebt(debt.$id)"
            />
            <Button label="Add funds" severity="info" icon="pi pi-wallet" />
          </ButtonGroup>
        </template>
      </Card>
      <TheSpinner :is-loading="isLoading" />
    </li>
  </ul>
</template>
<script setup lang="ts">
import CircleBar from '@/components/CircleBar/CircleBar.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import ButtonGroup from 'primevue/buttongroup'
import MeterGroup from 'primevue/metergroup'
import Divider from 'primevue/divider'
import TheSpinner from '@/components/Spinner/TheSpinner.vue'

import { formatCurrency } from '@/utils/currency/format.currency'

import type { DebtModel } from '@/features/Debts/debt.interface'

const emit = defineEmits(['on-edit', 'on-delete'])
defineProps({
  items: Array<DebtModel>,
  isLoading: {
    type: Boolean,
    default: false
  }
})

const onDeleteDebt = (id) => emit('on-delete', id)
const onEditDebt = (id) => emit('on-edit', id)

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
