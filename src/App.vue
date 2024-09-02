<script setup lang="ts">
import SidebarMenu from '@/components/SidebarMenu/SidebarMenu.vue'

import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore();
</script>

<template>
  <SidebarMenu v-if="authStore.isAuthenticated" />
  <RouterView v-else />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
</style>
