<template>
  <div class="currency-picker">
    <Select
      v-model="selectedCurrency"
      :options="currencyOptions"
      option-label="label"
      option-value="value"
      placeholder="Select the currency you want to use through the application"
    >
      <template #option="slotProps">
        <div class="currency-picker__option">
          <i :class="slotProps.option.icon"></i>
          <span>{{ slotProps.option.label }}</span>
        </div>
      </template>
    </Select>
    <Divider />
    <Button
      label="Save"
      icon="pi pi-check"
      class="p-mt-2"
      @click="onSave"
      :loading="isLoading"
      :disabled="settingsStore.currentCurrency.value === selectedCurrency"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Select from 'primevue/select'
import Button from 'primevue/button'
import Divider from 'primevue/divider'

import { useToast } from 'primevue/usetoast'
import { useCurrencyStore } from '@/stores/currency.store'
import { useSettingsStore } from '@/stores/settings.store'
import SettingsService from '@/services/settings.service'

import { currencyOptions } from '@/constants/currency.const'

const currencyStore = useCurrencyStore();
const settingsStore = useSettingsStore();
const toast = useToast()
const isLoading = ref(false)

const selectedCurrency = ref<string | null>(settingsStore.defaultCurrency)

const onSave = async () => {
  isLoading.value = true
  const { error } = await SettingsService.changeCurrency(selectedCurrency.value)

  if (!error) {
    await currencyStore.fetchCurrencies()

    toast.add({
      severity: 'success',
      summary: 'Currency updated!',
      life: 3000,
      detail: 'This is global currency usage, but you can also set currency per debt'
    })
  }

  isLoading.value = false
}
</script>

<style>
@import './currency-picker.css';
</style>
