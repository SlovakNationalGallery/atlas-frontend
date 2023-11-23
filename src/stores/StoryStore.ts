import { defineStore } from 'pinia'

import Story from '@/models/Story'

export const useStoryStore = defineStore(
  'StoryStore',
  () => {
    const stories = ref<Record<string, Story>>({})

    function get(id: string) {
      if (id in stories.value) {
        return stories.value[id]
      }
    }

    async function load(id: string) {
      return (stories.value[id] = await Story.load(id))
    }

    function clearCache() {
      stories.value = {}
    }

    return {
      stories,
      get,
      load,
      clearCache,
    }
  },
  {
    persist: {
      afterRestore: ({ store }) => {
        Object.keys(store.stories).forEach((id) => {
          store.stories[id] = new Story(store.stories[id])
        })
      },
    },
  }
)
