<template>
  <div class="grow bg-black px-4 pb-bar text-lg text-white">
    <TransitionGroup name="interactions">
      <template v-for="(interaction, i) in interactionStore.interactions" :key="i">
        <InteractionStory
          :ref="(component) => setStoryRef(component!, interaction)"
          :story="storyStore.get(interaction.id)!"
          :link-id="interaction.linkId!"
          :active="interaction === interactionStore.active"
          :first="i === 0"
          class="my-8"
          @navigate="(link) => navigate(interaction, link)"
          @undo="undo(interaction)"
        />
      </template>
    </TransitionGroup>
  </div>
  <CodePanel />
</template>

<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'

import type { ILink } from '@/models/_Interfaces'
import type { Component } from 'vue'

import CodePanel from '@/components/layout/CodePanel.vue'
import InteractionStory from '@/components/interactions/InteractionStory.vue'
import Interaction from '@/models/Interaction'

const interactionStore = useInteractionStore()
const storyStore = useStoryStore()

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
  nextTick(scrollActiveIntoView)
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
