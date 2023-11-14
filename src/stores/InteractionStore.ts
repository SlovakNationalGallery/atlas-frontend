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
      if (active.value !== undefined && active.value.type === 'story') {
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
        .filter((interaction) => interaction.type === 'story')
        .map((interaction) => storiesStore.get(interaction.id))
    })

    const viewedItemIds = computed(() => {
      return new Set(
        interactions.value
          .filter((interaction) => interaction.type === 'itemViewed')
          .map((interaction) => interaction.id)
          .slice()
          .reverse()
      )
    })

    const viewedItemsCount = computed(() => {
      return viewedItemIds.value.size
    })

    function isItemViewed(id: string) {
      return viewedItemIds.value.has(id)
    }

    function addStory(id: string) {
      const length = interactions.value.push(
        new Interaction({
          type: 'story',
          id,
        })
      )

      cursor.value = length - 1
    }

    function addItemViewed(id: string) {
      interactions.value.push(
        new Interaction({
          type: 'itemViewed',
          id,
        })
      )
    }

    function addSectionViewed(id: string) {
      interactions.value.push(
        new Interaction({
          type: 'sectionViewed',
          id,
        })
      )
    }

    function addPlaceViewed(id: string) {
      interactions.value.push(
        new Interaction({
          type: 'placeViewed',
          id,
        })
      )
    }

    function selectLink(interaction: Interaction, link: ILink) {
      const index = interactions.value.indexOf(interaction)
      interactions.value[index].linkId = link.id
      cursor.value = -1
    }

    function lastStoryIndex(from: number) {
      let index = typeof from !== 'undefined' ? from : cursor.value
      while (interactions.value[index].type !== 'story' && index > 0) {
        index--
      }
      return index
    }

    function setPreviousActive(interaction: Interaction) {
      const index = interactions.value.indexOf(interaction)
      cursor.value = lastStoryIndex(index - 1)

      if (active.value) {
        active.value.linkId = null
      }

      return active.value
    }

    function remove(interaction: Interaction) {
      const toDelete = interactions.value.indexOf(interaction)
      interactions.value.splice(toDelete, 1)
      if (toDelete <= cursor.value) {
        cursor.value = lastStoryIndex(cursor.value - 1)
      }
    }

    function isVisited(id: string) {
      return stories.value.some((interaction) => interaction?.id === id)
    }

    function hasVisitedAllLinks(id: string) {
      const storyStore = useStoryStore()
      const story = storyStore.get(id)
      return !story ? true : story?.links.every((link) => isVisited(link.story_id))
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
      viewedItemIds,
      viewedItemsCount,

      isItemViewed,
      addStory,
      addItemViewed,
      addSectionViewed,
      addPlaceViewed,
      selectLink,
      lastStoryIndex,
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
