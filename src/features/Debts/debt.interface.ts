export interface DebtModel {
  user_id?: string
  debtName?: string
  holder?: string
  currency?: string
  originalBalance?: number
  currentLeftover?: number
  debtOpenedOn?: Date,
  termLength?: string | number
  status?: string
  paymentFrequency?: string
  interestRate?: number
  endOfTerm?: Date
}
