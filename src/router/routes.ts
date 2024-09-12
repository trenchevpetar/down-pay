import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

export const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/recurring-expenses',
    name: 'recurring.expenses',
    component: () => import('@/views/RecurringExpensesView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/incoming-funds',
    name: 'incoming.funds',
    component: () => import('@/views/IncomingFundsView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/currency-converter',
    name: 'currency.converter',
    component: () => import('@/views/CurrencyConverterView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/SettingsView.vue'),
    meta: {
      requiresAuth: true
    }
  }
]
