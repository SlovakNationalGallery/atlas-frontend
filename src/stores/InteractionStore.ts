import { defineStore } from 'pinia'

import type { ILink } from '@/models/_Interfaces'

import Interaction from '@/models/Interaction'

export const useInteractionStore = defineStore(
  'InteractionStore',
  () => {
    const codePanelOpened = ref(false)
    const interactions = ref<Interaction[]>([])
    const cursor = ref(-1)

    const active = computed(() => {
      if (cursor.value > -1) {
        return interactions.value[cursor.value]
      }
    })

    const activeStory = computed(() => {
      if (active.value !== undefined) {
        const storiesStore = useStoryStore()
        return storiesStore.get(active.value.id)
      }
    })

    const lastStory = computed(() => {
      return stories.value[stories.value.length - 1]
    })

    const stories = computed(() => {
      const storiesStore = useStoryStore()

      return interactions.value
        .map((interaction) => storiesStore.get(interaction.id))
    })

    function addStory(id: string) {
      const length = interactions.value.push(
        new Interaction({ id })
      )

      cursor.value = length - 1
    }

    function selectLink(interaction: Interaction, link: ILink) {
      const index = interactions.value.indexOf(interaction)
      interactions.value[index].linkId = link.id
      cursor.value = -1
    }

    function setPreviousActive(interaction: Interaction) {
      cursor.value--
      if (active.value) {
        active.value.linkId = null
      }

      return active.value
    }

    function remove(interaction: Interaction) {
      const toDelete = interactions.value.indexOf(interaction)
      interactions.value.splice(toDelete, 1)
      if (toDelete <= cursor.value) {
        cursor.value--
      }
    }

    function isVisited(id: string) {
      return stories.value.some((interaction) => interaction?.id === id)
    }

    function hasVisitedAllLinks(id: string) {
      const storyStore = useStoryStore()
      const story = storyStore.get(id)
      return story?.links.every((link) => isVisited(link.story_id))
    }

    function clear() {
      interactions.value = []
    }

    return {
      codePanelOpened,
      interactions,
      cursor,

      active,
      activeStory,
      lastStory,
      stories,
      addStory,
      selectLink,
      setPreviousActive,
      remove,
      isVisited,
      hasVisitedAllLinks,
      clear,
    }
  },
  {
    persist: true,
  }
)
