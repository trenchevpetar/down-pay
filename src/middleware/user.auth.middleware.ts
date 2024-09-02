import { useAuthStore } from '@/stores/auth.store'
import router from '@/router'

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (authStore.isAuthenticated && to.name === "login") {
    next({ name: "dashboard" });
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authStore.isAuthenticated) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }
})
