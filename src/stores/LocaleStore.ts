import { defineStore } from 'pinia'

const getBrowserLocale = () => {
  const navigatorLocale =
    navigator.languages !== undefined ? navigator.languages[0] : navigator.language

  if (!navigatorLocale) {
    return undefined
  }

  return navigatorLocale.trim().split(/-|_/)[0]
}

export const useLocaleStore = defineStore(
  'LocaleStore',
  () => {
    const locale = ref(getBrowserLocale())
    const title = ref('')

    return {
      locale,
      title,
    }
  },
  {
    persist: true,
  }
)
