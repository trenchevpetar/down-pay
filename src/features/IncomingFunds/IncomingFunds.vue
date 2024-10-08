<template>
  <Card class="storage-card">
    <template #content>
      <div class="storage-items">
        <div v-for="item in storageItems" :key="item.label" class="storage-item">
          <i :class="['storage-icon', item.icon]" :style="{ backgroundColor: item.color }"></i>
          <div class="storage-details">
            <div class="storage-label">{{ item.label }}</div>
            <div class="storage-value">{{ item.value }}</div>
          </div>
        </div>
      </div>
      <div class="storage-meter">
        <div class="storage-info">
          <span>Storage</span>
          <div>
            <span class="storage-percentage">{{ storageUsage }}%</span>
            <span class="storage-capacity">{{ storageCapacity }}</span>
          </div>
        </div>
        <div class="meter-bar">
          <div class="meter-fill" :style="{ width: `${storageUsage}%` }"></div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Card from 'primevue/card';

interface StorageItem {
  label: string;
  value: string;
  icon: string;
  color: string;
}

const storageItems = ref<StorageItem[]>([
  { label: 'Apps', value: '25%', icon: 'pi pi-th-large', color: '#4ade80' },
  { label: 'Messages', value: '15%', icon: 'pi pi-envelope', color: '#fbbf24' },
  { label: 'Media', value: '20%', icon: 'pi pi-image', color: '#60a5fa' },
  { label: 'System', value: '10%', icon: 'pi pi-cog', color: '#a78bfa' },
]);

const storageUsage = ref(70);
const storageCapacity = ref('1TB');
</script>

<style scoped>
.storage-card {
  margin: auto;
}

.storage-items {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.storage-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.storage-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.storage-details {
  display: flex;
  flex-direction: column;
}

.storage-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.storage-value {
  font-size: 1rem;
  font-weight: bold;
  color: #1f2937;
}

.storage-meter {
  margin-top: 1rem;
}

.storage-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.storage-percentage {
  font-weight: bold;
  color: #1f2937;
  margin-right: 0.5rem;
}

.storage-capacity {
  color: #6b7280;
}

.meter-bar {
  height: 0.5rem;
  background-color: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
}

.meter-fill {
  height: 100%;
  background-image: linear-gradient(to right, #4ade80, #60a5fa, #a78bfa);
  border-radius: 9999px;
  transition: width 0.3s ease;
}
</style>
