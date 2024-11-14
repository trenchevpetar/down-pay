import { account } from '@/api/client'
import { useAuthStore } from '@/stores/auth.store'
import { emitter } from '@/utils/emitter/emitter'

class AuthService {
  async login(email: string, password: string) {
    let data, error, currentUser
    const authStore = useAuthStore()

    emitter.emit('SET_LOADING', true)
    try {
      data = await account.createEmailPasswordSession(email, password)
      currentUser = await account.get()
    } catch (err) {
      error = err
    } finally {
      emitter.emit('SET_LOADING', false)
    }

    if (error) {
      authStore.setAuthError(error)
      emitter.emit('SET_LOADING', false)
    }

    if (data) {
      authStore.setAuthUser(currentUser)
      emitter.emit('SET_LOADING', false)
    }

    return {
      data,
      error
    }
  }

  async logout() {
    const authStore = useAuthStore()
    emitter.emit('SET_LOADING', true)
    try {
      await account.deleteSession('current')
      authStore.setAuthUser(null)
    } catch (err) {
      console.log('logout failed', err)
    } finally {
      emitter.emit('SET_LOADING', false)
    }
  }

  async register(email: string, password: string, name: string) {
    await account.create('unique()', email, password, name)
  }
}

export default new AuthService()
