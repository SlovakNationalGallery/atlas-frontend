import './bootstrap'
import './css/style.css'

import App from './App.vue'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { i18nVue } from 'laravel-vue-i18n'
import { createPinia } from 'pinia'
import * as Sentry from '@sentry/vue'

import { useLocaleStore } from '@/stores/LocaleStore'
import { useHistoryStore } from '@/stores/HistoryStore'

const history = createWebHistory()
const router = createRouter({
  history,
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
app.use(createPinia())

const localeStore = useLocaleStore()
app.use(i18nVue, {
  lang: localeStore.locale,
  resolve: (lang: string) => import(`./lang/${lang}.json`),
})

const historyStore = useHistoryStore()
historyStore.set(history)

app.mount('#app')
