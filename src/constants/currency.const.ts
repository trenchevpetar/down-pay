import type { CurrencyModel } from '@/features/CurrencyPicker/currency.picker.interface'

export const targetCurrencies = ['EUR', 'USD', 'GBP', 'MKD']

export const currencyOptions: CurrencyModel[] = [
  { label: 'MKD', value: 'MKD', icon: 'pi pi-money-bill', sign: 'MKD' },
  { label: 'USD', value: 'USD', icon: 'pi pi-dollar', sign: '$' },
  { label: 'EUR', value: 'EUR', icon: 'pi pi-euro', sign: '€' },
  { label: 'GBP', value: 'GBP', icon: 'pi pi-pound', sign: '£' }
]
