<template>
  <Tabs :value="0" @update:value="onUpdate">
    <TabList>
      <Tab v-for="(invoice, index) in supportedInvoices" :key="invoice.name" :value="index">
        <span :class="invoice.icon" />
        {{ invoice.name }}
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel v-for="(invoice, index) in supportedInvoices" :key="invoice.name" :value="index">
        <p>{{ invoice.name }}</p>

        <Button @click="onAdd(invoice)"> Add new {{ invoice.key }} bill </Button>
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>

<script lang="ts" setup>
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Button from 'primevue/button'
import { supportedInvoices } from '@/features/Invoices/supported.invoices'

defineProps({
  invoices: {
    type: Array,
    default: () => [
      {
        name: 'electric',
        amount: 2000,
        month: '03',
        year: '2024',
        currency: 'MKD',
        status: 'unpaid'
      },
      {
        name: 'water',
        amount: 10,
        month: '05',
        year: '2024',
        currency: 'EUR',
        status: 'paid'
      },
      {
        name: 'household',
        amount: 100,
        month: '04',
        year: '2024',
        currency: 'USD',
        status: 'pending'
      }
    ]
  }
})

const emit = defineEmits(['on-add'])

const onAdd = (invoice) => emit('on-add', invoice)
const onUpdate = (value) => console.log(value)
</script>

<style>
@import './invoices-list.css';
</style>
