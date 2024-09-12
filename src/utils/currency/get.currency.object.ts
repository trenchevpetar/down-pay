import { currencyOptions } from '@/constants/currency.const'

export const getCurrencyObject = (currency: string) =>
  currencyOptions.find(({ value }) => value === currency)
