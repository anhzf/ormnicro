import { useAuth } from '@vueuse/firebase'
import { getRedirectResult } from 'firebase/auth'
import type { NavigationGuardWithThis } from 'vue-router'
import { auth } from '~/services/firebase'

const prepareAuth = async () => {
  const { user } = useAuth(auth())
  const authRedirectResult = await getRedirectResult(auth())
  user.value = authRedirectResult?.user
}

const waitForAuth = () => new Promise<void>((resolve) => {
  const { isAuthenticated } = useAuth(auth())
  watchOnce(isAuthenticated, () => {
    resolve()
  }, { immediate: true })
})

const authGuard: NavigationGuardWithThis<never> = async (to) => {
  await prepareAuth()
  await waitForAuth()

  const { isAuthenticated } = useAuth(auth())

  // Default to auth is required
  if (to.meta.auth?.required === false)
    return true

  // Redirect to index if auth type is guest
  if (to.meta.auth?.guest) {
    return isAuthenticated.value
      ? { name: 'index' }
      : true
  }

  // Always fallback to signIn page if not authenticated
  return isAuthenticated.value || { name: 'signIn' }
}

export default authGuard
