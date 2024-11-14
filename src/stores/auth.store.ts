import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const authUser = ref(null)
    const authError = ref(null)

    const setAuthUser = (user) => {
      authUser.value = user;
    }

    const setAuthError = (error) => {
      authError.value = error
    }

    return {
      authUser,
      authError,
      setAuthUser,
      setAuthError,
      isAuthenticated: computed(() => !!authUser.value)
    }
  },
  {
    persist: true
  }
)
