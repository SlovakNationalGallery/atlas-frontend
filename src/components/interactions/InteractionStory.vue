<template>
  <div :id="active ? 'active-story' : undefined" class="scroll-my-20">
    <img
      v-if="first"
      class="mx-auto mb-8 h-40 markdown"
      src="@/img/interaction-intro-ester.svg"
      alt="Ester"
    />
    <img
      v-else-if="activeOrTransitioning"
      class="h-12 w-12 rounded-xl object-cover"
      src="@/img/avatar-ester.png"
      alt="Avatar"
    />

    <div class="my-4 space-y-6 markdown" v-html="story.text"></div>

    <div v-for="(image, i) in story.images" :key="i" class="my-4">
      <ResponsiveImageWithSizes class="w-full rounded-xl" :image="image" />
    </div>

    <div v-if="story.video_embed" class="relative my-4">
      <StoryVideoLightbox :story="story"></StoryVideoLightbox>
    </div>

    <button
      v-for="(link, i) in story.links"
      v-show="activeOrTransitioning || linkId === link.id"
      :key="i"
      type="button"
      :disabled="!active"
      class="my-4 flex w-full items-center gap-x-2 rounded-xl border-1 p-3 text-left font-bold leading-8"
      :class="{
        'border-green bg-green': activeOrTransitioning,
        'bg-opacity-20 text-green':
          activeOrTransitioning && interactionStore.hasVisitedAllLinks(link.story_id),
        'text-black': activeOrTransitioning && !interactionStore.hasVisitedAllLinks(link.story_id),
        'border-white/10 text-white': !activeOrTransitioning,
      }"
      @click="emit('navigate', link)"
    >
    <SvgChatCircle
        v-if="!activeOrTransitioning || interactionStore.hasVisitedAllLinks(link.story_id)"
        class="flex-none"
      />
      {{ link.title }}
    </button>
    <BackUp v-show="activeOrTransitioning && !first" :disabled="!active" @click="emit('undo')" />
  </div>
</template>

<script setup lang="ts">
import type { ILink } from '@/models/_Interfaces'

import Story from '@/models/Story'
import ResponsiveImageWithSizes from '@/components/general/ResponsiveImageWithSizes.vue'
import StoryVideoLightbox from '@/components/interactions/StoryVideoLightbox.vue'
import BackUp from '@/components/interactions/BackUp.vue'

const props = defineProps<{
  story: Story
  linkId?: string
  active?: boolean
  first?: boolean
}>()

const emit = defineEmits<{
  navigate: [link: ILink]
  undo: []
}>()

const interactionStore = useInteractionStore()

const transitioning = ref(false)
const activeOrTransitioning = computed(() => {
  return transitioning.value || props.active
})

defineExpose({
  transitioning,
})
</script>
