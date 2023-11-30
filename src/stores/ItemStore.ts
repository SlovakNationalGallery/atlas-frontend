import { defineStore } from 'pinia'
import axios from 'axios'

import Item from '@/models/Item'

export const useItemStore = defineStore(
  'ItemStore',
  () => {
    const viewedItemsIds = ref<string[]>([])
    const items = ref<Record<string, Item>>({})
    const collectionLink = ref<string | null>(null)

    const viewedItemsCount = computed(() => {
      return viewedItemsIds.value.length
    })

    function isItemViewed(id: string) {
      return viewedItemsIds.value.includes(id)
    }

    function clear() {
      viewedItemsIds.value = []
    }

    function addItemViewed(id: string) {
      if (!isItemViewed(id)) {
        viewedItemsIds.value.push(id)
      }
    }

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
      if (collectionLink.value) {
        return collectionLink.value
      } else {
        const response = (await axios
          .post('/api/collections', {
            items: viewedItemsIds,
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
      viewedItemsIds,

      viewedItemsCount,

      isItemViewed,
      addItemViewed,
      collectionLink,
      get,
      load,
      clear,
      clearCollectionLink,
      clearCache,
      getCollectionLink,
      fetch,
    }
  },
  {
    persist: true,
  }
)
