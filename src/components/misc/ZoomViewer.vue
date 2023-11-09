<template>
  <div id="viewer" class="absolute inset-0 rounded-xl overflow-hidden"></div>
</template>

<script setup lang="ts">
import OpenSeaDragon from 'openseadragon'

import type { IImage } from '@/models/_Interfaces'

const props = defineProps<{
  tileSources: IImage[]
}>()

const viewer = ref<OpenSeadragon.Viewer | null>(null)
//TODO: navigation for multiple images

onMounted(() => {
  viewer.value = OpenSeaDragon({
    id: 'viewer',
    tileSources: props.tileSources[0].deep_zoom_url,
    showNavigationControl: false,
    showNavigator: false,
  })
})

onBeforeUnmount(() => {
  if (viewer.value) {
    viewer.value.destroy()
  }
})
</script>
