import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { App as CapApp } from '@capacitor/app'
import authGuard from '~/guards/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

CapApp.addListener('backButton', (e) => {
  if (e.canGoBack)
    router.go(-1)

  else
    CapApp.exitApp()
})

router.beforeEach(authGuard)

export default router

declare module 'vue-router' {
  interface RouteMeta {
    auth?: {
      required?: boolean
      guest?: boolean
    }
  }
}
