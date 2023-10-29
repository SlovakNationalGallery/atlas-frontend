<template>
  <Thumbnail>
    <template #image>
      <ResponsiveImageWithSizes
        class="h-full w-full rounded-xl object-cover"
        :image="{ src: item.image_src, srcset: item.image_srcset }"
      />
    </template>
    <template #title>{{ item.title }}</template>
    <template #description>{{ item.author }}<br />{{ item.dating }}</template>
  </Thumbnail>
</template>

<script setup lang="ts">
import Thumbnail from '@/components/general/Thumbnail.vue'
import ResponsiveImageWithSizes from '@/components/general/ResponsiveImageWithSizes.vue'

defineProps<{
  item: any //TODO: add model
}>()
</script>
