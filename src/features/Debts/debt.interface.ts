export interface DebtModel {
  user_id?: string
  debtName?: string
  holder?: string
  originalBalance?: number
  currentLeftover?: number
  debtOpenedOn?: Date,
  termLength?: string
  status?: string
  paymentFrequency?: string
  interestRate?: number
  endOfTerm?: Date
}
