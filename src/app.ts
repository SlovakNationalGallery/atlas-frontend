import '@/bootstrap'
import '@/css/style.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { i18nVue } from 'laravel-vue-i18n'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import * as Sentry from '@sentry/vue'

import App from '@/App.vue'
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

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

const localeStore = useLocaleStore()
app.use(i18nVue, {
  lang: localeStore.locale,
  resolve: (lang: string) => import(`./lang/${lang}.json`),
})

const { history: historyState } = toRefs(useHistoryStore())
historyState.value = history

app.mount('#app')
