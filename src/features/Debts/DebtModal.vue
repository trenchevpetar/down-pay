<template>
  <Button label="Add new debt" @click="showModal = true" />
  <Dialog
    v-model:visible="showModal"
    modal
    class="debt-dialog"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
  >
    <template #header>
      <h2>Add new debt</h2>
    </template>

    <DebtForm />
  </Dialog>
</template>


<script lang="ts" setup>
import { ref } from 'vue';
import DebtForm from '@/features/Debts/DebtForm.vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const showModal = ref(false);
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
