<template>
  <form @submit.prevent="onSubmit">
    <div class="field">
      <label for="salary">Salary</label>
      <InputNumber id="salary" v-model="formModel.salary" fluid />
    </div>
    <div class="field">
      <label for="bonus">Bonus</label>
      <InputNumber id="bonus" v-model="formModel.bonus" fluid />
    </div>
    <div class="field">
      <label for="description">Description</label>
      <Textarea id="description" v-model="formModel.description" fluid />
    </div>
    <div class="field">
      <label for="status">Status</label>
      <Select
        id="status"
        v-model="formModel.status"
        fluid
        :options="incomingFundsStatusOptions"
        optionLabel="label"
        optionValue="value"
      />
    </div>
    <div class="field">
      <label for="contract-id">Contract Id</label>
      <InputText id="contract-id" v-model="formModel.contractId" fluid />
    </div>
    <div class="field">
      <label for="payment-type">Payment type</label>
      <Select
        id="payment-type"
        v-model="formModel.paymentType"
        fluid
        :options="incomingFundsPaymentTypeOptions"
        optionLabel="label"
        optionValue="value"
      />
    </div>
    <div class="field">
      <label for="deptOpenedOn">Payment Date</label>
      <DatePicker id="deptOpenedOn" v-model="formModel.paymentDate" fluid />
    </div>
    <div class="field">
      <label for="currency">Currency</label>
      <Select
        id="currency"
        v-model="formModel.currency"
        :options="currencyOptions"
        optionLabel="label"
        optionValue="value"
        fluid
      />
    </div>
    <ButtonGroup>
      <Button :disabled="isLoading" type="submit" label="Add" icon="pi pi-check" />
      <Button
        :disabled="isLoading"
        severity="warn"
        label="Cancel"
        icon="pi pi-times-circle"
        @click="emit('on-cancel')"
      />
    </ButtonGroup>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { IncomingFundsInterface } from '@/features/IncomingFunds/incoming.funds.interface'

import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import DatePicker from 'primevue/datepicker'
import ButtonGroup from 'primevue/buttongroup'
import Button from 'primevue/button'

import {
  incomingFundsStatusOptions,
  incomingFundsPaymentTypeOptions
} from '@/constants/status.const'

import { currencyOptions } from '@/constants/currency.const'

const emit = defineEmits(['on-submit', 'on-cancel'])

const formModel = ref<IncomingFundsInterface>({
  salary: 0,
  bonus: 0,
  description: '',
  status: '',
  contractId: '',
  paymentType: '',
  paymentDate: new Date(),
  currency: 'EUR'
})

const onSubmit = () => emit('on-submit', formModel.value)
</script>
