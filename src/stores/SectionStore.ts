import { defineStore } from 'pinia'
import axios from 'axios'

import Section from '@/models/Section'

export const useSectionStore = defineStore('SectionStore', {
  state: () => ({
    sections: {} as Record<string, Section>,
  }),
  actions: {
    get(id: string) {
      if (id in this.sections) {
        return this.sections[id]
      }
    },
    async load(id: string) {
      return (this.sections[id] = await Section.load(id))
    },
    clearCache() {
      this.sections = {}
    },
  },
  persist: true,
})
