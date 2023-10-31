import { defineStore } from 'pinia'

import type { RouterHistory } from 'vue-router/auto'

export const useHistoryStore = defineStore('HistoryStore', () => {
  const history = ref<RouterHistory | null>(null)

  return {
    history,
  }
})
