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
  <IncomingFundsHeader />
  <CircleBarList v-if="!isLoading" :items="debts" @on-edit="onEditDebt" />
  <IncomingFunds />
  <TheSpinner :is-loading="isLoading" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import CircleBarList from '@/components/CircleBarList/CircleBarList.vue'
import TheSpinner from '@/components/Spinner/TheSpinner.vue'

import DebtModal from '@/features/Debts/DebtModal.vue'
import IncomingFundsModal from '@/features/IncomingFunds/IncomingFundsModal.vue'
import IncomingFunds from '@/features/IncomingFunds/IncomingFunds.vue'
import IncomingFundsHeader from '@/features/IncomingFunds/IncomingFundsHeader.vue'
import ButtonGroup from 'primevue/buttongroup'
import DebtService from '@/features/Debts/debt.service'
import { useDebtStore } from '@/stores/debt.store'

const isLoading = ref(false)
const showDebtModal = ref(false)
const isEditMode = ref(false)
const debtId = ref(null)
const debtStore = useDebtStore()
const debts = computed(() => debtStore.debts);

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
  await DebtService.fetchDebts()
  isLoading.value = false
})
</script>
