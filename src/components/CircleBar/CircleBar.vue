<template>
  <div class="circle-bar">
    <div class="circle-bar-knob">
      <Knob
        v-model="totalAmountPaid"
        :min="0"
        :max="originalBalance"
        :value-template="setTemplate"
        :size="200"
        :strokeWidth="5"
        :show-value="false"
        readonly
      />
      <p class="circle-bar-value">{{ formatCurrency(totalAmountPaid, props.currency) }}</p>
    </div>
    at interest rate of {{ interestRate }}%

    <Divider />
    <ul class="circle-bar-grid">
      <li>
        <h4 class="circle-bar-currency-list-title">Amount paid</h4>
        <ul class="circle-bar-currency-list">
          <li v-for="(_, defaultCurrency) in currencyStore.currencies" :key="defaultCurrency">
            {{
              convertCurrency(
                totalAmountPaid,
                currency,
                defaultCurrency,
                false,
                currencyStore.currencies
              )
            }}
          </li>
        </ul>
      </li>
      <li>
        <h4 class="circle-bar-currency-list-title">Leftover</h4>
        <ul class="circle-bar-currency-list">
          <li v-for="(_, defaultCurrency) in currencyStore.currencies" :key="defaultCurrency">
            {{
              convertCurrency(
                currentLeftover,
                currency,
                defaultCurrency,
                false,
                currencyStore.currencies
              )
            }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Knob from 'primevue/knob'
import Divider from 'primevue/divider'

import { convertCurrency } from '@/utils/currency/convert.currency'
import { useCurrencyStore } from '@/stores/currency.store'
import { formatCurrency } from '@/utils/currency/format.currency'

import type { DebtModel } from '@/features/Debts/debt.interface'

const props = defineProps<DebtModel>()
const currencyStore = useCurrencyStore()

const totalAmountPaid = computed(() => {
  if (props.currentLeftover) {
    return props.originalBalance - props.currentLeftover
  }
  return 0
})

const setTemplate = (value) => formatCurrency(value, props.currency)
</script>

<style>
@import './circle-bar.css';
</style>
