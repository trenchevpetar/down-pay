<template>
  <div class="sidebar-menu">
    <Button icon="pi pi-bars" @click="toggleDrawer" class="p-mb-2" />
    <Drawer v-model:visible="drawerVisible" position="left" :style="{ width: '250px' }">
      <h3>Menu</h3>
      <Menu :model="menuItems" class="p-m-0">
        <template #item="{ item }">
          <Button as="router-link" v-if="item.to" :to="item.to" class="menu-link" text raised>
            <i :class="item.icon"></i>
            {{ item.label }}
          </Button>
          <Button v-else @click="handleLogout" severity="danger" text raised> Logout </Button>
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

const router = useRouter()

const drawerVisible = ref(false)

const toggleDrawer = () => {
  drawerVisible.value = !drawerVisible.value
}

const handleLogout = async () => {
  await AuthService.logout()
  await router.push('/')
}

const menuItems = [
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    to: '/dashboard'
  },
  {
    label: 'Settings',
    icon: 'pi pi-envelope',
    to: '/settings'
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out'
  }
]
</script>

<style>
.sidebar-menu .p-menu {
  border: 0;
}

.content {
  transition: margin-left 0.2s ease-in;
}

.content-shifted {
  margin-left: 250px;
}
</style>
