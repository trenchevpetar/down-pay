<template>
  <div class="login-form-wrapper">
    <form @submit.prevent="handleSubmit">
      <Card>
        <template #title>Login</template>
        <template #content>
          <InputText id="email" v-model="form.email" placeholder="Email" />
          <Password id="password" v-model="form.password" toggleMask placeholder="Password" />
        </template>
        <template #footer>
          <Button label="Login" type="submit" icon="pi pi-sign-in" />
          <Button
            as="router-link"
            to="/register"
            label="Register"
            icon="pi pi-sign-up"
            severity="info"
          />
        </template>
      </Card>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

import type { LoginModel } from '@/features/Login/login.interface'

import AuthService from '@/services/auth.service'

const router = useRouter()
const form = ref<LoginModel>({
  email: '',
  password: ''
})

const handleSubmit = async () => {
  const { data, error } = await AuthService.login(form.value.email, form.value.password)
  if (data && !error) {
    await router.push('/dashboard')
  }
}
</script>

<style>
@import './login-form.css';
</style>
