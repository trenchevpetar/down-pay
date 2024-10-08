<template>
  <Button label="Add new incoming payment" @click="showModal = true" icon="pi pi-wallet" />
  <Dialog
    v-model:visible="showModal"
    modal
    class="debt-dialog"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
  >
    <template #header>
      <h2>Add new payment</h2>
    </template>

    <IncomingFundsForm @on-submit="onSubmit" />
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

import IncomingFundsForm from '@/features/IncomingFunds/IncomingFundsForm.vue'

import IncomingFundsService from '@/features/IncomingFunds/incoming.funds.service'

import { useAuthStore } from '@/stores/auth.store'

const showModal = ref(false)
const authStore = useAuthStore()

const onSubmit = async (fields) => {
  await IncomingFundsService.addIncomingFunds({
    ...fields,
    user_id: authStore.authUser.id
  })
}
</script>
