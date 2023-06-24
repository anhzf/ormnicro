<route lang="yaml">
meta:
  auth:
    guest: true
</route>

<script lang="ts" setup>
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth'
import { auth } from '~/services/firebase'

const errMsg = ref('')
const fields = ref({
  email: '',
  password: '',
})

const signIn = async (signUp = false) => {
  try {
    errMsg.value = ''
    if (signUp)
      await createUserWithEmailAndPassword(auth(), fields.value.email, fields.value.password)

    else
      await signInWithEmailAndPassword(auth(), fields.value.email, fields.value.password)
  }
  catch (err) {
    if (err.code === 'auth/user-not-found') {
      await signIn(true)
    }

    else {
      if (import.meta.env.DEV)
        console.error(err)

      errMsg.value = (err.message || err.code || String(err)).replace('Firebase: ', '')
    }
  }
}

const onSubmit = () => signIn()
</script>

<template>
  <main class="grow flex flex-col justify-center px-6 py-4">
    <h1 class="text-2xl text-center text-$on-primary-bg font-semibold">
      Masuk ke ORMNicro
    </h1>

    <form class="flex flex-col gap-y-4 py-8" @submit.prevent="onSubmit">
      <label class="form-control flex items-center gap-4 bg-green-100 hover:bg-green-200 px-3 py-4 rounded-t border-b-2 border-inset border-$primary-outline focus-within:border-$primary transition">
        <div class="i-material-symbols:alternate-email text-2xl text-$primary" />
        <input
          v-model="fields.email"
          type="email"
          class="form-control__input w-full bg-transparent text-$bw valid:text-$bw-xstrong outline-none"
          placeholder="Email (cth: me@example.com)"
        >
      </label>

      <label class="form-control flex items-center gap-4 bg-green-100 hover:bg-green-200 px-3 py-4 rounded-t border-b-2 border-inset border-$primary-outline focus-within:border-$primary transition">
        <div class="i-material-symbols:password text-2xl text-$primary" />
        <input
          v-model="fields.password"
          type="password"
          class="form-control__input w-full bg-transparent text-$bw valid:text-$bw-xstrong outline-none"
          placeholder="Password"
        >
      </label>

      <button type="submit" class="btn mt-4">
        Login
      </button>
    </form>

    <NotificationBanner
      v-if="errMsg"
      :message="errMsg"
      icon="i-material-symbols:warning"
      type="error"
    />
  </main>
</template>
