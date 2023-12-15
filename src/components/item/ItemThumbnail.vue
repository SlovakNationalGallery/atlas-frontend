<template>
  <Thumbnail icon="chevron-right" :truncate-description="!location">
    <template #image>
      <ResponsiveImageWithSizes
        class="h-full w-full rounded-xl object-cover"
        :class="{ grayscale: locked }"
        :image="{ src: item.image_src, srcset: item.image_srcset }"
      />
    </template>
    <template #title>{{ item.title }}</template>
    <template #description>
      <template v-if="location">
        {{ item.location_formatted }}
      </template>
      <template v-else>{{ item.author }}<br />{{ item.dating }}</template>
    </template>
  </Thumbnail>
</template>

<script setup lang="ts">
import Thumbnail from '@/components/general/Thumbnail.vue'
import ResponsiveImageWithSizes from '@/components/general/ResponsiveImageWithSizes.vue'
import Item from '@/models/Item'

defineProps<{
  item: Item
  locked?: boolean
  location?: boolean
}>()
</script>
