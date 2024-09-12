<template>
  <Button
    label="Add new debt"
    @click="showModal = true"
    severity="secondary"
    icon="pi pi-credit-card"
  />
  <Dialog
    v-model:visible="showModal"
    modal
    class="debt-dialog"
    :draggable="false"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    @after-hide="onModalAfterHide"
  >
    <template #header>
      <h2 v-if="isEdit">Edit this debt</h2>
      <h2 v-else>Add new debt</h2>
    </template>

    <DebtForm
      v-if="Object.keys(debtData).length"
      :key="debtData?.created_at"
      :initial-data="debtData"
      :is-loading="isLoading"
      :is-edit="isEdit"
      @on-submit="onSubmit"
    />
  </Dialog>
</template>

<script lang="ts" setup>
import { defineModel, ref, watch } from 'vue'
import DebtForm from '@/features/Debts/DebtForm.vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import DebtService from '@/features/Debts/debt.service'
import { useAuthStore } from '@/stores/auth.store'
import { useToast } from 'primevue/usetoast'

const authStore = useAuthStore()
const toast = useToast()

const isLoading = ref(false)
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false
  },
  debtId: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['on-modal-after-hide'])

const showModal = defineModel(false)
const debtData = ref({})
const onModalAfterHide = () => emit('on-modal-after-hide')

const onSubmit = async ({ fields }) => {
  isLoading.value = true
  if (props.isEdit) {
    const { error } = await DebtService.updateDebt(props.debtId, {
      ...fields.value,
      user_id: authStore.authUser.id
    })

    if (error) {
      toast.add({
        severity: 'warn',
        summary: error,
        closable: true
      })
    } else {
      toast.add({
        severity: 'success',
        summary: 'Debt updated!',
        life: 3000
      })
    }
  } else {
    const { error } = await DebtService.addDebt({
      ...fields.value,
      user_id: authStore.authUser.id
    })

    if (error) {
      toast.add({
        severity: 'warn',
        summary: error,
        closable: true
      })
    } else {
      toast.add({
        severity: 'success',
        summary: 'New debt added!',
        life: 3000
      })
    }
  }
  isLoading.value = false
}

watch(
  () => props.isEdit,
  async (value) => {
    if (value && props.debtId) {
      isLoading.value = true
      const { data } = await DebtService.getDebtById(props.debtId)
      debtData.value = data
      isLoading.value = false
    }
  }
)
</script>

<style>
.debt-dialog {
  width: 100vw;
}

@media (min-width: 768px) {
  .debt-dialog {
    width: 40vw;
  }
}
</style>
