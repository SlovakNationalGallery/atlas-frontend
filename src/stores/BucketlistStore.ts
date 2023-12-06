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
        Object.keys(store.bucketlists).forEach((id) => {
          store.bucketlists[id] = new Bucketlist(store.bucketlists[id])
        })
      },
    },
  }
)
