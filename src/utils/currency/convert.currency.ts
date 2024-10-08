import { cleanFormatCurrency, formatCurrency } from '@/utils/currency/format.currency'

type ExchangeRates = {
  [currencyCode: string]: number
}

class InvalidCurrencyError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidCurrencyError'
  }
}

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  isClean: boolean = false,
  exchangeRates: ExchangeRates
): string {
  // Check if both currencies are in the exchange rates object
  if (!(fromCurrency in exchangeRates) || !(toCurrency in exchangeRates)) {
    throw new InvalidCurrencyError('Invalid currency')
  }

  const amountInEUR = amount / exchangeRates[fromCurrency]
  const convertedAmount = amountInEUR * exchangeRates[toCurrency]

  if (isClean) return cleanFormatCurrency(convertedAmount, toCurrency)
  return formatCurrency(convertedAmount, toCurrency)
}
