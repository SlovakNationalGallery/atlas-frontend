<template>
  <div
    ref="switchEl"
    class="switch overflow-hidden relative text-blue inline-flex rounded-xl border-2 font-bold"
  >
    <span ref="bgEl" class="bg rounded-lg"></span>
    <button
      type="button"
      class="button uppercase px-3 py-2"
      :class="{ 'text-white': locale === 'sk' }"
      @click="switchLanguage('sk')"
    >
      SK
    </button>
    <button
      type="button"
      class="button uppercase px-3 py-2"
      :class="{ 'text-white': locale === 'en' }"
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

const { locale } = toRefs(localeStore)

const switchEl = ref<HTMLDivElement>()
const bgEl = ref<HTMLSpanElement>()

const setBg = async () => {
  await nextTick()
  await nextTick()

  const activeButton = switchEl.value?.querySelector('.button.text-white')
  if (!activeButton) {
    return
  }

  const switchRect = switchEl.value?.getBoundingClientRect()
  const activeButtonRect = activeButton.getBoundingClientRect()

  if (!bgEl.value || !switchRect) {
    return
  }

  bgEl.value.style.width = `${activeButtonRect.width}px`
  bgEl.value.style.left = `${activeButtonRect.left - switchRect.left - 2}px`
}

watch(locale, setBg, {
  immediate: true,
})

const switchLanguage = (locale: string) => {
  interactionStore.clear()
  itemStore.clearCache()
  sectionStore.clearCache()
  storyStore.clearCache()
  placeStore.clearCache()
  bucketlistStore.clearCache()
  localeStore.locale = locale

  // TODO: this reload is unnecessary brutal
  window.location.reload()
}
</script>
<style scoped lang="scss">
.switch {
  border-color: currentColor;
  .button {
    transition: color 0.2s;
    position: relative;
    z-index: 2;
  }

  .bg {
    z-index: 1;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 0px;
    background-color: var(--blue);

    transition: width 0.2s, left 0.2s;
  }
}
</style>
