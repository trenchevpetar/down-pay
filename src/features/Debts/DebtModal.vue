<template>
  <Button label="Add new debt" @click="onAdd" severity="secondary" icon="pi pi-credit-card" />
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
      :is-loading="isLoading"
      :is-edit="isEdit"
      @on-submit="onSubmit"
      @on-cancel="onCancel"
    />
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import DebtForm from '@/features/Debts/DebtForm.vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import DebtService from '@/features/Debts/debt.service'
import { useAuthStore } from '@/stores/auth.store'
import { useToast } from 'primevue/usetoast'
import { useDebtStore } from '@/stores/debt.store'
import { defaultDebt } from '@/features/Debts/default.debt'

const authStore = useAuthStore()
const debtStore = useDebtStore()
const toast = useToast()

const isLoading = ref(false)
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false
  },
  debtId: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['on-modal-after-hide'])

const showModal = defineModel(false)
const onModalAfterHide = () => emit('on-modal-after-hide')

const onAdd = () => {
  debtStore.debtForEdit = defaultDebt()
  showModal.value = true
}

const onCancel = () => (showModal.value = false)

const onSubmit = async ({ fields }) => {
  isLoading.value = true
  if (props.isEdit) {
    const { error } = await DebtService.updateDebt(props.debtId, {
      ...fields,
      userId: authStore.authUser.$id
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
      ...fields,
      userId: authStore.authUser.$id
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
      const response = await DebtService.getDebtById(props.debtId)
      console.log(response)
      debtStore.debtForEdit = response
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
