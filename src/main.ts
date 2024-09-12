import './assets/global.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import Tooltip from 'primevue/tooltip'
import ToastService from 'primevue/toastservice'

import App from './App.vue'
import router from './router'

import '@/middleware/user.auth.middleware'
import '@/middleware/clear.middleware'

import 'primeicons/primeicons.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.directive('tooltip', Tooltip)
app
  .use(pinia)
  .use(router)
  .use(ToastService)
  .use(PrimeVue, {
    ripple: true,
    theme: {
      preset: Aura
    }
  })
  .mount('#app')
