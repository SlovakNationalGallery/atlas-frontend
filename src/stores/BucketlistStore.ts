import { defineStore } from 'pinia'

import Bucketlist from '@/models/Bucketlist'

export const useBucketlistStore = defineStore(
  'BucketlistStore',
  () => {
    const bucketlists = ref<Record<string, Bucketlist>>({})

    function get(id: string) {
      if (id in bucketlists.value) {
        return bucketlists.value[id]
      }
    }

    async function load(id: string) {
      return (bucketlists.value[id] = await Bucketlist.load(id))
    }

    function clearCache() {
      bucketlists.value = {}
    }

    return {
      bucketlists,
      get,
      load,
      clearCache,
    }
  },
  {
    persist: {
      afterRestore: ({ store }) => {
        console.log(store.bucketlists)
        Object.keys(store.bucketlists).forEach((id) => {
          console.log(id, store.bucketlists[id])
          store.bucketlists[id] = new Bucketlist(store.bucketlists[id])
        })
      },
    },
  }
)
