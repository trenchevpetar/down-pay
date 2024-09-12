<template>
  <h2>Currency Converter</h2>
  <InputGroup>
    <InputGroupAddon> 1 {{ authStore.currentCurrency.value }} </InputGroupAddon>
    <InputNumber
      v-model="amount"
      :min="0"
      mode="currency"
      :currency="authStore.currentCurrency.value"
      locale="en-US"
    />
    <Button @click="convertAll" label="Convert" />
  </InputGroup>
  <Divider />
  <DataTable :value="currencyList">
    <Column field="currency" header="Currency"></Column>
    <Column field="rate" :header="`Exchange Rate (1 ${authStore.currentCurrency.value})`">
      <template #body="slotProps">
        {{ slotProps.data.rate.toFixed(4) }}
      </template>
    </Column>
    <Column field="convertedAmount" header="Converted Amount">
      <template #body="slotProps">
        {{ slotProps.data.convertedAmount }}
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Divider from 'primevue/divider'

import { useAuthStore } from '@/stores/auth.store'
import { useCurrencyStore } from '@/stores/currency.store'

import { convertCurrency, ExchangeRates } from '@/utils/currency/convert.currency'

const amount = ref<number>(1)
const authStore = useAuthStore()
const currencyStore = useCurrencyStore()
const exchangeRates = ref<ExchangeRates>(currencyStore.currencies)

interface CurrencyItem {
  currency: string
  rate: number
  convertedAmount: number
}

const currencyList = reactive<CurrencyItem[]>(
  Object.entries(exchangeRates.value).map(([currency, rate]) => ({
    currency,
    rate,
    convertedAmount: 0
  }))
)

const convertAll = () => {
  currencyList.forEach((item) => {
    try {
      item.convertedAmount = convertCurrency(
        amount.value,
        authStore.currentCurrency.value,
        item.currency,
        exchangeRates.value
      )
    } catch (error) {
      console.error(`Conversion error for ${item.currency}:`, error)
      item.convertedAmount = 0
    }
  })
}

// Initial conversion
convertAll()
</script>
