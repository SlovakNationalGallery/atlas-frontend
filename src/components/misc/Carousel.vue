<template>
  <div ref="carouselRef" class="scrollbar-hide flex snap-mandatory snap-x overflow-x-auto">
    <div
      v-for="item in items"
      :key="item.key as string"
      class="snap-start flex-auto flex-shrink-0 w-slide"
    >
      <component :is="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
const slots = useSlots()
const items = computed(() => (slots.default!()[0].children || []) as VNode[])
const carouselRef = ref<HTMLElement | null>(null)

async function scrollToBack() {
  await nextTick()
  carouselRef.value?.scrollTo({ left: 0, top: 0, behavior: 'instant' })
}

watch(items, () => scrollToBack)
onMounted(scrollToBack)
</script>
