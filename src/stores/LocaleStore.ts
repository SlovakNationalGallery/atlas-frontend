import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

const getBrowserLocale = () => {
  const navigatorLocale =
    navigator.languages !== undefined ? navigator.languages[0] : navigator.language

  if (!navigatorLocale) {
    return undefined
  }

  return navigatorLocale.trim().split(/-|_/)[0]
}

export const useLocaleStore = defineStore('LocaleStore', {
  state: () => ({
    locale: useStorage('locale', getBrowserLocale()),
  }),
})
