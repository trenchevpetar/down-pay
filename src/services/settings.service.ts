import { database } from '@/api/client'

import { useSettingsStore } from '@/stores/settings.store'

class SettingsService {
  async changeCurrency(currency) {
    const settingsStore = useSettingsStore();
    let error = false;

    try {
      const response = await database.updateDocument(
        'debts',
        'global-collection',
        '670395b300270d67872a',
        { currency: currency }
      )

      settingsStore.defaultCurrency = response.currency;
    } catch (err) {
      error = err;
    }

    return {
      error
    }
  }

  async getCurrency() {
    // const authStore = useAuthStore()
    //
    // const { data, error } = await supabase
    //   .from('profiles')
    //   .select('currency')
    //   .eq('id', authStore.authUser.id)
    //
    // return {
    //   data,
    //   error
    // }
  }
}

export default new SettingsService()
