import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { getCurrencyObject } from '@/utils/currency/get.currency.object'

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const defaultCurrency = ref('EUR')
    const currentCurrency = computed(() => getCurrencyObject(defaultCurrency.value))

    return {
      defaultCurrency,
      currentCurrency
    }
  },
  {
    persist: true
  }
)
