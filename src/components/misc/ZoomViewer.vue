<template>
  <div id="viewer" class="absolute inset-0 rounded-xl overflow-hidden"></div>
</template>

<script setup lang="ts">
import OpenSeaDragon from 'openseadragon'

const props = defineProps<{
  tileSources: any[] // TODO: add model
}>()

const viewer = ref<OpenSeaDragon | null>(null)
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
