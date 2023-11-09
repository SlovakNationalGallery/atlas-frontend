import { defineStore } from 'pinia'
import axios from 'axios'

import Item from '@/models/Item'

export const useItemStore = defineStore('ItemStore', {
  state: () => ({
    items: {} as Record<string, Item>,
    collectionLink: null,
  }),
  actions: {
    get(id: string) {
      if (id in this.items) {
        return this.items[id]
      }
    },
    async load(id: string) {
      return (this.items[id] = await Item.load(id))
    },
    clearCollectionLink() {
      this.collectionLink = null
    },
    clearCache() {
      this.items = {}
    },
    async getCollectionLink() {
      const interactionStore = useInteractionStore()

      if (this.collectionLink) {
        return this.collectionLink
      } else {
        const response = (await axios
          .post('/api/collections', {
            items: [...interactionStore.viewedItemIds],
          })
          .catch((err) => {
            console.log(err)
          })) as any
        const collectionLink = response.data.url
        this.collectionLink = collectionLink
        return collectionLink
      }
    },
    async fetch() {
      this.clearCollectionLink()
      this.items = {}
      // todo
      // this.viewedIds = (await axios.get(`/api/collections/${collectionId}`)).data
    },
  },
  persist: true,
})
