<template>
  <div class="sidebar-menu">
    <Button icon="pi pi-bars" @click="toggleDrawer" />
    <Drawer v-model:visible="drawerVisible" position="left" :style="{ width: '350px' }">
      <h3>Menu</h3>
      <Menu :model="menuItems">
        <template #item="{ item }">
          <Button as="router-link" v-if="item.to" :to="item.to" class="menu-link" text raised>
            <i :class="item.icon"></i>
            {{ item.label }}
          </Button>
          <Button v-else @click="handleLogout" severity="danger" text raised>
            <i class="pi pi-sign-out"></i>
            Logout
          </Button>
        </template>
      </Menu>
    </Drawer>
    <main :class="{ content: true, 'content-shifted': drawerVisible }">
      <RouterView />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import Drawer from 'primevue/drawer'
import Menu from 'primevue/menu'
import AuthService from '@/services/auth.service'
import { useRouter } from 'vue-router'
import { menuItems } from '@/constants/menu.const'

const router = useRouter()

const drawerVisible = ref(false)

const toggleDrawer = () => {
  drawerVisible.value = !drawerVisible.value
}

const handleLogout = async () => {
  await AuthService.logout()
  await router.push('/')
}
</script>

<style>
@import './sidebar-menu.css';
</style>
