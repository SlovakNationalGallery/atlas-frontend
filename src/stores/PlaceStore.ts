import { defineStore } from 'pinia'

import Place from '@/models/Place'

export const usePlaceStore = defineStore(
  'PlaceStore',
  () => {
    const places = ref<Record<string, Place>>({})

    function get(id: string) {
      if (id in places.value) {
        return places.value[id]
      }
    }

    async function load(id: string) {
      return (places.value[id] = await Place.load(id))
    }

    function clearCache() {
      places.value = {}
    }

    return {
      places,
      get,
      load,
      clearCache,
    }
  },
  {
    persist: {
      afterRestore: ({ store }) => {
        Object.keys(store.places).forEach((id) => {
          store.places[id] = new Place(store.places[id])
        })
      },
    },
  }
)
