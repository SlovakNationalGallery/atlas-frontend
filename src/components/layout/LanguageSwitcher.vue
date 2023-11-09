<template>
  <div class="mx-2.5 flex items-center rounded-full bg-black px-1 py-0.5 font-medium text-white">
    <button
      type="button"
      class="px-1 uppercase"
      :class="{ 'text-green': localeStore.locale === 'sk' }"
      @click="switchLanguage('sk')"
    >
      SK
    </button>
    <svg class="h-[20px] w-[1px] fill-gray-dark">
      <rect y="0.5" width="1" height="20" rx="0.5" />
    </svg>
    <button
      type="button"
      class="px-1 uppercase"
      :class="{ 'text-green': localeStore.locale === 'en' }"
      @click="switchLanguage('en')"
    >
      EN
    </button>
  </div>
</template>

<script setup lang="ts">
const interactionStore = useInteractionStore()
const itemStore = useItemStore()
const localeStore = useLocaleStore()
const sectionStore = useSectionStore()
const storyStore = useStoryStore()
const placeStore = usePlaceStore()
const bucketlistStore = useBucketlistStore()

const switchLanguage = (locale: string) => {
  interactionStore.clear()
  itemStore.clearCache()
  sectionStore.clearCache()
  storyStore.clearCache()
  placeStore.clearCache()
  bucketlistStore.clearCache()
  localeStore.locale = locale
  window.location.reload()
}
</script>
