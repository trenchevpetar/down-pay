import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { getCurrencyObject } from '@/utils/currency/get.currency.object'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const authUser = ref(null)
    const authError = ref(null)
    const currentCurrency = computed(() => getCurrencyObject(authUser.value.currency))

    return {
      authUser,
      authError,
      currentCurrency,
      isAuthenticated: computed(() => !!authUser.value)
    }
  },
  {
    persist: true
  }
)
