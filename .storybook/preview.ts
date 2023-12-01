import type { Preview } from '@storybook/vue3'
import { i18nVue } from 'laravel-vue-i18n'
import { setup } from "@storybook/vue3";

import '@/bootstrap'
import '@/css/style.css'
import 'virtual:svg-icons-register'
import { useLocaleStore } from "@/stores/LocaleStore";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

setup((app) => {
  app.use(pinia)

  const localeStore = useLocaleStore()
  app.use(i18nVue, {
    lang: localeStore.locale,
    resolve: (lang: string) => import(`./lang/${lang}.json`),
  })
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
