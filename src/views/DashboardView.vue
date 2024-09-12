<template>
  <h1>Dashboard</h1>
  <ButtonGroup>
    <DebtModal
      v-model="showDebtModal"
      :is-edit="isEditMode"
      :debt-id="debtId"
      @on-modal-after-hide="onModalAfterHide"
    />
    <IncomingFundsModal />
  </ButtonGroup>
  <CircleBarList v-if="!isLoading" :items="debts" @on-edit="onEditDebt" />
  <TheSpinner :is-loading="isLoading" />
</template>

<script setup lang="ts">
import CircleBarList from '@/components/CircleBarList/CircleBarList.vue'
import TheSpinner from '@/components/Spinner/TheSpinner.vue'

import DebtModal from '@/features/Debts/DebtModal.vue'
import IncomingFundsModal from '@/features/IncomingFunds/IncomingFundsModal.vue'
import ButtonGroup from 'primevue/buttongroup'
import DebtService from '@/features/Debts/debt.service'
import { onMounted, ref } from 'vue'

const debts = ref(null)
const isLoading = ref(false)
const showDebtModal = ref(false)
const isEditMode = ref(false)
const debtId = ref(null)

const onEditDebt = (id) => {
  debtId.value = id
  showDebtModal.value = true
  isEditMode.value = true
}

const onModalAfterHide = () => {
  isEditMode.value = false
}

onMounted(async () => {
  isLoading.value = true
  const { data } = await DebtService.fetchDebts()
  debts.value = data
  isLoading.value = false
})
</script>
