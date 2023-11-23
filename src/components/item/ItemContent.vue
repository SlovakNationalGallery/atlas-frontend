<template>
  <div class="relative h-full border-black px-4">
    <h2 class="text-2xl font-bold">{{ item.title }}</h2>
    <h3 class="text-lg">{{ item.author }}, {{ item.dating }}</h3>

    <div v-if="item.location_formatted" class="text-lg text-50-black italic">
      {{ $t('Location') }}: {{ item.location_formatted }}
    </div>

    <div v-if="!hideDescription" class="my-4 space-y-4 markdown text-lg" v-html="description"></div>

    <slot />
  </div>
</template>

<script setup lang="ts">
import Item from '@/models/Item'

const props = defineProps<{
  item: Item
  locked?: boolean
  hideDescription?: boolean
}>()

const description = computed(() => {
  return props.locked ? props.item.locked_bucketlist_description : props.item.description
})
</script>
