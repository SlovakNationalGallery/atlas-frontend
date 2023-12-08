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
import { useHistoryStore } from '@/stores/HistoryStore'

const history = createWebHistory()
const router = createRouter({
  history,
  // definePage cant be used with variables or functions
  // hence we need to use extendRoutes to set translatable meta titles
  // https://github.com/posva/unplugin-vue-router#extending-existing-routes
  extendRoutes(routes) {
    routes.forEach((route) => {
      switch (route.path) {
        case '/item':
          route.meta = { title: t('Artwork detail') }
          break
        case '/locked':
          route.meta = { title: t('Bucketlist artwork') }
          break
        case '/section':
          route.meta = { title: t('Section') }
          break
        case '/place':
          route.meta = { title: t('Place') }
          break
        case '/bucketlist':
          route.meta = { title: t('Bucketlist') }
          break
        case '/history':
          route.meta = { title: t('My history') }
          break
      }
    })

    return routes
  },
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
