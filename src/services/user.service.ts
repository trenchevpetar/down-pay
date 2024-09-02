import { supabase } from '@/api/client'

import { useAuthStore } from '@/stores/auth.store'

class UserService {
  async changeCurrency(currency) {
    const authStore = useAuthStore()

    const { data, error } = await supabase
      .from('profiles')
      .update({ currency: currency })
      .eq('id', authStore.authUser.id)

    if (!error) {
      authStore.authUser.currency = currency
    }

    return {
      data,
      error
    }
  }
}

export default new UserService()
