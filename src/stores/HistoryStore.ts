import { defineStore } from 'pinia'

export const useHistoryStore = defineStore('HistoryStore', () => {
  const history = ref<any>(null)

  function set(history: any) {
    history.value = history
  }

  function getState() {
    return history.value?.state
  }

  return {
    history,
    set,
    getState,
  }
})
