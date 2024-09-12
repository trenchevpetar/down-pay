import { formatCurrency } from '@/utils/currency/format.currency'

export const calculateMonthlyPayment = (
  loan: number,
  interestRate: number,
  termLength: number,
  currency: string
): string => {
  const r = interestRate / 100 / 12
  const n = termLength * 12

  const monthlyPayment = (loan * r) / (1 - Math.pow(1 + r, -n))
  return formatCurrency(monthlyPayment, currency)
}
