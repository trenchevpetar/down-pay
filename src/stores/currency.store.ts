import { defineStore } from 'pinia'
import { ref } from 'vue'

import CurrencyService from '@/services/currency.service'

export const useCurrencyStore = defineStore(
  'currency',
  () => {
    const currencies = ref(null)

    async function fetchCurrencies() {
      currencies.value = await CurrencyService.fetchExchangeRates()
    }

    if (!currencies.value) {
      fetchCurrencies()
    }

    return {
      currencies,
      fetchCurrencies
    }
  },
  {
    persist: true
  }
)
