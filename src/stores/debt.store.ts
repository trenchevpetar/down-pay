import { ref } from 'vue'
import { defineStore } from 'pinia'
import { defaultDebt } from '@/features/Debts/default.debt'
import type { DebtModel } from '@/features/Debts/debt.interface'

export const useDebtStore = defineStore(
  'debt',
  () => {
    const debts = ref<DebtModel[]>([])
    const debtForEdit = ref<DebtModel[]>(defaultDebt())

    return {
      debts,
      debtForEdit
    }
  },
  {
    persist: true
  }
)
