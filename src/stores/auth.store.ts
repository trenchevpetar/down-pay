import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const authUser = ref(null)
    const authError = ref(null)

    return {
      authUser,
      authError,
      isAuthenticated: computed(() => !!authUser.value)
    }
  },
  {
    persist: true
  }
)
