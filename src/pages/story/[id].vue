<template>
  <div class="grow bg-black px-4 pb-bar text-lg text-white">
    <TransitionGroup name="interactions">
      <template v-for="(interaction, i) in interactionStore.interactions" :key="i">
        <InteractionStory
          v-if="interaction.type === 'story'"
          :ref="(component) => setStoryRef(component!, interaction)"
          :story="storyStore.get(interaction.id)!"
          :link-id="interaction.linkId!"
          :active="interaction === interactionStore.active"
          :first="i === 0"
          class="my-8"
          @navigate="(link) => navigate(interaction, link)"
          @undo="undo(interaction)"
        />
        <InteractionItemFavourited
          v-else-if="interaction.type === 'itemFavourited'"
          :item="itemStore.get(interaction.id)!"
          class="my-4"
        />
        <InteractionItemViewed
          v-else-if="interaction.type === 'itemViewed'"
          :item="itemStore.get(interaction.id)!"
          class="my-4"
        />
        <InteractionSectionViewed
          v-else-if="interaction.type === 'sectionViewed'"
          :section="sectionStore.get(interaction.id)!"
          class="my-4"
        />
        <InteractionPlaceViewed
          v-else-if="interaction.type === 'placeViewed'"
          :place="placeStore.get(interaction.id)!"
          class="my-4"
        />
      </template>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'

import type { ILink } from '@/models/_Interfaces'
import type { Component } from 'vue'

import InteractionItemFavourited from '@/components/interactions/InteractionItemFavourited.vue'
import InteractionItemViewed from '@/components/interactions/InteractionItemViewed.vue'
import InteractionSectionViewed from '@/components/interactions/InteractionSectionViewed.vue'
import InteractionPlaceViewed from '@/components/interactions/InteractionPlaceViewed.vue'
import InteractionStory from '@/components/interactions/InteractionStory.vue'
import Interaction from '@/models/Interaction'

const interactionStore = useInteractionStore()
const itemStore = useItemStore()
const sectionStore = useSectionStore()
const storyStore = useStoryStore()
const placeStore = usePlaceStore()

const storyMap = new Map()

const navigate = (interaction: Interaction, link: ILink) => {
  interactionStore.selectLink(interaction, link)
  loadStory(link.story_id)
}

const undo = (interaction: Interaction) => {
  storyMap.get(interaction).transitioning = true
  const previous = interactionStore.setPreviousActive(interaction)
  nextTick(() => {
    storyMap.get(previous).$el.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
    interactionStore.remove(interaction)
  })
}

const setStoryRef = (component: Component, interaction: Interaction) => {
  if (component) {
    storyMap.set(interaction, component)
  }
}

const scrollActiveIntoView = () => {
  const el = document.querySelector('#active-story')

  if (el) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

const loadStory = async (id: string) => {
  const story = storyStore.get(id) || (await storyStore.load(id))
  interactionStore.addStory(story.id)
  await nextTick(scrollActiveIntoView)
}

onMounted(async () => {
  const { id } = useParams()

  if (id) {
    interactionStore.clear()
    await loadStory(id)
  } else if (!interactionStore.activeStory) {
    await loadStory(interactionStore.lastStory?.id || import.meta.env.VITE_DEFAULT_STORY)
  }

  await nextTick(scrollActiveIntoView)
})

const { toggle: toggleSurvey, shouldLaunch: shouldSurveyLaunch } = useSurvey()

watchDebounced(
  shouldSurveyLaunch,
  () => {
    if (shouldSurveyLaunch.value) {
      toggleSurvey()
    }
  },
  { immediate: true, debounce: 1000 }
)
</script>
