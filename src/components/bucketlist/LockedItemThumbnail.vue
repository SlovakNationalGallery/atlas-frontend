<template>
  <Thumbnail class="bg-black/10">
    <template #image>
      <ResponsiveImageWithSizes
        class="h-full w-full rounded-xl object-cover grayscale"
        :image="{ src: item.image_src, srcset: item.image_srcset }"
      />
    </template>
    <template #icon>
      <SvgCaretRight />
    </template>
    <template #title>{{ item.title }}</template>
    <template #description>{{ item.exhibition.name }}<br />{{ item.location_formatted }}</template>
  </Thumbnail>
</template>

<script setup lang="ts">
import ResponsiveImageWithSizes from '@/components/general/ResponsiveImageWithSizes.vue'
import Thumbnail from '@/components/general/Thumbnail.vue'
import Item from '@/models/Item'

defineProps<{
  item: Item
}>()
</script>
