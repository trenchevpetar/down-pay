<template>
  <form @submit.prevent="onSubmit">
    <TheSpinner :is-loading="isLoading" />
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
      <label for="originalBalance">Original balance</label>
      <InputNumber
        id="originalBalance"
        v-model="formModel.originalBalance"
        placeholder="Original balance"
        mode="currency"
        :currency="formModel.currency"
        locale="en-US"
        fluid
      />
    </div>
    <div class="field">
      <label for="currentLeftover">Current leftover</label>
      <InputNumber
        id="currentLeftover"
        v-model="formModel.currentLeftover"
        placeholder="Leftover to be paid"
        mode="currency"
        :currency="formModel.currency"
        locale="en-US"
        fluid
      />
    </div>
    <div class="field">
      <label for="termLength">Term length (years)</label>
      <InputText
        id="termLength"
        v-model="formModel.termLength"
        fluid
        @update:model-value="onTermLengthChange"
      />
    </div>
    <div class="field">
      <label for="totalAmountPaid">Total amount paid</label>
      <InputText
        disabled
        id="totalAmountPaid"
        :model-value="formatCurrency(totalAmountPaid, formModel.currency)"
        placeholder="Total amount paid"
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
      <label for="paymentFrequency">Currency</label>
      <Select
        id="paymentFrequency"
        v-model="formModel.currency"
        :options="currencyOptions"
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
      <label for="monthlyRate">Monthly rate</label>
      <InputText id="monthlyRate" v-model="monthlyRate" disabled fluid />
    </div>
    <div class="field">
      <label for="endOfTerm">End of term</label>
      <InputText id="endOfTerm" v-model="formModel.endOfTerm" disabled fluid />
    </div>
    <div class="field">
      <ButtonGroup>
        <Button
          :disabled="isLoading"
          type="submit"
          :label="`${isEdit ? 'Save' : 'Add'}`"
          icon="pi pi-check"
        />
        <Button
          :disabled="isLoading"
          severity="warn"
          label="Cancel"
          icon="pi pi-times-circle"
        />
      </ButtonGroup>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import ButtonGroup from 'primevue/buttongroup'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import TheSpinner from '@/components/Spinner/TheSpinner.vue'

import type { DebtModel } from '@/features/Debts/debt.interface'

import { currentMonthDates } from '@/utils/date/current.month.dates'
import { currencyOptions } from '@/constants/currency.const'
import { statusOptions } from '@/constants/status.const'

import dayjs from 'dayjs'
import { useCurrencyStore } from '@/stores/currency.store'
import { formatCurrency } from '@/utils/currency/format.currency'
import { convertCurrency } from '@/utils/currency/convert.currency'
import { calculateMonthlyPayment } from '@/utils/currency/monthly.payment'

const currencyStore = useCurrencyStore()
const emit = defineEmits(['on-submit'])
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  initialData: {
    type: Object,
    default: () => ({
      debtName: '',
      holder: '',
      originalBalance: 0,
      currentLeftover: 0,
      currency: 'EUR',
      termLength: 10,
      status: 'current',
      debtOpenedOn: new Date(),
      paymentFrequency: currentMonthDates.value.middleOfTheMonth,
      interestRate: 2.4,
      endOfTerm: dayjs()
    })
  }
})
const formModel = ref<DebtModel>(props.initialData)

const totalAmountPaid = computed(() => {
  if (formModel.value.currentLeftover) {
    return formModel.value.originalBalance - formModel.value.currentLeftover
  }
  return 0
})

const monthlyRate = computed(() => {
  return calculateMonthlyPayment(
    formModel.value.originalBalance,
    formModel.value.interestRate,
    formModel.value.termLength,
    formModel.value.currency
  )
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
  emit('on-submit', {
    fields: formModel
  })
}

watch(
  () => formModel.value.currency,
  (newValue, oldValue) => {
    if (newValue) {
      formModel.value.originalBalance = convertCurrency(
        formModel.value.originalBalance,
        oldValue,
        newValue,
        true,
        currencyStore.currencies
      )

      formModel.value.currentLeftover = convertCurrency(
        formModel.value.currentLeftover,
        oldValue,
        newValue,
        true,
        currencyStore.currencies
      )
    }
  }
)
</script>

<style scoped>
.field {
  margin-bottom: var(--gap-16);
}

.field label {
  display: block;
  margin-bottom: var(--gap-8);
}
</style>
