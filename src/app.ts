import '@/bootstrap'
import '@/css/style.css'
import 'virtual:svg-icons-register'
import '@morev/vue-transitions/styles'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { i18nVue } from 'laravel-vue-i18n'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import * as Sentry from '@sentry/vue'

import App from '@/App.vue'
import { useLocaleStore } from '@/stores/LocaleStore'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (to.path === '/') {
      return savedPosition as any
    }

    return false
  },
})

const app = createApp(App)

Sentry.init({ app, dsn: import.meta.env.VITE_SENTRY_DSN })

app.use(router)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

const localeStore = useLocaleStore()
app.use(i18nVue, {
  lang: localeStore.locale,
  resolve: (lang: string) => import(`./lang/${lang}.json`),
})

app.mount('#app')
