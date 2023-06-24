<script lang="ts" setup>
import { useAuth } from '@vueuse/firebase'
import { auth } from '~/services/firebase'

const UNAUTH_FALLBACK_ROUTE = { name: 'signIn' }
// const AUTH_FALLBACK_ROUTE = {name: 'index'}
const GUEST_FALLBACK_ROUTE = { name: 'index' }

const route = useRoute()
const router = useRouter()
const { isAuthenticated } = useAuth(auth())

watch(isAuthenticated, (val) => {
  if (route.meta.auth?.required === false)
    return Promise.resolve()

  // Redirect to index if auth type is guest
  if (route.meta.auth?.guest) {
    return val
      ? router.push(GUEST_FALLBACK_ROUTE)
      : Promise.resolve()
  }

  // Always fallback to signIn page if not authenticated
  return val ? Promise.resolve() : router.push(UNAUTH_FALLBACK_ROUTE)
}, { immediate: true })
</script>

<template>
  <router-view />
</template>
