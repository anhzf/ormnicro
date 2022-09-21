import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { App as CapApp } from '@capacitor/app'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.sass'
import 'uno.css'

const app = createApp(App)
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

app.use(router)
app.mount('#app')
