import { defineStore } from 'pinia'
import axios from 'axios'

import Item from '@/models/Item'

export const useItemStore = defineStore(
  'ItemStore',
  () => {
    const items = ref<Record<string, Item>>({})
    const collectionLink = ref<string | null>(null)

    function get(id: string) {
      if (id in items.value) {
        return items.value[id]
      }
    }

    async function load(id: string) {
      return (items.value[id] = await Item.load(id))
    }

    function clearCollectionLink() {
      collectionLink.value = null
    }

    function clearCache() {
      items.value = {}
    }

    async function getCollectionLink() {
      const interactionStore = useInteractionStore()
      if (collectionLink.value) {
        return collectionLink.value
      } else {
        const response = (await axios
          .post('/api/collections', {
            items: [...interactionStore.viewedItemIds],
          })
          .catch((err) => {
            console.log(err)
          })) as any
        const collectionLink = response.data.url
        collectionLink.value = collectionLink
        return collectionLink
      }
    }

    async function fetch() {
      clearCollectionLink()
      items.value = {}
      // todo
      // this.viewedIds = (await axios.get(`/api/collections/${collectionId}`)).data
    }

    return {
      items,
      collectionLink,
      get,
      load,
      clearCollectionLink,
      clearCache,
      getCollectionLink,
      fetch,
    }
  },
  {
    persist: {
      afterRestore: ({ store }) => {
        Object.keys(store.items).forEach((id) => {
          store.items[id] = new Item(store.items[id])
        })
      },
    },
  }
)
