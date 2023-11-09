import { defineStore } from 'pinia'

import Section from '@/models/Section'

export const useSectionStore = defineStore(
  'SectionStore',
  () => {
    const sections = ref<Record<string, Section>>({})

    function get(id: string) {
      if (id in sections.value) {
        return sections.value[id]
      }
    }

    async function load(id: string) {
      return (sections.value[id] = await Section.load(id))
    }

    function clearCache() {
      sections.value = {}
    }

    return {
      sections,
      get,
      load,
      clearCache,
    }
  },
  {
    persist: true,
  }
)
