<template>
  <div class="currency-picker">
    <Select
      v-model="selectedCurrency"
      :options="currencyOptions"
      option-label="label"
      option-value="value"
      placeholder="Select the currency you want to use through the application"
      filter
      show-clear
    />
    <Divider />
    <Button label="Save" icon="pi pi-check" class="p-mt-2" @click="onSave" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Select from 'primevue/select'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import type { CurrencyModel } from '@/features/CurrencyPicker/currency.picker.interface'

import { useAuthStore } from '@/stores/auth.store'
import UserService from '@/services/user.service'

const authStore = useAuthStore()

const currencyOptions: CurrencyModel[] = [
  { label: 'MKD', value: 'MKD' },
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'GBP', value: 'GBP' }
]

const selectedCurrency = ref<string | null>(authStore.authUser.currency)

const onSave = async () => {
  await UserService.changeCurrency(selectedCurrency.value)
}
</script>
