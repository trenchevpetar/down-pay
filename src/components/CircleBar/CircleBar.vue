<template>
  <div class="circle-bar">
    <Knob
      v-model="totalAmountPaid"
      :min="0"
      :max="originalBalance"
      :value-template="setTemplate"
      :size="200"
      :strokeWidth="5"
      readonly
    />
    at interest rate of {{ interestRate }}%
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Knob from 'primevue/knob'

import type { DebtModel } from '@/features/Debts/debt.interface'

const props = defineProps<DebtModel>()

const totalAmountPaid = computed(() => {
  if (props.currentLeftover) {
    return props.originalBalance - props.currentLeftover
  }
  return 0
})

const setTemplate = (value) => {
  return `${value} €`
}
</script>

<style>
@import './circle-bar.css';
</style>
