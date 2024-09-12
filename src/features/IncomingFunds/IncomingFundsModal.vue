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

    <IncomingFundsForm />
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

import IncomingFundsForm from '@/features/IncomingFunds/IncomingFundsForm.vue'

const showModal = ref(false);
</script>
