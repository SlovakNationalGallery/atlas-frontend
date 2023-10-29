import { defineStore } from 'pinia'

export const useHistoryStore = defineStore('HistoryStore', {
  state: () => ({
    history: null as any,
  }),
  actions: {
    set(history: any) {
      this.history = history
    },
    getState() {
      return this.history?.state
    },
  },
})
