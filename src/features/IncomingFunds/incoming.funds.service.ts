// import type { IncomingFundsInterface } from '@/features/IncomingFunds/incoming.funds.interface'
// import { account } from '@/api/client'
// import { useAuthStore } from '@/stores/auth.store'

class IncomingFundsService {
  async addIncomingFunds(fields: IncomingFundsInterface) {
    // const { data, error } = await supabase.from('payments').insert([fields])
    //
    // return {
    //   data,
    //   error
    // }
  }

  // async getDebtById(id) {
  //   const { data, error } = await supabase.from('debts').select('*').eq('id', id).single()
  //
  //   return {
  //     data,
  //     error
  //   }
  // }
  //
  async fetchPayments() {
    // const authStore = useAuthStore()
    // const { data, error } = await supabase
    //   .from('payments')
    //   .select('*')
    //   .eq('user_id', authStore.authUser.id)
    //
    // return {
    //   data,
    //   error
    // }
  }
  //
  // async updateDebt(id: number | string, fields: Partial<DebtModel>) {
  //   const { data, error } = await supabase
  //     .from('debts')
  //     .update(fields)
  //     .eq('id', id)
  //
  //   return {
  //     data,
  //     error
  //   }
  // }

  // async deleteDebt(id: number) {
  //   const { data, error } = await supabase.from('debts').delete().eq('id', id)
  //
  //   if (error) {
  //     console.log(error)
  //   }
  //
  //   return data
  // }
}

export default new IncomingFundsService()
