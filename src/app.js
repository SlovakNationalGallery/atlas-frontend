import './bootstrap'
import './css/style.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { i18nVue } from 'laravel-vue-i18n'
import { createPinia } from 'pinia'
import * as Sentry from '@sentry/vue'

import App from './App.vue'
import { useHistoryStore } from './stores/HistoryStore'
import { useLocaleStore } from './stores/LocaleStore'


const history = createWebHistory()
const router = createRouter({
    history,

    scrollBehavior(to, from, savedPosition) {
        if (to.path === '/') {
            return savedPosition
        }
        return { top: 0 }
    },
})

const app = createApp(App)

Sentry.init({ app, dsn: import.meta.env.VITE_SENTRY_DSN })

app.use(router)
app.use(createPinia())

const localeStore = useLocaleStore()
app.use(i18nVue, {
    lang: localeStore.locale,
    resolve: (lang) => import(`./lang/${lang}.json`),
})

const historyStore = useHistoryStore()
historyStore.set(history)

app.mount('#app')
