import { account } from '@/api/client'
import { useAuthStore } from '@/stores/auth.store'

class AuthService {
  async login(email: string, password: string) {
    let data, error, currentUser
    const authStore = useAuthStore()

    try {
      data = await account.createEmailPasswordSession(email, password)
      currentUser = await account.get()
    } catch (err) {
      error = err
    }

    if (error) {
      authStore.authError = error
    }

    if (data) {
      authStore.authUser = currentUser
    }

    return {
      data,
      error
    }
  }

  async logout() {
    const authStore = useAuthStore()
    try {
      await account.deleteSession('current')
      authStore.authUser = null
    } catch (err) {
      console.log('logout failed', err)
    }
  }

  async register(email: string, password: string, name: string) {
    await account.create('unique()', email, password, name)
  }
}

export default new AuthService()
