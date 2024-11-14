<template>
  <header class="header">
    <Menubar :model="menuItems">
      <template #item="{ item, props, hasSubmenu }">
        <RouterLink v-slot="{ isActive, href, navigate }" :to="item?.to" custom>
          <a
            :href="href"
            v-bind="props.action"
            @click="navigate"
            :class="{ 'header__item--is-active': isActive }"
          >
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </RouterLink>
      </template>
      <template #end>
        <Button @click="handleLogout" severity="contrast">
          <span class="pi pi-sign-out" />
        </Button>
      </template>
    </Menubar>
    <main>
      <RouterView />
    </main>
  </header>
</template>

<script lang="ts" setup>
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import AuthService from '@/services/auth.service'
import { useRouter } from 'vue-router'
import { menuItems } from '@/constants/menu.const'

const router = useRouter()

const handleLogout = async () => {
  await AuthService.logout()
  await router.push('/')
}
</script>

<style>
@import './header.css';
</style>
