<template>
  <InvoicesList @on-add="onAdd" />
  {{ currentInvoice }}
</template>

<script lang="ts" setup>
import InvoicesList from '@/features/Invoices/InvoicesList.vue'
import { ref } from 'vue'

const currentInvoice = ref(null)
const onAdd = (invoice) => {
  currentInvoice.value = invoice
}
</script>
