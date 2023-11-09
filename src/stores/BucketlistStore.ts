import { defineStore } from 'pinia'

import Bucketlist from '@/models/Bucketlist'

export const useBucketlistStore = defineStore('BucketlistStore', {
  state: () => ({
    bucketlists: {} as Record<string, Bucketlist>,
  }),
  actions: {
    get(id: string) {
      if (id in this.bucketlists) {
        return this.bucketlists[id]
      }
    },
    async load(id: string) {
      return (this.bucketlists[id] = await Bucketlist.load(id))
    },
    clearCache() {
      this.bucketlists = {}
    },
  },
  persist: true,
})
