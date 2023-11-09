import { defineStore } from 'pinia'

import Place from '@/models/Place'

export const usePlaceStore = defineStore('PlaceStore', {
  state: () => ({
    places: {} as Record<string, Place>,
  }),
  actions: {
    get(id: string) {
      if (id in this.places) {
        return this.places[id]
      }
    },
    async load(id: string) {
      return (this.places[id] = await Place.load(id))
    },
    clearCache() {
      this.places = {}
    },
  },
  persist: true,
})
