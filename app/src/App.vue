<script lang="ts" setup>
import { onIdTokenChanged } from 'firebase/auth'
import { auth } from '~/services/firebase'

const UNAUTH_FALLBACK_ROUTE = { name: 'signIn' }
// const AUTH_FALLBACK_ROUTE = {name: 'index'}
const GUEST_FALLBACK_ROUTE = { name: 'index' }

const route = useRoute()
const router = useRouter()

onIdTokenChanged(auth(), (user) => {
  const isAuthenticated = !!user

  if (route.meta.auth?.required === false)
    return Promise.resolve()

  // Redirect to index if auth type is guest
  if (route.meta.auth?.guest) {
    return isAuthenticated
      ? router.push(GUEST_FALLBACK_ROUTE)
      : Promise.resolve()
  }

  // Always fallback to signIn page if not authenticated
  return isAuthenticated ? Promise.resolve() : router.push(UNAUTH_FALLBACK_ROUTE)
})
</script>

<template>
  <router-view />
</template>
