import type { DebtModel } from '@/features/Debts/debt.interface'
import { supabase } from '@/api/client'
import { useAuthStore } from '@/stores/auth.store'

class DebtService {
  async addDebt(debt: DebtModel) {
    const { data, error } = await supabase.from('debts').insert([debt])

    return {
      data,
      error
    }
  }

  async getDebtById(id) {
    const { data, error } = await supabase.from('debts').select('*').eq('id', id).single()

    return {
      data,
      error
    }
  }

  async fetchDebts() {
    const authStore = useAuthStore()
    const { data, error } = await supabase
      .from('debts')
      .select('*')
      .eq('user_id', authStore.authUser.id)

    return {
      data,
      error
    }
  }

  async updateDebt(id: number | string, fields: Partial<DebtModel>) {
    const { data, error } = await supabase
      .from('debts') // Replace 'debts' with the name of your table
      .update(fields)
      .eq('id', id)

    return {
      data,
      error
    }
  }

  async deleteDebt(id: number) {
    const { data, error } = await supabase.from('debts').delete().eq('id', id)

    if (error) {
      console.log(error)
    }

    return data
  }
}

export default new DebtService()
