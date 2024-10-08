import { useSettingsStore } from '@/stores/settings.store'

import { targetCurrencies } from '@/constants/currency.const'

class CurrencyService {
  async fetchExchangeRates() {
    const settingsStore = useSettingsStore()

    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${settingsStore.currentCurrency.value}`
      )
      const data = await response.json()

      if (data && data.rates) {
        // Filter only the target currencies
        return targetCurrencies.reduce((rates, currency) => {
          if (data.rates[currency]) {
            rates[currency] = data.rates[currency]
          }
          return rates
        }, {})
      } else {
        console.error('Error fetching exchange rates: No rates found')
      }
    } catch (error) {
      console.error('Network or fetch error:', error)
    }
  }
}

export default new CurrencyService()
