<template>
  <div class="px-4">
    <div class="flex flex-col gap-1">
      <h3 v-if="item instanceof Section" class="text-lg">
        {{ $t('Group of :count artworks', { count: String(item.items.length) }) }}
      </h3>

      <h2 class="text-2xl font-bold">{{ item.title }}</h2>

      <h3 v-if="item instanceof Item && item.author" class="text-lg">
        {{ item.author }}, {{ item.dating }}
      </h3>

      <div v-if="item.location_formatted" class="text-lg text-50-black italic">
        {{ $t('Location') }}: {{ item.location_formatted }}
      </div>

      <div v-if="description" class="my-4 space-y-4 markdown text-lg" v-html="description"></div>
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
import Section from '@/models/Section'
import Place from '@/models/Place'
import Item from '@/models/Item'

defineProps<{
  item: Item | Place | Section
  description?: string
}>()
</script>
