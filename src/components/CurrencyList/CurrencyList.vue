<template>
  <h2>Currency Converter</h2>
  <p>Change currency in <RouterLink to="/settings">Settings</RouterLink></p>
  <InputGroup>
    <InputGroupAddon> 1 {{ settingsStore.currentCurrency.value }} </InputGroupAddon>
    <InputNumber
      v-model="amount"
      :min="0"
      mode="currency"
      :currency="settingsStore.currentCurrency.value"
      locale="en-US"
    />
    <Button @click="convertAll" label="Convert" />
  </InputGroup>
  <Divider />
  <DataTable :value="currencyList">
    <Column field="currency" header="Currency"></Column>
    <Column field="rate" :header="`Exchange Rate (1 ${settingsStore.currentCurrency.value})`">
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
import { ref, reactive, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Divider from 'primevue/divider'

import { useCurrencyStore } from '@/stores/currency.store'
import { useSettingsStore } from '@/stores/settings.store'

import { convertCurrency } from '@/utils/currency/convert.currency'

const amount = ref<number>(1)
const currencyStore = useCurrencyStore()
const settingsStore = useSettingsStore()
const exchangeRates = ref(currencyStore.currencies)

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
        settingsStore.currentCurrency.value,
        item.currency,
        false,
        exchangeRates.value
      )
    } catch (error) {
      console.error(`Conversion error for ${item.currency}:`, error)
      item.convertedAmount = 0
    }
  })
}

onMounted(() => convertAll())
</script>
