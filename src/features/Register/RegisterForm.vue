<template>
  <div class="register-form-wrapper">
    <form @submit.prevent="handleRegister">
      <Card title="Register">
        <template #title>Register</template>
        <template #content>
          <InputText id="name" v-model="form.name" placeholder="Enter your name" fluid />
          <InputText id="email" v-model="form.email" placeholder="Enter your email" fluid />
          <InputText
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
            fluid
          />
        </template>
        <template #footer>
          <Button type="submit" label="Register" />
          <Button as="router-link" severity="info" type="submit" label="Login" to="/" />
        </template>
      </Card>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Card from 'primevue/card'
import AuthService from '@/services/auth.service'
import type { RegisterModel } from '@/features/Register/register.interface'

const toast = useToast()
const router = useRouter()
const form = ref<RegisterModel>({
  name: '',
  email: '',
  password: ''
})

const errors = ref<Record<string, string>>({})

const handleRegister = async () => {
  errors.value = {} // Reset errors

  // Simple validation
  if (!form.value.email) {
    errors.value.email = 'Email is required'
  }
  if (!form.value.password) {
    errors.value.password = 'Password is required'
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
  }

  if (Object.keys(errors.value).length === 0) {
    const { data, error } = await AuthService.register(
      form.value.email,
      form.value.password,
      form.value.name
    )
    if (data && !error) {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Registration successful, redirecting to login'
      })
      setTimeout(async () => {
        await router.push('/login')
      }, 1500)
    } else {
      toast.add({ severity: 'error', summary: 'Error', detail: error })
    }
  } else {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Please correct the errors in the form'
    })
  }
}
</script>

<style>
@import './register-form.css';
</style>
