import router from '@/router'
import { useToast } from 'primevue/usetoast'

router.beforeEach(async (to, from, next) => {
  const toast = useToast()

  toast.removeAllGroups()
  next()
})
