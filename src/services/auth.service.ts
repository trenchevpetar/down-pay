import { supabase } from '@/api/client'
import { useAuthStore } from '@/stores/auth.store'

class AuthService {
  async login(email: string, password: string) {
    const authStore = useAuthStore()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      authStore.authError = error
    }

    if (data) {
      authStore.authUser = data.user
    }

    return {
      data,
      error
    }
  }

  async logout() {
    const authStore = useAuthStore()
    await supabase.auth.signOut()

    authStore.authUser = null
  }

  async register(email: string, password: string) {
    const { user, error } = await supabase.auth.signUp({ email, password })

    return {
      user,
      error
    }
  }
}

export default new AuthService()
