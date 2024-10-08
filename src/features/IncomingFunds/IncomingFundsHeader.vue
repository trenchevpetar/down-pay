<template>
  <div>
    <!-- Search Input for filtering cards -->
    <div class="filter-container">
      <input v-model="searchQuery" type="text" placeholder="Search items..." class="search-input" />
    </div>

    <!-- Display Filtered Cards -->
    <div class="card-grid">
      <Card v-for="item in filteredItems" :key="item.id" class="custom-card">
        <template #header>
          <span class="card-title">{{ item.contractId }}</span>
          <span class="card-title"> - {{ item.status }}</span>
        </template>
        <template #title>
          <ul>
            <li>
              <span class="card-title">Salary: {{ formatCurrency(item.salary, item.currency) }}</span>
            </li>
            <li>
              <span class="card-title">Payment type: {{ item.paymentType }}</span>
            </li>
            <li>
              <span class="card-title">Payment type: {{ item.paymentDate }}</span>
            </li>
          </ul>
        </template>
        <template #content>
          <p>{{ item.description }}</p>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import IncomingFundsService from '@/features/IncomingFunds/incoming.funds.service'
import Card from 'primevue/card'
import { formatCurrency } from '@/utils/currency/format.currency'

const items = ref([])
const searchQuery = ref('')

const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase()
  if (searchQuery.value) {
    return items.value.filter((item) => item.desc.toLowerCase().includes(query))
  }
  return items.value
})

onMounted(async () => {
  // const { data } = await IncomingFundsService.fetchPayments()
  // items.value = data
})
</script>

<style scoped>
/* Custom styling */
.filter-container {
  margin: 1rem 0;
}

.search-input {
  padding: 0.5rem;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #d3d3d3;
  font-size: 1rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.custom-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 1rem;
  transition: transform 0.3s ease;
}

.custom-card:hover {
  transform: translateY(-5px);
}

.card-title {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
