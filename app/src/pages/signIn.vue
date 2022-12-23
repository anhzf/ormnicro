<route lang="yaml">
meta:
  auth:
    guest: true
</route>

<script lang="ts" setup>
import { GoogleAuthProvider, signInWithRedirect } from '@firebase/auth'
import { auth } from '~/services/firebase'

const PROVIDER = new GoogleAuthProvider()

const signIn = () => {
  signInWithRedirect(auth(), PROVIDER)
}
</script>

<template>
  <main class="grow flex flex-col justify-center px-6 py-4">
    <button class="btn" @click="signIn">
      Login dengan Google
    </button>
  </main>
</template>
