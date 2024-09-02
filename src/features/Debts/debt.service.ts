import type { DebtModel } from '@/features/Debts/debt.interface'
import { supabase } from '@/api/client'
import { useAuthStore } from '@/stores/auth.store'

class DebtService {
  async addDebt(debt: DebtModel) {
    const { data, error } = await supabase.from('debts').insert([debt])

    if (error) {
      console.log(error)
    }

    console.log(data)

    return data
  }

  async fetchDebts() {
    const authStore = useAuthStore()
    const { data, error } = await supabase
      .from('debts')
      .select('*')
      .eq('user_id', authStore.authUser.id)

    if (error) {
      console.log(error)
    }

    return data
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
