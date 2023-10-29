import { defineStore } from 'pinia'

import Story from '@/models/Story'

export const useStoryStore = defineStore('StoryStore', {
  state: () => ({
    stories: {} as Record<string, Story>,
  }),

  actions: {
    get(id: string) {
      if (id in this.stories) {
        return this.stories[id]
      }
    },
    async load(id: string) {
      return (this.stories[id] = await Story.load(id))
    },
    clearCache() {
      this.stories = {}
    },
  },
  persist: true,
})
