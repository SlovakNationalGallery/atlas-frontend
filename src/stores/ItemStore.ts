import { defineStore } from 'pinia'
import axios from 'axios'

import Item from '@/models/Item'

export const useItemStore = defineStore(
  'ItemStore',
  () => {
    //TODO: serialize set to make it persist
    const itemIds = ref<Set<string>>(new Set())
    const items = ref<Record<string, Item>>({})
    const collectionLink = ref<string | null>(null)

    const viewedItemsCount = computed(() => {
      return itemIds.value.size
    })

    function isItemViewed(id: string) {
      return itemIds.value.has(id)
    }

    function clear() {
      itemIds.value.clear()
    }

    function addItemViewed(id: string) {
      itemIds.value.add(id)
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
            items: itemIds,
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
      itemIds,

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
