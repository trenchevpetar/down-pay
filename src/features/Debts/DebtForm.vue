<template>
  <form @submit.prevent="onSubmit">
    <pre>
      {{ formModel }}
    </pre>
    <div class="field">
      <label for="property">Debt name</label>
      <InputText id="name" v-model="formModel.debtName" placeholder="Debt name" fluid />
    </div>
    <div class="field">
      <label for="debtLender">Debt lender</label>
      <InputText
        id="holder"
        v-model="formModel.holder"
        placeholder="Enter the facility where the debt has been taken from"
        fluid
      />
    </div>
    <div class="field">
      <label for="originalBalance">Original balance (€)</label>
      <InputNumber
        id="originalBalance"
        v-model="formModel.originalBalance"
        placeholder="Original balance"
        mode="currency"
        currency="EUR"
        locale="en-US"
        fluid
      />
    </div>
    <div class="field">
      <label for="currentLeftover">Current leftover (€)</label>
      <InputNumber
        id="currentLeftover"
        v-model="formModel.currentLeftover"
        placeholder="Leftover to be paid"
        mode="currency"
        currency="EUR"
        locale="en-US"
        fluid
      />
    </div>
    <div class="field">
      <label for="termLength">Term length (years)</label>
      <InputNumber
        id="termLength"
        v-model="formModel.termLength"
        fluid
        @update:model-value="onTermLengthChange"
      />
    </div>
    <div class="field">
      <label for="totalAmountPaid">Total amount paid (€)</label>
      <InputNumber
        disabled
        id="totalAmountPaid"
        v-model="totalAmountPaid"
        placeholder="Total amount paid"
        mode="currency"
        currency="EUR"
        locale="en-US"
        fluid
      />
    </div>
    <div class="field">
      <label for="status">Status</label>
      <Select
        id="status"
        v-model="formModel.status"
        :options="statusOptions"
        optionLabel="label"
        optionValue="value"
        fluid
      />
    </div>
    <div class="field">
      <label for="paymentFrequency">Payment frequency</label>
      <Select
        id="paymentFrequency"
        v-model="formModel.paymentFrequency"
        :options="paymentFrequencyOptions"
        optionLabel="label"
        optionValue="value"
        fluid
      />
    </div>
    <div class="field">
      <label for="deptOpenedOn">Debt opened on</label>
      <DatePicker
        id="deptOpenedOn"
        v-model="formModel.debtOpenedOn"
        @update:model-value="onDebtOpenedChange"
        fluid
      />
    </div>
    <div class="field">
      <label for="interestRate">Interest rate</label>
      <InputNumber
        id="interestRate"
        v-model="formModel.interestRate"
        placeholder="Interest rate"
        :minFractionDigits="2"
        :maxFractionDigits="2"
        fluid
      />
    </div>
    <div class="field">
      <label for="endOfTerm">End of term</label>
      <InputText id="endOfTerm" v-model="formModel.endOfTerm" disabled fluid />
    </div>
    <div class="field">
      <Button type="submit" label="Submit" icon="pi pi-check" fluid></Button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'

import type { DebtModel } from '@/features/Debts/debt.interface'
import DebtService from '@/features/Debts/debt.service'

import { currentMonthDates } from '@/utils/date/current.month.dates'

import dayjs from 'dayjs'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()
const formModel = ref<DebtModel>({
  debtName: '',
  holder: '',
  originalBalance: 0,
  currentLeftover: 0,
  termLength: 10,
  status: 'current',
  debtOpenedOn: new Date(),
  paymentFrequency: currentMonthDates.value.middleOfTheMonth,
  interestRate: 2.4,
  endOfTerm: dayjs()
})

const totalAmountPaid = computed(() => {
  if (formModel.value.currentLeftover) {
    return formModel.value.originalBalance - formModel.value.currentLeftover
  }
  return 0
})

const setEndOfTerm = (date = {}) => {
  formModel.value.endOfTerm = dayjs()

  if (date.day) {
    formModel.value.endOfTerm = dayjs(formModel.value.endOfTerm).set('date', date.day)
  }
  if (date.month) {
    formModel.value.endOfTerm = dayjs(formModel.value.endOfTerm).set('month', date.month)
  }
  if (date.year) {
    formModel.value.endOfTerm = dayjs(formModel.value.endOfTerm).set('year', date.year)
  } else {
    const getYear = dayjs(formModel.value.endOfTerm).year()

    formModel.value.endOfTerm = dayjs(formModel.value.endOfTerm).set(
      'year',
      getYear + formModel.value.termLength
    )
  }
}

const statusOptions = [
  { label: 'Current', value: 'current' },
  { label: 'Past Due', value: 'past-due' },
  { label: 'Grace Period', value: 'grace-period' }
]

const paymentFrequencyOptions = [
  { label: '1st day of the month', value: currentMonthDates.value.firstDayOfMonth },
  { label: '15th day of the month', value: currentMonthDates.value.middleOfTheMonth },
  { label: 'Last day of the month', value: currentMonthDates.value.lastDayOfMonth }
]

const onTermLengthChange = (value) => {
  setEndOfTerm({
    day: dayjs().date(),
    month: dayjs().month(),
    year: dayjs().year() + value
  })
}

const onDebtOpenedChange = (value) => {
  setEndOfTerm({
    day: dayjs(value).date(),
    month: dayjs(value).month(),
    year: null
  })
}

const onSubmit = async () => {
  await DebtService.addDebt({
    ...formModel.value,
    user_id: authStore.authUser.id
  })
}
</script>

<style scoped>
.field {
  margin-bottom: 1rem;
}

.field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
</style>
